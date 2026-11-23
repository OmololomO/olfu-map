import { useState } from "react";
import usePanZoom from "../utils/usePanZoom";
import MapPins from "./MapPins";
import "./MiniMap.css";
import FloorControls from "./FloorControls"
import { FLOORS, FLOOR_MAPS } from "../data/floors";

export default function MiniMap({ scenes, floor, onFloorChange, startingSceneID, onPinClick }) {
  const [isExpanded, setisExpanded] = useState(false);

  const { viewportRef, contentRef, contentStyle, view, dragged, bind, zoomBy } = usePanZoom({
    zoomOutLimit: 1,
    zoomInLimit: 8,
    startZoom: 3,
    panLimit: "to-center",
    centeredPin: scenes[startingSceneID]?.map,
  });

  return (
    <div className={`minimap ${isExpanded ? "expanded" : ""}`}>
      <div className="minimap-inner">
        <div ref={viewportRef} className="minimap-viewport" {...bind}>
          <div ref={contentRef} className="minimap-content" style={contentStyle}>
            <img src={FLOOR_MAPS[floor]} alt={`Campus map, floor ${floor}`} draggable={false} />
            <MapPins
              scenes={scenes}
              activeId={startingSceneID}
              floor={floor}
              zoom={view.zoom}
              dragged={dragged}
              onPinClick={onPinClick}
              showLabels={false}
            />
          </div>
        </div>

        <button
          className="minimap-toggle"
          onClick={() => setisExpanded(!isExpanded)}
        >
          {isExpanded ? "−" : "⤢"}
        </button>

        <div className="minimap-zoom">
          <button onClick={() => zoomBy(1.4)}>+</button>
          <button onClick={() => zoomBy(1 / 1.4)}>−</button>
        </div>

        <div className="minimap-floor-controls">
          <FloorControls floors={FLOORS} currentFloor={floor} onChange={onFloorChange} />
        </div>
      </div>
    </div>
  );
}
