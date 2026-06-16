/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  ResumeData,
  PersonalInfo,
  SkillCategory,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  ActivityItem,
  CertificationItem,
  ColorAccent
} from "../types";
import {
  User,
  Tags,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Award,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Link2,
  MapPin,
  Mail,
  Phone,
  FileText
} from "lucide-react";

interface EditorPanelProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  selectedAccent: ColorAccent;
  onAccentChange: (accent: ColorAccent) => void;
  accents: ColorAccent[];
}

type TabType = "personal" | "skills" | "experience" | "projects" | "education" | "activities";

export const EditorPanel: React.FC<EditorPanelProps> = ({
  data,
  onChange,
  selectedAccent,
  onAccentChange,
  accents
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  // Helper to update personal info
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  // Helper to update state lists generic helper
  const updateListItem = <T extends { id: string }>(
    key: keyof ResumeData,
    id: string,
    updater: (item: T) => T
  ) => {
    const list = data[key] as T[];
    const newList = list.map((item) => (item.id === id ? updater(item) : item));
    onChange({
      ...data,
      [key]: newList
    });
  };

  // Helper to add to lists
  const addListItem = (key: keyof ResumeData, newItem: any) => {
    onChange({
      ...data,
      [key]: [...(data[key] as any), newItem]
    });
  };

  // Helper to delete from lists
  const deleteListItem = (key: keyof ResumeData, id: string) => {
    onChange({
      ...data,
      [key]: (data[key] as any[]).filter((item) => item.id !== id)
    });
  };

  // Move item up
  const moveItemUp = (key: keyof ResumeData, index: number) => {
    if (index === 0) return;
    const newList = [...(data[key] as any[])];
    const prev = newList[index - 1];
    newList[index - 1] = newList[index];
    newList[index] = prev;
    onChange({
      ...data,
      [key]: newList
    });
  };

  // Move item down
  const moveItemDown = (key: keyof ResumeData, index: number) => {
    const newList = [...(data[key] as any[])];
    if (index === newList.length - 1) return;
    const next = newList[index + 1];
    newList[index + 1] = newList[index];
    newList[index] = next;
    onChange({
      ...data,
      [key]: newList
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 flex flex-col h-full overflow-hidden">
      {/* Accent Color Chooser & Core Title */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-500" />
            Resume Customizer
          </h2>
          <p className="text-xs text-slate-500">Edit fields to dynamically compile TeX.</p>
        </div>

        {/* Accent Colors */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Accent Style:</span>
          <div className="flex items-center gap-1.5">
            {accents.map((acc) => (
              <button
                key={acc.name}
                onClick={() => onAccentChange(acc)}
                title={acc.name}
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  selectedAccent.name === acc.name
                    ? "border-slate-800 scale-110 shadow-sm"
                    : "border-transparent opacity-80 hover:scale-105 hover:opacity-100"
                }`}
                style={{ backgroundColor: acc.hex }}
              >
                {selectedAccent.name === acc.name && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none bg-slate-50/50">
        {[
          { id: "personal", label: "Contact", icon: User },
          { id: "skills", label: "Skills", icon: Tags },
          { id: "experience", label: "Work Exp", icon: Briefcase },
          { id: "projects", label: "Projects", icon: FolderGit2 },
          { id: "education", label: "Education", icon: GraduationCap },
          { id: "activities", label: "Certs & Activities", icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "border-slate-800 text-slate-900 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/40"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* PERSONAL INFO TAB */}
        {activeTab === "personal" && (
          <div className="space-y-4">
            <div className="border bg-slate-50/50 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <User className="w-3.5 h-3.5" /> Identity & Title
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={data.personalInfo.name}
                    onChange={(e) => updatePersonalInfo("name", e.target.value)}
                    placeholder="Kiran Mahajan"
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Job Subtitle</label>
                  <input
                    type="text"
                    value={data.personalInfo.title}
                    onChange={(e) => updatePersonalInfo("title", e.target.value)}
                    placeholder="Software Development Engineer"
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="border bg-slate-50/50 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Link2 className="w-3.5 h-3.5" /> Contact Details & Links
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" /> Phone Number
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    placeholder="(+91) 7758829165"
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> Location / Address
                  </label>
                  <input
                    type="text"
                    value={data.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    placeholder="Muktainagar, Maharashtra, IN"
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    placeholder="thekiranmahajan@gmail.com"
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">GitHub (no https://)</label>
                  <input
                    type="text"
                    value={data.personalInfo.github}
                    onChange={(e) => updatePersonalInfo("github", e.target.value)}
                    placeholder="github.com/thekiranmahajan"
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">LinkedIn (no https://)</label>
                  <input
                    type="text"
                    value={data.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/thekiranmahajan"
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Portfolio (no https://)</label>
                  <input
                    type="text"
                    value={data.personalInfo.portfolio}
                    onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
                    placeholder="thekiranmahajan.github.io"
                    className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Skill Subcategories</span>
              <button
                onClick={() =>
                  addListItem("skills", {
                    id: `skill-${Date.now()}`,
                    category: "New Skill Type",
                    items: "Skill A, Skill B, Skill C"
                  })
                }
                className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-white font-medium py-1.5 px-2.5 rounded-lg transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Category
              </button>
            </div>

            {data.skills.map((skill, index) => (
              <div
                key={skill.id}
                className="border border-slate-200 rounded-xl p-4 space-y-3 relative bg-slate-50/20 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Category #{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItemUp("skills", index)}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      title="Move up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItemDown("skills", index)}
                      disabled={index === data.skills.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      title="Move down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteListItem("skills", skill.id)}
                      className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all ml-1"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Group Label</label>
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) =>
                        updateListItem<SkillCategory>("skills", skill.id, (s) => ({
                          ...s,
                          category: e.target.value
                        }))
                      }
                      placeholder="e.g. Programming Languages"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Skills (Comma separated)</label>
                    <textarea
                      value={skill.items}
                      onChange={(e) =>
                        updateListItem<SkillCategory>("skills", skill.id, (s) => ({
                          ...s,
                          items: e.target.value
                        }))
                      }
                      rows={2}
                      placeholder="e.g. JavaScript, HTML5, CSS..."
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* WORK EXPERIENCE TAB */}
        {activeTab === "experience" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Professional Background</span>
              <button
                onClick={() =>
                  addListItem("workExperience", {
                    id: `exp-${Date.now()}`,
                    role: "Software Developer",
                    company: "Acme Corporation",
                    duration: "Jan 2025 — Present",
                    location: "San Francisco, CA",
                    highlights: [
                      "Authored a new microservice increasing reliability.",
                      "Spearheaded redesign utilizing clean modern web UI components."
                    ]
                  })
                }
                className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-white font-medium py-1.5 px-2.5 rounded-lg transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Experience
              </button>
            </div>

            {data.workExperience.map((exp, index) => (
              <div
                key={exp.id}
                className="border border-slate-200 rounded-xl p-4 space-y-4 relative bg-slate-50/20 hover:border-slate-300 transition-all"
              >
                {/* Header operations */}
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Experience #{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItemUp("workExperience", index)}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      title="Move up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItemDown("workExperience", index)}
                      disabled={index === data.workExperience.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      title="Move down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteListItem("workExperience", exp.id)}
                      className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all ml-1"
                      title="Delete experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateListItem<ExperienceItem>("workExperience", exp.id, (item) => ({
                          ...item,
                          company: e.target.value
                        }))
                      }
                      placeholder="e.g. ansrsource"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Job Role / Title</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) =>
                        updateListItem<ExperienceItem>("workExperience", exp.id, (item) => ({
                          ...item,
                          role: e.target.value
                        }))
                      }
                      placeholder="e.g. Junior Developer Intern"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Duration / Dates</label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) =>
                        updateListItem<ExperienceItem>("workExperience", exp.id, (item) => ({
                          ...item,
                          duration: e.target.value
                        }))
                      }
                      placeholder="e.g. July 2024 — Present"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Office Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) =>
                        updateListItem<ExperienceItem>("workExperience", exp.id, (item) => ({
                          ...item,
                          location: e.target.value
                        }))
                      }
                      placeholder="e.g. Austin - Remote"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                </div>

                {/* Highlights list for experience */}
                <div className="space-y-2 border-t pt-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-600 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" /> Work Highlights (LaTeX format supported)
                    </label>
                    <button
                      onClick={() =>
                        updateListItem<ExperienceItem>("workExperience", exp.id, (item) => ({
                          ...item,
                          highlights: [...item.highlights, "New impact statement detailing tech achievements."]
                        }))
                      }
                      className="text-[10px] bg-slate-100 hover:bg-slate-250 text-slate-700 border hover:border-slate-400 px-2 py-1 rounded flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-2.5 h-2.5" /> Add Accomplishment
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    *Tip: Wrap terms in <span className="font-mono text-slate-600 font-semibold">**double asterisks**</span> for high-impact bolding in LaTeX (e.g. **HTML**).
                  </p>

                  <div className="space-y-2">
                    {exp.highlights.map((hlt, hIndex) => (
                      <div key={hIndex} className="flex gap-2">
                        <textarea
                          value={hlt}
                          onChange={(e) => {
                            const newHighlights = [...exp.highlights];
                            newHighlights[hIndex] = e.target.value;
                            updateListItem<ExperienceItem>("workExperience", exp.id, (item) => ({
                              ...item,
                              highlights: newHighlights
                            }));
                          }}
                          rows={2}
                          className="flex-1 text-xs px-2.5 py-1.5 border rounded-lg outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 bg-white"
                          placeholder="Accomplished X, measured by Y, by doing Z."
                        />
                        <button
                          onClick={() => {
                            const newHighlights = exp.highlights.filter((_, idx) => idx !== hIndex);
                            updateListItem<ExperienceItem>("workExperience", exp.id, (item) => ({
                              ...item,
                              highlights: newHighlights
                            }));
                          }}
                          className="self-center p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                          title="Remove highlight"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Personal & Team Projects</span>
              <button
                onClick={() =>
                  addListItem("projects", {
                    id: `proj-${Date.now()}`,
                    name: "Portfolio Project",
                    duration: "Jan 2025 — Feb 2025",
                    repoUrl: "https://github.com/username/project",
                    repoText: "Repo",
                    highlights: [
                      "Fleshed out a fully scalable web portal utilizing a client-first design philosophy.",
                      "Handled deployment protocols on cloud platform containers with secure pipelines."
                    ]
                  })
                }
                className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-white font-medium py-1.5 px-2.5 rounded-lg transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>

            {data.projects.map((proj, index) => (
              <div
                key={proj.id}
                className="border border-slate-200 rounded-xl p-4 space-y-4 relative bg-slate-50/20 hover:border-slate-300 transition-all"
              >
                {/* Header operations */}
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-slate-400" /> Project #{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItemUp("projects", index)}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      title="Move up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItemDown("projects", index)}
                      disabled={index === data.projects.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      title="Move down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteListItem("projects", proj.id)}
                      className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all ml-1"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) =>
                        updateListItem<ProjectItem>("projects", proj.id, (item) => ({
                          ...item,
                          name: e.target.value
                        }))
                      }
                      placeholder="e.g. Tandoori Js"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Duration / Period</label>
                    <input
                      type="text"
                      value={proj.duration}
                      onChange={(e) =>
                        updateListItem<ProjectItem>("projects", proj.id, (item) => ({
                          ...item,
                          duration: e.target.value
                        }))
                      }
                      placeholder="e.g. Jan 2024 — Present"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Repository URL (Optional)</label>
                    <input
                      type="text"
                      value={proj.repoUrl}
                      onChange={(e) =>
                        updateListItem<ProjectItem>("projects", proj.id, (item) => ({
                          ...item,
                          repoUrl: e.target.value
                        }))
                      }
                      placeholder="e.g. https://github.com/..."
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Repo Label (Optional)</label>
                    <input
                      type="text"
                      value={proj.repoText}
                      onChange={(e) =>
                        updateListItem<ProjectItem>("projects", proj.id, (item) => ({
                          ...item,
                          repoText: e.target.value
                        }))
                      }
                      placeholder="e.g. Repo"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                </div>

                {/* Highlights for project */}
                <div className="space-y-2 border-t pt-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-600 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" /> Project Contributions & Technical Details
                    </label>
                    <button
                      onClick={() =>
                        updateListItem<ProjectItem>("projects", proj.id, (item) => ({
                          ...item,
                          highlights: [...item.highlights, "New engineering item implementing standard solutions."]
                        }))
                      }
                      className="text-[10px] bg-slate-100 hover:bg-slate-250 text-slate-700 border hover:border-slate-400 px-2 py-1 rounded flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-2.5 h-2.5" /> Add Detail
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    *Tip: Use <span className="font-mono text-slate-600 font-semibold">**bold marks**</span> to highlight core tech stacks in LaTeX (e.g. **Redux Toolkit**).
                  </p>

                  <div className="space-y-2">
                    {proj.highlights.map((hlt, hIndex) => (
                      <div key={hIndex} className="flex gap-2">
                        <textarea
                          value={hlt}
                          onChange={(e) => {
                            const newHighlights = [...proj.highlights];
                            newHighlights[hIndex] = e.target.value;
                            updateListItem<ProjectItem>("projects", proj.id, (item) => ({
                              ...item,
                              highlights: newHighlights
                            }));
                          }}
                          rows={2}
                          className="flex-1 text-xs px-2.5 py-1.5 border rounded-lg outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 bg-white"
                          placeholder="Detail feature development, library configurations, or deployment results."
                        />
                        <button
                          onClick={() => {
                            const newHighlights = proj.highlights.filter((_, idx) => idx !== hIndex);
                            updateListItem<ProjectItem>("projects", proj.id, (item) => ({
                              ...item,
                              highlights: newHighlights
                            }));
                          }}
                          className="self-center p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                          title="Remove bullet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === "education" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Academic Background</span>
              <button
                onClick={() =>
                  addListItem("education", {
                    id: `edu-${Date.now()}`,
                    institution: "University Name",
                    degree: "Degree / Specialization",
                    gpaOrPercentage: "8.5 CGPA or 85%",
                    duration: "2021 — 2025",
                    location: "City, State"
                  })
                }
                className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-white font-medium py-1.5 px-2.5 rounded-lg transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Education
              </button>
            </div>

            {data.education.map((edu, index) => (
              <div
                key={edu.id}
                className="border border-slate-200 rounded-xl p-4 space-y-3 relative bg-slate-50/20 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    School / University #{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItemUp("education", index)}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      title="Move up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItemDown("education", index)}
                      disabled={index === data.education.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all"
                      title="Move down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteListItem("education", edu.id)}
                      className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all ml-1"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Institution / School</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        updateListItem<EducationItem>("education", edu.id, (item) => ({
                          ...item,
                          institution: e.target.value
                        }))
                      }
                      placeholder="e.g. Sant Gadge Baba Amravati University"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Degree / Course</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        updateListItem<EducationItem>("education", edu.id, (item) => ({
                          ...item,
                          degree: e.target.value
                        }))
                      }
                      placeholder="e.g. Bachelor of Engineering in CSE"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">GPA / Marks</label>
                    <input
                      type="text"
                      value={edu.gpaOrPercentage}
                      onChange={(e) =>
                        updateListItem<EducationItem>("education", edu.id, (item) => ({
                          ...item,
                          gpaOrPercentage: e.target.value
                        }))
                      }
                      placeholder="e.g. 7.93 CGPA"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Duration / Dates</label>
                    <input
                      type="text"
                      value={edu.duration}
                      onChange={(e) =>
                        updateListItem<EducationItem>("education", edu.id, (item) => ({
                          ...item,
                          duration: e.target.value
                        }))
                      }
                      placeholder="e.g. July 2020 — June 2024"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">City, Location</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) =>
                        updateListItem<EducationItem>("education", edu.id, (item) => ({
                          ...item,
                          location: e.target.value
                        }))
                      }
                      placeholder="e.g. Malkapur, Maharashtra"
                      className="w-full text-xs px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500/10 focus:border-slate-500 outline-none transition-all bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACTIVITIES & CERTS TAB */}
        {activeTab === "activities" && (
          <div className="space-y-6">
            {/* ACTIVITIES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-slate-400" /> Extracurricular Activities
                </h3>
                <button
                  onClick={() =>
                    addListItem("activities", {
                      id: `act-${Date.now()}`,
                      description: "New coordinator role or activity details",
                      duration: "Month Year"
                    })
                  }
                  className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-white font-medium py-1 px-2 rounded-lg transition-all cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add Activity
                </button>
              </div>

              <div className="space-y-2.5">
                {data.activities.map((act, index) => (
                  <div
                    key={act.id}
                    className="flex gap-2.5 items-start p-2.5 border rounded-lg bg-slate-50/40 relative hover:border-slate-350 transition-all"
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] uppercase tracking-wider text-slate-450 font-bold mb-0.5">
                          Activity / Achievement
                        </label>
                        <input
                          type="text"
                          value={act.description}
                          onChange={(e) =>
                            updateListItem<ActivityItem>("activities", act.id, (item) => ({
                              ...item,
                              description: e.target.value
                            }))
                          }
                          className="w-full text-xs px-2 py-1.5 border rounded bg-white outline-none focus:border-slate-500"
                          placeholder="Event, winner group, or leadership role"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-slate-450 font-bold mb-0.5">
                          Dates
                        </label>
                        <input
                          type="text"
                          value={act.duration}
                          onChange={(e) =>
                            updateListItem<ActivityItem>("activities", act.id, (item) => ({
                              ...item,
                              duration: e.target.value
                            }))
                          }
                          className="w-full text-xs px-2 py-1.5 border rounded bg-white outline-none focus:border-slate-500"
                          placeholder="e.g. Feb 2024"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 self-center">
                      <button
                        onClick={() => moveItemUp("activities", index)}
                        disabled={index === 0}
                        className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveItemDown("activities", index)}
                        disabled={index === data.activities.length - 1}
                        className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => deleteListItem("activities", act.id)}
                      className="p-1 text-red-400 hover:text-red-600 hover:bg-red-55 rounded self-center"
                      title="Delete activity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CERTIFICATIONS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-slate-400" /> Certifications
                </h3>
                <button
                  onClick={() =>
                    addListItem("certifications", {
                      id: `cert-${Date.now()}`,
                      name: "Namaste React Certification {Advanced}",
                      duration: "Month Year"
                    })
                  }
                  className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-white font-medium py-1 px-2 rounded-lg transition-all cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add Certification
                </button>
              </div>

              <div className="space-y-2.5">
                {data.certifications.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="flex gap-2.5 items-start p-2.5 border rounded-lg bg-slate-50/40 relative hover:border-slate-350 transition-all"
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] uppercase tracking-wider text-slate-450 font-bold mb-0.5">
                          Certificate Title
                        </label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) =>
                            updateListItem<CertificationItem>("certifications", cert.id, (item) => ({
                              ...item,
                              name: e.target.value
                            }))
                          }
                          className="w-full text-xs px-2 py-1.5 border rounded bg-white outline-none focus:border-slate-500"
                          placeholder="e.g. AWS Solutions Architect"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-slate-450 font-bold mb-0.5">
                          Acquired Dates
                        </label>
                        <input
                          type="text"
                          value={cert.duration}
                          onChange={(e) =>
                            updateListItem<CertificationItem>("certifications", cert.id, (item) => ({
                              ...item,
                              duration: e.target.value
                            }))
                          }
                          className="w-full text-xs px-2 py-1.5 border rounded bg-white outline-none focus:border-slate-500"
                          placeholder="e.g. Nov 2023 — Jan 2024"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 self-center">
                      <button
                        onClick={() => moveItemUp("certifications", index)}
                        disabled={index === 0}
                        className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveItemDown("certifications", index)}
                        disabled={index === data.certifications.length - 1}
                        className="p-0.5 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => deleteListItem("certifications", cert.id)}
                      className="p-1 text-red-400 hover:text-red-600 hover:bg-red-55 rounded self-center"
                      title="Delete cert"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
