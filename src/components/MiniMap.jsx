import { useRef, useState } from "react";
import "./MiniMap.css";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const DRAG_THRESHOLD = 4; // pixels you must move before a press counts as a drag

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// Keep the map covering the viewport so you can't drag it away into empty space
function constrain(view, w, h) {
  return {
    scale: view.scale,
    x: clamp(view.x, w - w * view.scale, 0),
    y: clamp(view.y, h - h * view.scale, 0),
  };
}

// Zoom by `factor` while keeping the point (cx, cy) fixed under the cursor/fingers
function zoomAt(view, factor, cx, cy, w, h) {
  const scale = clamp(view.scale * factor, MIN_SCALE, MAX_SCALE);
  const ratio = scale / view.scale;
  return constrain(
    { scale, x: cx - (cx - view.x) * ratio, y: cy - (cy - view.y) * ratio },
    w,
    h
  );
}

export default function MiniMap({ scenes, activeId, onPinClick }) {
  const [expanded, setExpanded] = useState(false);
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 });

  const viewportRef = useRef(null);
  const pointers = useRef(new Map()); // active fingers/mouse: id -> {x, y}
  const start = useRef({ x: 0, y: 0 });
  const dragged = useRef(false);
  const pinchDist = useRef(0);

  const getRect = () => viewportRef.current.getBoundingClientRect();

  function handlePointerDown(e) {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      dragged.current = false;
      start.current = { x: e.clientX, y: e.clientY };
    }
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchDist.current = Math.hypot(a.x - b.x, a.y - b.y);
    }
  }

  function handlePointerMove(e) {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, cur);
    const rect = getRect();

    if (pointers.current.size === 1) {
      // One pointer: drag to pan
      if (!dragged.current) {
        const moved = Math.hypot(cur.x - start.current.x, cur.y - start.current.y);
        if (moved < DRAG_THRESHOLD) return; // still counts as a click
        dragged.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      const dx = cur.x - prev.x;
      const dy = cur.y - prev.y;
      setView((v) =>
        constrain({ ...v, x: v.x + dx, y: v.y + dy }, rect.width, rect.height)
      );
    } else if (pointers.current.size === 2) {
      // Two pointers: pinch to zoom
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const cx = (a.x + b.x) / 2 - rect.left;
      const cy = (a.y + b.y) / 2 - rect.top;
      if (pinchDist.current > 0) {
        const factor = dist / pinchDist.current;
        setView((v) => zoomAt(v, factor, cx, cy, rect.width, rect.height));
      }
      pinchDist.current = dist;
      dragged.current = true;
    }
  }

  function handlePointerUp(e) {
    pointers.current.delete(e.pointerId);
    pinchDist.current = 0;
  }

  function handleWheel(e) {
    const rect = getRect();
    const factor = e.deltaY < 0 ? 1.2 : 1 / 1.2;
    setView((v) =>
      zoomAt(v, factor, e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    );
  }

  function zoomBy(factor) {
    const rect = getRect();
    setView((v) =>
      zoomAt(v, factor, rect.width / 2, rect.height / 2, rect.width, rect.height)
    );
  }

  function toggleExpanded() {
    setExpanded(!expanded);
    setView({ x: 0, y: 0, scale: 1 }); // the box size changes, so reset the pan/zoom
  }

  return (
    <div className={`minimap ${expanded ? "expanded" : ""}`}>
      <div className="minimap-inner">
        <div
          ref={viewportRef}
          className="minimap-viewport"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
        >
          <div className="minimap-content" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
            <img src="/olfu_map.jpg" alt="Campus map" draggable={false} />
          </div>

          <div className="minimap-pins">
            {Object.entries(scenes).map(([id, s]) =>
              s.map ? (
                <button
                  key={id}
                  className={`pin ${id === activeId ? "active" : ""}`}
                  style={{
                    left: `calc(${view.x}px + ${view.scale * s.map.x}%)`,
                    top: `calc(${view.y}px + ${view.scale * s.map.y}%)`,
                  }}
                  title={s.title}
                  onClick={() => {
                    if (!dragged.current) onPinClick(id);
                  }}
                />
              ) : null
            )}
          </div>
        </div>

        <button
          className="minimap-toggle"
          onClick={toggleExpanded}
          aria-label={expanded ? "Shrink map" : "Enlarge map"}
        >
          {expanded ? "−" : "⤢"}
        </button>

        <div className="minimap-zoom">
          <button className="minimap-zoom-button" onClick={() => zoomBy(1.4)} aria-label="Zoom in">+</button>
          <button className="minimap-zoom-button" onClick={() => zoomBy(1 / 1.4)} aria-label="Zoom out">−</button>
        </div>
      </div>
    </div>
  );
}
