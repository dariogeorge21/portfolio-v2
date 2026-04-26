import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { ActivitySection } from "@/components/activity-section"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <About />
      < Skills />
      <Projects />
      <ActivitySection />
      <Contact />
      <Footer />
    </main>
  )
}
