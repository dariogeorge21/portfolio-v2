import { SectionHeading } from "@/components/section-heading"
import { GithubWidget } from "./activity/github-widget"
import { WakatimeWidget } from "./activity/wakatime-widget"
import { Sparkles, Trophy } from "lucide-react"

export function ActivitySection() {
  return (
    <section
      id="activity"
      className="relative isolate border-t border-border py-28 md:py-40"
      aria-label="GitHub and Coding Activity"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Activity · 04"
          title={
            <>
              Data-driven insights,
              <br />
              <span className="italic text-muted">powered by integrations.</span>
            </>
          }
          description="A living view into my coding habits, contributions, and top languages pulled securely from GitHub and WakaTime."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <GithubWidget />
          <WakatimeWidget />
        </div>

        <div className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-6">
            GitHub · Trophies
          </p>
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex items-center justify-center p-8 bg-surface-2 overflow-hidden relative group">
            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-neon/5 via-transparent to-neon/5 blur-3xl" />
            <picture className="w-full text-center mix-blend-screen opacity-90 transition-opacity duration-500 hover:opacity-100 filter invert dark:invert-0">
              <img 
                src="https://github-profile-trophy.vercel.app/?username=dariogeorge21&theme=algolia&column=6&no-frame=true&no-bg=true" 
                alt="Dario George GitHub Trophies" 
                className="max-h-[140px] md:max-h-[180px] w-auto inline-block object-contain"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  )
}
