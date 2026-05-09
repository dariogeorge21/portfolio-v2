import { Code2, GitBranch, Award, Star, Code, Instagram, Twitter, Linkedin, Github, Mail } from "lucide-react"


export const BADGES: { icon: React.ComponentType; label: string; sub: string }[] = [
  { icon: Star, label: "Arctic Code Vault", sub: "2020" },
  { icon: Award, label: "Pro Contributor", sub: "500+ commits" },
  { icon: GitBranch, label: "Open Source", sub: "3k★ maintainer" },
  { icon: Code2, label: "Pair Extraordinaire", sub: "Team-first" },
]

export const lines: string[] = [
    "I am an enthusiastic developer who thrives on building",
    "practical and cool projects. With a builder-oriented mindset,",
    "I love turning complex problems into elegant software solutions",
    "and always enjoy learning new tools and paradigms.",
    "",
    "Currently pursuing my Computer Science degree, I am constantly",
    "evolving my skill set. Whether it's crafting scalable backends",
    "or engaging user interfaces, I'm always ready for the next challenge.",
  ]

export const contactContent: { topHead: string; subHead: string } = {
  "topHead" : "Open to select engagements — Q2 2026.",
  "subHead" : "Founding engineering roles, R&amp;D collaborations, and invite-only client work. Typical reply within 24 hours."
}

export const details: Record<string, string> = {
  "code": "21DG2026",
  "name": "Dario George",
  "location": "New Delhi, India",
  "locationType": "Remote-friendly",
  "website": "https://dariogeorge.in",
  "role": "Freelance Developer",
  "github": "https://github.com/dariogeorge21",
  "linkedin": "https://linkedin.com/in/dariogeorge21",
  "email": "edu.dariogeorge21@gmail.com",
  "x": "https://x.com/dariogeorge21",
  "phone": "+91 75609 77040",
  "status": "Undergrad Student",
  "statusLocation" : "SJCET Palai",
  "imageLink": "/darioImg.jpeg",
  "resume": "https://dariogeorge.in/resume.pdf",
  "buyMeACoffee": "https://www.buymeacoffee.com/dariogeorge21"
}

export type HeadlineDetails = {
  headline: string
  tags: string[]
}

export type SocialLinks = {
  label: string
  handle: string
  href: string
  icon: React.ComponentType
}

export const HeadlineDetails: HeadlineDetails = {
  headline:
    "a computer science student and developer building practical and cool projects. Focused on continuous learning and solving real problems.",
  tags: ["CS Student", "Developer", "Love Exploring", "Lifelong Learner"],
}

export type portfolioProject = {
    priorityIndex: number,
    slug: string,
    title: string, 
    subtitle: string,
    category: string,
  year: string,
    image: string,
    tags: string[],
    role: string,
    longDescription: string,
    liveUrl?: string,
    repoUrl?: string
}

