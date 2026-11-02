"use client";

import { useEffect, useRef } from "react";

/**
 * Draws the emerald timeline line in as you scroll through its parent
 * section — continuous, tied to scroll position, not a one-time reveal.
 * Sits absolutely positioned over the static track line in Experience.tsx.
 */
export default function TimelineFill() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = ref.current;
      const track = el?.parentElement;
      if (track) {
        const rect = track.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the track's top is at the bottom of the viewport,
        // 1 when its bottom has scrolled past the top of the viewport.
        const total = rect.height + vh;
        const scrolled = vh - rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / total));
        el.style.transform = `scaleY(${progress})`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="timeline-fill absolute left-3 top-2 h-full w-px bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-400 md:left-1/2"
    />
  );
}
