
import Outside_scenes from "./scenes/Outside_scenes";
import SR1_scenes from "./scenes/SR1_scenes";
import SR2_scenes from "./scenes/SR2_scenes";
import SR3_scenes from "./scenes/SR3_scenes";
import SR4_scenes from "./scenes/SR4_scenes";
import SR5_scenes from "./scenes/SR5_scenes";
import Canteen_scenes from "./scenes/Canteen_scenes";

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
  ...assignBuilding(SR1_scenes, "SR1"),
  ...assignBuilding(SR2_scenes, "SR2"),
  ...assignBuilding(SR3_scenes, "SR3"),
  ...assignBuilding(SR4_scenes, "SR4"),
  ...assignBuilding(SR5_scenes, "SR5"),
  ...assignBuilding(Canteen_scenes, "Canteen"),
  ...assignBuilding(Outside_scenes, "Outside"),
};

export default scenes;
