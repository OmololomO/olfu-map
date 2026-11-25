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
  devMode = false,
}) {
  const entries = Object.entries(scenes);

  return entries.map(([id, s]) => {
    if (s.floor !== floor) return null;

    // Show only the selected building's scenes
    if (
      building !== "Outside" &&
      building !== "Canteen" &&
      s.building !== building
    ) {
      return null;
    }

    // Use the correct position for the current map
    const pinPosition =
      building === "Outside" || building === "Canteen" ? s.map : s.buildingMap;

    if (!pinPosition) return null;

    const cleanTitle = s.title?.trim();

    // DEVELOPER MODE: Show every scene as a blue pin with its ID
    if (devMode) {
      return (
        <button
          key={id}
          type="button"
          className="pin dev-pin"
          style={{
            left: `${pinPosition.x}%`,
            top: `${pinPosition.y}%`,
            transform: `translate(-50%, -50%) scale(${1 / zoom})`,
          }}
          title={id}
          onClick={() => {
            if (!dragged.current) onPinClick(id);
          }}
        >
          <span className="dev-pin-label">{id}</span>
        </button>
      );
    }

    // NORMAL MODE: Navigation pins show no name
    if (s.sceneType === "navigation") {
      return (
        <button
          key={id}
          type="button"
          className={`pin ${id === activeId ? "active" : ""}`}
          style={{
            left: `${pinPosition.x}%`,
            top: `${pinPosition.y}%`,
            transform: `translate(-50%, -50%) scale(${1 / zoom})`,
          }}
          onClick={() => {
            if (!dragged.current) onPinClick(id);
          }}
        />
      );
    }

    // Only facilities and rooms get location markers in normal mode
    if (!["facility", "room"].includes(s.sceneType)) {
      return null;
    }

    // Prevent duplicate facility markers
    if (s.sceneType === "facility") {
      const firstFacility = entries.find(([otherId, other]) => {
        const sameFacility =
          other.sceneType === "facility" &&
          other.floor === s.floor &&
          other.building === s.building &&
          other.title?.trim().toLowerCase() === cleanTitle?.toLowerCase();

        const hasPosition =
          building === "Outside" || building === "Canteen"
            ? other.map
            : other.buildingMap;

        return sameFacility && hasPosition;
      });

      if (firstFacility?.[0] !== id) return null;
    }

    const markerClass =
      s.sceneType === "facility" ? "facility-marker" : "room-marker";

    return (
      <button
        key={id}
        type="button"
        className={`location-marker ${markerClass}`}
        style={{
          left: `${pinPosition.x}%`,
          top: `${pinPosition.y}%`,
          transform: `translate(-50%, -50%) scale(${1 / zoom})`,
        }}
        title={cleanTitle || undefined}
        onClick={() => {
          if (!dragged.current) onPinClick(id);
        }}
      >
        <span className="location-icon">
          {s.sceneType === "facility" ? (
            <svg
              viewBox="0 0 24 24"
              width="23"
              height="23"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21h18M5 21V7l7-4 7 4v14" />
              <path d="M9 21v-7h6v7M9 9h.01M15 9h.01" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="23"
              height="23"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 21h14M7 21V3h10v18" />
              <path d="M14 12h.01" />
            </svg>
          )}
        </span>

        {zoom >= 1.5 && (
          <span className="location-label">
            <span className="location-name">{cleanTitle || id}</span>

            {s.description?.trim() && (
              <span className="location-description">{s.description}</span>
            )}
          </span>
        )}
      </button>
    );
  });
}
