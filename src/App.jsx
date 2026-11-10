import { useState } from "react";
import PanoViewer from "./components/PanoViewer";
import MapViewer from "./components/MapViewer";
import InfoCard from "./components/InfoCard";
import MiniMap from "./components/MiniMap";
import scenes from "./data/scenes";
import "./App.css";
import { ButtonGroup, Button } from "react-bootstrap";

function App() {
  const [sceneId, setSceneId] = useState("gate");
  const [view, setView] = useState("map"); // "tour" or "map"


  function goToScene(id) {
    setSceneId(id);
    setView("tour");
  }
  return (
    <div className="d-flex flex-column vh-100">
      {/* Navigation Bar */}
      <header className="app-nav d-flex align-items-center justify-content-between px-3">
        {/* Website Logo & Name */}
        <div className="d-flex align-items-center gap-2">
          <img src="/website_logo.png" alt="" height="32" />
          <span className="brand fs-5">OLFU MAP</span>
        </div>

        {/* Tour/Map Buttons */}
        <ButtonGroup size="sm">
          <Button variant={view === "map" ? "light" : "outline-light"} onClick={() => setView("map")}>
            Map
          </Button>
          <Button variant={view === "tour" ? "light" : "outline-light"} onClick={() => setView("tour")}>
            Tour
          </Button>
        </ButtonGroup>
      </header>


      {/* Main Content(Tour/Map) */}
      <main className="stage">
        {view === "tour" ? (
          <>
            <div className="pano">
              <PanoViewer sceneId={sceneId} onSceneChange={setSceneId} />
            </div>
            <InfoCard scene={scenes[sceneId]} />
            <MiniMap scenes={scenes} activeId={sceneId} onPinClick={setSceneId} />
          </>
        ) : (
          <MapViewer scenes={scenes} focusId={sceneId} onPinClick={goToScene} />
        )}
      </main>
    </div>
  );
}

export default App;
