export type Project = {
  slug: string
  title: string
  subtitle: string
  year: string
  role: string
  category: "Product" | "AI" | "Web" | "Tooling" | "Other"
  description: string
  longDescription: string
  tags: string[]
  image: string
  accent?: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "finance-manager",
    title: "Finance Manager",
    subtitle: "Personal finance tracking and management",
    year: "2026",
    role: "Creator",
    category: "Product",
    description: "A comprehensive tool for managing personal finances, tracking expenses, and analyzing spending habits.",
    longDescription: "Finance Manager is designed to help users take control of their personal finances. With intuitive dashboards and insightful visualizations, it makes tracking daily expenses and monitoring long-term financial goals simple and effective.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    image: "/placeholder.jpg",
    liveUrl: "https://finance-manager-dev.vercel.app/",
    repoUrl: "#",
    featured: true,
  },
  {
    slug: "workspace",
    title: "Workspace",
    subtitle: "Digital workspace and productivity environment",
    year: "2026",
    role: "Creator",
    category: "Web",
    description: "A unified digital environment for managing tasks, notes, and daily workflows.",
    longDescription: "Workspace acts as a centralized hub for productivity. It seamlessly integrates task management, quick note-taking, and daily planning into a clean, distraction-free interface built for focus.",
    tags: ["React", "Next.js", "TypeScript"],
    image: "/placeholder.jpg",
    liveUrl: "https://ws.dariogeorge.in/",
    repoUrl: "#",
    featured: true,
  },
  {
    slug: "qr-code-studio",
    title: "QR Code Studio",
    subtitle: "Custom QR code generation utility",
    year: "2025",
    role: "Creator",
    category: "Tooling",
    description: "A fast, flexible utility for generating customizable QR codes.",
    longDescription: "QR Code Studio allows users to generate, style, and export QR codes instantly. Built with a focus on simplicity and speed, it offers styling options and robust format support without any backend dependencies.",
    tags: ["React", "JavaScript", "CSS"],
    image: "/placeholder.jpg",
    liveUrl: "https://qr.dariogeorge.in/",
    repoUrl: "#",
    featured: true,
  },
]

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
