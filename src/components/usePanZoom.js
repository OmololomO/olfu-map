import { useEffect, useRef, useState } from "react";

const DRAG_START_DISTANCE_PX = 4;
const WHEEL_ZOOM_STEP = 1.2;

const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

/*
  usePanZoom: mouse drag and zoom for a big image (the map).

    <div ref={viewportRef} {...bind}>                      the window you look through
      <div ref={contentRef} style={contentStyle}>...</div>   the map that moves
    </div>

  Options (all optional):
    zoomOutLimit  furthest you can zoom out. 1 = the whole map width fits. Smaller = further out.
    zoomInLimit   closest you can zoom in.
    startZoom     zoom when the map first appears.
    centeredPin   { x, y } in percent: the spot to show in the middle of the window.
    panLimit      "fill-window": the map always covers the window.
                  "to-center":   any edge or corner of the map can be dragged to the middle.

  Returns:
    view          { zoom, centerX, centerY } (center is 0 to 1 from the map's top-left)
    dragged       ref: dragged.current is true if the last press was a drag, not a click
    zoomBy(n)     zoom by a factor, for buttons (1.4 = in, 1 / 1.4 = out)
    bind          event handlers for the window element
    contentStyle  style for the moving map element
*/
export default function usePanZoom({
  zoomOutLimit = 1,
  zoomInLimit = 8,
  startZoom = 2,
  centeredPin = null,
  panLimit = "fill-window",
} = {}) {
  const viewportRef = useRef(null);
  const contentRef = useRef(null);

  const targetX = centeredPin ? centeredPin.x / 100 : 0.5;
  const targetY = centeredPin ? centeredPin.y / 100 : 0.5;

  const [view, setView] = useState({ zoom: startZoom, centerX: targetX, centerY: targetY });

  const [size, setSize] = useState({ windowWidth: 0, windowHeight: 0, mapWidth: 0, mapHeight: 0 });

  const lastPoint = useRef(null); // mouse position at the last move, or null when the button is up
  const pressStart = useRef({ x: 0, y: 0 });
  const dragged = useRef(false);

  // Measures the window and map
  function measure() {
    const box = viewportRef.current.getBoundingClientRect();
    const map = contentRef.current;
    return {
      windowWidth: box.width,
      windowHeight: box.height,
      mapWidth: map.offsetWidth,
      mapHeight: map.offsetHeight,
      windowLeft: box.left,
      windowTop: box.top,
    };
  }

  // Limits the view of the map
  function limitView(v, m) {
    let { centerX, centerY } = v;
    if (panLimit === "to-center") {
      centerX = clamp(centerX, 0, 1);
      centerY = clamp(centerY, 0, 1);
    } else {
      // Half the window as a fraction of the map: the center can't get closer than this to an edge
      const halfWindowX = m.windowWidth / (2 * m.mapWidth * v.zoom);
      const halfWindowY = m.windowHeight / (2 * m.mapHeight * v.zoom);
      centerX = 2 * halfWindowX >= 1 ? 0.5 : clamp(centerX, halfWindowX, 1 - halfWindowX);
      centerY = 2 * halfWindowY >= 1 ? 0.5 : clamp(centerY, halfWindowY, 1 - halfWindowY);
    }
    return { ...v, centerX, centerY };
  }

  // Move the map by (dx, dy) pixels
  function panBy(dx, dy, m) {
    setView((v) => {
      if (!m.mapWidth || !m.mapHeight) return v;
      return limitView(
        {
          ...v,
          centerX: v.centerX - dx / (v.zoom * m.mapWidth),
          centerY: v.centerY - dy / (v.zoom * m.mapHeight),
        },
        m
      );
    });
  }

  // Zoom by `factor`, keeping the spot at (pointX, pointY) pixels fixed.
  function zoomAt(factor, pointX, pointY, m) {
    setView((v) => {
      if (!m.mapWidth || !m.mapHeight) return v;
      const zoom = clamp(v.zoom * factor, zoomOutLimit, zoomInLimit);
      const offsetX = pointX - m.windowWidth / 2; // distance from the window's middle
      const offsetY = pointY - m.windowHeight / 2;
      const shift = 1 / v.zoom - 1 / zoom;
      return limitView(
        {
          zoom,
          centerX: (v.centerX * m.mapWidth + offsetX * shift) / m.mapWidth,
          centerY: (v.centerY * m.mapHeight + offsetY * shift) / m.mapHeight,
        },
        m
      );
    });
  }

  // Re-measure when the window or map changes size and when the map loads
  useEffect(() => {
    const update = () => setSize(measure());
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewportRef.current);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  // Move to the new spot when centeredPin changes
  useEffect(() => {
    setView((v) => ({ ...v, centerX: targetX, centerY: targetY }));
  }, [targetX, targetY]);

  function onPointerDown(e) {
    if (e.button !== 0) return; // left mouse button only
    lastPoint.current = { x: e.clientX, y: e.clientY };
    pressStart.current = { x: e.clientX, y: e.clientY };
    dragged.current = false;
  }

  function onPointerMove(e) {
    const previous = lastPoint.current;
    if (!previous) return; // button is not held down
    const current = { x: e.clientX, y: e.clientY };
    lastPoint.current = current;

    if (!dragged.current) {
      const moved = Math.hypot(current.x - pressStart.current.x, current.y - pressStart.current.y);
      if (moved < DRAG_START_DISTANCE_PX) return; // still a click
      dragged.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    panBy(current.x - previous.x, current.y - previous.y, measure());
  }

  function onPointerUp() {
    lastPoint.current = null;
  }

  function onWheel(e) {
    const m = measure();
    const factor = e.deltaY < 0 ? WHEEL_ZOOM_STEP : 1 / WHEEL_ZOOM_STEP;
    zoomAt(factor, e.clientX - m.windowLeft, e.clientY - m.windowTop, m);
  }

  // Zoom used by the zoom buttons
  function zoomBy(factor) {
    const m = measure();
    zoomAt(factor, m.windowWidth / 2, m.windowHeight / 2, m);
  }

  const measured = size.mapWidth > 0 && size.mapHeight > 0;
  const shown = measured ? limitView(view, size) : view;

  return {
    viewportRef,
    contentRef,
    view: shown,
    dragged,
    zoomBy,
    bind: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp, onWheel },
    contentStyle: {
      transform: `translate(${size.windowWidth / 2}px, ${size.windowHeight / 2}px) scale(${shown.zoom}) translate(${-shown.centerX * size.mapWidth}px, ${-shown.centerY * size.mapHeight}px)`,
      visibility: measured ? "visible" : "hidden", // hidden until the first measurement
    },
  };
}
