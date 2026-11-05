import type { TechItem } from "@/types";

export const TECH_ITEMS: TechItem[] = [
  { name: "Flutter", category: "Mobile", level: "10%", color: "#0284c7", iconText: "FL" },
  { name: "React Native", category: "Mobile", level: "10%", color: "#38bdf8", iconText: "RN" },
  { name: "Next.js / React", category: "Web", level: "10%", color: "#60a5fa", iconText: "NX" },
  { name: "TypeScript", category: "Language", level: "10%", color: "#3b82f6", iconText: "TS" },
  { name: "Tailwind CSS", category: "Design", level: "10%", color: "#06b6d4", iconText: "TW" },
  { name: "Node.js", category: "Web", level: "10%%", color: "#22c55e", iconText: "JS" },
  { name: "Firebase / Supabase", category: "Database", level: "10%", color: "#f59e0b", iconText: "DB" },
  { name: "DaVinci Resolve", category: "Video", level: "10%", color: "#a855f7", iconText: "DR" },
  { name: "Three.js / 3D", category: "Creative", level: "10%", color: "#ec4899", iconText: "3D" },
  { name: "Framer Motion", category: "Design", level: "10%", color: "#f43f5e", iconText: "FM" },
  { name: "Git & GitHub", category: "Language", level: "10%", color: "#e11d48", iconText: "GIT" },
  { name: "C# / Python", category: "Language", level: "10%", color: "#8b5cf6", iconText: "DEV" },
];

export const SKILL_CATEGORIES = [
  "All",
  "Mobile",
  "Web",
  "Language",
  "Database",
  "Design",
  "Video",
] as const;
