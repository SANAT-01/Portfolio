import type { Metadata } from "next";
import { FiArrowLeft } from "react-icons/fi";
import { profile, socials } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Privacy — ${profile.name}`,
  description: "How this site handles visitor data.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-24">
      <a
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-emerald-300"
      >
        <FiArrowLeft /> Back home
      </a>

      <h1 className="mt-8 text-3xl font-bold text-white sm:text-4xl">
        Privacy
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Short version: this site uses analytics I host myself, it doesn't
        store your IP address, and it doesn't use tracking cookies.
      </p>

      <div className="mt-10 space-y-8 text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white">
            What's collected
          </h2>
          <p className="mt-2 leading-relaxed">
            This site uses{" "}
            <a
              href="https://umami.is"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              Umami
            </a>
            , an open-source analytics tool I run myself, to see how many
            people visit and roughly how they use the site. For each visit it
            records the page viewed, an approximate country/city (derived
            from your IP address at the time of the request), device type,
            browser, operating system, and the referring site, if any.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            What isn't collected
          </h2>
          <p className="mt-2 leading-relaxed">
            Umami doesn't store your IP address — it's used only in the
            moment to estimate location, then discarded. It doesn't set
            tracking cookies, doesn't build a profile of you across visits or
            other sites, and doesn't share data with any third party or ad
            network. No personal or account information is collected,
            because this site doesn't have accounts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">
            Why I collect it
          </h2>
          <p className="mt-2 leading-relaxed">
            Purely to understand which parts of the site people actually
            look at, roughly how many visitors come by, and what devices to
            design for — not for advertising or to identify individual
            visitors.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Questions</h2>
          <p className="mt-2 leading-relaxed">
            Reach out any time at{" "}
            <a
              href={`mailto:${socials.email}`}
              className="text-emerald-400 hover:underline"
            >
              {socials.email}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
