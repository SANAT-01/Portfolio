import { FiGithub, FiExternalLink } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { projects } from "@/data/portfolio";

export default function Projects() {
  return (
    <section id="projects" className="bg-[#0f161d]/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Things I've built" title="Projects" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={(i % 3) * 90}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-emerald-500/40"
            >
              {/* Cover */}
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-emerald-500/15 to-slate-800/40">
                <span className="text-5xl font-bold text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {project.comingSoon && (
                  <span className="absolute right-3 top-3 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
                    Coming soon
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4 text-sm">
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-emerald-400"
                    >
                      <FiGithub /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-emerald-400"
                    >
                      <FiExternalLink /> Live
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
