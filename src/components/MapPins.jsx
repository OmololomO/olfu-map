import "./MapPins.css";

export default function MapPins({
  scenes,
  activeId,
  floor,
  zoom,
  dragged,
  onPinClick,
  showLabels = false,
}) {
  return Object.entries(scenes).map(([id, s]) => {
    if (!s.map || s.floor !== floor) return null; 

    // Trim whitespace so strings like "   " also count as empty
    const cleanTitle = s.title?.trim();

    return (
      <button
        key={id}
        className={`pin ${id === activeId ? "active" : ""}`}
        style={{
          left: `${s.map.x}%`,
          top: `${s.map.y}%`,
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
