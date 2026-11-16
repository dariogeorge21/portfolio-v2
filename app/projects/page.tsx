import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { AllProjects } from "@/components/all-projects"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Projects — Dario George",
  description:
    "Explore all projects crafted by Dario George, spanning full-stack web applications, tooling, dashboards, and automated systems.",
  openGraph: {
    title: "Projects — Dario George",
    description:
      "Explore all projects crafted by Dario George, spanning full-stack web applications, tooling, dashboards, and automated systems.",
  },
}

export default function ProjectsPage() {
  return (
    <main id="top" className="relative min-h-screen bg-background text-foreground">
      <Navigation />
      <AllProjects />
      <Footer />
    </main>
  )
}