export const portfolioProjectList: portfolioProject[] = [
  {
    priorityIndex: 1,
    slug: "campus-bus-pass-system",
    title: "Campus Bus Pass System",
    subtitle: "Bus pass booking portal for St Joseph College of Engineering & Technology.",
    category: "Web Application",
    year: "2025",
    image: "",
    tags: ["TypeScript", "Full Stack"],
    role: "Full Stack Developer",
    longDescription: "A comprehensive bus pass booking portal developed for St Joseph College of Engineering & Technology, Palai. Designed to streamline administrative workflows and handle user ticketing state securely and efficiently.",
    liveUrl: "https://buspass.sjcetpalai.ac.in",
    repoUrl: "https://github.com/dariogeorge21/campus-bus-pass-system"
  },
  {
    priorityIndex: 2,
    slug: "ai-central-station",
    title: "AI Central Station",
    subtitle: "A centralized hub and toolkit for AI applications.",
    category: "Web Application",
    year: "2025",
    image: "",
    tags: ["TypeScript", "Frontend"],
    role: "Frontend Developer",
    longDescription: "A modern web application built with TypeScript serving as a centralized station for interacting with various AI tools and concepts in a unified dashboard environment.",
    liveUrl: "https://ai-central.vercel.app",
    repoUrl: "https://github.com/dariogeorge21/ai-central-station"
  },
  {
    priorityIndex: 3,
    slug: "qr-code-studio",
    title: "QR Code Studio",
    subtitle: "A dedicated utility application for generating and managing QR codes.",
    category: "Utility Application",
    year: "2025",
    image: "",
    tags: ["TypeScript", "Tooling"],
    role: "Frontend Developer",
    longDescription: "A focused, user-friendly utility web application built with TypeScript that allows users to seamlessly generate, customize, and manage QR codes for personal and business use.",
    liveUrl: "https://qr.dariogeorge.in",
    repoUrl: "https://github.com/dariogeorge21/qr-code-studio"
  },
  {
    priorityIndex: 4,
    slug: "github-account-report",
    title: "GitHub Account Report",
    subtitle: "A lightweight dashboard to visualize GitHub accounts using the REST API.",
    category: "Dashboard & Analytics",
    year: "2026",
    image: "",
    tags: ["JavaScript", "REST API"],
    role: "Frontend Developer",
    longDescription: "A lightweight single-page dashboard designed to fetch, parse, and visually render data from a user's GitHub account utilizing the official GitHub REST API.",
    liveUrl: "https://dariogeorge21.github.io/github-account-report/",
    repoUrl: "https://github.com/dariogeorge21/github-account-report"
  },
  {
    priorityIndex: 5,
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    subtitle: "Primary interactive developer portfolio.",
    category: "Portfolio",
    year: "2025",
    image: "",
    tags: ["TypeScript", "UI/UX"],
    role: "Frontend Developer",
    longDescription: "The foundational codebase for my personal developer portfolio, built with TypeScript to showcase projects, skills, and interactive web elements with a focus on performant modern web design.",
    liveUrl: "https://dariogeorge.vercel.app",
    repoUrl: "https://github.com/dariogeorge21/personal-portfolio"
  },
  {
    priorityIndex: 6,
    slug: "portfolio-v2",
    title: "Portfolio v2",
    subtitle: "The second iteration of my professional developer portfolio.",
    category: "Portfolio",
    year: "2026",
    image: "",
    tags: ["TypeScript", "Architecture"],
    role: "Frontend Developer",
    longDescription: "An updated and refactored iteration of my personal portfolio web application, focusing on improved performance, modern UI/UX design, and cleaner TypeScript architecture.",
    liveUrl: "https://portfolio.dariogeorge.in",
    repoUrl: "https://github.com/dariogeorge21/portfolio-v2"
  },
  {
    priorityIndex: 7,
    slug: "ai-hub-page",
    title: "AI Hub Page",
    subtitle: "A front-end landing page and resource hub for AI tools.",
    category: "Landing Page",
    year: "2025",
    image: "",
    tags: ["HTML", "Web Design"],
    role: "Frontend Developer",
    longDescription: "A structured frontend web page designed to serve as a comprehensive directory and landing zone for various artificial intelligence resources and links.",
    liveUrl: "https://ai-hub-psi.vercel.app",
    repoUrl: "https://github.com/dariogeorge21/AI-HUB-PAGE"
  },
  {
    priorityIndex: 8,
    slug: "finance-manager",
    title: "Finance Manager",
    subtitle: "A personal finance tracking and management dashboard.",
    category: "Dashboard Application",
    year: "2025",
    image: "",
    tags: ["TypeScript", "State Management"],
    role: "Full Stack Developer",
    longDescription: "A financial management application allowing users to track, monitor, and calculate specific monetary metrics through an interactive and dynamically updating UI.",
    liveUrl: "https://finance.dariogeorge.in",
    repoUrl: "https://github.com/dariogeorge21/finance-manager"
  },
  {
    priorityIndex: 9,
    slug: "automated-whatsapp-messenger",
    title: "Automated WhatsApp Messenger",
    subtitle: "A scripting utility for automating WhatsApp message delivery.",
    category: "Automation & Scripting",
    year: "2025",
    image: "",
    tags: ["JavaScript", "Automation", "Node.js"],
    role: "Backend Developer",
    longDescription: "An automated scripting tool designed to interface with WhatsApp for scheduled or triggered message delivery, streamlining communication workflows and repetitive messaging tasks.",
    repoUrl: "https://github.com/dariogeorge21/automated-whatsapp-messenger"
  },
  {
    priorityIndex: 10,
    slug: "my-workspace",
    title: "My Workspace",
    subtitle: "A personal digital workspace and productivity dashboard.",
    category: "Productivity Application",
    year: "2026",
    image: "",
    tags: ["TypeScript", "Frontend"],
    role: "Frontend Developer",
    longDescription: "A custom-built digital workspace and productivity dashboard built with TypeScript, acting as a centralized and customizable portal for daily tools, links, and operational metrics.",
    liveUrl: "https://ws.dariogeorge.in",
    repoUrl: "https://github.com/dariogeorge21/my-workspace"
  }
];


export type SkillGroup = {
  label: string
  items: { name: string; level: number; note?: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "C / C++", level: 90, note: "Core fundamentals" },
      { name: "Java", level: 85 },
      { name: "Python", level: 88, note: "Scripting & AI" },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 92, note: "Daily driver" },
    ],
  },
  {
    label: "Web & Frameworks",
    items: [
      { name: "Next.js", level: 90 },
      { name: "React", level: 92 },
      { name: "Node.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML5/CSS3", level: 95 },
    ],
  },
  {
    label: "Databases & Backend",
    items: [
      { name: "MongoDB", level: 88 },
      { name: "MySQL", level: 85 },
      { name: "Supabase", level: 80 },
      { name: "Firebase", level: 82 },
    ],
  },
  {
    label: "Tools & DevOps",
    items: [
      { name: "Git / GitHub", level: 90 },
      { name: "Linux / Arch", level: 88, note: "Daily environment" },
      { name: "Bash / PowerShell", level: 85 },
      { name: "Vercel / Netlify", level: 90 },
    ],
  },
]

