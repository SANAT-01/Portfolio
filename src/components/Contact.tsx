"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiSend } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { socials } from "@/data/portfolio";

// EmailJS config — set these in .env.local (see .env.example).
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "success" | "error";

const socialLinks = [
  { href: socials.github, label: "GitHub", icon: FiGithub },
  { href: socials.linkedin, label: "LinkedIn", icon: FiLinkedin },
  { href: socials.instagram, label: "Instagram", icon: FiInstagram },
  { href: `mailto:${socials.email}`, label: "Email", icon: FiMail },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // No EmailJS keys yet → fall back to the user's mail client.
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

      <div className="grid gap-10 md:grid-cols-2">
        {/* Left: pitch + socials */}
        <Reveal className="flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-white">
            Have a project or role in mind?
          </h3>
          <p className="mt-3 leading-relaxed text-slate-400">
            I&apos;m open to full-time roles, freelance work, and interesting
            collaborations. Drop a message and I&apos;ll get back to you soon.
          </p>
          <a
            href={`mailto:${socials.email}`}
            className="mt-5 inline-flex w-fit items-center gap-2 text-emerald-400 hover:underline"
          >
            <FiMail /> {socials.email}
          </a>
          <div className="mt-6 flex gap-5">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-2xl text-slate-400 transition-colors hover:text-emerald-400"
              >
                <Icon />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-white/5 bg-white/[0.03] p-6"
          >
            <div>
              <label htmlFor="name" className="mb-1 block text-sm text-slate-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-white/10 bg-[#0a0f14] px-4 py-2.5 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-[#0a0f14] px-4 py-2.5 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell me about it..."
                className="w-full resize-none rounded-lg border border-white/10 bg-[#0a0f14] px-4 py-2.5 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-medium text-[#06251a] transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? (
                "Sending..."
              ) : (
                <>
                  Send message <FiSend />
                </>
              )}
            </button>

            {status === "success" && (
              <p className="text-center text-sm text-emerald-400">
                Thanks! Your message has been sent. ✓
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Something went wrong. Please email me directly.
              </p>
            )}
            {!configured && (
              <p className="text-center text-xs text-slate-500">
                Tip: add EmailJS keys to enable in-app sending. Until then this
                opens your mail app.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
