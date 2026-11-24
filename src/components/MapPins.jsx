import "./MapPins.css";

export default function MapPins({
  scenes,
  activeId,
  floor,
  building,
  zoom,
  dragged,
  onPinClick,
  showLabels = false,
}) {
  return Object.entries(scenes).map(([id, s]) => {
    if (!s.map || s.floor !== floor) {
      return null;
    }

    // Inside a building: show only that building's pins
    if (
      building !== "Outside" &&
      building !== "Canteen" &&
      s.building !== building
    ) {
      return null;
    }
    const pinPosition =
      building === "Outside" || building === "Canteen" ? s.map : s.buildingMap;

    if (!pinPosition) return null;

    // Trim whitespace so strings like "   " also count as empty
    const cleanTitle = s.title?.trim();

    return (
      <button
        key={id}
        className={`pin ${id === activeId ? "active" : ""}`}
        style={{
          left: `${pinPosition.x}%`,
          top: `${pinPosition.y}%`,
          // cancel the map's zoom so pins keep their size
          transform: `translate(-50%, -50%) scale(${1 / zoom})`,
        }}
        title={cleanTitle || undefined}
        onClick={() => {
          if (!dragged.current) onPinClick(id); // ignore the click that ends a drag
        }}
      >
        {showLabels && cleanTitle && (
          <span className="pin-label">{cleanTitle}</span>
        )}
      </button>
    );
  });
}