export type TimelineItem = {
  year: string
  title: string
  org: string
  description: string
  side: "left" | "right"
}

export type EducationItem = {
  degree: string
  institution: string
  location: string
  period: string
  description: string
  achievements: string[]
}

export const timeline: TimelineItem[] = [
  {
    year: "Current",
    title: "Freelance Developer",
    org: "Remote",
    description: "Building web applications and tools for clients across various industries, focusing on clean design and robust functionality.",
    side: "left",
  }
]

export const stats = [
  { value: "~58", label: "GitHub Followers" },
  { value: "x2", label: "Quickdraw" },
  { value: "YOLO", label: "Achievement" },
  { value: "New Delhi", label: "Location" },
]

export const education: EducationItem[] = [
  {
    degree: "BTech in Computer Science and Engineering",
    institution: "St Joseph's College of Engineering and Technology",
    location: "Palai, Kottayam, Kerala",
    period: "2024 - Present",
    description: "Currently in the second semester (S4) of Computer Science and Engineering program, focusing on building a strong foundation in programming, data structures, and algorithms.",
    achievements: [
      "Current GPA: 8.5",
      "Actively learning web development technologies",
      "Exploring Data Structures and Algorithms in C++",
    ],
  },
  {
    degree: "12th (Pre-degree)",
    institution: "St Mary's Central School",
    location: "Idukki, Kerala",
    period: "July 2022 - April 2024",
    description: "Completed higher secondary education with a focus on Mathematics and Computer Science, developing a strong foundation in logical thinking and problem-solving skills.",
    achievements: [
      "Achieved 87.8% in final examinations",
      "Specialized in Mathematics and Computer Science",
      "Participated in school-level programming competitions",
    ],
  },
  {
    degree: "10th (SSLC)",
    institution: "St Columba's School",
    location: "New Delhi",
    period: "April 2011 - May 2022",
    description: "Completed secondary education with a well-rounded curriculum covering all major subjects, developing a strong academic foundation.",
    achievements: [
      "Achieved 72.8% in final examinations",
      "Participated in various extracurricular activities",
      "Developed initial interest in computers and technology",
    ],
  },
]

