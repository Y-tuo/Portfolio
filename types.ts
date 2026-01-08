import { LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  color: string;
}

export interface MethodologyStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface WhyMePoint {
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface Hobby {
  title: string;
  image: string;
  description: string;
}