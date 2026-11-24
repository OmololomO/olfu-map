import outsideScenes from "./scenes/outside-scenes";
import sr1Scenes from "./scenes/sr1/sr1-scenes";
import sr2Scenes from "./scenes/sr2/sr2-scenes";
import sr3Scenes from "./scenes/sr3/sr3-scenes";
import sr4Scenes from "./scenes/sr4/sr4-scenes";
import sr5Scenes from "./scenes/sr5/sr5-scenes";
import canteenScenes from "./scenes/canteen-scenes";

const scenes = { 
    ...sr1Scenes, 
    ...sr2Scenes, 
    ...sr3Scenes, 
    ...sr4Scenes, 
    ...sr5Scenes, 
    ...canteenScenes, 
    ...outsideScenes,
};
export default scenes;