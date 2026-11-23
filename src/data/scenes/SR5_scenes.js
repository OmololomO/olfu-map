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
  "S51": {
    title: "S51",
    panorama: "/panoramas/SR5/Floor1/B5-GF-NAV01.jpg",
    description: "", 
    map: { x: 65, y: 8.9 },
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: -2,
        yaw: -4.5,
        type: "scene",
        text: "Exit SR5",
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
