import "../pins.css";


const scenes = {
  // gate: {                               // ID
  //   title: "Main Gate",                 // Name of place
  //   panorama: "/panoramas/test.jpg",    // Image path
  //   description: "",                    // Description of place
  //   map: { x: 10, y: 25 },              // Pin Position On The Map 
  //   hotSpots: [                         // Buttons That Go To Other Panoramas
  //     {
  //       pitch: -5,                      // y-axis (up/down)
  //       yaw: 90,                        // x-axis (left/right)
  //       type: "scene",                  
  //       text: "Go to Path",             // Text To Show On Button Focused
  //       sceneId: "path",                // Panorama To Go To
  //     },
  //   ],
  // },

  // Floor 1
  "S1A": {
    title: "S1A",
    panorama: "panoramas/SR1/Floor1/OUTSIDE_MAINPATHWAY_NAV04.jpg",
    description: "", 
    map: { x: 59.3, y: 89.9 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: 0,
        yaw: 356,
        type: "scene",
        text: "Exit SR1",
        sceneId: "S1D",
        targetYaw: 180,
        targetPitch: 3,
        cssClass: "custom-pin door",
      },
      {
        pitch: -5,
        yaw: 179,
        type: "scene",
        text: "Move",
        sceneId: "S1B",
        targetYaw: 187,
        targetPitch: 4,
        cssClass: "custom-pin move",
      },
    ],
  },

  "S1B": {
    title: "S1B",
    panorama: "panoramas/SR1/Floor1/OUTSIDE_MAINPATHWAY_NAV05.jpg",
    description: "", 
    map: { x: 60.1, y: 79.9 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -0.5,
        yaw: 1.5,
        type: "scene",
        text: "Move",
        sceneId: "S1A",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
      {
        pitch: -3,
        yaw: -84,
        type: "scene",
        text: "Move",
        sceneId: "S1C",
        targetYaw: 185,
        targetPitch: 1,
        cssClass: "custom-pin move",
      },
      {
        pitch: 3,
        yaw: 91,
        type: "scene",
        text: "Exit SR1",
        sceneId: "S1C",
        targetYaw: 185,
        targetPitch: 1,
        cssClass: "custom-pin door",
      },
    ],
  },

  "S1C": {
    title: "S1C",
    panorama: "panoramas/SR1/Floor1/OUTSIDE_MAINPATHWAY_NAV06.jpg",
    description: "", 
    map: { x: 70.3, y: 79.9 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -4,
        yaw: 0,
        type: "scene",
        text: "Move",
        sceneId: "S1B",
        targetYaw: 91,
        targetPitch: 2,
        cssClass: "custom-pin move",
      },
      {
        pitch: 1,
        yaw: -87,
        type: "scene",
        text: "Exit SR1",
        sceneId: "AAAA",
        targetYaw: 91,
        targetPitch: 2,
        cssClass: "custom-pin door",
      },
      {
        pitch: 1,
        yaw: 89.6,
        type: "scene",
        text: "Exit SR1",
        sceneId: "AAAA",
        targetYaw: 91,
        targetPitch: 2,
        cssClass: "custom-pin door",
      },
    ],
  },


  // Floor 2
  // Floor 3
  // Floor 4
  // Floor 5
};

export default scenes;
