/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ResumeData, ColorAccent } from "../types";
import { renderFormattedText } from "../utils";
import { Sliders, Sparkles, AlertCircle } from "lucide-react";

interface PreviewPanelProps {
  data: ResumeData;
  accent: ColorAccent;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ data, accent }) => {
  const p = data.personalInfo;

  const [pageSize, setPageSize] = React.useState<"A4" | "Letter">(() => {
    return (localStorage.getItem("latex_resume_page_size") as "A4" | "Letter") || "A4";
  });
  const [fontSize, setFontSize] = React.useState<number>(() => {
    const saved = localStorage.getItem("latex_resume_font_size");
    return saved ? parseFloat(saved) : 11.5;
  });
  const [lineHeight, setLineHeight] = React.useState<number>(() => {
    const saved = localStorage.getItem("latex_resume_line_height");
    return saved ? parseFloat(saved) : 1.35;
  });
  const [sectionGap, setSectionGap] = React.useState<number>(() => {
    const saved = localStorage.getItem("latex_resume_section_gap");
    return saved ? parseFloat(saved) : 2.5;
  });
  const [paddingSize, setPaddingSize] = React.useState<number>(() => {
    const saved = localStorage.getItem("latex_resume_padding_size");
    return saved ? parseInt(saved, 10) : 28;
  });

  const pageRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("latex_resume_page_size", pageSize);
  }, [pageSize]);

  React.useEffect(() => {
    const handleResize = () => {
      const parent = containerRef.current;
      if (parent) {
        // Use getBoundingClientRect().width which is stable and independent of vertical/horizontal scrollbars showing
        const rect = parent.getBoundingClientRect();
        const parentWidth = rect.width - 32 - 18; // Subtract p-4 padding (32px) and 18px scrollbar/safety margin
        const pageWidth = pageSize === "A4" ? 794 : 816;
        if (parentWidth > 0 && parentWidth < pageWidth) {
          setScale(parentWidth / pageWidth);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    const parent = containerRef.current;
    if (parent) {
      observer.observe(parent);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  React.useEffect(() => {
    localStorage.setItem("latex_resume_font_size", fontSize.toString());
  }, [fontSize]);

  React.useEffect(() => {
    localStorage.setItem("latex_resume_line_height", lineHeight.toString());
  }, [lineHeight]);

  React.useEffect(() => {
    localStorage.setItem("latex_resume_section_gap", sectionGap.toString());
  }, [sectionGap]);

  React.useEffect(() => {
    localStorage.setItem("latex_resume_padding_size", paddingSize.toString());
  }, [paddingSize]);

  React.useEffect(() => {
    const checkOverflow = () => {
      const el = pageRef.current;
      if (el) {
        // Checking if scroll height exceeds height plus a small tolerance for fractional rendering
        const overflow = el.scrollHeight > el.clientHeight + 4;
        setIsOverflowing(overflow);
      }
    };

    checkOverflow();
    const timer = setTimeout(checkOverflow, 120);
    return () => clearTimeout(timer);
  }, [data, pageSize, fontSize, lineHeight, sectionGap, paddingSize]);

  const handleAutoFit = () => {
    setFontSize(10.5);
    setSectionGap(2.0);
    setLineHeight(1.22);
    setPaddingSize(24);
  };

  const handleSetDefault = () => {
    setFontSize(11.5);
    setSectionGap(2.8);
    setLineHeight(1.35);
    setPaddingSize(32);
  };

  const dimensions = pageSize === "A4"
    ? { width: "794px", height: "1123px" }
    : { width: "816px", height: "1056px" };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-3 flex flex-col items-center h-full overflow-hidden">
      
      {/* 📏 Page Layout Adjustments Settings Dashboard */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 mb-3 text-slate-700">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-650" />
            <span className="text-xs font-bold text-slate-800">Page Sizing & Spacing Presets</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Fit Status Badge */}
            {isOverflowing ? (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-650 font-extrabold text-[11px] border border-rose-200 animate-pulse">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                ⚠️ OVERFLOWS 1 PAGE
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-extrabold text-[11px] border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                ✅ PERFECT 1-PAGE FIT
              </span>
            )}

            {/* Auto-Fit Spacing Button */}
            <div className="flex items-center gap-1.5 ml-1">
              <button
                onClick={handleAutoFit}
                className="px-2 py-1 rounded bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold text-[10.5px] transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                title="Automatically adjust system variables to try to fit everything on a single A4/Letter size layout"
              >
                <Sparkles className="w-3 h-3" />
                Auto-Fit
              </button>
              <button
                onClick={handleSetDefault}
                className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[10.5px] transition-colors cursor-pointer"
                title="Reset layout to standard balanced values"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* The controls grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-[11px] font-medium text-slate-600">
          {/* Preset switch page standard */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PAGE RATIO</span>
            <div className="flex bg-slate-200/50 p-0.5 rounded-lg border border-slate-300/60">
              <button
                onClick={() => setPageSize("A4")}
                className={`flex-1 text-center py-1 rounded-md font-bold transition-all text-[10.5px] cursor-pointer ${
                  pageSize === "A4" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                A4 (Pdf)
              </button>
              <button
                onClick={() => setPageSize("Letter")}
                className={`flex-1 text-center py-1 rounded-md font-bold transition-all text-[10.5px] cursor-pointer ${
                  pageSize === "Letter" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Letter
              </button>
            </div>
          </div>

          {/* Slider: Font Size */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FONT SIZE</span>
              <span className="font-mono text-slate-700 font-bold text-[10.5px]">{fontSize.toFixed(1)}px</span>
            </div>
            <input
              type="range"
              min="9.5"
              max="14.0"
              step="0.1"
              value={fontSize}
              onChange={(e) => setFontSize(parseFloat(e.target.value))}
              className="w-full accent-indigo-650 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
            />
          </div>

          {/* Slider: Section Gap */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SECTION GAP</span>
              <span className="font-mono text-slate-700 font-bold text-[10.5px]">{sectionGap.toFixed(1)}px</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="6.0"
              step="0.1"
              value={sectionGap}
              onChange={(e) => setSectionGap(parseFloat(e.target.value))}
              className="w-full accent-indigo-650 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
            />
          </div>

          {/* Slider: Line Height */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LINE HEIGHT</span>
              <span className="font-mono text-slate-700 font-bold text-[10.5px]">{lineHeight.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="1.15"
              max="1.55"
              step="0.05"
              value={lineHeight}
              onChange={(e) => setLineHeight(parseFloat(e.target.value))}
              className="w-full accent-indigo-650 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
            />
          </div>

          {/* Slider: Outer Margin */}
          <div className="space-y-1 col-span-2 md:col-span-1">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OUTER MARGIN</span>
              <span className="font-mono text-slate-700 font-bold text-[10.5px]">{paddingSize}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="44"
              step="2"
              value={paddingSize}
              onChange={(e) => setPaddingSize(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-650 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
            />
          </div>
        </div>
      </div>

      {/* The Paper Container */}
      <div
        ref={containerRef}
        className="flex-1 w-full overflow-auto bg-slate-100 p-4 border border-slate-200 rounded-xl flex justify-center items-start shadow-inner"
      >
        {/* Dynamic Scale Holder to prevent overflowing layout on mobile/small screens */}
        <div
          className="relative"
          style={{
            width: `${(pageSize === "A4" ? 794 : 816) * scale}px`,
            height: `${(pageSize === "A4" ? 1123 : 1056) * scale}px`,
          }}
        >
          {/* Visual sheet: Styled with physical dimensions and scaled dynamically */}
          <div
            ref={pageRef}
            id="resume-pdf-page"
            className="bg-white shadow-xl border border-slate-300 absolute left-0 top-0 text-[#2b2b2b] select-text flex flex-col overflow-hidden origin-top-left"
            style={{
              fontFamily: "'Inter', -apple-system, sans-serif",
              width: dimensions.width,
              height: dimensions.height,
              minHeight: dimensions.height,
              maxHeight: dimensions.height,
              padding: `${paddingSize}px`,
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              gap: `${sectionGap * 3.5}px`,
              transform: `scale(${scale})`
            }}
          >
          {/* HEADER ROW */}
          <div className="grid grid-cols-12 gap-2 items-start border-b border-transparent pb-1">
            {/* Left Contact Info */}
            <div className="col-span-4 text-left leading-tight text-slate-600 flex flex-col gap-0.5" style={{ fontSize: `${(fontSize * 0.88).toFixed(1)}px` }}>
              {p.phone && <span>{p.phone}</span>}
              {p.location && <span>{p.location}</span>}
              {p.email && (
                <a
                  href={`mailto:${p.email}`}
                  className="hover:underline text-slate-700"
                >
                  {p.email}
                </a>
              )}
            </div>

            {/* Middle Title / Name */}
            <div className="col-span-4 text-center">
              <h1 className="font-extrabold text-slate-900 tracking-tight leading-none mb-1" style={{ fontSize: `${(fontSize * 2.1).toFixed(1)}px` }}>
                {p.name || "Your Name"}
              </h1>
              <p
                className="font-bold tracking-wide"
                style={{ color: accent.hex, fontSize: `${(fontSize * 1.15).toFixed(1)}px` }}
              >
                {p.title || "Your Profession"}
              </p>
            </div>

            {/* Right Web Links */}
            <div className="col-span-4 text-right leading-tight text-slate-600 flex flex-col gap-0.5" style={{ fontSize: `${(fontSize * 0.88).toFixed(1)}px` }}>
              {p.github && (
                <a
                  href={`https://${p.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline cursor-pointer"
                  style={{ color: accent.hex }}
                >
                  GitHub
                </a>
              )}
              {p.linkedin && (
                <a
                  href={`https://${p.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline cursor-pointer"
                  style={{ color: accent.hex }}
                >
                  LinkedIn
                </a>
              )}
              {p.portfolio && (
                <a
                  href={`https://${p.portfolio}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline cursor-pointer"
                  style={{ color: accent.hex }}
                >
                  Portfolio
                </a>
              )}
            </div>
          </div>

          {/* SKILLS */}
          {data.skills.length > 0 && (
            <div>
              <div style={{ marginTop: `${(sectionGap * 1.5).toFixed(1)}px`, marginBottom: `${(sectionGap * 0.8).toFixed(1)}px` }}>
                <h2
                  className="font-extrabold tracking-wider uppercase"
                  style={{ color: accent.hex, fontSize: `${(fontSize * 1.1).toFixed(1)}px` }}
                >
                  SKILLS
                </h2>
                <hr className="mt-0.5 border-t" style={{ borderColor: accent.hex }} />
              </div>
              <div className="flex flex-col" style={{ gap: `${(sectionGap * 0.8).toFixed(1)}px`, fontSize: `${(fontSize * 0.95).toFixed(1)}px` }}>
                {data.skills.map((s) => (
                  <div key={s.id} className="flex flex-row items-start gap-4">
                    <span className="w-[170px] font-bold text-slate-800 shrink-0" style={{ fontSize: `${(fontSize * 0.95).toFixed(1)}px` }}>
                      {s.category}
                    </span>
                    <span className="flex-1 text-slate-750">
                      {s.items}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WORK EXPERIENCE */}
          {data.workExperience.length > 0 && (
            <div>
              <div style={{ marginTop: `${(sectionGap * 1.5).toFixed(1)}px`, marginBottom: `${(sectionGap * 0.8).toFixed(1)}px` }}>
                <h2
                  className="font-extrabold tracking-wider uppercase"
                  style={{ color: accent.hex, fontSize: `${(fontSize * 1.1).toFixed(1)}px` }}
                >
                  WORK EXPERIENCE
                </h2>
                <hr className="mt-0.5 border-t" style={{ borderColor: accent.hex }} />
              </div>
              <div className="flex flex-col" style={{ gap: `${(sectionGap * 1.8).toFixed(1)}px` }}>
                {data.workExperience.map((exp) => (
                  <div key={exp.id} className="flex flex-col" style={{ gap: `${(sectionGap * 0.4).toFixed(1)}px` }}>
                    {/* Header Row */}
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900" style={{ fontSize: `${(fontSize * 1.02).toFixed(1)}px` }}>
                        {exp.role}
                      </span>
                      <span className="font-bold text-slate-800" style={{ fontSize: `${(fontSize * 0.92).toFixed(1)}px` }}>
                        {exp.duration}
                      </span>
                    </div>
                    {/* Sub title row */}
                    <div className="flex justify-between items-baseline text-slate-500 italic mt-[-1px]" style={{ fontSize: `${(fontSize * 0.88).toFixed(1)}px` }}>
                      <span className="font-semibold">{exp.company}</span>
                      <span>{exp.location}</span>
                    </div>
                    {/* Bullet Points */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-outside pl-4 text-slate-700 leading-normal" style={{ fontSize: `${(fontSize * 0.95).toFixed(1)}px`, display: "flex", flexDirection: "column", gap: `${(sectionGap * 0.25).toFixed(1)}px` }}>
                        {exp.highlights.map((hlt, idx) => (
                          <li key={idx} className="pl-0.5">
                            {renderFormattedText(hlt)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {data.projects.length > 0 && (
            <div>
              <div style={{ marginTop: `${(sectionGap * 1.5).toFixed(1)}px`, marginBottom: `${(sectionGap * 0.8).toFixed(1)}px` }}>
                <h2
                  className="font-extrabold tracking-wider uppercase"
                  style={{ color: accent.hex, fontSize: `${(fontSize * 1.1).toFixed(1)}px` }}
                >
                  PROJECTS
                </h2>
                <hr className="mt-0.5 border-t" style={{ borderColor: accent.hex }} />
              </div>
              <div className="flex flex-col" style={{ gap: `${(sectionGap * 1.8).toFixed(1)}px` }}>
                {data.projects.map((proj) => {
                  const hasRepo = proj.repoUrl;
                  const label = proj.repoText || "Repo";

                  return (
                    <div key={proj.id} className="flex flex-col" style={{ gap: `${(sectionGap * 0.4).toFixed(1)}px` }}>
                      {/* Header Row */}
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-slate-950 flex items-center gap-1.5" style={{ fontSize: `${(fontSize * 1.02).toFixed(1)}px` }}>
                          {proj.name}
                          {hasRepo && (
                            <a
                              href={proj.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold hover:underline"
                              style={{ color: accent.hex, fontSize: `${(fontSize * 0.88).toFixed(1)}px` }}
                            >
                              &#123;{label}&#125;
                            </a>
                          )}
                        </span>
                        <span className="font-bold text-slate-800" style={{ fontSize: `${(fontSize * 0.92).toFixed(1)}px` }}>
                          {proj.duration}
                        </span>
                      </div>
                      {/* Bullet Highlights */}
                      {proj.highlights && proj.highlights.length > 0 && (
                        <ul className="list-disc list-outside pl-4 text-slate-700 leading-normal" style={{ fontSize: `${(fontSize * 0.95).toFixed(1)}px`, display: "flex", flexDirection: "column", gap: `${(sectionGap * 0.25).toFixed(1)}px` }}>
                          {proj.highlights.map((hlt, idx) => (
                            <li key={idx} className="pl-0.5">
                              {renderFormattedText(hlt)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {data.education.length > 0 && (
            <div>
              <div style={{ marginTop: `${(sectionGap * 1.5).toFixed(1)}px`, marginBottom: `${(sectionGap * 0.8).toFixed(1)}px` }}>
                <h2
                  className="font-extrabold tracking-wider uppercase"
                  style={{ color: accent.hex, fontSize: `${(fontSize * 1.1).toFixed(1)}px` }}
                >
                  EDUCATION
                </h2>
                <hr className="mt-0.5 border-t" style={{ borderColor: accent.hex }} />
              </div>
              <div className="flex flex-col" style={{ gap: `${(sectionGap * 1.4).toFixed(1)}px` }}>
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex flex-col" style={{ gap: `${(sectionGap * 0.2).toFixed(1)}px` }}>
                    {/* Header Row */}
                    <div className="flex justify-between items-baseline font-bold">
                      <span style={{ color: accent.hex, fontSize: `${(fontSize * 1.02).toFixed(1)}px` }}>
                        {edu.institution}
                      </span>
                      <span className="text-slate-800" style={{ fontSize: `${(fontSize * 0.92).toFixed(1)}px` }}>{edu.duration}</span>
                    </div>
                    {/* Details Row */}
                    <div className="flex justify-between items-baseline italic text-slate-600 font-medium" style={{ fontSize: `${(fontSize * 0.88).toFixed(1)}px` }}>
                      <span>
                        {edu.degree} &mdash; {edu.gpaOrPercentage}
                      </span>
                      <span>{edu.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITIES */}
          {data.activities.length > 0 && (
            <div>
              <div style={{ marginTop: `${(sectionGap * 1.5).toFixed(1)}px`, marginBottom: `${(sectionGap * 0.8).toFixed(1)}px` }}>
                <h2
                  className="font-extrabold tracking-wider uppercase"
                  style={{ color: accent.hex, fontSize: `${(fontSize * 1.1).toFixed(1)}px` }}
                >
                  ACTIVITIES
                </h2>
                <hr className="mt-0.5 border-t" style={{ borderColor: accent.hex }} />
              </div>
              <div className="flex flex-col" style={{ gap: `${(sectionGap * 0.6).toFixed(1)}px` }}>
                {data.activities.map((act) => (
                  <div key={act.id} className="flex justify-between items-baseline leading-relaxed">
                    <span className="text-slate-750 font-normal pr-4" style={{ fontSize: `${(fontSize * 0.95).toFixed(1)}px` }}>
                      {renderFormattedText(act.description)}
                    </span>
                    <span className="font-semibold text-slate-700 shrink-0" style={{ fontSize: `${(fontSize * 0.92).toFixed(1)}px` }}>
                      {act.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {data.certifications.length > 0 && (
            <div>
              <div style={{ marginTop: `${(sectionGap * 1.5).toFixed(1)}px`, marginBottom: `${(sectionGap * 0.8).toFixed(1)}px` }}>
                <h2
                  className="font-extrabold tracking-wider uppercase"
                  style={{ color: accent.hex, fontSize: `${(fontSize * 1.1).toFixed(1)}px` }}
                >
                  CERTIFICATION
                </h2>
                <hr className="mt-0.5 border-t" style={{ borderColor: accent.hex }} />
              </div>
              <div className="flex flex-col" style={{ gap: `${(sectionGap * 0.6).toFixed(1)}px` }}>
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline leading-relaxed">
                    <span className="text-slate-750 font-normal pr-4" style={{ fontSize: `${(fontSize * 0.95).toFixed(1)}px` }}>
                      {renderFormattedText(cert.name)}
                    </span>
                    <span className="font-semibold text-slate-700 shrink-0" style={{ fontSize: `${(fontSize * 0.92).toFixed(1)}px` }}>
                      {cert.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};
