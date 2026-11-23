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
    description: "",
    panorama: "/panoramas/SR4/Floor1/B4-GF-LRC-NAV01.jpg",
    pitch: 0,
    yaw: 0,
    floor: 1,
    map: { x: 87.6, y: 26.3 },
    hotSpots: [
      {
        type: "scene",
        text: "Move",
        cssClass: "hotspot-pin move",
        pitch: -8,
        yaw: -145.5,
        sceneId: "S42",
        targetPitch: -1,
        targetYaw: -145,
      },
      {
        type: "scene",
        text: "Exit Library",
        cssClass: "hotspot-pin door",
        pitch: -3.5,
        yaw: 63.6,
        sceneId: "S43",
        targetPitch: 1.5,
        targetYaw: -266,
      },
      {
        type: "scene",
        text: "Exit Library/SR4",
        cssClass: "hotspot-pin door",
        pitch: -2,
        yaw: -94.5,
        sceneId: "S42",
        targetPitch: -1,
        targetYaw: -145,
      },
    ],
  },

  "S42": {
    title: "S42",
    description: "",
    panorama: "/panoramas/SR4/Floor1/B4-GF-LRC-NAV02.jpg",
    pitch: 0,
    yaw: 0,
    floor: 1,
    map: { x: 92.8, y: 27.9 },
    hotSpots: [
      {
        type: "scene",
        text: "Move",
        cssClass: "hotspot-pin move",
        pitch: -12,
        yaw: 31.7,
        sceneId: "S41",
        targetPitch: 0,
        targetYaw: 0,
      },
      {
        type: "scene",
        text: "Exit Library",
        cssClass: "hotspot-pin door",
        pitch: -2,
        yaw: 43,
        sceneId: "S43",
        targetPitch: 1.5,
        targetYaw: -266,
      },
      {
        type: "scene",
        text: "Exit Library/SR4",
        cssClass: "hotspot-pin door",
        pitch: -1,
        yaw: -49,
        sceneId: "S41",
        targetPitch: 0,
        targetYaw: 0,
      },
    ],
  },

  "S43": {
    title: "S43",
    description: "",
    panorama: "/panoramas/SR4/Floor1/B4-GF-NAV01.jpg",
    pitch: 0,
    yaw: 0,
    floor: 1,
    map: { x: 86.7, y: 22.3 },
    hotSpots: [
      {
        type: "scene",
        text: "Enter Library",
        cssClass: "hotspot-pin door",
        pitch: -2,
        yaw: -88.7,
        sceneId: "S41",
        targetPitch: -2,
        targetYaw: -86.5,
      },
      {
        type: "scene",
        text: "Exit SR4",
        cssClass: "hotspot-pin door",
        pitch: -2.5,
        yaw: 36,
        sceneId: "AAAA",
        targetPitch: 0,
        targetYaw: 0,
      },
      {
        type: "scene",
        text: "Exit SR4",
        cssClass: "hotspot-pin door",
        pitch: -5,
        yaw: -39,
        sceneId: "AAAA",
        targetPitch: 0,
        targetYaw: 0,
      },
    ],
  },

  // Floor 2
  // Floor 3
  // Floor 4
  // Floor 5
};

export default scenes;
