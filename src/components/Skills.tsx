import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skills } from "@/data/portfolio";

function Row({ items, reverse }: { items: typeof skills; reverse?: boolean }) {
  // Duplicated once so the loop is seamless at translateX(-50%).
  const looped = [...items, ...items];
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {looped.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="card flex shrink-0 items-center gap-3 px-5 py-3"
          >
            <div className="relative h-8 w-8 shrink-0">
              <Image src={skill.icon} alt="" fill sizes="32px" className="object-contain" />
            </div>
            <span className="whitespace-nowrap text-sm font-medium text-slate-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const half = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, half);
  const row2 = skills.slice(half);

  return (
    <section id="skills" className="overflow-hidden bg-[#0f161d]/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="What I work with" title="Skills & Tools" />
      </div>

      <Reveal className="space-y-4">
        <Row items={row1} />
        <Row items={row2} reverse />
      </Reveal>

      <p className="on-film mt-6 text-center text-xs text-slate-400">
        Hover to pause
      </p>
    </section>
  );
}
