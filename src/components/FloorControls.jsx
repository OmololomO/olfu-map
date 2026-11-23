import { useEffect, useRef, useState } from "react";
import "./FloorControls.css";

export default function FloorControls({ floors, currentFloor, onChange}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // While open, close on a press outside of it, or on the Escape key
  useEffect(() => {
    if (!open) return;

    function closeIfOutside(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    }

    function closeOnEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`floor-controls`}>
      {open && (
        <ul className="floor-menu">
          {[...floors].reverse().map((floor) => (
            <li key={floor}>
              <button
                className={`floor-option ${floor === currentFloor ? "active" : ""}`}
                aria-current={floor === currentFloor}
                onClick={() => {
                  onChange(floor);
                  setOpen(false);
                }}
              >
                Floor {floor}
              </button>
            </li>
          ))}
        </ul>
      )}

      <button className="floor-toggle" onClick={() => setOpen(!open)}>
        Floor {currentFloor} <span>{open ? "▾" : "▴"}</span>
      </button>
    </div>
  );
}