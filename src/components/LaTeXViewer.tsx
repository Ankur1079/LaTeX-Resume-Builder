/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ResumeData, ColorAccent } from "../types";
import { generateLatex } from "../templates/latexTemplate";
import { Copy, Check, Download, AlertCircle, FileCode, CheckSquare, HelpCircle } from "lucide-react";

interface LaTeXViewerProps {
  data: ResumeData;
  accent: ColorAccent;
}

export const LaTeXViewer: React.FC<LaTeXViewerProps> = ({ data, accent }) => {
  const [copied, setCopied] = useState(false);
  const code = generateLatex(data, accent);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    // Clean filename based on user's name
    const cleanedName = data.personalInfo.name
      ? data.personalInfo.name.toLowerCase().replace(/[^a-z0-9]/g, "_")
      : "resume";
    link.download = `${cleanedName}_resume.tex`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Basic TeX syntax highlighter for display
  const renderHighlightedCode = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // If it's a comment line
      if (line.trim().startsWith("%")) {
        return (
          <div key={idx} className="text-emerald-400 font-mono italic select-text">
            {line}
          </div>
        );
      }

      // We can split line into commands, punctuation, etc.
      // But instead of complex tokenization, a simple row is still extremely clean and copyable
      // Let's do simple color highlights:
      // Highlight commands starting with backslash \
      const parts = line.split(/(\\[a-zA-Z]+)/g);
      return (
        <div key={idx} className="font-mono text-slate-300 leading-normal select-text whitespace-pre min-h-[1rem]">
          {parts.map((part, pIdx) => {
            if (part.startsWith("\\")) {
              return (
                <span key={pIdx} className="text-indigo-300 font-semibold select-text">
                  {part}
                </span>
              );
            }
            // Colorize braces
            const braceParts = part.split(/([{}])/g);
            return braceParts.map((subPart, sIdx) => {
              if (subPart === "{" || subPart === "}") {
                return (
                  <span key={sIdx} className="text-pink-400 font-medium select-text">
                    {subPart}
                  </span>
                );
              }
              if (subPart.startsWith("%")) {
                return (
                  <span key={sIdx} className="text-emerald-400 font-mono italic select-text">
                    {subPart}
                  </span>
                );
              }
              return (
                <span key={sIdx} className="select-text">
                  {subPart}
                </span>
              );
            });
          })}
        </div>
      );
    });
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 flex flex-col h-full overflow-hidden">
      {/* Code Header Control Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Generated LaTeX (.tex) Source
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              copied
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
                : "bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700/60 hover:text-white"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                Copy LaTeX
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download .tex
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Real-time Code Editor Display */}
        <div className="flex-1 overflow-auto p-4 bg-slate-950/60 select-all border-b md:border-b-0 md:border-r border-slate-800">
          <pre className="text-xs select-text focus:outline-none shrink-0" style={{ fontFamily: "JetBrains Mono, SFMono-Regular, monospace" }}>
            {renderHighlightedCode(code)}
          </pre>
        </div>

        {/* Installation Instructions Guide Card / Sidebar */}
        <div className="w-full md:w-80 bg-slate-900 p-5 space-y-4 shrink-0 overflow-y-auto">
          <h3 className="text-xs font-extrabold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> Compilation Instructions
          </h3>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="space-y-1.5">
              <span className="flex items-center gap-1.5 font-bold text-slate-100">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 text-[10px] flex items-center justify-center font-bold">1</span>
                Create Overleaf Project
              </span>
              <p className="text-slate-400 pl-5">
                Go to <a href="https://www.overleaf.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">overleaf.com</a> and sign in. Create an &ldquo;Empty Project&rdquo;.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="flex items-center gap-1.5 font-bold text-slate-100">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 text-[10px] flex items-center justify-center font-bold">2</span>
                Paste LaTeX Code
              </span>
              <p className="text-slate-400 pl-5">
                Open <span className="font-mono text-slate-300">main.tex</span> in your Overleaf workspace, delete everything, and paste this generated code.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="flex items-center gap-1.5 font-bold text-slate-100">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 text-[10px] flex items-center justify-center font-bold">3</span>
                Recompile to PDF
              </span>
              <p className="text-slate-400 pl-5">
                Click &ldquo;Recompile&rdquo; (or press Ctrl+Enter). Overleaf will build and render your beautiful resume PDF instantly!
              </p>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 flex gap-2.5">
              <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-[11.5px]">
                <strong className="text-slate-200">No Complex Downloads Needed:</strong>
                <p className="text-slate-400">
                  Overleaf has LaTeX packages pre-installed. You do not need to install local software or compiler files.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
