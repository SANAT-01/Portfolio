"use client";
import SectionTitle from "@/pages/Contact/sectionTitle";
import { projects } from "@/constants/projects";
import Project from "./projects";

const Contact = () => {
  return (
    <div
      id="projects"
      className="w-full flex flex-col items-center justify-center"
    >
      <div className="px-10 w-full md:w-[90%]">
        <div className="w-full">
          <SectionTitle title="Projects" subtitle="" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {projects?.map((project, index) => (
            <Project
              key={index}
              id={index}
              img={project?.img}
              name={project?.name}
              text={project?.text}
              tools={project?.tools}
              link={project?.link}
              github={project?.github}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
