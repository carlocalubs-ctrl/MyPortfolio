import { useLayoutEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CYCLE_MS, previewFrame, previewGeometry } from './folderPreviewTimeline.mjs';

export const FolderPreview = ({ images, testimonial = false }) => {
  const layerRef = useRef(null);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const layer = layerRef.current;
    const card = layer.parentElement;
    const folder = card.querySelector('.folder-art');
    const label = card.querySelector('.folder-label');
    const description = card.querySelector('.folder-description');
    const nodes = Array.from(layer.children);
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const cycle = CYCLE_MS + (testimonial ? 1500 : 0);
    let geometry, frame, resizeFrame, start, batch = -1, disposed = false;
    let loadedImages = [];
    const setBatch = (nextBatch) => {
      const selected = nodes.map((_, index) => loadedImages[(nextBatch * 2 + index) % loadedImages.length]);
      const padding = parseFloat(getComputedStyle(card).paddingTop);
      const folderPosition = { x: folder.offsetLeft, y: folder.offsetTop, width: folder.clientWidth, height: folder.clientHeight };
      const options = {
        width: card.clientWidth,
        height: card.clientHeight,
        compact: true,
        testimonial,
        maxWidth: testimonial ? 120 : card.getAttribute('href') === '/tech-stack' ? 72 : 160,
        padding,
        folder: folderPosition,
        textRight: label.offsetLeft + label.clientWidth,
        ratios: selected.map((image) => image.ratio),
      };
      geometry = previewGeometry(options);
      // Align the information group to the settled media, not the card center.
      // Translations leave the in-flow spacer and all outer dimensions intact.
      const contentHeight = description.offsetTop + description.offsetHeight - folder.offsetTop;
      const stackHeight = geometry.heights[0] + geometry.heights[1] + geometry.gap;
      const centeredOffset = geometry.top + stackHeight / 2 - folder.offsetTop - contentHeight / 2;
      // Retain clearance for the existing flight without changing its curve.
      const flightLimit = card.clientHeight - padding - Math.max(...geometry.heights) - 18
        - folder.offsetTop - folder.clientHeight * .55;
      const contentOffset = Math.max(0, Math.min(centeredOffset, flightLimit));
      card.style.setProperty('--folder-content-offset', contentOffset + 'px');
      geometry = previewGeometry({ ...options, folder: { ...folderPosition, y: folderPosition.y + contentOffset } });
      nodes.forEach((node, index) => {
        node.style.opacity = 0;
        node.querySelector('img').src = selected[index].src;
        node.style.width = `${geometry.width}px`;
        node.style.height = `${geometry.heights[index]}px`;
      });
      batch = nextBatch;
    };
    const measure = () => {
      if (!loadedImages.length) return;
      const padding = parseFloat(getComputedStyle(card).paddingTop);
      const initial = previewGeometry({
        width: card.clientWidth, height: card.clientHeight,
        maxWidth: testimonial ? 120 : card.getAttribute('href') === '/tech-stack' ? 72 : 160,
        padding: parseFloat(getComputedStyle(card).paddingTop),
        folder: { x: folder.offsetLeft, y: folder.offsetTop, width: folder.clientWidth, height: folder.clientHeight },
        textRight: label.offsetLeft + label.clientWidth,
      });
      const tallest = Math.max(...loadedImages.map((image) => initial.width / image.ratio));
      // Reserve the largest pair and the curved flight below its destination.
      // Image swaps never resize the row during a cycle.
      const stackHeight = testimonial
        ? loadedImages.reduce((sum, image) => sum + initial.width / image.ratio, 10)
        : tallest * 2 + 10;
      const flightHeight = Math.max(stackHeight, folder.offsetTop + folder.clientHeight * .55 - padding + tallest) + 18;
      card.style.setProperty('--preview-stack-height', flightHeight + 'px');
      setBatch(0);
      // Hide before restarting after resize; never move a visible settled file.
      nodes.forEach((node) => { node.style.opacity = 0; });
      start = undefined;
    };
    const tick = (now) => {
      if (disposed) return;
      start ??= now;
      const elapsed = now - start;
      const nextBatch = Math.floor(elapsed / cycle);
      if (batch !== nextBatch) setBatch(nextBatch);
      nodes.forEach((node, index) => {
        const state = previewFrame(geometry, elapsed % cycle, index, motion.matches);
        node.style.transform = `translate(${state.x}px, ${state.y}px)`;
        node.style.opacity = state.opacity;
        node.style.clipPath = `inset(0 0 0 ${state.clip}px)`;
        node.style.pointerEvents = testimonial && index === 0 && state.opacity === 1 && state.clip === 0 ? 'auto' : 'none';
      });
      if (!motion.matches) frame = requestAnimationFrame(tick);
    };
    const restart = () => {
      if (!loadedImages.length) return;
      cancelAnimationFrame(frame);
      measure();
      frame = requestAnimationFrame(tick);
    };
    // Card height is derived from image dimensions. Defer those layout writes
    // beyond the observer delivery to avoid recursive resize notifications.
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(restart);
    });
    // Wait for the existing assets before exposing either animated node.
    Promise.all(images.map(({ src }) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve({ src, ratio: image.naturalWidth / image.naturalHeight });
      image.onerror = () => resolve(null);
      image.src = src;
    }))).then((results) => {
      if (disposed) return;
      loadedImages = results.filter(Boolean);
      if (!loadedImages.length) return;
      observer.observe(card);
      observer.observe(folder);
      restart();
    });
    motion.addEventListener('change', restart);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      motion.removeEventListener('change', restart);
      card.style.removeProperty('--preview-stack-height');
      card.style.removeProperty('--folder-content-offset');
    };
  }, [images, testimonial]);
  return <div className="folder-preview" ref={layerRef} aria-hidden="true">
    {[0, 1].map((index) => <div key={index} className="folder-preview-image"
      onClick={images[index]?.video ? (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        event.stopPropagation();
        navigate('/testimonials#kameron-testimonial');
      } : undefined}
    >
      <img alt="" draggable="false" />
      {images[index]?.video && <span className="folder-preview-play"><Play aria-hidden="true" /></span>}
    </div>)}
  </div>;
};
