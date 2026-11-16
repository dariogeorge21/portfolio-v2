"use client"

import { Github } from "lucide-react"
import { GithubContributions } from "./github-contributions"
import { useGithubStats } from "@/lib/hooks/use-github-stats"

export function GithubWidget() {
  const stats = useGithubStats("dariogeorge21")
  
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <Github className="text-neon" size={24} />
        <h3 className="font-display text-xl tracking-tight">GitHub Impact</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-xl border border-border/50 bg-surface-2 p-4 text-center sm:p-5">
          <p className="text-xs uppercase tracking-widest text-muted">Followers</p>
          <p className="mt-2 font-display text-3xl font-light text-foreground sm:text-4xl">{stats.followers}</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-surface-2 p-4 text-center sm:p-5">
          <p className="text-xs uppercase tracking-widest text-muted">Repositories</p>
          <p className="mt-2 font-display text-3xl font-light text-foreground sm:text-4xl">
            {stats.publicRepos > 190 ? `${stats.publicRepos}+` : "190+"}
          </p>
        </div>
        <div className="rounded-xl border border-border/50 bg-surface-2 p-4 text-center sm:p-5">
          <p className="text-xs uppercase tracking-widest text-muted">Yearly Commits</p>
          <p className="mt-2 font-display text-3xl font-light text-foreground sm:text-4xl">4,000+</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-surface-2 p-4 text-center sm:p-5">
          <p className="text-xs uppercase tracking-widest text-muted">Profile Views</p>
          <p className="mt-2 font-display text-3xl font-light text-foreground sm:text-4xl">4,500+</p>
        </div>
      </div>

      <div className="mt-8 w-full">
        <GithubContributions username="dariogeorge21" />
      </div>
    </div>
  )
}
