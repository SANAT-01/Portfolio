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

/**
 * Lightweight scroll-reveal using IntersectionObserver + CSS (no animation lib).
 * Reveals once, then stops observing.
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

  const Tag = as as React.ElementType;
  const directionClass =
    direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "";
  return (
    <Tag
      ref={ref}
      className={`reveal ${directionClass} ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
