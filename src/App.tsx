/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { defaultResumeData, COLOR_ACCENTS } from "./data/defaultResume";
import { ResumeData, ColorAccent } from "./types";
import { EditorPanel } from "./components/EditorPanel";
import { PreviewPanel } from "./components/PreviewPanel";
import { LaTeXViewer } from "./components/LaTeXViewer";
import {
  FileCode2,
  FileText,
  Eye,
  Settings,
  HelpCircle,
  Undo2,
  RefreshCw,
  ExternalLink,
  BookOpen
} from "lucide-react";

export default function App() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [accent, setAccent] = useState<ColorAccent>(COLOR_ACCENTS[0]);
  const [rightTab, setRightTab] = useState<"preview" | "latex">("preview");

  // Reset to original Kiran Mahajan sample state
  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset your resume data to the default Kiran Mahajan professional layout?")) {
      setData(defaultResumeData);
      setAccent(COLOR_ACCENTS[0]);
    }
  };

  // Completely clear everything for a fresh template builder
  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all fields? This will let you build your resume entirely from scratch.")) {
      setData({
        personalInfo: {
          name: "",
          title: "",
          phone: "",
          location: "",
          email: "",
          github: "",
          linkedin: "",
          portfolio: ""
        },
        skills: [
          { id: "s-1", category: "Programming Languages", items: "" },
          { id: "s-2", category: "Tools & Platforms", items: "" }
        ],
        workExperience: [],
        projects: [],
        education: [],
        activities: [],
        certifications: []
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-500/10">
      {/* Visual Header bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo Title Group */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2E5B82] rounded-xl text-white shadow-md">
              <span className="font-mono font-black text-sm tracking-tighter">LᴬTᴇX</span>
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                TeX Resume Engineer
              </h1>
              <p className="text-xs text-slate-500">
                Modeled after the elegant Software Engineering layout.
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetData}
              title="Reset data"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-850 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              Reset Sample
            </button>
            <button
              onClick={handleClearData}
              title="Clear all fields"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Clear Fields
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:overflow-hidden">
        {/* Left Hand: The Interactive Forms Panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-5 xl:col-span-5 lg:h-[calc(100vh-140px)] h-[580px] min-h-[500px]"
        >
          <EditorPanel
            data={data}
            onChange={setData}
            selectedAccent={accent}
            onAccentChange={setAccent}
            accents={COLOR_ACCENTS}
          />
        </motion.div>

        {/* Right Hand: Visual Showroom Page */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="lg:col-span-7 xl:col-span-7 flex flex-col lg:h-[calc(100vh-140px)] h-[750px] sm:h-[850px] min-h-[500px]"
        >
          {/* Output Control Switcher */}
          <div className="flex bg-white/80 backdrop-blur-md p-1 border border-slate-200 rounded-xl mb-4 self-start shadow-xs">
            <button
              onClick={() => setRightTab("preview")}
              className={`flex items-center gap-2 py-1.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                rightTab === "preview"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Visual Preview
            </button>
            <button
              onClick={() => setRightTab("latex")}
              className={`flex items-center gap-2 py-1.5 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                rightTab === "latex"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              LaTeX Code (.tex)
            </button>
          </div>

          {/* Tab Presenter Container */}
          <div className="flex-1 min-h-0">
            {rightTab === "preview" ? (
              <motion.div
                key="preview-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <PreviewPanel data={data} accent={accent} />
              </motion.div>
            ) : (
              <motion.div
                key="latex-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <LaTeXViewer data={data} accent={accent} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer Info Area */}
      <footer className="bg-slate-900 text-slate-400 py-4 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Ready-to-use template conforming to professional typesetting metrics.</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.overleaf.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-300 font-medium flex items-center gap-1 transition-all"
            >
              Overleaf TeX Compiler
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span>•</span>
            <span>Version 1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
