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
      
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-border/50 bg-surface-2 p-5 text-center">
          <p className="text-xs uppercase tracking-widest text-muted">Followers</p>
          <p className="mt-2 font-display text-4xl font-light text-foreground">{stats.followers}</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-surface-2 p-5 text-center">
          <p className="text-xs uppercase tracking-widest text-muted">Repositories</p>
          <p className="mt-2 font-display text-4xl font-light text-foreground">{stats.publicRepos}</p>
        </div>
      </div>

      <div className="mt-8 w-full">
        <GithubContributions username="dariogeorge21" />
      </div>
    </div>
  )
}
