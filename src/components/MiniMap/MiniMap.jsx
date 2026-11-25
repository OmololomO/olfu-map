import { useRef, useState } from "react";
import usePanZoom from "../../utils/usePanZoom";
import MapPins from "../MapPins/MapPins";
import "./MiniMap.css";
import FloorControls from "../FloorControls/FloorControls";
import { FLOORS, FLOOR_MAPS, BUILDING_MAPS } from "../../data/floors";

export default function MiniMap({
  scenes,
  floor,
  building,
  onFloorChange,
  startingSceneID,
  onPinClick,
  devMode,
  mapSrc = FLOOR_MAPS[floor],
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const savedPositions = useRef({});
  const centerKey = `${building}-${floor}`;
  const savedCenter = savedPositions.current[centerKey] || null;
  const availableFloors = BUILDING_MAPS[building]
    ? Object.keys(BUILDING_MAPS[building]).map(Number)
    : building === "Canteen"
      ? [1]
      : FLOORS;
  const activeScene = scenes[startingSceneID];

  const centerScene =
    activeScene?.floor === floor
      ? activeScene
      : Object.values(scenes).find(
          (scene) =>
            scene.floor === floor &&
            scene.building === building &&
            (building === "Outside" || building === "Canteen"
              ? scene.map
              : scene.buildingMap),
        );

  const centeredPin =
    building === "Outside" || building === "Canteen"
      ? centerScene?.map
      : centerScene?.buildingMap;

  const { viewportRef, contentRef, contentStyle, view, dragged, bind, zoomBy } =
    usePanZoom({
      zoomOutLimit: 1,
      zoomInLimit: 8,
      startZoom: building === "Outside" || building === "Canteen" ? 2 : 1.5,
      panLimit: "to-center",
      centeredPin,
      savedCenter,
      centerKey,
    });

  return (
    <div className={`minimap ${isExpanded ? "expanded" : ""}`}>
      <div className="minimap-inner">
        <div ref={viewportRef} className="minimap-viewport" {...bind}>
          <div
            ref={contentRef}
            className="minimap-content"
            style={contentStyle}
            onClick={(e) => {
              if (!e.altKey) return;

              const rect = e.currentTarget.getBoundingClientRect();

              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;

              console.log(
                `buildingMap: { x: ${x.toFixed(1)}, y: ${y.toFixed(1)} },`,
              );
            }}
          >
            <img
              src={mapSrc}
              alt={`Campus map, floor ${floor}`}
              draggable={false}
            />

            <MapPins
              scenes={scenes}
              activeId={startingSceneID}
              floor={floor}
              building={building}
              zoom={view.zoom}
              dragged={dragged}
              onPinClick={onPinClick}
              showLabels={false}
              devMode={devMode}
            />
          </div>
        </div>

        <button
          className="minimap-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "−" : "⤢"}
        </button>

        <div className="minimap-zoom">
          <button onClick={() => zoomBy(1.4)}>+</button>
          <button onClick={() => zoomBy(1 / 1.4)}>−</button>
        </div>

        <div className="minimap-floor-controls">
          <FloorControls
            floors={availableFloors}
            currentFloor={floor}
            onChange={(nextFloor) => {
              savedPositions.current[centerKey] = {
                centerX: view.centerX,
                centerY: view.centerY,
              };

              onFloorChange(nextFloor);
            }}
          />
        </div>
      </div>
    </div>
  );
}
