import Image from "next/image";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { profile } from "@/data/portfolio";
import Typing from "./Typing";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6 pt-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Left: copy */}
        <div className="text-center md:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Available for opportunities
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I&apos;m {profile.name.split(" ")[0]}
            <span className="text-emerald-400">.</span>
          </h1>

          <h2 className="mt-3 min-h-[2.2em] text-2xl font-semibold text-slate-300 sm:text-3xl">
            <Typing words={profile.titles} />
          </h2>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-400 md:mx-0">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-medium text-[#06251a] transition-transform hover:scale-105 hover:bg-emerald-400"
            >
              View my work <FiArrowRight />
            </a>
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-slate-200 transition-colors hover:border-emerald-400 hover:text-emerald-400"
              >
                Resume <FiDownload />
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-slate-200 transition-colors hover:border-emerald-400 hover:text-emerald-400"
              >
                Get in touch
              </a>
            )}
          </div>
        </div>

        {/* Right: avatar */}
        <div className="flex justify-center">
          <div className="float-slow relative">
            <div className="absolute -inset-4 rounded-full bg-emerald-500/20 blur-2xl" />
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-emerald-500/40 sm:h-72 sm:w-72">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 640px) 14rem, 18rem"
                className="object-cover object-[center_18%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
