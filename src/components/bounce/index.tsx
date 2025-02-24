"use client";

interface BounceProps {
  title: string;
}

const BounceComponent = ({ title }: BounceProps) => {
  return (
    <>
      <div
        className="tracking-wider text-7xl sm:text-8xl md:text-9xl text-green-300 cursor-pointer"
        style={{ fontFamily: "Morganite Black" }}
      >
        {title.split("").map((char, index) => {
          if (char === " ") {
            return " ";
          }
          return (
            <span key={index} className="bounce">
              {char}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default BounceComponent;
