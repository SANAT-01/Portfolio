import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
};

export default function SectionHeading({ eyebrow, title }: Props) {
  return (
    <Reveal className="mb-14 text-center">
      <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-400/70" />
        {eyebrow}
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-400/70" />
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
