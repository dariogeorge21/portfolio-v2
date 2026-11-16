import { Code, Instagram, Twitter, Linkedin, Github, Mail } from "lucide-react"

export {
  type Project,
  type portfolioProject,
  portfolioProjects,
  portfolioProjectList,
  projects,
} from "./projects-data"

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
  topHead: "Open to select engagements — Q2 2026.",
  subHead: "Founding engineering roles, R&D collaborations, and invite-only client work. Typical reply within 24 hours.",
}

export const details: Record<string, string> = {
  code: "21DG2026",
  name: "Dario George",
  location: "New Delhi, India",
  locationType: "Remote-friendly",
  website: "https://dariogeorge.in",
  role: "Freelance Developer",
  github: "https://github.com/dariogeorge21",
  linkedin: "https://linkedin.com/in/dariogeorge21",
  email: "mail.dariogeorge@gmail.com",
  x: "https://x.com/dariogeorge21",
  phone: "+91 75609 77040",
  status: "Undergrad Student",
  statusLocation: "SJCET Palai",
  imageLink: "/darioImg.png",
  resume: "https://dariogeorge.in/resume.pdf",
  buyMeACoffee: "https://www.buymeacoffee.com/dariogeorge21",
}

export type HeadlineDetails = {
  headline: string
  tags: string[]
}

export type SocialLinks = {
  label: string
  handle: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

export const HeadlineDetails: HeadlineDetails = {
  headline:
    "a computer science student and developer building practical and cool projects. Focused on continuous learning and solving real problems.",
  tags: ["CS Student", "Developer", "Love Exploring", "Lifelong Learner"],
}

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
    title: "Freelance Web Developer & Consultant",
    org: "Pan-India",
    description: "Delivering modern web applications, performant tools, and tailored digital solutions, with 15+ services shipped to clients across India.",
    side: "left",
  },
  {
    year: "2024 - Present",
    title: "Hackathon Competitor & Builder",
    org: "National & Collegiate",
    description: "Participated in 6+ national and collegiate hackathons, rapidly architecting and shipping scalable full-stack products under competitive timeframes.",
    side: "right",
  },
]

export const stats = [
  { value: "4,000+", label: "Commits (2026)" },
  { value: "190+", label: "Repositories" },
  { value: "75", label: "GitHub Followers" },
  { value: "860+ hrs", label: "WakaTime Coding" },
  { value: "4,500+", label: "GitHub Views" },
  { value: "700+", label: "LinkedIn Network" },
  { value: "20+", label: "Projects Built" },
  { value: "15+", label: "Client Deliveries" },
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

export const SOCIALS: SocialLinks[] = [
  {
    label: "Email",
    handle: "mail.dariogeorge@gmail.com",
    href: "mailto:mail.dariogeorge@gmail.com",
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
