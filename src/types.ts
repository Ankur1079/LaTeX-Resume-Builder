/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  duration: string;
  repoUrl: string;
  repoText: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  gpaOrPercentage: string;
  duration: string;
  location: string;
}

export interface ActivityItem {
  id: string;
  description: string;
  duration: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  duration: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: SkillCategory[];
  workExperience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  activities: ActivityItem[];
  certifications: CertificationItem[];
}

export interface ColorAccent {
  name: string;
  hex: string;
  rgb: string; // Formatting in LaTeX e.g., "46, 116, 181"
  tailwindClass: string;
}
