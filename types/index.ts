import type { StaticImageData } from "next/image";

export interface Project {
  title: string;
  category: string;
  image: StaticImageData;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export type TechCategory =
  | "Mobile"
  | "Web"
  | "Language"
  | "Database"
  | "Design"
  | "Video"
  | "Creative";

export interface TechItem {
  name: string;
  category: TechCategory;
  level: string;
  color: string;
  iconText: string;
}

export interface StoryItem {
  year: string;
  title: string;
  description: string;
}

export interface NavLink {
  id: string;
  label: string;
  desktopOnly?: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
}
