import { useState } from "react";
import usePanZoom from "./usePanZoom";
import MapPins from "./MapPins";
import "./MiniMap.css";

const MAP_SRC = "/maps/olfu_map.svg";

export default function MiniMap({ scenes, activeId, onPinClick }) {
  const [expanded, setExpanded] = useState(false);

  const { viewportRef, contentRef, contentStyle, view, dragged, bind, zoomBy } = usePanZoom({
    zoomOutLimit: 1,
    zoomInLimit: 8,
    startZoom: 3,
    centeredPin: scenes[activeId]?.map,
  });

  return (
    <div className={`minimap ${expanded ? "expanded" : ""}`}>
      <div className="minimap-inner">
        <div ref={viewportRef} className="minimap-viewport" {...bind}>
          <div ref={contentRef} className="minimap-content" style={contentStyle}>
            <img src={MAP_SRC} alt="Campus map" draggable={false} />
            <MapPins
              scenes={scenes}
              activeId={activeId}
              zoom={view.zoom}
              dragged={dragged}
              onPinClick={onPinClick}
              showLabels={expanded}
            />
          </div>
        </div>

        <button
          className="minimap-toggle"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Shrink map" : "Enlarge map"}
        >
          {expanded ? "−" : "⤢"}
        </button>

        <div className="minimap-zoom">
          <button onClick={() => zoomBy(1.4)} aria-label="Zoom in">+</button>
          <button onClick={() => zoomBy(1 / 1.4)} aria-label="Zoom out">−</button>
        </div>
      </div>
    </div>
  );
}
