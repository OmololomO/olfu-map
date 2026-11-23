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
    description: "",
    panorama: "panoramas/SR1/Floor1/OUTSIDE_MAINPATHWAY_NAV04.jpg",
    pitch: 0,
    yaw: 0,
    floor: 1,
    map: { x: 59.3, y: 89.9 },
    hotSpots: [
      {
        type: "scene",
        text: "Exit SR1",
        cssClass: "custom-pin door",
        pitch: 0,
        yaw: 356,
        sceneId: "S1D",
        targetPitch: 3,
        targetYaw: 180,
      },
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -5,
        yaw: 179,
        sceneId: "S1B",
        targetPitch: 4,
        targetYaw: 187,
      },
    ],
  },

  "S1B": {
    title: "S1B",
    description: "",
    panorama: "panoramas/SR1/Floor1/OUTSIDE_MAINPATHWAY_NAV05.jpg",
    pitch: 0,
    yaw: 0,
    floor: 1,
    map: { x: 60.1, y: 79.9 },
    hotSpots: [
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -0.5,
        yaw: 1.5,
        sceneId: "S1A",
        targetPitch: 0,
        targetYaw: 0,
      },
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -3,
        yaw: -84,
        sceneId: "S1C",
        targetPitch: 1,
        targetYaw: 185,
      },
      {
        type: "scene",
        text: "Exit SR1",
        cssClass: "custom-pin door",
        pitch: 3,
        yaw: 91,
        sceneId: "S1C",
        targetPitch: 1,
        targetYaw: 185,
      },
    ],
  },

  "S1C": {
    title: "S1C",
    description: "",
    panorama: "panoramas/SR1/Floor1/OUTSIDE_MAINPATHWAY_NAV06.jpg",
    pitch: 0,
    yaw: 0,
    floor: 1,
    map: { x: 70.3, y: 79.9 },
    hotSpots: [
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -4,
        yaw: 0,
        sceneId: "S1B",
        targetPitch: 2,
        targetYaw: 91,
      },
      {
        type: "scene",
        text: "Exit SR1",
        cssClass: "custom-pin door",
        pitch: 1,
        yaw: -87,
        sceneId: "AAAA",
        targetPitch: 2,
        targetYaw: 91,
      },
      {
        type: "scene",
        text: "Exit SR1",
        cssClass: "custom-pin door",
        pitch: 1,
        yaw: 89.6,
        sceneId: "AAAA",
        targetPitch: 2,
        targetYaw: 91,
      },
    ],
  },

  // Floor 2
  // Floor 3
  // Floor 4
  // Floor 5
};

export default scenes;
