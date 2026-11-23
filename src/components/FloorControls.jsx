import { useEffect, useRef, useState } from "react";
import "./FloorControls.css";

export default function FloorControls({ floors, currentFloor, onChange}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  // While open, close on a press outside of it, or on the Escape key
  useEffect(() => {
    if (!isOpen) return;

    function closeIfOutside(e) {
      if (!rootRef.current?.contains(e.target)) setIsOpen(false);
    }

    function closeOnEscape(e) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={`floor-controls`}>
      {isOpen && (
        <ul className="floor-menu">
          {[...floors].reverse().map((floor) => (
            <li key={floor}>
              <button
                className={`floor-option ${floor === currentFloor ? "active" : ""}`}
                onClick={() => {
                  onChange(floor);
                  setIsOpen(false);
                }}
              >
                Floor {floor}
              </button>
            </li>
          ))}
        </ul>
      )}

      <button className="floor-toggle" onClick={() => setIsOpen(!isOpen)}>
        Floor {currentFloor} <span>{isOpen ? "▾" : "▴"}</span>
      </button>
    </div>
  );
}