export const FLIGHT_MS = 1600;
export const CYCLE_MS = 5500;
const ease = (t) => t * t * (3 - 2 * t);
const mix = (a, b, t) => a + (b - a) * t;

export function previewGeometry({ width, height, compact = false, testimonial = false, maxWidth = 200, padding, folder, textRight, ratios = [16 / 9, 16 / 9] }) {
  const gap = 10;
  const right = width - padding;
  const left = Math.max(folder.x + folder.width, textRight) + gap;
  const previewWidth = Math.min(maxWidth, Math.max(1, right - left));
  const heights = ratios.map((ratio) => previewWidth / ratio);
  const x = right - previewWidth;
  const top = compact ? Math.max(padding, height - 22 - heights[0] - heights[1] - gap) : padding;
  return {
    width: previewWidth, heights, x, top, gap, compact, testimonial,
    startX: folder.x + folder.width - previewWidth,
    startY: folder.y + folder.height * .55,
    // Enter below both destinations, then rise along the right column.
    entryY: Math.max(folder.y + folder.height * .55, top + heights[0] + gap) + 10,
    releaseX: folder.x + folder.width,
  };
}

export function previewFrame(g, time, index, reduced = false) {
  const destinationY = g.top + (index === 0 ? 0 : g.heights[0] + g.gap);
  const elapsed = time - index * FLIGHT_MS;
  const fadeStart = g.testimonial ? 6200 : 4700;
  const hiddenAt = fadeStart + 400;
  const entryY = g.testimonial && index === 0 ? Math.max(g.startY, g.top) + 10 : g.entryY;
  let x = g.startX, y = g.startY, opacity = 0;
  if (reduced) return { x: g.x, y: destinationY, opacity: 1, clip: 0 };
  if (elapsed >= 0 && time < hiddenAt) {
    opacity = time > fadeStart ? 1 - (time - fadeStart) / 400 : 1;
    if (elapsed < 1000) {
      const t = ease(elapsed / 1000);
      x = mix(g.startX, g.x, t);
      // Downward bend keeps the second flight beneath the settled first file.
      y = mix(g.startY, entryY, t) + Math.sin(t * Math.PI) * 8;
      if (g.compact) {
        // Clear the occupied top slot before crossing into the preview column.
        // The folder can stay at its natural position in the shorter card.
        const waypointX = g.x - g.width - g.gap / 2;
        const phase = elapsed / 1000;
        if (phase < .45) {
          const progress = ease(phase / .45);
          x = mix(g.startX, waypointX, progress);
          y = mix(g.startY, entryY, progress);
        } else {
          const progress = ease((phase - .45) / .55);
          x = mix(waypointX, g.x, progress);
          y = entryY + Math.sin(progress * Math.PI) * 8;
        }
      }
    } else {
      x = g.x;
      y = mix(entryY, destinationY, ease(Math.min(1, (elapsed - 1000) / 600)));
    }
  }
  // Clip only the portion still left of the folder's release edge.
  // Once the trailing edge clears the folder the whole image stays visible.
  const clip = Math.min(g.width, Math.max(0, g.releaseX - x));
  if (elapsed <= 0 || time >= hiddenAt) opacity = 0;
  return { x, y, opacity, clip };
}
