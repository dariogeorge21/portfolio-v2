import { SectionHeading } from "@/components/section-heading"
import { GithubWidget } from "./activity/github-widget"
import { WakatimeWidget } from "./activity/wakatime-widget"

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
      </div>
    </section>
  )
}
