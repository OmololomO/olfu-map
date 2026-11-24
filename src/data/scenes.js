import outsideScenes from "./scenes/outside-scenes";
import sr1Scenes from "./scenes/sr1/sr1-scenes";
import sr2Scenes from "./scenes/sr2/sr2-scenes";
import sr3Scenes from "./scenes/sr3/sr3-scenes";
import sr4Scenes from "./scenes/sr4/sr4-scenes";
import sr5Scenes from "./scenes/sr5/sr5-scenes";
import canteenScenes from "./scenes/canteen-scenes";

// Assign building identities to each scene
function assignBuilding(scenes, building) {
  return Object.fromEntries(
    Object.entries(scenes).map(([id, scene]) => [
      id,
      {
        ...scene,
        building,
      },
    ])
  );
}

// Combine all scene registries
const scenes = {
  ...assignBuilding(sr1Scenes, "SR1"),
  ...assignBuilding(sr2Scenes, "SR2"),
  ...assignBuilding(sr3Scenes, "SR3"),
  ...assignBuilding(sr4Scenes, "SR4"),
  ...assignBuilding(sr5Scenes, "SR5"),
  ...assignBuilding(canteenScenes, "Canteen"),
  ...assignBuilding(outsideScenes, "Outside"),
};

export default scenes;
