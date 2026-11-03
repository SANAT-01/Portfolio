"use client";

import { useEffect, useRef } from "react";
import { useFrameSequence } from "./useFrameSequence";

/**
 * Scroll-scrubbed opening film: a tall track with a sticky full-screen
 * canvas. Scroll position picks the frame; captions fade in and out over
 * fixed windows of the scroll.
 *
 * Caption windows are fractions of the whole film. Chapter starts, from
 * scripts/build-film.sh: code 0.000 · silicon 0.165 · servers 0.330 ·
 * network 0.496 · ai 0.661 · desk 0.826. Each caption peaks inside its
 * chapter. Re-check these if the build prints different numbers.
 */
type Caption = {
  /** fade in starts, fully visible, starts fading out, gone */
  win: [number, number, number, number];
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "right" | "center";
};

const CAPTIONS: Caption[] = [
  {
    win: [-0.05, -0.01, 0.06, 0.1],
    eyebrow: "Software Engineer",
    title: "Sanat Tudu",
    body: "Scroll to see how I build.",
    align: "center",
  },
  {
    win: [0.09, 0.11, 0.14, 0.162],
    eyebrow: "01 — Code",
    title: "Ideas become code.",
    body: "TypeScript, React, Next.js, Node and Nest.js — written to be read, built to last.",
    align: "left",
  },
  {
    win: [0.2, 0.225, 0.3, 0.327],
    eyebrow: "02 — The machine",
    title: "Code meets silicon.",
    body: "Performance is a feature. I care about what actually runs underneath.",
    align: "right",
  },
  {
    win: [0.365, 0.39, 0.465, 0.492],
    eyebrow: "03 — Delivery",
    title: "Shipped in containers.",
    body: "Docker, Kubernetes and Jenkins pipelines that take code to production.",
    align: "left",
  },
  {
    win: [0.53, 0.555, 0.63, 0.657],
    eyebrow: "04 — Scale",
    title: "Built to scale.",
    body: "Caching, queues and distributed services that hold up under real traffic.",
    align: "right",
  },
  {
    win: [0.695, 0.72, 0.795, 0.822],
    eyebrow: "05 — Intelligence",
    title: "Grounded in AI.",
    body: "B.Tech in Data Science & AI from IIT Bhilai.",
    align: "left",
  },
  {
    // Fades out right at the end so it doesn't scroll up under the nav as
    // the film hands off to the hero.
    win: [0.88, 0.92, 0.975, 0.998],
    eyebrow: "Full-stack · Backend · DevOps",
    title: "Engineering scalable systems.",
    align: "center",
  },
];

function captionOpacity(p: number, [a, b, c, d]: Caption["win"]) {
  if (p <= a || p >= d) return 0;
  if (p < b) return (p - a) / (b - a);
  if (p > c) return 1 - (p - c) / (d - c);
  return 1;
}

const alignClass: Record<NonNullable<Caption["align"]>, string> = {
  left: "items-start text-left",
  right: "items-end text-right",
  center: "items-center text-center",
};

// A soft dark scrim on the caption's side keeps text readable over bright,
// busy footage (circuit sparks, the glowing laptop screen).
const scrim: Record<NonNullable<Caption["align"]>, string> = {
  left: "linear-gradient(90deg, rgba(10,15,20,0.78) 0%, rgba(10,15,20,0.45) 38%, transparent 62%)",
  right: "linear-gradient(270deg, rgba(10,15,20,0.78) 0%, rgba(10,15,20,0.45) 38%, transparent 62%)",
  center: "radial-gradient(ellipse 55% 45% at center, rgba(10,15,20,0.7) 0%, rgba(10,15,20,0.35) 55%, transparent 80%)",
};

