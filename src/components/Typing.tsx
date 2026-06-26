"use client";

import { useEffect, useState } from "react";

/**
 * Tiny self-contained typewriter — cycles through `words` with type/erase.
 * No external dependency.
 */
export default function Typing({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const done = text === current;
    const cleared = text === "";

    let delay = deleting ? 45 : 90;
    if (!deleting && done) delay = 1600; // pause at full word
    if (deleting && cleared) delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && done) {
        setDeleting(true);
      } else if (deleting && cleared) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <span className="text-emerald-400">
      {text}
      <span className="blink-caret ml-0.5 font-light text-emerald-400">|</span>
    </span>
  );
}
