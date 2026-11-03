"use client";

import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks, profile } from "@/data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Site-wide scroll progress, measured across the whole page.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // The mobile menu is hidden at md+, so close it if the viewport grows
  // past that (rotation, window resize) — otherwise the scroll lock below
  // stays on and the desktop page can't be scrolled.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#0a0f14]/75 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Whole-page scroll progress */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.04]">
        <div
          className="h-full origin-left bg-gradient-to-r from-emerald-400 to-teal-300"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="group text-lg font-bold text-white">
          <span className="text-emerald-400">{"<"}</span>
          {profile.name.split(" ")[0]}
          <span className="text-emerald-400">{" />"}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active === link.href
                    ? "bg-white/[0.06] text-emerald-300"
                    : "text-slate-300 hover:text-emerald-300"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="#contact"
              className="btn-primary px-5 py-2 text-sm"
            >
              Let&apos;s talk
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="text-2xl text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* Mobile menu */}
      {/* inert while closed: the collapsed links are invisible, so keep
          them out of the Tab order and the accessibility tree. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`flex flex-col items-center gap-6 overflow-hidden bg-[#0a0f14]/95 backdrop-blur-md transition-all duration-300 ${
            open ? "max-h-screen py-8" : "max-h-0 py-0"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-lg transition-colors hover:text-emerald-300 ${
                active === link.href ? "text-emerald-300" : "text-slate-200"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
