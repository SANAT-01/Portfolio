"use client";

import { useState } from "react";

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
 */
export default function ProjectCover({ src, alt, index, children }: Props) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-emerald-500/20 via-teal-500/[0.06] to-transparent">
      {showImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- source
              may be an arbitrary external URL (GitHub OG image or a
              user-supplied link), so next/image's domain allowlist doesn't
              fit here. */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setErrored(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
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
