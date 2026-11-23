import { useEffect, useRef } from "react";
import scenes from "../data/scenes";
import "./PanoViewer.css";
import withInfoHandlers from "../utils/withInfoHandlers";


export default function PanoViewer({ sceneId, onSceneChange, onInfoClick }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const infoClickRef = useRef(onInfoClick);
  
  useEffect(() => {
    infoClickRef.current = onInfoClick;
  });

  // Runs once when the component is created
  useEffect(() => {
    let viewer;

    // The viewer is created in a timer that the cleanup can cancel. React runs this effect,
    // cleans it up, and runs it again in development, and without the timer the first
    // viewer would be destroyed while its image was still loading (the removeChild error).
    const timer = setTimeout(() => {
      viewer = window.pannellum.viewer(containerRef.current, {
        default: {
          type: "equirectangular",
          firstScene: sceneId,
          sceneFadeDuration: 800,
          autoLoad: true,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          hotSpotDebug: true,
        },
        scenes: withInfoHandlers(scenes, (info) => infoClickRef.current(info)),
      });
      viewer.on("scenechange", onSceneChange);
      viewer.on("error", (msg) => console.error("Pannellum error:", msg));
      viewerRef.current = viewer;
    }, 0);

    return () => {
      clearTimeout(timer);
      viewerRef.current = null;
      viewer?.destroy();
    };
  }, []);

  // Runs everytime sceneId changes
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