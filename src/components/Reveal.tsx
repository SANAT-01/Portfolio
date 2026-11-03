"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms for items in a sequence. */
  delay?: number;
  /** Which side the element travels in from — "up" (default) is a subtle
   *  nudge; "left"/"right" is a real slide, used for split layouts. */
  direction?: "up" | "left" | "right";
  as?: keyof React.JSX.IntrinsicElements;
};

/** Matches the .reveal transition duration in globals.css (0.7s) + slack. */
const REVEAL_MS = 750;

/**
 * Lightweight scroll-reveal using IntersectionObserver + CSS (no animation lib).
 * Reveals once, then stops observing.
 *
 * Once the entrance has finished, the reveal classes and stagger delay are
 * dropped. Otherwise `.reveal.is-visible { transform: none }` would keep
 * overriding hover lifts like `.card-hover:hover`, and the stagger delay
 * would also lag every later hover transition on the element.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || settled) return;
    const timer = setTimeout(() => setSettled(true), delay + REVEAL_MS);
    return () => clearTimeout(timer);
  }, [visible, settled, delay]);

  const Tag = as as React.ElementType;
  const directionClass =
    direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "";
  return (
    <Tag
      ref={ref}
      className={
        settled
          ? className
          : `reveal ${directionClass} ${visible ? "is-visible" : ""} ${className}`
      }
      style={delay && !settled ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
