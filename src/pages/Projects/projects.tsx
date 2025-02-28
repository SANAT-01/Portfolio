import React, { useState } from "react";
import { LazyMotion, m, domAnimation } from "framer-motion";
import Modal from "@/components/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "@/constants/constants";
// import { GithubLogo, Link } from "phosphor-react";

interface ProjectProps {
  id: number;
  name: string;
  img: string;
  text: string;
  tools: string;
  link: string;
  github: string;
}

function Project({ name, img, text, tools, id }: ProjectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={
            id !== -1 ? (id % 2 === 0 ? { x: -200 } : { x: 200 }) : { x: 200 }
          }
          whileInView={{ x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-white px-6 py-4 rounded-lg cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div className="relative bg-[#154011] rounded-t-lg flex justify-center items-center overflow-hidden p-2">
            <div className="object-cover h-auto overflow-hidden rounded-lg">
              <img
                src={img}
                alt="Project image"
                className="object-contain w-full h-full transition-transform duration-700 ease-in-out transform hover:scale-110"
              />
            </div>
          </div>

          <div className="bg-[#124011] rounded-b-lg p-5 flex flex-col justify-center">
            <h3 className="text-[#ccd6f6] text-xl">{name}</h3>
          </div>
        </m.div>
      </LazyMotion>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="bg-green-800 text-white min-w-[300px] min-h-[300px] rounded-2xl cursor-pointer">
          <div className="relative flex justify-center items-center overflow-hidden p-2">
            <div className="absolute right-0 bottom-0 bg-[#028418] z-10 text-[#e6f1ff] font-[Poppins] py-4 px-8 ">
              <a>Live Preview</a>
            </div>
            <div className="object-cover h-auto overflow-hidden rounded-lg">
              <img
                src={img}
                alt="Project image"
                className="object-contain w-full h-full transition-transform duration-700 ease-in-out transform hover:scale-110"
              />
            </div>
          </div>

          <div className=" p-5 flex flex-col justify-center">
            <h3 className="text-[#ccd6f6] text-xl">{name}</h3>
            <p className="text-[#ccd6f6] text-base font-light">{text}</p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <FontAwesomeIcon
                className="text-3xl text-green-300 hover:text-primary-400 hover:scale-[1.1] transition-all duration-75"
                icon={icons.faGithub}
                onClick={() => {}}
              />
              <h5 className="font-normal text-[#e29d07] text-xs">{tools}</h5>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Project;
