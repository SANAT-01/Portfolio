import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { socials, profile, navLinks } from "@/data/portfolio";

const links = [
  { href: socials.github, label: "GitHub", icon: FiGithub },
  { href: socials.linkedin, label: "LinkedIn", icon: FiLinkedin },
  { href: `mailto:${socials.email}`, label: "Email", icon: FiMail },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <a href="#home" className="text-lg font-bold text-white">
            <span className="text-emerald-400">{"<"}</span>
            {profile.name.split(" ")[0]}
            <span className="text-emerald-400">{" />"}</span>
          </a>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-slate-400 transition-colors hover:text-emerald-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {links.map(({ href, label, icon: Icon }) => (
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

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js &
            Tailwind.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-emerald-300"
          >
            Back to top <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
