"use client";
import HeroParticles from "@/components/particles/heroParticles";
import HeroScroller from "@/components/particles/heroScoller";
import HeroText from "@/components/particles/heroText";
import { m, LazyMotion, domAnimation } from "framer-motion";

const Hero = () => {
  return (
    <div
      id="hero"
      className="w-full flex justify-center overflow-hidden-web relative text-white"
    >
      <LazyMotion features={domAnimation} strict>
        <m.div
          id="hero"
          className="relative w-full flex justify-center items-center h-screen min-h-[800px]"
        >
          <HeroText />
          <HeroParticles />
        </m.div>
        <HeroScroller />
      </LazyMotion>
    </div>
  );
};

export default Hero;
