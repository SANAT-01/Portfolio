import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { about } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Get to know me" title="About" />

      <div className="grid items-start gap-10 md:grid-cols-5">
        <Reveal className="space-y-5 md:col-span-3">
          <p className="text-lg leading-relaxed text-slate-300">
            {about.intro}
          </p>
          <p className="leading-relaxed text-slate-400">{about.brief}</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 md:col-span-2">
          {about.highlights.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 80}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:border-emerald-500/40"
            >
              <p className="text-xs uppercase tracking-wider text-emerald-400">
                {item.label}
              </p>
              <p className="mt-1 font-medium text-white">{item.value}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
