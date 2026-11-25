import { useEffect, useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import PanoViewer from "./components/PanoView/PanoViewer";
import MapViewer from "./components/MapView/MapViewer";
import InfoCard from "./components/InfoCard/InfoCard";
import MiniMap from "./components/MiniMap/MiniMap";
import SearchBar from "./components/SearchBar/SearchBar";
import scenes from "./data/scenes";
import "./App.css";
import { FLOOR_MAPS, BUILDING_MAPS } from "./data/floors";

function App() {
  const [sceneId, setSceneId] = useState("1"); // Current Scene(Starting at Scene ID 1)
  const [view, setView] = useState("map"); // Starting View("tour" or "map")
  const [floor, setFloor] = useState(1); // Current Floor(Starting at Floor 1)
  const [mapBuilding, setMapBuilding] = useState("Outside");
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [devMode, setDevMode] = useState(false);
  const info = selectedInfo?.sceneId === sceneId ? selectedInfo : null;
  // Identify the active scene's building
  const currentBuilding = scenes[sceneId]?.building;
  const activeMapBuilding = view === "map" ? mapBuilding : currentBuilding;

  // Select the appropriate floor map
  const mapSrc = BUILDING_MAPS[activeMapBuilding]?.[floor] || FLOOR_MAPS[floor];

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
          {import.meta.env.DEV && (
            <Button
              variant={devMode ? "warning" : "outline-light"}
              onClick={() => setDevMode((prev) => !prev)}
            >
              {devMode ? "Dev Mode: ON" : "Dev Mode: OFF"}
            </Button>
          )}
          <Button
            variant={view === "map" ? "light" : "outline-light"}
            onClick={() => {
              setMapBuilding("Outside");
              setView("map");
            }}
          >
            Map
          </Button>

          <Button
            variant={view === "tour" ? "light" : "outline-light"}
            onClick={() => setView("tour")}
          >
            Tour
          </Button>
        </ButtonGroup>
      </header>

      {/* Main Content(Tour/Map) */}

      <main className="stage">
        {view === "tour" ? (
          <>
            <div className="pano" onPointerUp={() => setSelectedInfo(null)}>
              <PanoViewer
                sceneId={sceneId}
                onSceneChange={setSceneId}
                onInfoClick={setSelectedInfo}
              />
            </div>

            <InfoCard scene={scenes[sceneId]} info={info} />

            <MiniMap
              scenes={scenes}
              floor={floor}
              building={currentBuilding}
              mapSrc={mapSrc}
              onFloorChange={setFloor}
              startingSceneID={sceneId}
              onPinClick={goToScene}
              devMode={devMode}
            />
          </>
        ) : (
          <MapViewer
            scenes={scenes}
            floor={floor}
            building={activeMapBuilding}
            mapSrc={mapSrc}
            onFloorChange={setFloor}
            startingSceneID={sceneId}
            onPinClick={goToScene}
            devMode={devMode}
          />
        )}

        <SearchBar scenes={scenes} onSelect={goToScene} />
      </main>
    </div>
  );
}

export default App;
