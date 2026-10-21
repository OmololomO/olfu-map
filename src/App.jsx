import { useState } from "react";
import PanoViewer from "./components/PanoViewer";

function App() {
  const [sceneId, setSceneId] = useState("gate");

  return (
    <div className="container-fluid">
      <h1 className="my-3">OLFU Campus Tour</h1>
      <PanoViewer sceneId={sceneId} onSceneChange={setSceneId} />
    </div>
  );
}

export default App;