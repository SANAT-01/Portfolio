"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSend,
  FiMapPin,
  FiCopy,
  FiCheck,
  FiArrowUpRight,
} from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { profile, socials } from "@/data/portfolio";

// EmailJS config — set these in .env.local (see .env.example).
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "success" | "error";

const channels = [
  {
    href: `mailto:${socials.email}`,
    label: "Email",
    value: socials.email,
    icon: FiMail,
    external: false,
  },
  {
    href: socials.linkedin,
    label: "LinkedIn",
    value: "in/sanat-tudu",
    icon: FiLinkedin,
    external: true,
  },
  {
    href: socials.github,
    label: "GitHub",
    value: "SANAT-01",
    icon: FiGithub,
    external: true,
  },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${socials.email}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // No EmailJS keys yet → fall back to the visitor's mail client.
    if (!configured) {
      const data = new FormData(formRef.current);
      const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
      const body = encodeURIComponent(
        `${data.get("message")}\n\nReply to: ${data.get("email")}`
      );
      window.location.href = `mailto:${socials.email}?subject=${subject}&body=${body}`;
      return;
    }

    try {
      setStatus("sending");
      await emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, formRef.current, {
        publicKey: PUBLIC_KEY!,
      });
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Let's connect" title="Get in touch" />

      <Reveal className="card overflow-hidden p-0">
        <div className="grid md:grid-cols-5">
          {/* Left: pitch + channels */}
          <div className="relative flex flex-col justify-between gap-10 overflow-hidden border-b border-white/[0.07] bg-gradient-to-br from-emerald-500/[0.12] via-transparent to-teal-500/[0.06] p-8 md:col-span-2 md:border-b-0 md:border-r md:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative">
              <h3 className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
                Have a project or role in mind?
              </h3>
              <p className="mt-4 leading-relaxed text-slate-400">
                I&apos;m open to full-time roles, freelance work, and
                interesting collaborations. Drop a message and I&apos;ll get
                back to you soon.
              </p>
            </div>

            <ul className="relative space-y-3">
              {channels.map(({ href, label, value, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-400/[0.06]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-lg text-emerald-300">
                      <Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-wider text-slate-500">
                        {label}
                      </span>
                      <span className="block break-all text-sm font-medium text-slate-200">
                        {value}
                      </span>
                    </span>
                    <FiArrowUpRight className="shrink-0 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300" />
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-lg text-emerald-300">
                  <FiMapPin />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-slate-500">
                    Based in
                  </span>
                  <span className="block text-sm font-medium text-slate-200">
                    {profile.location}
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Right: form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5 p-8 md:col-span-3 md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="field"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Tell me about your project, role, or idea..."
                className="field resize-none"
              />
            </div>

            <div className="flex flex-col-reverse items-stretch gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-emerald-300"
              >
                {copied ? (
                  <>
                    <FiCheck className="text-emerald-400" /> Email copied
                  </>
                ) : (
                  <>
                    <FiCopy /> Copy my email
                  </>
                )}
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary sm:px-8"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    Send message <FiSend />
                  </>
                )}
              </button>
            </div>

            <div aria-live="polite">
              {status === "success" && (
                <p className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-center text-sm text-emerald-300">
                  Thanks! Your message has been sent. I&apos;ll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-center text-sm text-red-300">
                  Something went wrong. Please email me directly at{" "}
                  <a href={`mailto:${socials.email}`} className="underline">
                    {socials.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
