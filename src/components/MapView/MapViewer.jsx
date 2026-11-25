import usePanZoom from "../../utils/usePanZoom";
import MapPins from "../MapPins/MapPins";
import "./MapViewer.css";
import FloorControls from "../FloorControls/FloorControls";
import { FLOORS, FLOOR_MAPS, BUILDING_MAPS } from "../../data/floors";

export default function MapViewer({
  scenes,
  floor,
  building,
  onFloorChange,
  startingSceneID,
  onPinClick,
  devMode,
  mapSrc = FLOOR_MAPS[floor],
}) {
  const { viewportRef, contentRef, contentStyle, view, dragged, bind, zoomBy } =
    usePanZoom({
      zoomOutLimit: 0.5,
      zoomInLimit: 30,
      startZoom: 1,
      panLimit: "to-center",
      centeredPin: scenes[startingSceneID]?.map,
    });

  const availableFloors = BUILDING_MAPS[building]
    ? Object.keys(BUILDING_MAPS[building]).map(Number)
    : FLOORS;

  return (
    <div className="map-viewer">
      <div ref={viewportRef} className="map-viewport" {...bind}>
        <div ref={contentRef} className="map-content" style={contentStyle}>
          <img
            src={mapSrc}
            alt={`Campus map, floor ${floor}`}
            draggable={false}
            onClick={(e) => {
              if (!e.altKey) return;

              const x = (e.nativeEvent.offsetX / e.target.clientWidth) * 100;

              const y = (e.nativeEvent.offsetY / e.target.clientHeight) * 100;

              console.log(`map: { x: ${x.toFixed(1)}, y: ${y.toFixed(1)} },`);
            }}
          />

          <MapPins
            scenes={scenes}
            floor={floor}
            building={building}
            zoom={view.zoom}
            dragged={dragged}
            onPinClick={onPinClick}
            showLabels
            devMode={devMode}
          />
        </div>
      </div>

      <div className="map-zoom">
        <button onClick={() => zoomBy(1.4)}>+</button>
        <button onClick={() => zoomBy(1 / 1.4)}>−</button>
      </div>

      <div className="map-floor-controls">
        <FloorControls
          floors={availableFloors}
          currentFloor={floor}
          onChange={onFloorChange}
        />
      </div>
    </div>
  );
}