export const portfolioProjects = [
  {
    priorityIndex: 1,
    slug: "campus-bus-pass-system",
    title: "Campus Bus Pass System",
    subtitle: "Bus pass booking portal for St Joseph College of Engineering & Technology.",
    category: "Web Application",
    year: "2025",
    image: "",
    tags: ["TypeScript", "Full Stack"],
    role: "Full Stack Developer",
    longDescription: "A comprehensive bus pass booking portal developed for St Joseph College of Engineering & Technology, Palai. Designed to streamline administrative workflows and handle user ticketing state securely and efficiently.",
    liveUrl: "https://buspass.sjcetpalai.ac.in",
    repoUrl: "https://github.com/dariogeorge21/campus-bus-pass-system"
  },
  {
    priorityIndex: 2,
    slug: "ai-central-station",
    title: "AI Central Station",
    subtitle: "A centralized hub and toolkit for AI applications.",
    category: "Web Application",
    year: "2025",
    image: "",
    tags: ["TypeScript", "Frontend"],
    role: "Frontend Developer",
    longDescription: "A modern web application built with TypeScript serving as a centralized station for interacting with various AI tools and concepts in a unified dashboard environment.",
    liveUrl: "https://ai-central.vercel.app",
    repoUrl: "https://github.com/dariogeorge21/ai-central-station"
  },
  {
    priorityIndex: 3,
    slug: "qr-code-studio",
    title: "QR Code Studio",
    subtitle: "A dedicated utility application for generating and managing QR codes.",
    category: "Utility Application",
    year: "2025",
    image: "",
    tags: ["TypeScript", "Tooling"],
    role: "Frontend Developer",
    longDescription: "A focused, user-friendly utility web application built with TypeScript that allows users to seamlessly generate, customize, and manage QR codes for personal and business use.",
    liveUrl: "https://qr.dariogeorge.in",
    repoUrl: "https://github.com/dariogeorge21/qr-code-studio"
  },
  {
    priorityIndex: 4,
    slug: "github-account-report",
    title: "GitHub Account Report",
    subtitle: "A lightweight dashboard to visualize GitHub accounts using the REST API.",
    category: "Dashboard & Analytics",
    year: "2026",
    image: "",
    tags: ["JavaScript", "REST API"],
    role: "Frontend Developer",
    longDescription: "A lightweight single-page dashboard designed to fetch, parse, and visually render data from a user's GitHub account utilizing the official GitHub REST API.",
    liveUrl: "https://dariogeorge21.github.io/github-account-report/",
    repoUrl: "https://github.com/dariogeorge21/github-account-report"
  },
  {
    priorityIndex: 5,
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    subtitle: "Primary interactive developer portfolio.",
    category: "Portfolio",
    year: "2025",
    image: "",
    tags: ["TypeScript", "UI/UX"],
    role: "Frontend Developer",
    longDescription: "The foundational codebase for my personal developer portfolio, built with TypeScript to showcase projects, skills, and interactive web elements with a focus on performant modern web design.",
    liveUrl: "https://dariogeorge.vercel.app",
    repoUrl: "https://github.com/dariogeorge21/personal-portfolio"
  },
  {
    priorityIndex: 6,
    slug: "portfolio-v2",
    title: "Portfolio v2",
    subtitle: "The second iteration of my professional developer portfolio.",
    category: "Portfolio",
    year: "2026",
    image: "",
    tags: ["TypeScript", "Architecture"],
    role: "Frontend Developer",
    longDescription: "An updated and refactored iteration of my personal portfolio web application, focusing on improved performance, modern UI/UX design, and cleaner TypeScript architecture.",
    liveUrl: "https://portfolio-dario-delta.vercel.app",
    repoUrl: "https://github.com/dariogeorge21/portfolio-v2"
  },
  {
    priorityIndex: 7,
    slug: "ai-hub-page",
    title: "AI Hub Page",
    subtitle: "A front-end landing page and resource hub for AI tools.",
    category: "Landing Page",
    year: "2025",
    image: "",
    tags: ["HTML", "Web Design"],
    role: "Frontend Developer",
    longDescription: "A structured frontend web page designed to serve as a comprehensive directory and landing zone for various artificial intelligence resources and links.",
    liveUrl: "https://ai-hub-psi.vercel.app",
    repoUrl: "https://github.com/dariogeorge21/AI-HUB-PAGE"
  },
  {
    priorityIndex: 8,
    slug: "finance-manager",
    title: "Finance Manager",
    subtitle: "A personal finance tracking and management dashboard.",
    category: "Dashboard Application",
    year: "2025",
    image: "",
    tags: ["TypeScript", "State Management"],
    role: "Full Stack Developer",
    longDescription: "A financial management application allowing users to track, monitor, and calculate specific monetary metrics through an interactive and dynamically updating UI.",
    liveUrl: "https://finance-manager-green.vercel.app",
    repoUrl: "https://github.com/dariogeorge21/finance-manager"
  },
  {
    priorityIndex: 9,
    slug: "automated-whatsapp-messenger",
    title: "Automated WhatsApp Messenger",
    subtitle: "A scripting utility for automating WhatsApp message delivery.",
    category: "Automation & Scripting",
    year: "2025",
    image: "",
    tags: ["JavaScript", "Automation", "Node.js"],
    role: "Backend Developer",
    longDescription: "An automated scripting tool designed to interface with WhatsApp for scheduled or triggered message delivery, streamlining communication workflows and repetitive messaging tasks.",
    repoUrl: "https://github.com/dariogeorge21/automated-whatsapp-messenger"
  },
  {
    priorityIndex: 10,
    slug: "my-workspace",
    title: "My Workspace",
    subtitle: "A personal digital workspace and productivity dashboard.",
    category: "Productivity Application",
    year: "2026",
    image: "",
    tags: ["TypeScript", "Frontend"],
    role: "Frontend Developer",
    longDescription: "A custom-built digital workspace and productivity dashboard built with TypeScript, acting as a centralized and customizable portal for daily tools, links, and operational metrics.",
    liveUrl: "https://ws.dariogeorge.in",
    repoUrl: "https://github.com/dariogeorge21/my-workspace"
  }
];


export const SOCIALS: SocialLinks[] = [
  {
    label: "Email",
    handle: "edu.dariogeorge21@gmail.com",
    href: "mailto:edu.dariogeorge21@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    handle: "@dariogeorge21",
    href: "https://github.com/dariogeorge21",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "in/dariogeorge21",
    href: "https://linkedin.com/in/dariogeorge21",
    icon: Linkedin,
  },
  {
    label: "X (Twitter)",
    handle: "@dariogeorge21",
    href: "https://x.com/dariogeorge21",
    icon: Twitter,
  },
  {
    label: "Instagram",
    handle: "@dariogeorge21",
    href: "https://instagram.com/dariogeorge21",
    icon: Instagram,
  },
  {
    label: "LeetCode",
    handle: "dariogeorge21",
    href: "https://leetcode.com/dariogeorge21",
    icon: Code,
  },
]
