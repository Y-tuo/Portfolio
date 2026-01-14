import { Mail, Linkedin, Dribbble, Twitter, Home, User, Star, Briefcase, Coffee, MessageCircle } from "lucide-react";
import { Project, WhyMePoint, SocialLink, Hobby } from "./types";

export const NAV_LINKS = [
  { name: "首页", href: "#hero", icon: Home }, // Home
  { name: "关于我", href: "#about", icon: User }, // About
  { name: "我的优势", href: "#whyme", icon: Star }, // My Advantages
  { name: "项目展示", href: "#projects", icon: Briefcase }, // Projects
  { name: "工作之余", href: "#afterwork", icon: Coffee }, // After Work
  { name: "联系我", href: "#contact", icon: MessageCircle }, // Contact
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "FinTech Dashboard",
    category: "Web App",
    image: "https://picsum.photos/800/600?random=1",
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "EcoTravel Mobile",
    category: "iOS / Android",
    image: "https://picsum.photos/800/600?random=2",
    color: "bg-emerald-500",
  },
  {
    id: "3",
    title: "SaaS Analytics",
    category: "B2B Platform",
    image: "https://picsum.photos/800/600?random=3",
    color: "bg-indigo-500",
  }
];

export const WHY_ME: WhyMePoint[] = [
  {
    title: "User-Centric Mindset",
    description: "I don't just design screens; I craft experiences rooted in genuine human needs and behaviors.",
  },
  {
    title: "Pixel Perfect Precision",
    description: "An obsession with details ensures that the final product looks exactly as intended, down to the last pixel.",
  },
  {
    title: "Code-Aware Design",
    description: "Understanding frontend constraints helps me create feasible, scalable, and developer-friendly designs.",
  }
];

export const HOBBIES: Hobby[] = [
  {
    title: "Street Photography",
    description: "Capturing the raw moments of city life.",
    image: "https://picsum.photos/400/300?random=10",
  },
  {
    title: "Indie Game Dev",
    description: "Experimenting with pixel art and Unity.",
    image: "https://picsum.photos/400/300?random=11",
  },
  {
    title: "Coffee Brewing",
    description: "Exploring the science behind the perfect pour-over.",
    image: "https://picsum.photos/400/300?random=12",
  },
];

export const SOCIALS: SocialLink[] = [
  { name: "Email", url: "mailto:hello@wangaoyun.design", icon: Mail },
  { name: "LinkedIn", url: "#", icon: Linkedin },
  { name: "Dribbble", url: "#", icon: Dribbble },
  { name: "Twitter", url: "#", icon: Twitter },
];