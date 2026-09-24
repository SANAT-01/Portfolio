import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skills } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="bg-[#0f161d]/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="What I work with" title="Skills & Tools" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {skills.map((skill, i) => (
            <Reveal
              key={skill.name}
              delay={(i % 5) * 60}
              className="card card-hover group flex flex-col items-center gap-3 p-6"
            >
              <div className="relative h-12 w-12">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  sizes="48px"
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
                {skill.name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
