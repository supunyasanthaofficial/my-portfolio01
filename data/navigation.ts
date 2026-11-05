import type { NavLink, SocialLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "dev-lab", label: "Lab", desktopOnly: true },
  { id: "contact", label: "Contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", url: "https://www.linkedin.com/feed/" },
  { label: "GitHub", url: "https://github.com/supunyasanthaofficial" },
  { label: "Instagram", url: "https://instagram.com" },
  { label: "Facebook", url: "https://facebook.com" },
];
