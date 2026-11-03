"use client";

import { useEffect, useRef, useState } from "react";

// Adapted from the scroll-site-generator skill's useFrameSequence. Keeps the
// createImageBitmap → <img> fallback: createImageBitmap throws in hidden or
// backgrounded tabs and some webviews, which would leave the canvas blank.

type Frame = { img: ImageBitmap | HTMLImageElement; url?: string };

async function decodeBlob(blob: Blob): Promise<Frame> {
  try {
    return { img: await createImageBitmap(blob) };
  } catch {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    try {
      await img.decode();
    } catch (err) {
      URL.revokeObjectURL(url);
      throw err;
    }
    return { img, url };
  }
}

function releaseFrame(f: Frame) {
  if ("close" in f.img) f.img.close();
  if (f.url) URL.revokeObjectURL(f.url);
}

type Manifest = { count: number; pattern: string };

/**
 * Loads a numbered WebP frame sequence from `/frames/<name>/` and draws the
 * frame matching a 0–1 progress value onto a canvas, cover-fit.
 *
 * Compressed blobs stay resident (small); decoded frames live only in a
 * sliding window around the playhead so scrubbing stays smooth on mobile.
 */
export function useFrameSequence(name: string) {
  const blobs = useRef<(Blob | null)[]>([]);
  const frames = useRef<Map<number, Frame>>(new Map());
  const decoding = useRef<Set<number>>(new Set());
  // Frames whose blob failed to decode — skipped instead of retried on every
  // animation frame.
  const failed = useRef<Set<number>>(new Set());
  const aliveRef = useRef(true);
  const countRef = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    aliveRef.current = true;
    failed.current.clear();
    const base = `/frames/${name}/`;
    const decoded = frames.current;

    (async () => {
      const m: Manifest = await fetch(`${base}manifest.json`).then((r) => r.json());
      if (!alive) return;
      countRef.current = m.count;
      blobs.current = new Array(m.count).fill(null);
      const url = (i: number) =>
        base +
        m.pattern.replace(/%0(\d)d/, (_, n) => String(i + 1).padStart(Number(n), "0"));

      let done = 0;
      // Fetch in order with limited concurrency so early frames arrive first.
      const queue = Array.from({ length: m.count }, (_, i) => i);
      const worker = async () => {
        while (alive && queue.length) {
          const i = queue.shift()!;
          try {
            const r = await fetch(url(i));
            // A 404 would otherwise be stored as an HTML "image" blob.
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const b = await r.blob();
            if (!alive) return;
            blobs.current[i] = b;
          } catch {
            /* a missing frame falls back to its nearest decoded neighbour */
          }
          done++;
          setLoaded(done / m.count);
          if (i === 0 && blobs.current[0]) {
            try {
              const f = await decodeBlob(blobs.current[0]);
              if (!alive) return releaseFrame(f);
              frames.current.set(0, f);
              setReady(true);
            } catch {
              /* decode() in the draw loop marks it failed; the canvas is
                 revealed by the first neighbour that decodes instead */
            }
          }
        }
      };
      await Promise.all(Array.from({ length: 8 }, worker));
    })();

    return () => {
      alive = false;
      aliveRef.current = false;
      decoded.forEach(releaseFrame);
      decoded.clear();
    };
  }, [name]);

  function decode(i: number) {
    if (
      frames.current.has(i) ||
      decoding.current.has(i) ||
      failed.current.has(i) ||
      !blobs.current[i]
    )
      return;
    decoding.current.add(i);
    decodeBlob(blobs.current[i]!)
      .then((f) => {
        // Unmounted while decoding: the cleanup already ran, so release
        // here or the bitmap leaks.
        if (!aliveRef.current) return releaseFrame(f);
        frames.current.set(i, f);
        // If frame 0 was missing or corrupt, show the film once any frame
        // is available rather than leaving the canvas hidden forever.
        setReady(true);
      })
      .catch(() => failed.current.add(i))
      .finally(() => decoding.current.delete(i));
  }

  function manageWindow(center: number) {
    const AHEAD = 16;
    const KEEP = 40;
    for (let d = 0; d <= AHEAD; d++) {
      if (center + d < countRef.current) decode(center + d);
      if (center - d >= 0) decode(center - d);
    }
    if (frames.current.size > KEEP * 2) {
      for (const [idx, f] of frames.current) {
        if (Math.abs(idx - center) > KEEP) {
          releaseFrame(f);
          frames.current.delete(idx);
        }
      }
    }
  }

  function nearestDecoded(i: number): Frame | null {
    if (frames.current.has(i)) return frames.current.get(i)!;
    for (let d = 1; d < countRef.current; d++) {
      if (frames.current.has(i - d)) return frames.current.get(i - d)!;
      if (frames.current.has(i + d)) return frames.current.get(i + d)!;
    }
    return null;
  }

  /** progress ∈ [0,1] → draw the matching frame onto the canvas, cover-fit. */
  function draw(canvas: HTMLCanvasElement | null, progress: number) {
    if (!canvas || countRef.current === 0) return;
    const i = Math.round(Math.min(1, Math.max(0, progress)) * (countRef.current - 1));
    manageWindow(i);
    const frame = nearestDecoded(i);
    if (!frame) return;
    const src = frame.img;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(canvas.clientWidth * dpr);
    const ch = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Cover-fit, capped at 2.6x the contain size: on portrait phones that
    // keeps the (centered) subject large while showing ~40% of the width,
    // with the edge gradients hiding the small remaining letterbox.
    const cover = Math.max(cw / src.width, ch / src.height);
    const contain = Math.min(cw / src.width, ch / src.height);
    const s = Math.min(cover, contain * 2.6);
    const w = src.width * s;
    const h = src.height * s;
    ctx.fillStyle = "#0a0f14";
    ctx.fillRect(0, 0, cw, ch);
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;
    ctx.drawImage(src, x, y, w, h);

    // When the frame doesn't fill the canvas (portrait phones), feather its
    // top and bottom edges into the background so no hard line shows.
    if (y > 1) {
      const band = h * 0.18;
      const top = ctx.createLinearGradient(0, y, 0, y + band);
      top.addColorStop(0, "#0a0f14");
      top.addColorStop(1, "rgba(10,15,20,0)");
      ctx.fillStyle = top;
      ctx.fillRect(0, y, cw, band);
      const bottom = ctx.createLinearGradient(0, y + h, 0, y + h - band);
      bottom.addColorStop(0, "#0a0f14");
      bottom.addColorStop(1, "rgba(10,15,20,0)");
      ctx.fillStyle = bottom;
      ctx.fillRect(0, y + h - band, cw, band);
    }
  }

  return { ready, loaded, draw };
}
