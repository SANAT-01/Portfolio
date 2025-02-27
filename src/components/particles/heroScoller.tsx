"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { m } from "framer-motion";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const HeroScroller = () => {
  return (
    <div
      id="scroller"
      className="absolute xs:bottom-10 bottom-12 flex justify-center items-center"
    >
      <a href="#about">
        <div className="  flex justify-center items-start p-2">
          <m.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="text-green-300 flex flex-col"
          >
            <FontAwesomeIcon icon={faChevronDown} className="w-6 h-6" />
            <FontAwesomeIcon icon={faChevronDown} className="w-6 h-6" />
          </m.div>
        </div>
      </a>
    </div>
  );
};

export default HeroScroller;
