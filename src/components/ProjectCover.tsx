"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

type Props = {
  src?: string;
  alt: string;
  index: number;
  children?: React.ReactNode;
};

/**
 * Project card cover: shows `src` if given, and falls back to the numbered
 * placeholder treatment if there's no image or it fails to load (e.g. a
 * dead URL in projectImages, or GitHub's preview endpoint hiccuping).
 *
 * Two bits of motion, both vanilla (no animation lib):
 * - the image drifts vertically with scroll position (parallax), tied to
 *   the card's own place in the viewport, not a one-time reveal
 * - the whole card tilts slightly toward the cursor on hover
 */
export default function ProjectCover({ src, alt, index, children }: Props) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  const cardRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax on the image itself.
  useEffect(() => {
    if (!showImage) return;
    let raf = 0;
    const update = () => {
      const el = cardRef.current;
      const img = imgWrapRef.current;
      if (el && img) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // -1 (card center above viewport top) .. 1 (card center below
        // viewport bottom) — drives a small, continuous vertical drift.
        const centered = (rect.top + rect.height / 2 - vh / 2) / vh;
        const shift = Math.max(-1, Math.min(1, centered)) * 14;
        img.style.transform = `translateY(${shift}px) scale(1.12)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [showImage]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-py * 6).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(px * 6).toFixed(2)}deg`);
  };
  const handleMouseLeave = () => {
    cardRef.current?.style.setProperty("--tilt-x", "0deg");
    cardRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-emerald-500/20 via-teal-500/[0.06] to-transparent transition-transform duration-300 ease-out [transform:perspective(900px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]"
      style={{ "--tilt-x": "0deg", "--tilt-y": "0deg" } as React.CSSProperties}
    >
      {showImage ? (
        <>
          <div ref={imgWrapRef} className="absolute inset-0 will-change-transform">
            {/* eslint-disable-next-line @next/next/no-img-element -- source
                may be an arbitrary external URL (GitHub OG image or a
                user-supplied link), so next/image's domain allowlist doesn't
                fit here. */}
            <img src={src} alt={alt} loading="lazy" onError={() => setErrored(true)} className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f14]/80 via-[#0a0f14]/5 to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
          <div className="absolute -bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
          <span className="relative text-6xl font-extrabold tracking-tight text-white/10 transition-colors duration-300 group-hover:text-white/20">
            {String(index + 1).padStart(2, "0")}
          </span>
        </>
      )}
      {children}
    </div>
  );
}
