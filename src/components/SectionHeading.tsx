import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
};

export default function SectionHeading({ eyebrow, title }: Props) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-emerald-500" />
    </Reveal>
  );
}
