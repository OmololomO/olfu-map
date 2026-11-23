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
  "S41": {
    title: "S41",
    panorama: "/panoramas/SR4/Floor1/B4-GF-LRC-NAV01.jpg",
    description: "", 
    map: { x: 87.6, y: 26.3 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -8,
        yaw: -145.5,
        type: "scene",
        text: "Move",
        sceneId: "S42",
        targetYaw: -145,
        targetPitch: -1,
        cssClass: "custom-pin move",
      },
      {
        pitch: -3.5,
        yaw: 63.6,
        type: "scene",
        text: "Exit Library",
        sceneId: "S43",
        targetYaw: -266,
        targetPitch: 1.5,
        cssClass: "custom-pin door",
      },
      {
        pitch: -2,
        yaw: -94.5,
        type: "scene",
        text: "Exit Library/SR4",
        sceneId: "S42",
        targetYaw: -145,
        targetPitch: -1,
        cssClass: "custom-pin door",
      },
    ],
  },

  "S42": {
    title: "S42",
    panorama: "/panoramas/SR4/Floor1/B4-GF-LRC-NAV02.jpg",
    description: "", 
    map: { x: 92.8, y: 27.9 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -12,
        yaw: 31.7,
        type: "scene",
        text: "Move",
        sceneId: "S41",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
      {
        pitch: -2,
        yaw: 43,
        type: "scene",
        text: "Exit Library",
        sceneId: "S43",
        targetYaw: -266,
        targetPitch: 1.5,
        cssClass: "custom-pin door",
      },
      {
        pitch: -1,
        yaw: -49,
        type: "scene",
        text: "Exit Library/SR4",
        sceneId: "S41",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin door",
      },
    ],
  },

  "S43": {
    title: "S43",
    panorama: "/panoramas/SR4/Floor1/B4-GF-NAV01.jpg",
    description: "", 
    map: { x: 86.7, y: 22.3 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -2,
        yaw: -88.7,
        type: "scene",
        text: "Enter Library",
        sceneId: "S41",
        targetYaw: -86.5,
        targetPitch: -2,
        cssClass: "custom-pin door",
      },
      {
        pitch: -2.5,
        yaw: 36,
        type: "scene",
        text: "Exit SR4",
        sceneId: "AAAA",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin door",
      },
      {
        pitch: -5,
        yaw: -39,
        type: "scene",
        text: "Exit SR4",
        sceneId: "AAAA",
        targetYaw: 0,
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
