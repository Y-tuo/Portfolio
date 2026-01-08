import { Lightbulb, PenTool, Users, Search, Layout, Rocket, Mail, Linkedin, Dribbble, Twitter, Github } from "lucide-react";
import { Project, MethodologyStep, WhyMePoint, SocialLink, Hobby } from "./types";

export const NAV_LINKS = [
  { name: "首页", href: "#hero" }, // Home
  { name: "关于我", href: "#about" }, // About
  { name: "我的优势", href: "#whyme" }, // My Advantages
  { name: "项目展示", href: "#projects" }, // Projects
  { name: "工作之余", href: "#afterwork" }, // After Work
  { name: "联系我", href: "#contact" }, // Contact
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

export const METHODOLOGY: MethodologyStep[] = [
  {
    title: "Discover",
    description: "Deep diving into user needs and business goals through research and empathy.",
    icon: Search,
  },
  {
    title: "Define",
    description: "Synthesizing insights to pinpoint the core problem and strategy.",
    icon: Lightbulb,
  },
  {
    title: "Ideate",
    description: "Brainstorming and sketching diverse solutions without constraints.",
    icon: PenTool,
  },
  {
    title: "Prototype",
    description: "Building low to high-fidelity interactive models for testing.",
    icon: Layout,
  },
  {
    title: "Test & Launch",
    description: "Validating with real users and refining for final delivery.",
    icon: Rocket,
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