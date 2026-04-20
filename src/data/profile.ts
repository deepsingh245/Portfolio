import type { ChatbotKnowledge } from "../types/profile";

export const portfolioKnowledge: ChatbotKnowledge = {
  identity: {
    name: "Simrandeep Singh",
    title: "Software Engineer",
    location: "India",
    taglineWords: [
      "Software Engineer",
      "Building things",
      "Learning",
      "Creating",
      "Growing",
      "Making things",
      "Designing",
      "Crafting",
    ],
    intro:
      "Frontend engineer who loves turning ideas into sleek, interactive experiences.",
    summary:
      "Simrandeep Singh is a software engineer based in India with strong frontend depth and full-stack delivery experience across React, Angular, Next.js, TypeScript, Node.js, Firebase, and cloud-backed products.",
    aboutBullets: [
      "I'm a frontend engineer who loves turning ideas into sleek, interactive experiences.",
      "Skilled in React, Angular, Next.js, and Tailwind, with TypeScript, Node.js, and databases powering the backend.",
      "I enjoy bridging design and code, often sketching before bringing ideas to life in the browser.",
      "Always curious and always building, from dynamic UIs to full-stack applications.",
      "Based in India and open to exciting opportunities where creativity meets engineering.",
    ],
    focusAreas: [
      "Frontend engineering",
      "Full-stack product development",
      "Interactive UI systems",
      "Performance optimization",
      "Product-minded engineering",
    ],
    recruiterPitch:
      "Best suited for frontend-heavy or product engineering roles where polished UX, modern JavaScript frameworks, and end-to-end ownership matter.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/deepsingh245",
        kind: "github",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/simrandeep-singh-7bb74b234/",
        kind: "linkedin",
      },
      {
        label: "X",
        url: "https://x.com/DevSimrandeep",
        kind: "x",
      },
      {
        label: "Email",
        url: "mailto:deepsingh245@gmail.com",
        kind: "email",
      },
      {
        label: "Resume",
        url: "/assets/Simrandeep_Singh_Resume.pdf",
        kind: "resume",
        download: true,
      },
    ],
  },
  experience: [
    {
      role: "SDE",
      company: "Unthinkable Solutions",
      period: "2024 - Present",
      description:
        "Developing scalable web applications using React, Next.js, and Node.js. Focused on performance optimization and modern UI architecture.",
      skills: ["React", "Angular", "Next.js", "Node.js", "TypeScript"],
      projects: [
        {
          title: "LDGERS Platform",
          tag: "SECURITY FIRST",
          icon: "shield",
          description: [
            "Engineered the LDGERS platform with SSL security and VAPT-compliant architecture, mitigating critical vulnerabilities and strengthening system integrity.",
            "Developed React Native mobile applications with optimized performance and consistent cross-platform behavior.",
            "Built end-to-end financial modules including reporting, account management, and invoice systems to automate business workflows.",
            "Enhanced platform reliability through secure API design, authentication, and data protection practices.",
          ],
          tech: ["REACT NATIVE", "SSL", "VAPT", "ENCRYPTION"],
        },
        {
          title: "Core HRMS",
          tag: "ENTERPRISE SCALE",
          icon: "users",
          description: [
            "Architected an end-to-end HRMS system managing hiring pipelines, interview workflows, offer generation, onboarding, and employee lifecycle operations.",
            "Engineered RBAC-driven dashboards with granular access for HR, Admin, and Managers, improving operational visibility and decision-making.",
            "Implemented geo-based attendance tracking and scalable multi-tenant architecture across organizations and locations.",
            "Led cross-functional team execution, delivering on schedule while integrating AI modules and configurable master data systems.",
            "Designed and implemented a multinational compliance structure aligned with India's DPDP Act, EU GDPR, and US CCPA.",
          ],
          tech: ["ARCHITECTURE", "RBAC", "NODE.JS", "COMPLIANCE"],
        },
        {
          title: "OnTheSpotTradeFlex - On The Spot",
          tag: "REAL-TIME OPS",
          icon: "zap",
          description: [
            "Architected a cross-platform Ionic and Angular application used across multiple sites, optimizing Firebase data pipelines to reduce load latency and improve field-team responsiveness.",
            "Owned onboarding access controls through an IP-restricted authentication gate, eliminating unauthorized signups and strengthening multi-tenant security.",
            "Designed an NFC and QR-driven operational workflow engine that reduced manual check-in and check-out time by 90% and standardized site-level reporting.",
            "Led the migration of the entire mobile codebase from JavaScript to TypeScript, reducing runtime errors and bringing consistency across shared modules.",
            "Implemented an asset-recognition pipeline using Gemini AI plus Search API, automating metadata tagging for high-volume asset libraries.",
            "Built an interactive 2D and 3D spatial-mapping layer with coordinate-linked assets, improving facility-layout visualization and enabling faster inspection cycles.",
            "Delivered a fully optimized mobile build achieving 99% crash-free usage across iOS and Android through performance profiling and native-integration improvements.",
            "Implemented end-to-end deployment for TradeFlex using GCP services and integrated Firebase Analytics plus Crashlytics to support Play Store release monitoring.",
          ],
          tech: ["IONIC", "ANGULAR", "FIREBASE", "GCP", "TYPESCRIPT", "GEMINI AI"],
        },
      ],
    },
    {
      role: "Web Developer",
      company: "Winsple",
      period: "2023 - 2023",
      description:
        "Delivered SEO and content-optimization workflows that increased client website visibility and improved search ranking and engagement across key pages.",
      skills: ["React", "Tailwind CSS", "JavaScript", "Redux"],
    },
    {
      role: "Intern Team Lead Front end",
      company: "NGO, GBSS",
      period: "2022 - 2022",
      description:
        "Led a 10-member engineering team to rebuild the NGO's web platform end-to-end, shipping a modern responsive experience with measurable engagement improvements. Redesigned the organization's legacy site with performant components, interactive flows, and modern UI patterns.",
      skills: ["HTML", "CSS", "JavaScript", "Leadership"],
    },
  ],
  projects: [
    {
      name: "Billety",
      description:
        "Billety is a smart and easy-to-use billing software that helps businesses create invoices, track payments, and manage customers effortlessly across desktop and mobile.",
      longDescription:
        "Billety is a comprehensive billing solution designed for modern businesses. It streamlines invoicing, allows real-time payment tracking, and provides centralized customer management with cross-platform support.",
      timeline: "Jan 2024 - Present",
      techStack: ["React", "Electron", "Capacitor", "Firebase", "TypeScript"],
      liveHref: "https://billety.netlify.app/",
      sourceHref: "https://github.com/deepsingh245/billety",
      downloads: {
        windows:
          "https://github.com/deepsingh245/billety/releases/download/v1.0.0/Billety-Setup-1.0.0.exe",
        mac: "https://github.com/deepsingh245/billety/releases/download/v1.0.0/Billety-1.0.0.dmg",
        android: "https://play.google.com/store/apps/details?id=com.billety.app",
      },
      visual: "billety",
      icon: "file-text",
      featuredFor: [
        "Cross-platform product delivery",
        "TypeScript application architecture",
        "Business workflow tooling",
      ],
    },
    {
      name: "Client Trace - NPM",
      description:
        "NPM package for tracking client IP addresses and user agents.",
      longDescription:
        "Client Trace is a lightweight NPM package that helps developers track client IP addresses and user agent strings for analytics and security workflows in Node.js applications.",
      timeline: "Dec 2024",
      techStack: ["JavaScript", "Node.js", "NPM"],
      liveHref: "https://npmjs.com/package/client-trace",
      visual: "client-trace",
      icon: "npm",
      featuredFor: [
        "Open-source packaging",
        "Node.js utility development",
        "Developer tooling",
      ],
    },
    {
      name: "CSSGrid Playground",
      description:
        "Interactive CSS Grid playground where users can build grids by clicking controls and see changes instantly.",
      longDescription:
        "A hands-on CSS Grid playground that lets users customize rows, columns, and gaps, preview the result immediately, and export clean CSS code.",
      timeline: "Nov 2025",
      techStack: ["HTML", "CSS", "JavaScript"],
      liveHref: "https://css-grid-playround.netlify.app/",
      sourceHref: "https://github.com/deepsingh245/css-grid-playground",
      visual: "css-grid-playground",
      icon: "globe",
      featuredFor: [
        "Frontend fundamentals",
        "Interactive learning tools",
        "Vanilla web engineering",
      ],
    },
    {
      name: "LinkedLoom",
      description:
        "LinkedLoom is a modern SaaS application that helps founders and creators scale their LinkedIn presence with AI-assisted content and scheduling.",
      longDescription:
        "LinkedLoom combines AI-powered content generation with scheduling and analytics in a polished SaaS dashboard aimed at creators and founders.",
      timeline: "Jan 2026",
      techStack: ["React", "Next.js", "TypeScript", "Tailwind", "Firebase"],
      liveHref: "https://linkedloom-web--linkedloom.us-east4.hosted.app/",
      sourceHref: "https://github.com/deepsingh245/LinkedLoom",
      visual: "linkedloom",
      icon: "globe",
      featuredFor: [
        "SaaS dashboard design",
        "TypeScript and Next.js delivery",
        "AI-assisted product thinking",
      ],
    },
    {
      name: "Attendify: Smart Attendance System",
      description:
        "A smart attendance system using face recognition to automatically identify students and mark attendance.",
      longDescription:
        "Attendify uses face recognition to automate classroom attendance and provides a dashboard for teachers to review reports and trends.",
      timeline: "Sep 2023",
      techStack: ["React", "Face Api", "Firebase", "NodeJS"],
      liveHref: "https://atttendify.netlify.app",
      sourceHref: "https://github.com/deepsingh245/attendify",
      visual: "attendify",
      icon: "scan-face",
      featuredFor: [
        "Applied AI features",
        "Dashboard product design",
        "Full-stack student tooling",
      ],
    },
  ],
  skillCategories: [
    {
      title: "LANGUAGES",
      skills: [
        { name: "TypeScript", rating: 4.0, icon: "typescript" },
        { name: "JavaScript", rating: 4.0, icon: "js" },
        { name: "Python", rating: 3.0, icon: "python" },
        { name: "HTML/CSS", rating: 5.0, icon: "html5" },
        { name: "C++", rating: 3.7, icon: "cpp" },
      ],
    },
    {
      title: "LIBRARIES & FRAMEWORKS",
      skills: [
        { name: "React", rating: 4.1, icon: "react" },
        { name: "Next.js", rating: 4.0, icon: "nextjs" },
        { name: "React Native", rating: 3.9, icon: "reactnative" },
        { name: "Angular", rating: 3.9, icon: "angular" },
        { name: "Node.js", rating: 4.6, icon: "nodejs" },
        { name: "Tailwind CSS", rating: 5.0, icon: "tailwindcss" },
        { name: "Redux", rating: 4.0, icon: "redux" },
        { name: "Ionic", rating: 4.8, icon: "ionic" },
      ],
    },
    {
      title: "PLATFORMS & AI TOOLS",
      skills: [
        { name: "Firebase", rating: 4.5, icon: "firebase" },
        { name: "Git", rating: 4.8, icon: "git" },
        { name: "Figma", rating: 4.0, icon: "figma" },
        { name: "Claude Code", rating: 4.0, icon: "claude" },
        { name: "Antigravity", rating: 4.4, icon: "antigravity" },
        { name: "Copilot", rating: 4.5, icon: "copilotgithub" },
        { name: "Cursor", rating: 3.8, icon: "cursor" },
      ],
    },
    {
      title: "DATABASES & CLOUD",
      skills: [
        { name: "MongoDB", rating: 4.5, icon: "mongodb" },
        // { name: "PostgreSQL", rating: 3.6, icon: "postgresql" },
        { name: "MySQL", rating: 3.2, icon: "mysql" },
        { name: "GCP", rating: 3.8, icon: "gcloud" },
        { name: "Netlify", rating: 4.7, icon: "netlify" },
        { name: "Vercel", rating: 4.8, icon: "vercel" },
      ],
    },
  ],
  achievements: [
    {
      title: "2nd Runner Up - Disrupt Hackathon, Unthinkable Solutions",
      description:
        "Ranked 2nd Runner Up out of 17 teams for delivering a production-ready AI travel-planning engine under 30 hours, combining real-time data aggregation, recommendations, and automated decision logic.",
      icon: "trophy",
      color: "text-yellow-500",
    },
    {
      title: "National Finalist, Jawaharlal Nehru National Science Exhibition",
      description:
        "Selected as a national candidate for engineering innovation; designed a kinetic-energy harvesting module enabling on-the-go mobile charging through mechanical-to-electrical conversion for cyclists.",
      icon: "star",
      color: "text-blue-500",
    },
    {
      title: "500+ DSA Questions Solved",
      description:
        "Solved 500+ data structures and algorithms questions across platforms like LeetCode and GeeksforGeeks, demonstrating strong problem-solving capability.",
      icon: "code",
      color: "text-green-500",
    },
  ],
  resumeFacts: [
    { label: "Resume", value: "/assets/Simrandeep_Singh_Resume.pdf" },
    { label: "Primary focus", value: "Frontend and product-oriented software engineering" },
    { label: "Open to", value: "Exciting engineering opportunities where creativity meets execution" },
  ],
  faqSeeds: [
    "What kind of engineer is Simrandeep?",
    "What projects best show his frontend skills?",
    "What experience does he have with React and TypeScript?",
    "What achievements stand out most?",
    "What roles is Simrandeep best suited for?",
  ],
};

export const allSkillNames = portfolioKnowledge.skillCategories.flatMap((category) =>
  category.skills.map((skill) => skill.name)
);
