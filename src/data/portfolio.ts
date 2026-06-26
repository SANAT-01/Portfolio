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
    "I build fast, reliable, and thoughtfully designed web applications.",
  location: "India",
  email: "sanattudu.plan@gmail.com",
  resumeUrl: "", // optional: drop a PDF in /public and set e.g. "/resume.pdf"
  avatar: "/assets/profile_pic.png",
};

export const about = {
  intro:
    "I'm a Software Development Engineer with a background in Data Science & AI from IIT Bhilai. I enjoy turning complex problems into clean, performant products — from crafting intuitive UI components to designing the systems behind them.",
  brief:
    "I'm a fast learner who thrives in collaborative teams and cares deeply about code quality, performance, and user experience. I'm always exploring new technologies and looking for opportunities to build things that matter.",
  highlights: [
    { label: "Experience", value: "Software Developer @ Winjit" },
    { label: "Education", value: "B.Tech DSAI, IIT Bhilai" },
    { label: "Focus", value: "Web · Full-Stack · AI" },
    { label: "Location", value: "India" },
  ],
};

export type Skill = { name: string; icon: string };

export const skills: Skill[] = [
  { name: "JavaScript", icon: "/assets/skills/javascript.png" },
  { name: "React.js", icon: "/assets/skills/react.png" },
  { name: "Next.js", icon: "/assets/skills/nextjs.png" },
  { name: "Angular", icon: "/assets/skills/angular.png" },
  { name: "HTML", icon: "/assets/skills/html.png" },
  { name: "CSS", icon: "/assets/skills/css.png" },
  { name: "Tailwind", icon: "/assets/skills/tailwind.png" },
  { name: "Sass", icon: "/assets/skills/saas.png" },
  { name: "Java", icon: "/assets/skills/java.png" },
  { name: "SQL", icon: "/assets/skills/Sql.png" },
  { name: "MongoDB", icon: "/assets/skills/Mongo.png" },
  { name: "Kubernetes", icon: "/assets/skills/kubernetes.png" },
  { name: "Git", icon: "/assets/skills/git.png" },
  { name: "Appian", icon: "/assets/skills/appian.png" },
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
    title: "Software Developer",
    org: "Winjit Technologies",
    location: "Onsite, India",
    period: "2024 — Present",
    description:
      "Building and improving advanced UI components and enhancing user experience across products. Collaborating across teams to ship reliable, performant features.",
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
};

// Placeholder projects — replace with your real work.
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
    tech: ["Angular", "Sass", "REST API"],
    comingSoon: true,
  },
];

export const socials = {
  github: "https://github.com/SANAT-01",
  linkedin: "https://www.linkedin.com/in/sanat-tudu/",
  instagram: "https://instagram.com/_sanat_tudu",
  email: "sanattudu.plan@gmail.com",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
