// Gives every info hotspot a click handler, without touching scenes.js.
// Pannellum calls clickHandlerFunc when an info hotspot is clicked.
// onInfoClick receives { sceneId, title, description }.
export default function withInfoHandlers(scenes, onInfoClick) {
  const result = {};

  for (const [sceneId, scene] of Object.entries(scenes)) {
    result[sceneId] = {
      ...scene,
      hotSpots: scene.hotSpots?.map((hotspot) =>
        hotspot.type === "info"
          ? {
              ...hotspot,
              clickHandlerFunc: () =>
                onInfoClick({
                  sceneId,
                  title: hotspot.text,
                  description: hotspot.description,
                }),
            }
          : hotspot
      ),
    };
  }

  return result;
}
