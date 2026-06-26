import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="My journey" title="Experience & Education" />

      <div className="relative mx-auto max-w-3xl">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 h-full w-px bg-gradient-to-b from-emerald-500/60 via-white/10 to-transparent md:left-1/2" />

        <div className="space-y-10">
          {experience.map((item, i) => (
            <Reveal
              key={`${item.org}-${i}`}
              className={`relative pl-12 md:w-1/2 ${
                i % 2 === 0
                  ? "md:ml-auto md:pl-12"
                  : "md:mr-auto md:pl-0 md:pr-12 md:text-right"
              }`}
            >
              {/* Node */}
              <span
                className={`absolute top-1.5 h-6 w-6 rounded-full border-4 border-[#0a0f14] bg-emerald-500 left-0 ${
                  i % 2 === 0
                    ? "md:-left-3"
                    : "md:left-auto md:-right-3"
                }`}
              />
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:border-emerald-500/40">
                <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                  {item.period}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300">
                  {item.org} · {item.location}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
