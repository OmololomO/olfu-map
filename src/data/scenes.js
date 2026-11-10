const scenes = {
  gate: {                               // ID
    title: "Main Gate",                 // Name of place
    type: "equirectangular",            // Type of Image(Do not Change)
    panorama: "/panoramas/test.jpg",    // Image path
    description: [                      // Description of place
      "The description of the place goes here."
    ], 
    map: { x: 10, y: 25 },              // Pin Position On The Map 
    hotSpots: [                         // Buttons That Go To Other Panoramas
      {
        pitch: -5,                      // x-axis
        yaw: 90,                        // y-axis
        type: "scene",                  
        text: "Go to Path",       // Text To Show On Button Focused
        sceneId: "path",                // Panorama To Go To
      },
    ],
  },

  path: {
    title: "Path",
    type: "equirectangular",
    panorama: "/panoramas/test2.jpg",
    description: [                      
      ""
    ], 
    map: { x: 10, y: 10 }, 
    hotSpots: [
      {
        pitch: -5,
        yaw: -90,
        type: "scene",
        text: "Main Gate",
        sceneId: "gate",
      },
    ],
  },
};

export default scenes;