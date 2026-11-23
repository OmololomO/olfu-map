import usePanZoom from "../utils/usePanZoom";
import MapPins from "./MapPins";
import "./MapViewer.css";

const MAP_SRC = "/maps/olfu_map.svg";

export default function MapViewer({ scenes, focusId, onPinClick }) {
  const { viewportRef, contentRef, contentStyle, view, dragged, bind, zoomBy } = usePanZoom({
    zoomOutLimit: 0.5,   // furthest you can zoom out (smaller = more zoomed out)
    zoomInLimit: 30,      // closest you can zoom in
    startZoom: 1,        // how zoomed in it starts
    panLimit: "to-center", // you can drag any edge or corner of the map to the middle
    centeredPin: scenes[focusId]?.map, // open centered on the current scene's pin
  });

  return (
    <div className="map-viewer">
      <div ref={viewportRef} className="map-viewport" {...bind}>
        <div ref={contentRef} className="map-content" style={contentStyle}>
          <img
            src={MAP_SRC}
            alt="Campus map"
            draggable={false}
            // Helps in knowing the x and y coordinates of the click on the map for finding pin locations
            onClick={(e) => {
              if (!e.altKey) return; // only when Alt is held, so normal clicks are unaffected
              const x = (e.nativeEvent.offsetX / e.target.clientWidth) * 100;
              const y = (e.nativeEvent.offsetY / e.target.clientHeight) * 100;
              console.log(`map: { x: ${x.toFixed(1)}, y: ${y.toFixed(1)} },`);
            }}
          />
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
