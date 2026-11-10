import usePanZoom from "./usePanZoom";
import MapPins from "./MapPins";
import "./MapViewer.css";

const MAP_SRC = "/maps/olfu_map.svg";

export default function MapViewer({ scenes, focusId, onPinClick }) {
  const { viewportRef, contentRef, contentStyle, view, dragged, bind, zoomBy } = usePanZoom({
    zoomOutLimit: 0.5,   // furthest you can zoom out (smaller = more zoomed out)
    zoomInLimit: 8,      // closest you can zoom in
    startZoom: 1,        // how zoomed in it starts
    panLimit: "to-center", // you can drag any edge or corner of the map to the middle
    centeredPin: scenes[focusId]?.map, // open centered on the current scene's pin
  });

  return (
    <div className="map-viewer">
      <div ref={viewportRef} className="map-viewport" {...bind}>
        <div ref={contentRef} className="map-content" style={contentStyle}>
          <img src={MAP_SRC} alt="Campus map" draggable={false} />
          <MapPins
            scenes={scenes}
            zoom={view.zoom}
            dragged={dragged}
            onPinClick={onPinClick}
            showLabels
          />
        </div>
      </div>

      <div className="map-zoom">
        <button onClick={() => zoomBy(1.4)}>+</button>
        <button onClick={() => zoomBy(1 / 1.4)}>−</button>
      </div>
    </div>
  );
}
