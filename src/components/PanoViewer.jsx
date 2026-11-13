import { useEffect, useRef } from "react";
import scenes from "../data/scenes";
import "./PanoViewer.css";


export default function PanoViewer({ sceneId, onSceneChange }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = window.pannellum.viewer(containerRef.current, {
      default: {
        firstScene: sceneId,
        sceneFadeDuration: 800,
        autoLoad: true,
        showZoomCtrl: false,
        showFullscreenCtrl: false,
        hotSpotDebug: true,
      },
      scenes,
    });
    viewer.on("scenechange", onSceneChange);
    viewer.on("error", (msg) => console.error("Pannellum error:", msg));
    viewerRef.current = viewer;
    return () => viewer.destroy();  
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (viewer && viewer.getScene() !== sceneId) {
      viewer.loadScene(sceneId);
    }
  }, [sceneId]);

  function zoomBy(delta) {
    const viewer = viewerRef.current;
    if (viewer) viewer.setHfov(viewer.getHfov() + delta, 300);
  }


  return (
    <div className="pano-viewer">
      <div className="pano-zoom">
        <button onClick={() => zoomBy(-15)}>+</button>
        <button onClick={() => zoomBy(15)}>−</button>
      </div>
      
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );

}