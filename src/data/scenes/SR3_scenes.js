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
  "B3-GF-AUDI": {
    title: "B3-GF-AUDI",
    panorama: "/panoramas/SR3/Floor1/B3-GF-AUDI.jpg",
    description: "", 
    map: { x: 72.8, y: 39.6 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: 1,
        yaw: 163,
        type: "scene",
        text: "Exit Auditorium",
        sceneId: "S31",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin door",
      },
    ],
  },

  "S31": {
    title: "S31",
    panorama: "/panoramas/SR3/Floor1/S31.jpg",
    description: "", 
    map: { x: 62.8, y: 44.2 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: 1.5,
        yaw: 61,
        type: "scene",
        text: "Enter Auditorium",
        sceneId: "B3-GF-AUDI",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin door",
      },
      {
        pitch: 0.5,
        yaw: 352,
        type: "scene",
        text: "Exit SR3",
        sceneId: "C",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin door",
      },
      {
        pitch: -11,
        yaw: 146,
        type: "scene",
        text: "Move",
        sceneId: "S32",
        targetYaw: -163,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "S32": {
    title: "S32",
    panorama: "/panoramas/SR3/Floor1/S32.jpg",
    description: "", 
    map: { x: 66.8, y: 42.75 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -14,
        yaw: -163,
        type: "scene",
        text: "Move",
        sceneId: "S33",
        targetYaw: 179,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
      {
        pitch: -13,
        yaw: -18,
        type: "scene",
        text: "Move",
        sceneId: "S31",
        targetYaw: 326.5,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "S33": {
    title: "S33",
    panorama: "/panoramas/SR3/Floor1/S33.jpg",
    description: "", 
    map: { x: 71, y: 42.75 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -11,
        yaw: -179,
        type: "scene",
        text: "Move",
        sceneId: "S34",
        targetYaw: 182,
        targetPitch: -3,
        cssClass: "custom-pin move",
      },
      {
        pitch: -11,
        yaw: 356.5,
        type: "scene",
        text: "Move",
        sceneId: "S32",
        targetYaw: 15,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "S34": {
    title: "S34",
    panorama: "/panoramas/SR3/Floor1/S34.jpg",
    description: "", 
    map: { x: 75.7, y: 42.75 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -23,
        yaw: -178.5,
        type: "scene",
        text: "Move",
        sceneId: "S35",
        targetYaw: -171,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
      {
        pitch: -13.5,
        yaw: -0.5,
        type: "scene",
        text: "Move",
        sceneId: "S33",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "S35": {
    title: "S35",
    panorama: "/panoramas/SR3/Floor1/S35.jpg",
    description: "", 
    map: { x: 79, y: 42.75 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -19,
        yaw: -3,
        type: "scene",
        text: "Move",
        sceneId: "S34",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
      {
        pitch: -10,
        yaw: -171,
        type: "scene",
        text: "Move",
        sceneId: "S36",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "S36": {
    title: "S36",
    panorama: "/panoramas/SR3/Floor1/S36.jpg",
    description: "", 
    map: { x: 84.4, y: 42.75 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -2,
        yaw: -90.5,
        type: "scene",
        text: "Move",
        sceneId: "AAAA",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "S37": {
    title: "S37",
    panorama: "/panoramas/SR3/Floor1/S37.jpg",
    description: "", 
    map: { x: 87.5, y: 42.75 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -2,
        yaw: -90.5,
        type: "scene",
        text: "Move",
        sceneId: "AAAA",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "S38": {
    title: "S38",
    panorama: "/panoramas/SR3/Floor1/S38.jpg",
    description: "", 
    map: { x: 92.9, y: 42.75 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -2,
        yaw: -90.5,
        type: "scene",
        text: "Move",
        sceneId: "AAAA",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },

  "S39": {
    title: "S39",
    panorama: "/panoramas/SR3/Floor1/S39.jpg",
    description: "", 
    map: { x: 87.5, y: 45.2 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -2,
        yaw: -90.5,
        type: "scene",
        text: "Move",
        sceneId: "AAAA",
        targetYaw: 0,
        targetPitch: 0,
        cssClass: "custom-pin move",
      },
    ],
  },


  // Floor 2
  // Floor 3
  // Floor 4
  // Floor 5
};

export default scenes;
