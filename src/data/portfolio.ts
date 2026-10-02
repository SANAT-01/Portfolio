// Single source of truth for all portfolio content.
// Edit this file to update the site — components read everything from here.

export const profile = {
  name: "Sanat Tudu",
  role: "Software Development Engineer",
  // Rotated in the hero typing animation.
  titles: [
    "Software Development Engineer",
    "Full-Stack Developer",
    "Problem Solver",
  ],
  tagline:
    "I build fast, reliable web applications and optimize the backend services and DevOps pipelines behind them.",
  location: "India",
  email: "sanat.tudu.tech@gmail.com",
  // Direct Google Drive file link (not a folder link — those open a file
  // browser, not the document). Clicking Resume opens this in a new tab
  // on Drive's viewer. Get one from Drive: right-click the PDF → Share →
  // "Anyone with the link" → Copy link.
  resumeUrl:
    "https://drive.google.com/file/d/1z4QVk-BkVSZvGSDm2RNkvJ-pclYeC7zC/view?usp=sharing",
  avatar: "/assets/profile_pic.png",
};

export const about = {
  intro:
    "I'm a Software Development Engineer with a background in Data Science & AI from IIT Bhilai. My work spans the full stack — crafting intuitive UI components, and optimizing the backend services and DevOps pipelines that keep products fast and reliable.",
  brief:
    "I'm a fast learner who thrives in collaborative teams and cares deeply about code quality, performance, and user experience. I'm always exploring new technologies and looking for opportunities to build things that matter.",
  highlights: [
    { label: "Experience", value: "Software Engineer @ Winjit" },
    { label: "Education", value: "B.Tech DSAI, IIT Bhilai" },
    { label: "Focus", value: "Full-Stack · DevOps · AI" },
    { label: "Location", value: "India" },
  ],
};

export type Skill = { name: string; icon: string };

export const skills: Skill[] = [
  { name: "JavaScript", icon: "/assets/skills/javascript.png" },
  { name: "TypeScript", icon: "/assets/skills/typescript.svg" },
  { name: "React.js", icon: "/assets/skills/react.png" },
  { name: "Next.js", icon: "/assets/skills/nextjs.png" },
  { name: "Node.js", icon: "/assets/skills/nodejs.svg" },
  { name: "Nest.js", icon: "/assets/skills/nestjs.svg" },
  { name: "Express.js", icon: "/assets/skills/express.svg" },
  { name: "HTML", icon: "/assets/skills/html.png" },
  { name: "CSS", icon: "/assets/skills/css.png" },
  { name: "Tailwind", icon: "/assets/skills/tailwind.png" },
  { name: "Sass", icon: "/assets/skills/saas.png" },
  { name: "Java", icon: "/assets/skills/java.png" },
  { name: "Python", icon: "/assets/skills/python.svg" },
  { name: "SQL", icon: "/assets/skills/Sql.png" },
  { name: "MongoDB", icon: "/assets/skills/Mongo.png" },
  { name: "Redis", icon: "/assets/skills/redis.svg" },
  { name: "GraphQL", icon: "/assets/skills/graphql.svg" },
  { name: "AWS", icon: "/assets/skills/aws.svg" },
  { name: "Docker", icon: "/assets/skills/docker.svg" },
  { name: "Kubernetes", icon: "/assets/skills/kubernetes.png" },
  { name: "Jenkins", icon: "/assets/skills/jenkins.svg" },
  { name: "Git", icon: "/assets/skills/git.png" },
  { name: "GitHub", icon: "/assets/skills/github.svg" },
];

export type Experience = {
  title: string;
  org: string;
  location: string;
  period: string;
  description: string;
};

export const experience: Experience[] = [
  {
    title: "Software Engineer",
    org: "Winjit Technologies",
    location: "Onsite, India",
    period: "2026 — Present",
    description:
      "Promoted from Software Developer. Building advanced UI components while optimizing backend services and DevOps pipelines for performance and reliability. Collaborating across teams to ship reliable, performant features.",
  },
  {
    title: "Software Developer",
    org: "Winjit Technologies",
    location: "Onsite, India",
    period: "2024 — 2026",
    description:
      "Built and shipped UI components and full-stack features, and optimized backend services and DevOps workflows, working closely with design and backend teams.",
  },
  {
    title: "B.Tech — Data Science & AI",
    org: "Indian Institute of Technology, Bhilai",
    location: "Bhilai, Chhattisgarh",
    period: "2020 — 2024",
    description:
      "Built a strong foundation in Machine Learning, Data Science, and Artificial Intelligence, alongside core computer science and software engineering.",
  },
  {
    title: "Senior Secondary — Computer Science",
    org: "Kendriya Vidyalaya Santragachi",
    location: "Howrah, West Bengal",
    period: "2018 — 2020",
    description:
      "Started programming here — built projects with Python and MySQL and discovered a love for building software.",
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
  comingSoon?: boolean;
  /** Cover photo — a path from /public (e.g. "/assets/projects/foo.png")
   *  or a full https:// URL. Shows the "01/02/03" placeholder if unset. */
  image?: string;
};

// Fallback shown only if the live GitHub fetch in Projects.tsx fails
// (e.g. offline dev, or the API rate limit is hit) — edit freely.
export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A short description of a project you're proud of. What problem did it solve and what was your impact?",
    tech: ["React", "Next.js", "TypeScript"],
    comingSoon: true,
  },
  {
    title: "Project Two",
    description:
      "Highlight the tech you used and the results — performance gains, users served, or features shipped.",
    tech: ["Node.js", "MongoDB", "Express"],
    comingSoon: true,
  },
  {
    title: "Project Three",
    description:
      "Another standout build. Add a live link and the source repo so recruiters can explore it.",
    tech: ["Nest.js", "Docker", "REST API"],
    comingSoon: true,
  },
];

export const socials = {
  github: "https://github.com/SANAT-01",
  linkedin: "https://www.linkedin.com/in/sanat-tudu/",
  email: "sanat.tudu.tech@gmail.com",
};

// GitHub username the Projects section pulls starred repos from — see
// src/lib/github.ts.
export const githubUsername = "SANAT-01";

// Cover photos for the live GitHub projects, keyed by repo name exactly as
// it appears in the URL on GitHub (case-sensitive), e.g. "Rate-Limiter" for
// github.com/SANAT-01/Rate-Limiter. Each value is a path from /public (drop
// the image in public/assets/projects/ first) or a full https:// URL.
//
// Any repo left out here falls back to GitHub's own auto-generated social
// preview image for that repo, so every live project gets *some* photo —
// add an entry only for repos you want a custom screenshot on.
export const projectImages: Record<string, string> = {
  // "Rate-Limiter": "/assets/projects/rate-limiter.png",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
