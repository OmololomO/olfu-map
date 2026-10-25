import { useState } from "react";
import PanoViewer from "./components/PanoViewer";
import InfoCard from "./components/InfoCard";
import MiniMap from "./components/MiniMap";
import scenes from "./data/scenes";
import "./App.css";

function App() {
  const [sceneId, setSceneId] = useState("gate");

  return (
    <div className="d-flex flex-column vh-100">
      <header className="app-nav d-flex align-items-center justify-content-between px-3">
        <div className="d-flex align-items-center gap-2">
          <img src="/website_logo.png" alt="" height="32" />
          <span className="brand fs-5">OLFU MAP</span>
        </div>
      </header>

      <main className="stage">
        <div className="pano">
          <PanoViewer sceneId={sceneId} onSceneChange={setSceneId} />
        </div>
        <InfoCard scene={scenes[sceneId]} />
        <MiniMap scenes={scenes} activeId={sceneId} onPinClick={setSceneId} />
      </main>
    </div>
  );
}

export default App;
