/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResumeData, ColorAccent } from "../types";

export function escapeLatex(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

export function formatLatexText(text: string): string {
  let escaped = escapeLatex(text);
  // Support **bold** markdown to \textbf{bold}
  escaped = escaped.replace(/(\*\*|__)(.*?)\1/g, "\\textbf{$2}");
  // Support *italic* markdown to \textit{italic}
  escaped = escaped.replace(/(\*)(.*?)\1/g, "\\textit{$2}");
  return escaped;
}

export function generateLatex(data: ResumeData, accent: ColorAccent): string {
  const p = data.personalInfo;

  // Format headers
  const name = formatLatexText(p.name);
  const title = formatLatexText(p.title);
  const phone = formatLatexText(p.phone);
  const location = formatLatexText(p.location);
  const email = formatLatexText(p.email);
  const github = formatLatexText(p.github);
  const linkedin = formatLatexText(p.linkedin);
  const portfolio = formatLatexText(p.portfolio);

  let skillsLatex = "";
  if (data.skills.length > 0) {
    skillsLatex = `\\section{SKILLS}
\\begin{tabular}{@{}p{4.5cm} p{13.5cm}@{}}
${data.skills
  .map(
    (s) =>
      `  \\textbf{${formatLatexText(s.category)}} & ${formatLatexText(
        s.items
      )} \\\\`
  )
  .join("\n")}
\\end{tabular}
\\vspace{2pt}`;
  }

  let experienceLatex = "";
  if (data.workExperience.length > 0) {
    experienceLatex = `\\section{WORK EXPERIENCE}
${data.workExperience
  .map((exp) => {
    const highlightsStr =
      exp.highlights.length > 0
        ? `  \\begin{itemize}
${exp.highlights
  .map((h) => `    \\item ${formatLatexText(h)}`)
  .join("\n")}
  \\end{itemize}`
        : "";

    return `\\noindent\\textbf{${formatLatexText(
      exp.role
    )}} \\hfill \\textbf{${formatLatexText(exp.duration)}} \\\\
\\noindent\\textit{${formatLatexText(
      exp.company
    )}} \\hfill \\textit{${formatLatexText(exp.location)}}
\\vspace{2pt}
${highlightsStr}
\\vspace{4pt}`;
  })
  .join("\n")}`;
  }

  let projectsLatex = "";
  if (data.projects.length > 0) {
    projectsLatex = `\\section{PROJECTS}
${data.projects
  .map((proj) => {
    const repoTextFormatted = proj.repoText ? proj.repoText : "Repo";
    const repoLink = proj.repoUrl
      ? ` \\href{${proj.repoUrl}}{\\color{linkColor}\\{${formatLatexText(
          repoTextFormatted
        )}\\}}`
      : "";

    const highlightsStr =
      proj.highlights.length > 0
        ? `  \\begin{itemize}
${proj.highlights
  .map((h) => `    \\item ${formatLatexText(h)}`)
  .join("\n")}
  \\end{itemize}`
        : "";

    return `\\noindent\\textbf{${formatLatexText(
      proj.name
    )}}${repoLink} \\hfill \\textbf{${formatLatexText(proj.duration)}}
\\vspace{2pt}
${highlightsStr}
\\vspace{4pt}`;
  })
  .join("\n")}`;
  }

  let educationLatex = "";
  if (data.education.length > 0) {
    educationLatex = `\\section{EDUCATION}
${data.education
  .map((edu) => {
    return `\\noindent{\\color{primaryColor}\\textbf{${formatLatexText(
      edu.institution
    )}}} \\hfill \\textbf{${formatLatexText(edu.duration)}} \\\\
\\noindent\\textit{${formatLatexText(
      edu.degree
    )} -- ${formatLatexText(edu.gpaOrPercentage)}} \\hfill \\textit{${formatLatexText(
      edu.location
    )}}
\\vspace{4pt}`;
  })
  .join("\n")}`;
  }

  let activitiesLatex = "";
  if (data.activities.length > 0) {
    activitiesLatex = `\\section{ACTIVITIES}
${data.activities
  .map((act) => {
    return `\\noindent ${formatLatexText(
      act.description
    )} \\hfill ${formatLatexText(act.duration)} \\\\
\\vspace{2pt}`;
  })
  .join("\n")}`;
  }

  let certificationsLatex = "";
  if (data.certifications.length > 0) {
    certificationsLatex = `\\section{CERTIFICATION}
${data.certifications
  .map((cert) => {
    return `\\noindent ${formatLatexText(cert.name)} \\hfill ${formatLatexText(
      cert.duration
    )} \\\\
\\vspace{2pt}`;
  })
  .join("\n")}`;
  }

  // Create full PDF document markup
  const latexStr = `%============================================================================
% Professional LaTeX Resume / CV Template
% Styled precisely to represent modern software engineering standards.
% Highly customizable and compiles perfectly on standard LaTeX engines (Overleaf / TeX Live).
%============================================================================

\\documentclass[letterpaper,10pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{letterpaper, margin=0.5in}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{titlesec}
\\usepackage{array}
\\usepackage{tabularx}

% Font Setup: Clean Sans-Serif font (replicates Inter/Helvetica)
\\usepackage{helvet}
\\renewcommand{\\familydefault}{\\sfdefault}

% Disable page numbering
\\pagestyle{empty}
\\raggedbottom
\\raggedright

% Custom Theme Color Accent
\\definecolor{primaryColor}{HTML}{${accent.hex.replace("#", "")}}
\\definecolor{textColor}{RGB}{43, 43, 43}
\\definecolor{linkColor}{HTML}{${accent.hex.replace("#", "")}}

% Section title formatting
\\titleformat{\\section}
  {\\color{primaryColor}\\scshape\\bfseries\\large}
  {}{0em}
  {}[{\\color{primaryColor}\\titlerule}]
\\titlespacing{\\section}{0pt}{14pt}{6pt}

% Bullet list spacing tweaks
\\setlist[itemize]{leftmargin=12pt, noitemsep, topsep=1pt, parsep=2pt, partopsep=0pt}

% Set default text color
\\makeatletter
\\newcommand{\\globalcolor}[1]{%
  \\color{#1}\\global\\let\\default@color\\current@color
}
\\makeatother
\\AtBeginDocument{\\globalcolor{textColor}}

\\begin{document}

%--- HEADER ZONE ---
\\begin{minipage}[t]{0.32\\textwidth}
  \\raggedright
  \\fontsize{9.5pt}{12pt}\\selectfont
  ${phone ? `${phone} \\\\` : ""}
  ${location ? `${location} \\\\` : ""}
  ${email ? `\\href{mailto:${email}}{\\color{textColor}${email}}` : ""}
\\end{minipage}%
\\begin{minipage}[t]{0.36\\textwidth}
  \\centering
  {\\Huge \\textbf{${name}}} \\\\[4pt]
  {\\color{primaryColor}\\fontsize{11pt}{13pt}\\selectfont \\textbf{${title}}}
\\end{minipage}%
\\begin{minipage}[t]{0.32\\textwidth}
  \\raggedleft
  \\fontsize{9.5pt}{12pt}\\selectfont
  ${github ? `\\href{https://${github}}{\\color{linkColor}GitHub} \\\\` : ""}
  ${
    linkedin
      ? `\\href{https://${linkedin}}{\\color{linkColor}LinkedIn} \\\\`
      : ""
  }
  ${
    portfolio
      ? `\\href{https://${portfolio}}{\\color{linkColor}Portfolio} \\\\`
      : ""
  }
\\end{minipage}

\\vspace{4pt}

%--- SKILLS SECTION ---
${skillsLatex}

%--- WORK EXPERIENCE SECTION ---
${experienceLatex}

%--- PROJECTS SECTION ---
${projectsLatex}

%--- EDUCATION SECTION ---
${educationLatex}

%--- ACTIVITIES SECTION ---
${activitiesLatex}

%--- CERTIFICATIONS SECTION ---
${certificationsLatex}

\\end{document}
`;

  return latexStr;
}
