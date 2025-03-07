"use client";

import { frame, motion, useMotionValue, useSpring } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

export default function Drag() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref);

  return <motion.div ref={ref} style={{ ...ball, x, y }} />;
}

const spring = { damping: 3, stiffness: 50, restDelta: 0.001 };

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return { x, y };
}

/**
 * ==============   Styles   ================
 */

const ball = {
  width: 100,
  height: 100,
  backgroundColor: "#ff0088",
  borderRadius: "50%",
};
