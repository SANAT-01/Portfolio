import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ProjectCover from "./ProjectCover";
import {
  projects as fallbackProjects,
  githubUsername,
  projectImages,
  socials,
} from "@/data/portfolio";
import { getTopRepos, languageColors, type GithubRepo } from "@/lib/github";

// Normalized shape both the live GitHub repos and the static fallback
// projects render through, so the card markup below doesn't need to care
// which source it came from.
type Card = {
  key: string;
  title: string;
  description: string;
  tech: string[];
  language: string | null;
  stars: number | null;
  image?: string;
  codeUrl?: string;
  liveUrl?: string;
  comingSoon?: boolean;
};

export default async function Projects() {
  const repos = await getTopRepos(githubUsername, 6);
  const live = repos.length > 0;

  const cards: Card[] = live
    ? repos.map((r: GithubRepo) => ({
        key: r.name,
        title: r.title,
        description: r.description,
        tech: r.topics.slice(0, 3),
        language: r.language,
        stars: r.stars,
        // Only shows a photo when you've added a real screenshot for this
        // repo in projectImages — otherwise the card keeps the plain
        // numbered cover (GitHub's auto preview card repeats your avatar
        // on every repo, which looks worse than no photo at all).
        image: projectImages[r.name],
        codeUrl: r.htmlUrl,
        liveUrl: r.homepage ?? undefined,
      }))
    : fallbackProjects.map((p, i) => ({
        key: `${p.title}-${i}`,
        title: p.title,
        description: p.description,
        tech: p.tech,
        language: null,
        stars: null,
        image: p.image,
        codeUrl: p.codeUrl,
        liveUrl: p.liveUrl,
        comingSoon: p.comingSoon,
      }));

  return (
    <section id="projects" className="bg-[#0f161d]/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Things I've built"
          title={live ? "Top Repositories" : "Projects"}
        />
        {live && (
          <p className="mx-auto -mt-8 mb-14 max-w-xl text-center text-sm text-slate-500">
            Pulled live from{" "}
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              my GitHub
            </a>
            , ranked by stars.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((project, i) => (
            <Reveal
              key={project.key}
              delay={(i % 3) * 90}
              className="card card-hover group flex flex-col overflow-hidden"
            >
              {/* Cover */}
              <ProjectCover src={project.image} alt={project.title} index={i}>
                {project.comingSoon && (
                  <span className="absolute right-3 top-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-sm">
                    Coming soon
                  </span>
                )}
                {project.stars !== null && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#0a0f14]/70 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur-sm">
                    <FiStar className={project.stars > 0 ? "fill-amber-300" : ""} />
                    {project.stars}
                  </span>
                )}
              </ProjectCover>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {project.language && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            languageColors[project.language] ?? "#34d399",
                        }}
                      />
                      {project.language}
                    </span>
                  )}
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

        {live && (
          <Reveal className="mt-10 text-center">
            <a
              href={`${socials.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <FiGitBranch /> View all repositories
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
