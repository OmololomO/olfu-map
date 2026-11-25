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
  "Canteen": {
    title: "Canteen",
    description: "",
    panorama: "/panoramas/Canteen/Canteen.jpg",
    pitch: 0,
    yaw: 0,
    floor: 1,
    map: { x: 88.6, y: 84.65 },
    hotSpots: [
      {
        type: "scene",
        text: "Exit Canteen",
        cssClass: "hotspot-pin exit-door flip-x",
        pitch: 0,
        yaw: -18.5,
        sceneId: "6",
        targetPitch: 0,
        targetYaw: 0,
      },
      {
        type: "scene",
        text: "Exit Canteen",
        cssClass: "hotspot-pin exit-door",
        pitch: -0.4,
        yaw: -184,
        sceneId: "6",
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
