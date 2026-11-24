import { useEffect, useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import PanoViewer from "./components/PanoViewer";
import MapViewer from "./components/MapViewer";
import InfoCard from "./components/InfoCard";
import MiniMap from "./components/MiniMap";
import scenes from "./data/scenes";
import "./App.css";
import { FLOOR_MAPS } from "./data/floors";



function App() {
  const [sceneId, setSceneId] = useState("1"); // Current Scene(Starting at Scene ID 1)
  const [view, setView] = useState("map"); // Starting View("tour" or "map")
  const [floor, setFloor] = useState(1); // Current Floor(Starting at Floor 1)
  const [selectedInfo, setSelectedInfo] = useState(null);
  const info = selectedInfo?.sceneId === sceneId ? selectedInfo : null;

  // Load Floor Maps on component startup
  useEffect(() => {
    Object.values(FLOOR_MAPS).forEach((src) => {
      new Image().src = src;
    });
  }, []);

  // Change floor when sceneId changes
  useEffect(() => {
    const sceneFloor = scenes[sceneId]?.floor;
    if (sceneFloor) setFloor(sceneFloor);
  }, [sceneId]);
  
  function goToScene(id) {
    setSceneId(id);
    setSelectedInfo(null);
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
          <Button variant={view === "map" ? "light" : "outline-light"} onClick={() => setView("map")}> Map </Button>
          <Button variant={view === "tour" ? "light" : "outline-light"} onClick={() => setView("tour")}> Tour </Button>
        </ButtonGroup>
      </header>


      {/* Main Content(Tour/Map) */}
      <main className="stage">
        {view === "tour" ? (
          <>
            <div className="pano" onPointerUp={() => setSelectedInfo(null)}>
              <PanoViewer sceneId={sceneId} onSceneChange={setSceneId} onInfoClick={setSelectedInfo} />
            </div>
            <InfoCard scene={scenes[sceneId]} info={info} />
            <MiniMap scenes={scenes} floor={floor} onFloorChange={setFloor} startingSceneID={sceneId} onPinClick={goToScene} />
          </>
        ) : (
          <MapViewer scenes={scenes} floor={floor} onFloorChange={setFloor} startingSceneID={sceneId} onPinClick={goToScene} />
        )}
      </main>
    </div>
  );
}

export default App;
