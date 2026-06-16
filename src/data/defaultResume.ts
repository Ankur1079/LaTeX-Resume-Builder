/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResumeData, ColorAccent } from "../types";

export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "Alex Mercer",
    title: "Software Development Engineer",
    phone: "(+1) 555-019-2834",
    location: "San Francisco, CA, USA",
    email: "alex.mercer@example.com",
    github: "github.com/alexmercer",
    linkedin: "linkedin.com/in/alexmercer",
    portfolio: "alexmercer.dev"
  },
  skills: [
    {
      id: "skill-1",
      category: "Programming Languages",
      items: "JavaScript, TypeScript, HTML5, CSS3, C++, Python"
    },
    {
      id: "skill-2",
      category: "Tools & Platforms",
      items: "Git, GitHub, Docker, AWS, Vercel, Supabase, Linux, Postman, Figma, webpack"
    },
    {
      id: "skill-3",
      category: "Frameworks & Libraries",
      items: "React.js, Next.js, Redux Toolkit, Node.js, Express.js, MongoDB, Tailwind CSS, PostgreSQL"
    }
  ],
  workExperience: [
    {
      id: "exp-1",
      role: "Junior Developer Intern",
      company: "Apex Tech Solutions",
      duration: "July 2024 — Present",
      location: "San Francisco, CA (Remote)",
      highlights: [
        "Enhanced core software quality by integrating customer feedback and refining component styles.",
        "Improved system modularity and layout reuse using standard HTML, CSS, JavaScript, and React ecosystems.",
        "Expanded global software reach by localizing interactive modules across three languages.",
        "Boosted frontend engagement rates by optimizing interactive UI performance and loading sequences."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "ChefPalette",
      duration: "Jan 2024 — Present",
      repoUrl: "https://github.com/example/chefpalette",
      repoText: "Repo",
      highlights: [
        "Developed a web-based food curation platform utilizing **React.js**, **Redux Toolkit**, and **React-Router** for dynamic routing and state management to guarantee a robust **responsive design**.",
        "Implemented real-time content configurations, parsing active dataset endpoints securely with minimal performance overhead.",
        "Formulated high-quality, reusable styled assets with focused interest on **component modularity** and system maintenance standards.",
        "Engineered library-free interactive features, including nested search matching and custom animation utilities."
      ]
    },
    {
      id: "proj-2",
      name: "SyncChat",
      duration: "March 2024 — April 2024",
      repoUrl: "https://github.com/example/syncchat",
      repoText: "Repo",
      highlights: [
        "Built an instant chat client implementing the **MERN framework** along with **Socket.io** protocols to process message streams and low-latency delivery.",
        "Configured secure authentication flows incorporating protected routes, token verification structures, and encryption packages.",
        "Optimized query performance for high-frequency database read/write sequences inside a clustered environment."
      ]
    },
    {
      id: "proj-3",
      name: "EtherFund",
      duration: "Sep 2023 — March 2024",
      repoUrl: "https://github.com/example/etherfund",
      repoText: "Repo",
      highlights: [
        "Created a visual decentralized crowdfunding solution allowing active users to form and monitor micro-donation campaigns.",
        "Integrated modern contract tools to manage digital transactions on active public test networks.",
        "Composed an elegant developer interface with **React** components and high-contrast, accessibility-standard design libraries."
      ]
    },
    {
      id: "proj-4",
      name: "Pinsave Clone",
      duration: "Dec 2023 — Jan 2024",
      repoUrl: "https://github.com/example/pinsave-clone",
      repoText: "Repo",
      highlights: [
        "Assembled a fully interactive visual curation service using **JavaScript**, **Node.js**, and Express for active server routes.",
        "Secured active user accounts with modern session validations and credential matching middleware.",
        "Structured fluid visual lists to dynamically adapt to varying mobile, tablet, and desktop display constraints."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "State University of Science and Technology",
      degree: "Bachelor of Science in Computer Science and Engineering",
      gpaOrPercentage: "3.92 GPA / First Class with Distinction",
      duration: "September 2020 — June 2024",
      location: "San Francisco, CA"
    },
    {
      id: "edu-2",
      institution: "Aviation Academy & College",
      degree: "High School Diploma / Mathematics concentration",
      gpaOrPercentage: "3.85 GPA",
      duration: "September 2018 — June 2020",
      location: "San Jose, CA"
    }
  ],
  activities: [
    {
      id: "act-1",
      description: "Student Lead at Open-Source Academic Club",
      duration: "Aug 2023 — April 2024"
    },
    {
      id: "act-2",
      description: "First Place Winner at Regional Tech Innovations Hackathon",
      duration: "Feb 2024"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Advanced Software Engineering Certificate",
      duration: "Nov 2023 — Jan 2024"
    },
    {
      id: "cert-2",
      name: "AWS Certified Solutions Architect – Associate",
      duration: "April 2022 — June 2022"
    }
  ]
};

export const COLOR_ACCENTS: ColorAccent[] = [
  {
    name: "Classic Slate Blue",
    hex: "#2E5B82",
    rgb: "46, 91, 130",
    tailwindClass: "bg-[#2E5B82]"
  },
  {
    name: "Deep Ocean",
    hex: "#1A365D",
    rgb: "26, 54, 93",
    tailwindClass: "bg-[#1A365D]"
  },
  {
    name: "Emerald Scholar",
    hex: "#0F766E",
    rgb: "15, 118, 110",
    tailwindClass: "bg-[#0F766E]"
  },
  {
    name: "Crimson Academy",
    hex: "#991B1B",
    rgb: "153, 27, 27",
    tailwindClass: "bg-[#991B1B]"
  },
  {
    name: "Tech Charcoal",
    hex: "#1F2937",
    rgb: "31, 41, 55",
    tailwindClass: "bg-[#1F2937]"
  },
  {
    name: "Indigo Modern",
    hex: "#4338CA",
    rgb: "67, 56, 202",
    tailwindClass: "bg-[#4338CA]"
  }
];
