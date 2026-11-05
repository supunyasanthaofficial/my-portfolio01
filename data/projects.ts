import type { Project } from "@/types";
import A2 from "@/images/A2.png";
import P2 from "@/images/P2.jpg";
import Bigger2 from "@/images/Bigger2.png";
import P4 from "@/images/P4.jpg";

export const PROJECTS: Project[] = [
  {
    title: "Auroo Mobile App",
    category: "Flutter",
    image: A2,
    description:
      "A feature-rich mobile application for seamless audio streaming and discovery, built with Flutter and Dart for cross-platform performance.",
    tags: ["Flutter", "Dart", "Firebase", "REST API"],
    githubUrl: "https://github.com/supunyasanthaofficial",
  },
  {
    title: "Portfolio",
    category: "Next.js",
    image: P2,
    description:
      "A creative developer portfolio with smooth scroll animations, 3D interactions, and a cinematic design language built with Next.js and Framer Motion.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    liveUrl: "https://supunyasantha.vercel.app",
    githubUrl: "https://github.com/supunyasanthaofficial/my-portfolio01",
  },
  {
    title: "Bigger2",
    category: "Flutter",
    image: Bigger2,
    description:
      "A dynamic mobile platform delivering an engaging user experience with real-time data, clean UI components, and offline-first architecture.",
    tags: ["Flutter", "Dart", "SQLite", "Provider"],
    githubUrl: "https://github.com/supunyasanthaofficial",
  },
  {
    title: "Diferencia Globle",
    category: "React",
    image: P4,
    description:
      "A globally-connected web application that bridges digital experiences across borders, built with React and modern web technologies.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    githubUrl: "https://github.com/supunyasanthaofficial",
  },
];
