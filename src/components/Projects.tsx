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
              className="card card-hover group flex flex-col overflow-hidden"
            >
              {/* Cover */}
              <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-emerald-500/20 via-teal-500/[0.06] to-transparent">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
                <div className="absolute -bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
                <span className="relative text-6xl font-extrabold tracking-tight text-white/10 transition-colors duration-300 group-hover:text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {project.comingSoon && (
                  <span className="absolute right-3 top-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-sm">
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
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
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
