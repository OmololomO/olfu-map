import Outside_scenes from "./scenes/Outside_scenes";
import SR1_scenes from "./scenes/SR1_scenes";
import sr2Scenes from "./scenes/sr2/sr2-scenes";
import SR3_scenes from "./scenes/SR3_scenes";
import SR4_scenes from "./scenes/SR4_scenes";
import SR5_scenes from "./scenes/SR5_scenes";
import Canteen_scenes from "./scenes/Canteen_scenes";

const scenes = { 
    ...SR1_scenes, 
    ...sr2Scenes, 
    ...SR3_scenes, 
    ...SR4_scenes, 
    ...SR5_scenes, 
    ...Canteen_scenes, 
    ...Outside_scenes 
};
export default scenes;