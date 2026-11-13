import "../pins.css";


const scenes = {
  // gate: {                               // ID
  //   title: "Main Gate",                 // Name of place
  //   type: "equirectangular",            // Type of Image(Do not Change)
  //   panorama: "/panoramas/test.jpg",    // Image path
  //   description: [                      // Description of place
  //     "The description of the place goes here."
  //   ], 
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
  "B2-F1-FAC-01": {
    title: "B2-F1-FAC-01",
    type: "equirectangular",
    panorama: "/panoramas/SR2/Floor1/B2-F1-FAC-01.jpg",
    description: [                      
      ""
    ], 
    map: { x: 86.4, y: 52.6 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -2,
        yaw: -90.5,
        type: "scene",
        text: "Move",
        sceneId: "B2-F1-FAC-06",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
      {
        pitch: -3,
        yaw: -184,
        type: "scene",
        text: "Exit Library",
        sceneId: "B2-F1-NAV-01",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin door",
      },
    ],
  },

  "B2-F1-FAC-06": {
    title: "B2-F1-FAC-06",
    type: "equirectangular",
    panorama: "/panoramas/SR2/Floor1/B2-F1-FAC-06.jpg",
    description: [                      
      ""
    ], 
    map: { x: 66.8, y: 52.6 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -0.5,
        yaw: 178.5,
        type: "scene",
        text: "Move",
        sceneId: "B2-F1-FAC-01",
        targetYaw: 87,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
      {
        pitch: -1,
        yaw: -83,
        type: "scene",
        text: "Exit Library",
        sceneId: "B2-F1-NAV-05",
        targetYaw: 88,
        targetPitch: 0,
        cssClass: "custom-pin door",
      },
    ],
  },

  "B2-F1-NAV-01": {
    title: "B2-F1-NAV-01",
    type: "equirectangular",
    panorama: "/panoramas/SR2/Floor1/B2-F1-NAV-01.jpg",
    description: [                      
      ""
    ], 
    map: { x: 84.2, y: 56.8 },
    pitch: 0,
    yaw: -94,
    hotSpots: [
      {
        pitch: -2.5,
        yaw: -132,
        type: "scene",
        text: "Enter Library",
        sceneId: "B2-F1-FAC-01",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin door",
      },
      {
        pitch: 0,
        yaw: -94,
        type: "scene",
        text: "Move",
        sceneId: "B2-F1-NAV-02",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
      {
        pitch: 0,
        yaw: -107,
        type: "scene",
        text: "Move",
        sceneId: "B2-F1-NAV-03",
        targetYaw: 82,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "B2-F1-NAV-02": {
    title: "B2-F1-NAV-02",
    type: "equirectangular",
    panorama: "/panoramas/SR2/Floor1/B2-F1-NAV-02.jpg",
    description: [                      
      ""
    ], 
    map: { x: 89.9, y: 56.8 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: 0,
        yaw: 206,
        type: "scene",
        text: "Enter Library",
        sceneId: "B2-F1-FAC-01",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin door",
      },
      {
        pitch: 0,
        yaw: -182.5,
        type: "scene",
        text: "Move",
        sceneId: "B2-F1-NAV-01",
        targetYaw: 86.5,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
      {
        pitch: 0,
        yaw: -45.5,
        type: "scene",
        text: "Move",
        sceneId: "B2-F1-NAV-03",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
      {
        pitch: -2,
        yaw: 85,
        type: "scene",
        text: "Move",
        sceneId: "B2-F1-NAV-04",
        targetYaw: -95,
        targetPitch: -3,
        cssClass: "custom-pin move",
      },
    ],
  },

  "B2-F1-NAV-03": {
    title: "B2-F1-NAV-03",
    type: "equirectangular",
    panorama: "/panoramas/SR2/Floor1/B2-F1-NAV-03.jpg",
    description: [                      
      ""
    ], 
    map: { x: 93.1, y: 55.0 },
    pitch: 0,
    yaw: -180,
    hotSpots: [
      {
        pitch: 0,
        yaw: -129,
        type: "scene",
        text: "Move",
        sceneId: "B2-F1-NAV-02",
        targetYaw: 176,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "B2-F1-NAV-04": {
    title: "B2-F1-NAV-04",
    type: "equirectangular",
    panorama: "/panoramas/SR2/Floor1/B2-F1-NAV-04.jpg",
    description: [                      
      ""
    ], 
    map: { x: 89.9, y: 59.9 },
    pitch: 0,
    yaw: 174,
    hotSpots: [
      {
        pitch: -3,
        yaw: 87,
        type: "scene",
        text: "Move",
        sceneId: "B2-F1-NAV-02",
        targetYaw: -92,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "B2-F1-NAV-05": {
    title: "B2-F1-NAV-05",
    type: "equirectangular",
    panorama: "/panoramas/SR2/Floor1/B2-F1-NAV-05.jpg",
    description: [                      
      ""
    ], 
    map: { x: 58.6, y: 54.9 }, 
    pitch: 0,
    yaw: 177,
    hotSpots: [
      {
        pitch: -0,
        yaw: -90,
        type: "scene",
        text: "Enter Library",
        sceneId: "B2-F1-FAC-06",
        targetYaw: 178,
        targetPitch: 0,
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
