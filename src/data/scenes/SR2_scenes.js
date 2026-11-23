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
  "B2-F1-FAC-01": {
    title: "B2-F1-FAC-01",
    description: "",
    panorama: "/panoramas/SR2/Floor1/B2-F1-FAC-01.jpg",
    pitch: 0,
    yaw: 0,
    floor: 1,
    map: { x: 86.4, y: 52.6 },
    hotSpots: [
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -4,
        yaw: -90.5,
        sceneId: "B2-F1-FAC-06",
        targetPitch: 0,
        targetYaw: 0,
      },
      {
        type: "scene",
        text: "Exit Library",
        cssClass: "custom-pin door",
        pitch: -3,
        yaw: -184,
        sceneId: "B2-F1-NAV-01",
        targetPitch: 0,
        targetYaw: 0,
      },

      // Info Pins
      {
        type: "info",
        text: "Discussion Room 1",
        cssClass: "custom-pin info",
        pitch: -3,
        yaw: 73.2,
        description: "",
      },
      {
        type: "info",
        text: "Discussion Room 2",
        cssClass: "custom-pin info",
        pitch: -3,
        yaw: 98.3,
        description: "",
      },
    ],
  },

  "B2-F1-FAC-06": {
    title: "B2-F1-FAC-06",
    description: "",
    panorama: "/panoramas/SR2/Floor1/B2-F1-FAC-06.jpg",
    pitch: 0,
    yaw: 0,
    floor: 1,
    map: { x: 66.8, y: 52.6 },
    hotSpots: [
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -1.5,
        yaw: 178.5,
        sceneId: "B2-F1-FAC-01",
        targetPitch: 0,
        targetYaw: 87,
      },
      {
        type: "scene",
        text: "Exit Library",
        cssClass: "custom-pin door",
        pitch: -1,
        yaw: -83,
        sceneId: "B2-F1-NAV-05",
        targetPitch: 0,
        targetYaw: 88,
      },

      // Info Pins
      {
        type: "info",
        text: "Book Shelves",
        cssClass: "custom-pin info",
        pitch: -1,
        yaw: 0.6,
        description: "",
      },
    ],
  },

  "B2-F1-NAV-01": {
    title: "B2-F1-NAV-01",
    description: "",
    panorama: "/panoramas/SR2/Floor1/B2-F1-NAV-01.jpg",
    pitch: 0,
    yaw: -94,
    floor: 1,
    map: { x: 84.2, y: 56.81 },
    hotSpots: [
      {
        type: "scene",
        text: "Enter Library",
        cssClass: "custom-pin door",
        pitch: -2.5,
        yaw: -132,
        sceneId: "B2-F1-FAC-01",
        targetPitch: 0,
        targetYaw: 0,
      },
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -10.5,
        yaw: -94,
        sceneId: "B2-F1-NAV-02",
        targetPitch: 0,
        targetYaw: 0,
      },
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -6,
        yaw: -107,
        sceneId: "B2-F1-NAV-03",
        targetPitch: 0,
        targetYaw: 82,
      },
      {
        type: "scene",
        text: "Exit Building",
        cssClass: "custom-pin door",
        pitch: 0,
        yaw: 87,
        sceneId: "AAAA",
        targetPitch: 0,
        targetYaw: 82,
      },
    ],
  },

  "B2-F1-NAV-02": {
    title: "B2-F1-NAV-02",
    description: "",
    panorama: "/panoramas/SR2/Floor1/B2-F1-NAV-02.jpg",
    pitch: 0,
    yaw: 0,
    floor: 1,
    map: { x: 89.9, y: 56.81 },
    hotSpots: [
      {
        type: "scene",
        text: "Enter Library",
        cssClass: "custom-pin door",
        pitch: -2,
        yaw: 206,
        sceneId: "B2-F1-FAC-01",
        targetPitch: 0,
        targetYaw: 0,
      },
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -9,
        yaw: -182.5,
        sceneId: "B2-F1-NAV-01",
        targetPitch: 0,
        targetYaw: 86.5,
      },
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -15.5,
        yaw: -44,
        sceneId: "B2-F1-NAV-03",
        targetPitch: 0,
        targetYaw: 0,
      },
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -17,
        yaw: 85,
        sceneId: "B2-F1-NAV-04",
        targetPitch: -3,
        targetYaw: -95,
      },
      {
        type: "scene",
        text: "Move Up The Stairs",
        cssClass: "custom-pin stairs_up flip-x",
        pitch: -2,
        yaw: 60,
        sceneId: "B2-F1-NAV-04",
        targetPitch: -3,
        targetYaw: -95,
      },
    ],
  },

  "B2-F1-NAV-03": {
    title: "B2-F1-NAV-03",
    description: "",
    panorama: "/panoramas/SR2/Floor1/B2-F1-NAV-03.jpg",
    pitch: 0,
    yaw: -180,
    floor: 1,
    map: { x: 93.1, y: 55.0 },
    hotSpots: [
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -11,
        yaw: 229,
        sceneId: "B2-F1-NAV-02",
        targetPitch: 0,
        targetYaw: 176,
      },

      // Info Pins
      {
        type: "info",
        text: "Elevator",
        cssClass: "custom-pin elevator",
        pitch: 0,
        yaw: 166.5,
        description: "",
      },
    ],
  },

  "B2-F1-NAV-04": {
    title: "B2-F1-NAV-04",
    description: "",
    panorama: "/panoramas/SR2/Floor1/B2-F1-NAV-04.jpg",
    pitch: 0,
    yaw: 174,
    floor: 1,
    map: { x: 89.9, y: 59.9 },
    hotSpots: [
      {
        type: "scene",
        text: "Move",
        cssClass: "custom-pin move",
        pitch: -18,
        yaw: 87,
        sceneId: "B2-F1-NAV-02",
        targetPitch: 0,
        targetYaw: -92,
      },
      {
        type: "scene",
        text: "Go Up The Stairs",
        cssClass: "custom-pin stairs_up",
        pitch: -3,
        yaw: 128,
        sceneId: "AAAA",
        targetPitch: 0,
        targetYaw: -92,
      },
      {
        type: "scene",
        text: "Exit Building",
        cssClass: "custom-pin door",
        pitch: -3,
        yaw: 265,
        sceneId: "13",
        targetPitch: 0,
        targetYaw: -92,
      },

      // Info Pins
      {
        type: "info",
        text: "Bathroom",
        cssClass: "custom-pin bathroom",
        pitch: -3,
        yaw: -163.5,
        description: "This is the bathroom",
      },
    ],
  },

  "B2-F1-NAV-05": {
    title: "B2-F1-NAV-05",
    description: "",
    panorama: "/panoramas/SR2/Floor1/B2-F1-NAV-05.jpg",
    pitch: 0,
    yaw: 177,
    floor: 1,
    map: { x: 58.6, y: 54.9 },
    hotSpots: [
      {
        type: "scene",
        text: "Enter Library",
        cssClass: "custom-pin door",
        pitch: -0,
        yaw: -79,
        sceneId: "B2-F1-FAC-06",
        targetPitch: 0,
        targetYaw: 178,
      },
      {
        type: "scene",
        text: "Go Up The Stairs",
        cssClass: "custom-pin stairs_up",
        pitch: -0,
        yaw: 178,
        sceneId: "AAAA",
        targetPitch: 0,
        targetYaw: 178,
      },
      {
        type: "scene",
        text: "Exit The Building",
        cssClass: "custom-pin door",
        pitch: -0,
        yaw: 87.5,
        sceneId: "AAAA",
        targetPitch: 0,
        targetYaw: 178,
      },
    ],
  },

  // Floor 2
  // Floor 3
  // Floor 4
  // Floor 5
};

export default scenes;
