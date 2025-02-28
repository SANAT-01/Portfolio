"use client";
import React from "react";
import school from "../../../public/assets/school.jpg";
import college from "../../../public/assets/college.jpg";
import { motion } from "framer-motion";
import SectionTitle from "../Contact/sectionTitle";

const Background = () => {
  const itemVariantsLeft = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0 },
  };
  const itemVariantsRight = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0 },
  };
  const educationData = [
    {
      type: "Graduated",
      img: college,
      college: "IIT Bhilai",
      place: "Bhilai, Chhattisgarh",
      batch: "2024 Passed out",
      course: "Data Science and Artificial Intelligence",
      cgpa: "7.9",
    },
    {
      type: "Higher Secondary",
      img: school,
      school: "Kendriya Vidyalaya Santragachi, Howrah, West Bengal",
      place: "Howrah, West Bengal",
      batch: "2019-2020 Passed out",
      group: "Computer Science",
      percentage: "92%",
    },
  ];
  return (
    <div id="background" className="w-full flex flex-col items-center ">
      <div className="px-10 w-full md:w-[90%]">
        <div className="w-full">
          <SectionTitle title="Experiences" subtitle="" />
        </div>
        <div className="items-center">
          <div className="">
            <div className="w-full ">
              {educationData.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    variants={
                      index % 2 == 0 ? itemVariantsLeft : itemVariantsRight
                    }
                    initial="hidden"
                    whileInView="show"
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className=" bg-[rgba(255,255,255,0.02)] rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center px-5 justify-start">
                      {/* <Image
                        src={item.img.src}
                        fill={true}
                        alt={item.type}
                        className="w-full h-60 rounded-xl object-cover"
                      /> */}
                    </div>
                    <motion.div
                      variants={
                        index % 2 == 0 ? itemVariantsLeft : itemVariantsRight
                      }
                      initial="hidden"
                      whileInView="show"
                      transition={{ duration: 1, delay: 0.5 }}
                      className="px-6 w-full flex flex-col justify-center gap-1 py-4 text-white"
                    >
                      <h3 className="text-lg font-semibold">
                        {item.college || item.school}
                      </h3>{" "}
                      <p className="">{item.place}</p>
                      <p className="">{item.type}</p>
                      <p className="">{item.batch}</p>
                      {item.course && <p className="">{item.course}</p>}
                      {item.cgpa && <p className="">CGPA: {item.cgpa}</p>}
                      {item.group && <p className="">{item.group}</p>}
                      {item.percentage && (
                        <p className="">Percentage: {item.percentage}</p>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
            <motion.div className="rounded-lg shadow-md p-6">
              <motion.div
                variants={itemVariantsRight}
                initial="hidden"
                whileInView="show"
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col gap-2 justify-center justify-items-start mb-4 bg-[rgba(255,255,255,0.02)] p-1 text-white"
              >
                <h2 className="text-lg font-semibold">Winjit Technologies</h2>
                <p className="text-white-500">Full Time</p>
                <motion.div className="mb-4">
                  <h3 className="font-semibold">Tech Stack:</h3>
                  <p>React Js</p>
                </motion.div>
                <motion.p className="mb-4 text-justify">
                  Trained extensively in creating comprehensive business process
                  applications, leveraging the react js.
                </motion.p>
                <motion.p className="mb-4 text-justify">
                  Developed and implemented a Pre-Sale Notice application using
                  the react js with business requirements, where I contributed
                  especially on Frontend and programming logic by creating user
                  interfaces with approval forms for the business internal
                  environment and the flow of operation using process model.
                </motion.p>
                <motion.p className="mb-4">Work Experience: --</motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
