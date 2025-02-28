"use client";
import Image from "next/image";
import React from "react";
import Data from "@/pages/data/Data.json";
import { domAnimation, LazyMotion, m } from "framer-motion";
import SectionTitle from "../Contact/sectionTitle";

const Skills = () => {
  return (
    <div id="skills" className="w-full flex flex-col md:h-screen items-center ">
      <div className="px-10 w-full md:w-[90%]">
        <div className="w-full">
          <SectionTitle title="Skills" subtitle="" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {Data.Skillset.map((value, index) => {
            return (
              <LazyMotion features={domAnimation} key={index}>
                <m.div
                  key={index}
                  initial="hidden"
                  whileInView="show"
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                  className="p-3 bg-green-800 shadow-xl z-100 rounded-xl hover:scale-105 ease-in duration-300"
                >
                  <div className="grid sm:grid-cols-2 gap-1 h-auto justify-center  items-center">
                    <div className="m-auto">
                      <Image
                        src={value.imageSource}
                        alt={value.name}
                        width={75}
                        height={75}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-white">{value.name}</div>
                    </div>
                  </div>
                </m.div>
              </LazyMotion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
