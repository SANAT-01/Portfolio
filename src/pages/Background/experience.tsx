"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    title: "Computer Science",
    company: "Kendriya Vidyalaya Santragachi",
    location: "Howrah, West Bengal",
    duration: "2018 - 2020",
    description:
      "Learned Programing languages and built projects using Python and MySql.",
  },
  {
    id: 2,
    title: "B.Tech DSAI",
    company: "Indain Institute of Technology, Bhilai",
    location: "Bhilai, Chhattisgarh",
    duration: "2020 - 2024",
    description:
      "Build my deep understanding of Machine Learning, Data Science, and Artificial Intelligence.",
  },
  {
    id: 3,
    title: "Software Developer",
    company: "Winjit Technologies",
    location: "Onsite",
    duration: "2024-present",
    description:
      "Assisted in creating advance UI components and improving user experience.",
  },
];

const itemVariantsRight = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0 },
};

const ExperienceList = ({ ActualBaseHeight }: { ActualBaseHeight: number }) => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const heightDiv = 200;
  const radiusCircle = 15;
  const baseHeight = ActualBaseHeight; //  to be set manually
  const maxBaseHeight = baseHeight + heightDiv * (experiences.length - 1);
  const diff = maxBaseHeight - baseHeight;
  const partition = diff / (experiences.length - 1);
  //   console.log(baseHeight, maxBaseHeight, diff, partition);

  useEffect(() => {
    const handleScroll = () => {
      // If the scroll position is less than baseHeight, set scrollHeight to 0
      if (window.scrollY < baseHeight) {
        setScrollHeight(0);
      } else {
        // Calculate the scroll height and cap it at maxBaseHeight
        let scrollPosition =
          Math.min(maxBaseHeight, window.scrollY) - baseHeight;
        scrollPosition = Math.round(scrollPosition / partition) * partition;
        setScrollHeight(scrollPosition);
      }

      // If the scroll position exceeds maxBaseHeight, remove the scroll listener
      if (window.scrollY >= maxBaseHeight) {
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [baseHeight, partition, maxBaseHeight]); // Only run this effect once on mount

  const ball = {
    width: radiusCircle * 2,
    height: radiusCircle * 2,
    backgroundColor: "white",
    borderRadius: "50%",
    position: "relative", // Make the ball absolutely positioned
    top: "0%", // Position it in the center vertically
    left: "0%", // Position it in the center horizontally
    transform: "translate(-50%, -50%)", // Adjust for exact center
  };

  return (
    <div className="grid grid-cols-3 text-white">
      <div className="col-span-1 flex justify-center relative">
        <div className="my-4">
          <motion.div
            initial={{ height: 0 }} // Start with the line collapsed vertically
            animate={{ height: scrollHeight }} // Animate the height based on scroll
            transition={{
              duration: 0.1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className=" bg-white w-1 absolute top-[100px] left-1/2 transform -translate-x-1/2"
            style={{
              top: `${heightDiv / 2}px`,
            }}
          />
        </div>
        <div className="pt-[85px]">
          {experiences.map((item, key) => {
            return (
              <div
                key={key}
                style={{
                  padding:
                    key % 2 === 0
                      ? ``
                      : `${heightDiv - radiusCircle * 2}px 0px ${
                          heightDiv - radiusCircle * 2
                        }px 0px `,
                }}
              >
                {scrollHeight >= partition * key && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      scale: {
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5,
                      },
                    }}
                    style={ball as React.CSSProperties} // Apply the custom styles for the ball
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-2 items-center">
        {experiences.map((item, index) => {
          return (
            <div key={index} className="items-center flex justify-between">
              <motion.div
                key={index}
                variants={itemVariantsRight}
                initial="hidden"
                whileInView="show"
                transition={{ duration: 1, delay: 0.2 }}
                className=" bg-[rgba(100,99,99,0.02)] rounded-lg overflow-hidden w-full"
                style={{ height: `${heightDiv}px` }}
              >
                <div className="flex items-center px-5 justify-start"></div>
                <div className="px-6 w-full flex flex-col justify-center gap-1 py-4 text-white">
                  <h3 className="text-lg font-semibold">{item.company}</h3>
                  <p className="">{item.location}</p>
                  <p className="">{item.title}</p>
                  <p className="">{item.description}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceList;
