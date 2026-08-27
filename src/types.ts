export type ProjectCategory = 'all' | 'ai' | 'django' | 'flutter';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tagline: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features: string[];
  metrics?: { label: string; value: string }[];
  githubUrl: string;
  liveDemoUrl?: string;
  featured: boolean;
  accentColor: string;
  gradient: string;
  architectureNotes?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0-100
    experience: string;
    icon?: string;
    highlight?: boolean;
  }[];
}

export interface AcademicMilestone {
  period: string;
  title: string;
  institution: string;
  grade: string;
  status: 'completed' | 'in-progress';
  highlights: string[];
  skillsGained: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  scoreOrHonor?: string;
  badgeColor: string;
  description: string;
}

export interface CodingProfile {
  platform: string;
  username: string;
  profileUrl: string;
  icon: string;
  metric: string;
  metricLabel: string;
  highlightColor: string;
}
