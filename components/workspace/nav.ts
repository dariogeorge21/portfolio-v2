import {
  BarChart3,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Contact,
  GraduationCap,
  Home,
  Settings,
  Share2,
  Sparkles,
  User,
} from "lucide-react"

export type WorkspaceNavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export const WORKSPACE_NAV: WorkspaceNavItem[] = [
  { href: "/workspace", label: "Dashboard", icon: Home },
  { href: "/workspace/profile", label: "Profile", icon: User },
  { href: "/workspace/projects", label: "Projects", icon: Briefcase },
  { href: "/workspace/skills", label: "Skills", icon: Sparkles },
  { href: "/workspace/education", label: "Education", icon: GraduationCap },
  { href: "/workspace/timeline", label: "Timeline", icon: BookOpen },
  { href: "/workspace/stats", label: "Stats", icon: BarChart3 },
  { href: "/workspace/social-links", label: "Social Links", icon: Share2 },
  { href: "/workspace/badges", label: "Badges", icon: BadgeCheck },
  { href: "/workspace/contact", label: "Contact Content", icon: Contact },
  { href: "/workspace/settings", label: "Settings", icon: Settings },
]
