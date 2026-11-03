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
    await img.decode();
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
  const countRef = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    const base = `/frames/${name}/`;
    const decoded = frames.current;

    // fetch() only rejects on network errors; a 404 would otherwise hand us
    // an HTML error page as if it were a frame or the manifest.
    const get = (u: string) =>
      fetch(u).then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${u}`);
        return r;
      });

    (async () => {
      let m: Manifest;
      try {
        m = await get(`${base}manifest.json`).then((r) => r.json());
      } catch (err) {
        console.error("Scroll film: couldn't load manifest", err);
        if (alive) setLoaded(1);
        return;
      }
      if (!alive) return;
      countRef.current = m.count;
      blobs.current = new Array(m.count).fill(null);
      const url = (i: number) =>
        base +
        m.pattern.replace(/%0(\d)d/, (_, n) => String(i + 1).padStart(Number(n), "0"));

      let done = 0;
      let shown = false;
      // Fetch in order with limited concurrency so early frames arrive first.
      const queue = Array.from({ length: m.count }, (_, i) => i);
      const worker = async () => {
        while (alive && queue.length) {
          const i = queue.shift()!;
          try {
            const b = await get(url(i)).then((r) => r.blob());
            if (!alive) return;
            blobs.current[i] = b;
          } catch {
            /* a missing frame falls back to its nearest decoded neighbour */
          }
          done++;
          setLoaded(done / m.count);
          // Reveal the canvas on the first frame that decodes — usually
          // frame 0, but if that one is missing or corrupt, don't leave the
          // film stuck on "Loading" forever.
          if (!shown && blobs.current[i]) {
            try {
              const f = await decodeBlob(blobs.current[i]!);
              if (!alive) return releaseFrame(f);
              frames.current.set(i, f);
              shown = true;
              setReady(true);
            } catch {
              /* try the next frame that arrives */
            }
          }
        }
      };
      await Promise.all(Array.from({ length: 8 }, worker));
    })();

    return () => {
      alive = false;
      decoded.forEach(releaseFrame);
      decoded.clear();
    };
  }, [name]);

  function decode(i: number) {
    if (frames.current.has(i) || decoding.current.has(i) || !blobs.current[i]) return;
    decoding.current.add(i);
    decodeBlob(blobs.current[i]!)
      .then((f) => frames.current.set(i, f))
      .catch(() => {})
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

  /**
   * progress ∈ [0,1] → draw the matching frame onto the canvas, cover-fit.
   * Returns true when the exact frame was drawn, false when nothing or only
   * a nearby stand-in was (so the caller knows to try again shortly).
   */
  function draw(canvas: HTMLCanvasElement | null, progress: number): boolean {
    if (!canvas || countRef.current === 0) return false;
    const i = Math.round(Math.min(1, Math.max(0, progress)) * (countRef.current - 1));
    manageWindow(i);
    const frame = nearestDecoded(i);
    if (!frame) return false;
    const exact = frame === frames.current.get(i);
    const src = frame.img;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(canvas.clientWidth * dpr);
    const ch = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;
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
    return exact;
  }

  return { ready, loaded, draw };
}
