"use client";
import React from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";
import Data from "@/pages/data/Data.json";
import SectionTitle from "../Contact/sectionTitle";
import ImageSlider from "@/components/slider/imageSlider";
import { memoji } from "@/constants/constants";

const About = () => {
  return (
    <div id="about" className="w-full flex flex-col md:h-screen items-center ">
      <div className="px-10 w-full md:w-[90%]">
        <div className="w-full">
          <SectionTitle title="About" subtitle="" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <LazyMotion features={domAnimation} strict>
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="text-white text-center md:text-left"
              >
                <span className="opacity-50">{Data.AboutDetails.intro}</span>
              </m.div>
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="text-white text-center md:text-left"
              >
                <span className="opacity-50">{Data.AboutDetails.brief}</span>
              </m.div>
            </LazyMotion>
          </div>
          <div className="">
            <div className="flex justify-center items-center">
              <ImageSlider images={memoji.image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
