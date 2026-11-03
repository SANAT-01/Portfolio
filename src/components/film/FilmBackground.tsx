"use client";

import { useEffect, useRef } from "react";
import { useFrameSequence } from "./useFrameSequence";

/**
 * The scroll film, spread across the whole page as a fixed background.
 * Instead of playing in one block at the top, each section plays its own
 * chapter as you scroll through it:
 *
 *   home → code · about → silicon · skills → servers ·
 *   experience → network · projects → ai · contact → desk
 *
 * A chapter starts when its section's top edge reaches the middle of the
 * viewport and ends when the next section's does, so each chapter plays
 * over its section no matter how tall that section is.
 *
 * Chapter starts are fractions of the film, printed by
 * scripts/build-film.sh — update CHAPTERS if a rebuild prints new numbers.
 */
const CHAPTERS = [
  { section: "home", name: "code", start: 0 },
  { section: "about", name: "silicon", start: 0.165 },
  { section: "skills", name: "servers", start: 0.33 },
  { section: "experience", name: "network", start: 0.496 },
  { section: "projects", name: "ai", start: 0.661 },
  { section: "contact", name: "desk", start: 0.826 },
];

/** Frame shown, without scrubbing, to visitors who prefer reduced motion:
 *  the calm, centered laptop at the end of the film. */
const STILL = 0.95;

type Point = { at: number; f: number };

/** Current scroll position → position in the film (0–1). */
function filmProgress(): number {
  const vh = window.innerHeight;
  const y = window.scrollY;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);

  const pts: Point[] = [];
  for (const ch of CHAPTERS) {
    const el = document.getElementById(ch.section);
    if (!el) continue;
    const at = pts.length === 0 ? 0 : el.getBoundingClientRect().top + y - vh * 0.5;
    pts.push({ at, f: ch.start });
  }
  pts.push({ at: maxScroll, f: 1 });
  // Keep the mapping monotonic even if a layout ends up unusual.
  for (let k = 1; k < pts.length; k++) pts[k].at = Math.max(pts[k].at, pts[k - 1].at + 1);

  if (y <= pts[0].at) return pts[0].f;
  for (let k = 1; k < pts.length; k++) {
    if (y <= pts[k].at) {
      const a = pts[k - 1];
      const b = pts[k];
      return a.f + ((y - a.at) / (b.at - a.at)) * (b.f - a.f);
    }
  }
  return 1;
}

function chapterAt(f: number) {
  let name = CHAPTERS[0].name;
  for (const ch of CHAPTERS) if (f >= ch.start) name = ch.name;
  return name;
}

export default function FilmBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ready, draw } = useFrameSequence("film");

  // Keep the latest draw() for the loop without restarting it.
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let current = -1;
    let drawn = -1;
    let idle = 0;
    let chapter = "";

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const target = reduce ? STILL : filmProgress();
      // Time-based smoothing: fast flicks glide instead of jumping frames.
      current =
        current < 0 || reduce ? target : current + (target - current) * (1 - Math.exp(-dt * 10));
      if (Math.abs(current - target) < 0.0005) current = target;

      if (Math.abs(current - drawn) > 0.0002) {
        idle = 0;
        drawRef.current(canvasRef.current, current);
        drawn = current;
        const name = chapterAt(current);
        if (name !== chapter && rootRef.current) {
          chapter = name;
          rootRef.current.dataset.chapter = name;
        }
      } else if (++idle % 8 === 0) {
        // The exact frame may have finished decoding after we drew its
        // nearest neighbour — redraw now and then while idle.
        drawRef.current(canvasRef.current, current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 h-lvh"
      style={{ zIndex: -2 }}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Dim and vignette the film so the page's text stays readable on top. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,15,20,0.15) 0%, rgba(10,15,20,0.7) 100%), linear-gradient(rgba(10,15,20,0.5), rgba(10,15,20,0.5))",
        }}
      />
    </div>
  );
}
