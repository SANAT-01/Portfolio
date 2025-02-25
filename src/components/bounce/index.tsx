"use client";

import { cn } from "@/utils/cn";
import { BounceProps } from "@/types/bounce";

const BounceComponent = ({ title, className }: BounceProps) => {
  return (
    <>
      <div
        className="tracking-wider text-7xl sm:text-8xl md:text-9xl  cursor-pointer"
        style={{ fontFamily: "Morganite Black" }}
      >
        {title?.split("").map((char, index) => {
          if (char === " ") {
            return " ";
          }
          return (
            <span
              key={index}
              className={cn("bounce text-6xl text-green-300", className)}
            >
              {char}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default BounceComponent;
