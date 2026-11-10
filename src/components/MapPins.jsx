import "./MapPins.css";

export default function MapPins({
  scenes,
  activeId,
  zoom,
  dragged,
  onPinClick,
  showLabels = false,
}) {
  return Object.entries(scenes).map(([id, s]) =>
    s.map ? (
      <button
        key={id}
        className={`pin ${id === activeId ? "active" : ""}`}
        style={{
          left: `${s.map.x}%`,
          top: `${s.map.y}%`,
          // cancel the map's zoom so pins keep their size
          transform: `translate(-50%, -50%) scale(${1 / zoom})`,
        }}
        title={s.title}
        onClick={() => {
          if (!dragged.current) onPinClick(id); // ignore the click that ends a drag
        }}
      >
        {showLabels && <span className="pin-label">{s.title}</span>}
      </button>
    ) : null
  );
}
