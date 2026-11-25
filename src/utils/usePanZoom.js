import { useEffect, useRef, useState } from "react";

// Pixels you must move before a press counts as a drag (below this it is a click)
const DRAG_START_DISTANCE_PX = 4;

// How much one mouse-wheel notch zooms (1.2 = 20% per notch)
const WHEEL_ZOOM_STEP = 1.2;

// Zoom easing: how long (ms) the zoom takes to catch up with where you asked it to go.
// Bigger = slower and smoother. 0 = instant (the old jumpy behavior).
const ZOOM_SMOOTHING_MS = 100;

// Glide after letting go of a fast drag
const GLIDE_DURATION_MS = 120;       // how long it glides. Bigger = further. 0 = no glide
const MAX_GLIDE_SPEED = 3;           // fastest glide, in pixels per ms
const MIN_FLICK_SPEED = 0.15;        // drags slower than this (px per ms) don't glide
const PAUSE_BEFORE_RELEASE_MS = 50;  // holding still this long before letting go = no glide
const FLICK_MEASURE_MS = 60;         // only the last bit of the drag is used to measure speed
const STOP_GLIDE_BELOW_SPEED = 0.02; // the glide ends once it slows below this

const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

/*
  usePanZoom: mouse drag, glide, and smooth zoom for a big image (the map).

    <div ref={viewportRef} {...bind}>                      the window you look through
      <div ref={contentRef} style={contentStyle}>...</div>   the map that moves
    </div>

  Options (all optional):
    zoomOutLimit  furthest you can zoom out. 1 = the whole map width fits. Smaller = further out.
    zoomInLimit   closest you can zoom in.
    startZoom     zoom when the map first appears.
    centeredPin   { x, y } in percent: the spot to show in the middle of the window.
    panLimit      "fill-window": the map always covers the window.
                  "to-center":   any edge or corner of the map can be dragged to the middle.

  Returns:
    view          { zoom, centerX, centerY } (center is 0 to 1 from the map's top-left)
    dragged       ref: dragged.current is true if the last press was a drag, not a click
    zoomBy(n)     zoom by a factor, for buttons (1.4 = in, 1 / 1.4 = out)
    bind          event handlers for the window element
    contentStyle  style for the moving map element
*/
export default function usePanZoom({
  zoomOutLimit = 1,
  zoomInLimit = 8,
  startZoom = 1.5,
  centeredPin = null,
  savedCenter = null,
  centerKey = null,
  panLimit = "fill-window",
} = {}) {
  const viewportRef = useRef(null);
  const contentRef = useRef(null);

  const targetX = centeredPin ? centeredPin.x / 100 : 0.5;
  const targetY = centeredPin ? centeredPin.y / 100 : 0.5;

  // The view is stored as a zoom and a center point (not pixels), so it survives resizing
  const [view, setView] = useState({ zoom: startZoom, centerX: targetX, centerY: targetY });

  // Window size and map size (at zoom 1), in pixels
  const [size, setSize] = useState({ windowWidth: 0, windowHeight: 0, mapWidth: 0, mapHeight: 0 });

  // Dragging
  const lastPoint = useRef(null); // mouse position at the last move, or null when the button is up
  const pressStart = useRef({ x: 0, y: 0 });
  const dragged = useRef(false);

  // Gliding
  const glideSpeed = useRef({ x: 0, y: 0 }); // pixels per ms
  const recentMoves = useRef([]);            // recent drag positions, to measure flick speed
  const glideFrame = useRef(0);
  const lastGlideTime = useRef(0);

  // Smooth zooming
  const zoomNow = useRef(startZoom);   // the zoom being shown
  const zoomGoal = useRef(startZoom);  // the zoom it is easing toward
  const zoomPoint = useRef({ x: 0, y: 0 }); // the spot (in the window) the zoom is centered on
  const zoomFrame = useRef(0);
  const lastZoomTime = useRef(0);

  // Measure the window and map right now
  function measure() {
    const box = viewportRef.current.getBoundingClientRect();
    const map = contentRef.current;
    return {
      windowWidth: box.width,
      windowHeight: box.height,
      mapWidth: map.offsetWidth,
      mapHeight: map.offsetHeight,
      windowLeft: box.left,
      windowTop: box.top,
    };
  }

  // Apply the panLimit rule
  function limitView(v, m) {
    let { centerX, centerY } = v;
    if (panLimit === "to-center") {
      centerX = clamp(centerX, 0, 1);
      centerY = clamp(centerY, 0, 1);
    } else {
      // Half the window as a fraction of the map: the center can't get closer than this to an edge
      const halfWindowX = m.windowWidth / (2 * m.mapWidth * v.zoom);
      const halfWindowY = m.windowHeight / (2 * m.mapHeight * v.zoom);
      centerX = 2 * halfWindowX >= 1 ? 0.5 : clamp(centerX, halfWindowX, 1 - halfWindowX);
      centerY = 2 * halfWindowY >= 1 ? 0.5 : clamp(centerY, halfWindowY, 1 - halfWindowY);
    }
    return { ...v, centerX, centerY };
  }

  // Move the map by (dx, dy) pixels
  function panBy(dx, dy, m) {
    setView((v) => {
      if (!m.mapWidth || !m.mapHeight) return v;
      return limitView(
        {
          ...v,
          centerX: v.centerX - dx / (v.zoom * m.mapWidth),
          centerY: v.centerY - dy / (v.zoom * m.mapHeight),
        },
        m
      );
    });
  }

  // Set the zoom to `zoom`, keeping the spot at (pointX, pointY) fixed.
  // pointX and pointY are pixels from the window's top-left.
  function applyZoom(zoom, pointX, pointY, m) {
    setView((v) => {
      if (!m.mapWidth || !m.mapHeight) return v;
      const offsetX = pointX - m.windowWidth / 2; // distance from the window's middle
      const offsetY = pointY - m.windowHeight / 2;
      const shift = 1 / v.zoom - 1 / zoom;
      return limitView(
        {
          zoom,
          centerX: (v.centerX * m.mapWidth + offsetX * shift) / m.mapWidth,
          centerY: (v.centerY * m.mapHeight + offsetY * shift) / m.mapHeight,
        },
        m
      );
    });
  }

  /* ---------------- smooth zoom ---------------- */

  // Ask for a zoom change. The zoom eases toward it over the next few frames.
  // Several wheel notches in a row add up.
  function smoothZoom(factor, pointX, pointY) {
    zoomGoal.current = clamp(zoomGoal.current * factor, zoomOutLimit, zoomInLimit);
    zoomPoint.current = { x: pointX, y: pointY };
    if (!zoomFrame.current) {
      lastZoomTime.current = performance.now();
      zoomFrame.current = requestAnimationFrame(zoomStep);
    }
  }

  function zoomStep(now) {
    const elapsed = Math.min(now - lastZoomTime.current, 50);
    lastZoomTime.current = now;

    const goal = zoomGoal.current;
    const current = zoomNow.current;
    let next = goal;
    if (ZOOM_SMOOTHING_MS > 0) {
      // Move part of the way to the goal. Done on the zoom ratio so it feels even at any zoom.
      const portion = 1 - Math.exp(-elapsed / ZOOM_SMOOTHING_MS);
      next = current * Math.pow(goal / current, portion);
      if (Math.abs(Math.log(goal / next)) < 0.001) next = goal; // close enough, finish
    }
    zoomNow.current = next;
    applyZoom(next, zoomPoint.current.x, zoomPoint.current.y, measure());

    if (next === goal) {
      zoomFrame.current = 0;
      return;
    }
    zoomFrame.current = requestAnimationFrame(zoomStep);
  }

  /* ---------------- glide ---------------- */

  function stopGlide() {
    cancelAnimationFrame(glideFrame.current);
    glideFrame.current = 0;
    glideSpeed.current = { x: 0, y: 0 };
  }

  function startGlide() {
    if (glideFrame.current) return;
    lastGlideTime.current = performance.now();
    glideFrame.current = requestAnimationFrame(glideStep);
  }

  // One frame of gliding. The speed fades out smoothly, and the distance is worked out from
  // the real time since the last frame, so it feels the same on any screen speed.
  function glideStep(now) {
    const elapsed = Math.min(now - lastGlideTime.current, 50);
    lastGlideTime.current = now;
    const fade = Math.exp(-elapsed / GLIDE_DURATION_MS);
    const distanceFactor = GLIDE_DURATION_MS * (1 - fade);
    const speed = glideSpeed.current;

    panBy(speed.x * distanceFactor, speed.y * distanceFactor, measure());

    speed.x *= fade;
    speed.y *= fade;
    if (Math.hypot(speed.x, speed.y) < STOP_GLIDE_BELOW_SPEED) {
      glideSpeed.current = { x: 0, y: 0 };
      glideFrame.current = 0;
      return;
    }
    glideFrame.current = requestAnimationFrame(glideStep);
  }

  // On release: measure how fast the end of the drag was, and glide if it was a flick
  function releaseWithGlide(now) {
    const moves = recentMoves.current;
    recentMoves.current = [];
    if (GLIDE_DURATION_MS <= 0 || moves.length < 2) return;

    const last = moves[moves.length - 1];
    if (now - last.time > PAUSE_BEFORE_RELEASE_MS) return; // paused before letting go
    const first = moves.find((move) => last.time - move.time <= FLICK_MEASURE_MS);
    const elapsed = last.time - first.time;
    if (elapsed <= 0) return;

    let speedX = (last.x - first.x) / elapsed;
    let speedY = (last.y - first.y) / elapsed;
    const speed = Math.hypot(speedX, speedY);
    if (speed < MIN_FLICK_SPEED) return; // too slow to count as a flick
    if (speed > MAX_GLIDE_SPEED) {
      speedX = (speedX / speed) * MAX_GLIDE_SPEED;
      speedY = (speedY / speed) * MAX_GLIDE_SPEED;
    }
    glideSpeed.current = { x: speedX, y: speedY };
    startGlide();
  }

  /* ---------------- setup ---------------- */

  // Re-measure when the window or map changes size (including when the image loads)
  useEffect(() => {
    const update = () => setSize(measure());
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewportRef.current);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

//* Restore the saved position when switching floors.
//* Otherwise, center on the selected scene.
const previousCenterKey = useRef(centerKey);

useEffect(() => {
  const floorChanged = previousCenterKey.current !== centerKey;

  previousCenterKey.current = centerKey;

  const nextCenter =
    floorChanged && savedCenter
      ? savedCenter
      : { centerX: targetX, centerY: targetY };

  setView((v) => ({
    ...v,
    centerX: nextCenter.centerX,
    centerY: nextCenter.centerY,
  }));
}, [centerKey, savedCenter, targetX, targetY]);

  // Stop the animations if the component goes away
  useEffect(
    () => () => {
      cancelAnimationFrame(glideFrame.current);
      cancelAnimationFrame(zoomFrame.current);
    },
    []
  );

  /* ---------------- mouse handlers ---------------- */

  function onPointerDown(e) {
    if (e.button !== 0) return; // left mouse button only
    stopGlide(); // clicking the map stops a glide
    lastPoint.current = { x: e.clientX, y: e.clientY };
    pressStart.current = { x: e.clientX, y: e.clientY };
    recentMoves.current = [];
    dragged.current = false;
  }

  function onPointerMove(e) {
    const previous = lastPoint.current;
    if (!previous) return; // button is not held down
    const current = { x: e.clientX, y: e.clientY };
    lastPoint.current = current;

    if (!dragged.current) {
      const moved = Math.hypot(current.x - pressStart.current.x, current.y - pressStart.current.y);
      if (moved < DRAG_START_DISTANCE_PX) return; // still a click
      dragged.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    panBy(current.x - previous.x, current.y - previous.y, measure());
    recentMoves.current.push({ time: e.timeStamp, x: current.x, y: current.y });
  }

  function onPointerUp(e) {
    if (!lastPoint.current) return;
    lastPoint.current = null;
    if (dragged.current) releaseWithGlide(e.timeStamp);
  }

  function onPointerCancel() {
    lastPoint.current = null;
    recentMoves.current = [];
  }

  function onWheel(e) {
    const m = measure();
    const factor = e.deltaY < 0 ? WHEEL_ZOOM_STEP : 1 / WHEEL_ZOOM_STEP;
    smoothZoom(factor, e.clientX - m.windowLeft, e.clientY - m.windowTop);
  }

  // For the + and − buttons: zoom around the middle of the window
  function zoomBy(factor) {
    const m = measure();
    smoothZoom(factor, m.windowWidth / 2, m.windowHeight / 2);
  }

  const measured = size.mapWidth > 0 && size.mapHeight > 0;
  const shown = measured ? limitView(view, size) : view;

  return {
    viewportRef,
    contentRef,
    view: shown,
    dragged,
    zoomBy,
    bind: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onWheel },
    contentStyle: {
      // Put the center point in the middle of the window, then zoom around it
      transform: `translate(${size.windowWidth / 2}px, ${size.windowHeight / 2}px) scale(${shown.zoom}) translate(${-shown.centerX * size.mapWidth}px, ${-shown.centerY * size.mapHeight}px)`,
      visibility: measured ? "visible" : "hidden", // hidden until the first measurement
    },
  };
}