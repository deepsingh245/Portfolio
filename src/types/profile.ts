export interface SocialLink {
  label: string;
  url: string;
  kind: "github" | "linkedin" | "x" | "email" | "resume";
  download?: boolean;
}

export interface ProfileIdentity {
  name: string;
  title: string;
  location: string;
  taglineWords: string[];
  intro: string;
  summary: string;
  aboutBullets: string[];
  focusAreas: string[];
  recruiterPitch: string;
  links: SocialLink[];
}

export interface ExperienceProject {
  title: string;
  tag: string;
  icon: "shield" | "users" | "zap";
  description: string[];
  tech: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  projects?: ExperienceProject[];
}

export interface ProfileProject {
  name: string;
  description: string;
  longDescription: string;
  timeline: string;
  techStack: string[];
  liveHref?: string;
  sourceHref?: string;
  downloads?: {
    android?: string;
    ios?: string;
    windows?: string;
    mac?: string;
    linux?: string;
  };
  visual: "billety" | "client-trace" | "css-grid-playground" | "linkedloom" | "attendify";
  icon: "file-text" | "npm" | "globe" | "scan-face";
  featuredFor: string[];
}

export interface SkillItem {
  name: string;
  rating: number;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface Achievement {
  title: string;
  description: string;
  icon: "trophy" | "star" | "code";
  color: string;
}

export interface ResumeFact {
  label: string;
  value: string;
}

export interface ChatbotKnowledge {
  identity: ProfileIdentity;
  experience: ExperienceEntry[];
  projects: ProfileProject[];
  skillCategories: SkillCategory[];
  achievements: Achievement[];
  resumeFacts: ResumeFact[];
  faqSeeds: string[];
}
