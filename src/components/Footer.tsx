import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { socials, profile } from "@/data/portfolio";

const links = [
  { href: socials.github, label: "GitHub", icon: FiGithub },
  { href: socials.linkedin, label: "LinkedIn", icon: FiLinkedin },
  { href: socials.instagram, label: "Instagram", icon: FiInstagram },
  { href: `mailto:${socials.email}`, label: "Email", icon: FiMail },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js &
          Tailwind.
        </p>
        <div className="flex items-center gap-5">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-xl text-slate-400 transition-colors hover:text-emerald-400"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