export default function ScrollFilm() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cueRef = useRef<HTMLAnchorElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { ready, loaded, draw } = useFrameSequence("film");

  // Keep the latest draw() for the loop without restarting it.
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${loaded})`;
  }, [loaded]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let current = -1;
    let drawn = -1;
    let idle = 0;
    // Whether the canvas shows the exact frame for `drawn`. Until it does,
    // retry now and then: that frame may finish decoding after we drew its
    // nearest neighbour. Once it does, stop — otherwise the loop would keep
    // repainting a full-screen canvas forever, even while the visitor reads
    // the rest of the page.
    let exact = false;
    const invalidate = () => {
      exact = false;
    };
    window.addEventListener("resize", invalidate);

    const target = () => {
      const el = trackRef.current;
      if (!el) return 0;
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = (window.scrollY - el.offsetTop) / scrollable;
      return Math.min(1, Math.max(0, p));
    };

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const t = target();
      // Time-based smoothing: fast flicks glide, and it still converges
      // when the tab was throttled.
      current = current < 0 ? t : current + (t - current) * (1 - Math.exp(-dt * 14));
      if (Math.abs(current - t) < 0.0005) current = t;

      const moved = Math.abs(current - drawn) > 0.0002;
      if (!moved && !exact && ++idle % 8 === 0) {
        exact = drawRef.current(canvasRef.current, current);
      }
      if (moved) {
        idle = 0;
        exact = drawRef.current(canvasRef.current, current);
        drawn = current;
        captionRefs.current.forEach((node, i) => {
          if (!node) return;
          const o = captionOpacity(current, CAPTIONS[i].win);
          node.style.opacity = String(o);
          node.style.transform = `translateY(${(1 - o) * 18}px)`;
          node.style.visibility = o > 0 ? "visible" : "hidden";
        });
        if (cueRef.current) {
          cueRef.current.style.opacity = String(current > 0.9 ? 1 : 0);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", invalidate);
    };
  }, []);

  // The loop above paints the first frame once it decodes. (It used to be
  // drawn here at progress 0, which showed the opening frame instead of the
  // right one when the page was reloaded part-way through the film.)

  return (
    <section
      id="film"
      ref={trackRef}
      aria-label="Intro film: from code to production to AI"
      className="relative h-[700vh] bg-[#0a0f14]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Blend the frame edges into the page */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(10,15,20,0.75) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0f14] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0f14] to-transparent"
        />

        {/* Captions */}
        {CAPTIONS.map((c, i) => (
          <div
            key={c.title}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            className={`pointer-events-none absolute inset-0 flex flex-col justify-center px-6 sm:px-16 lg:px-24 ${
              alignClass[c.align ?? "left"]
            }`}
            style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: scrim[c.align ?? "left"] }}
            />
            <div className={`relative ${c.align === "center" ? "max-w-4xl" : "max-w-xl"}`}>
              {c.eyebrow && (
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                  {c.eyebrow}
                </p>
              )}
              <h2
                className={`font-extrabold leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)] ${
                  i === 0 || i === CAPTIONS.length - 1
                    ? "text-5xl sm:text-7xl lg:text-8xl"
                    : "text-4xl sm:text-5xl lg:text-6xl"
                }`}
              >
                {c.title}
              </h2>
              {c.body && (
                <p className="mt-4 text-base leading-relaxed text-slate-300 drop-shadow-[0_1px_12px_rgba(0,0,0,0.9)] sm:text-lg">
                  {c.body}
                </p>
              )}
            </div>
          </div>
        ))}

        <a
          ref={cueRef}
          href="#home"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-slate-300 opacity-0 transition-opacity duration-500 hover:text-emerald-300"
        >
          Meet the engineer ↓
        </a>

        {/* Load progress */}
        {loaded < 1 && (
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/5">
            <div
              ref={barRef}
              className="h-full origin-left bg-emerald-400/70 transition-transform duration-300"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        )}
        {!ready && loaded < 1 && (
          <p className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-500">
            Loading
          </p>
        )}
      </div>
    </section>
  );
}
