import Image from "next/image";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile, socials } from "@/data/portfolio";
import Typing from "./Typing";

const heroSocials = [
  { href: socials.github, label: "GitHub", icon: FiGithub },
  { href: socials.linkedin, label: "LinkedIn", icon: FiLinkedin },
  { href: `mailto:${socials.email}`, label: "Email", icon: FiMail },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6 pb-16 pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-2">
        {/* Left: copy */}
        <div className="text-center md:text-left">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-4 py-1.5 text-sm text-emerald-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-gradient">{profile.name.split(" ")[0]}</span>
            <span className="text-emerald-400">.</span>
          </h1>

          <h2 className="mt-4 min-h-[2.2em] text-2xl font-semibold text-slate-300 sm:text-3xl">
            <Typing words={profile.titles} />
          </h2>

          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-slate-400 md:mx-0">
            {profile.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a href="#projects" className="btn-primary group">
              View my work
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Resume <FiDownload />
              </a>
            ) : (
              <a href="#contact" className="btn-ghost">
                Get in touch
              </a>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 md:justify-start">
            {heroSocials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="icon-btn"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Right: avatar */}
        <div className="flex justify-center">
          <div className="float-slow relative">
            <div className="absolute -inset-8 rounded-full bg-emerald-500/20 blur-3xl" />
            {/* Rotating gradient ring */}
            <div className="spin-slow absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,#34d399,transparent_30%,#2dd4bf_55%,transparent_80%,#34d399)]" />
            <div className="relative h-60 w-60 overflow-hidden rounded-full border-4 border-[#0a0f14] sm:h-80 sm:w-80">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 640px) 15rem, 20rem"
                className="object-cover object-[center_18%]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-white/20 pt-2 transition-colors hover:border-emerald-400/60">
          <span className="scroll-dot h-2 w-1 rounded-full bg-emerald-400" />
        </span>
      </a>
    </section>
  );
}
