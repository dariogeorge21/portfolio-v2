"use client"

import { useState, useEffect } from "react"
import { Github } from "lucide-react"

export function GithubWidget() {
  const [stats, setStats] = useState({ followers: 57, publicRepos: 25 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://api.github.com/users/dariogeorge21")
        if (!res.ok) throw new Error("Failed")
        const user = await res.json()
        setStats({
          followers: user.followers,
          publicRepos: user.public_repos,
        })
      } catch (e) {
        // Keep default fallback stats
        setStats({ followers: 57, publicRepos: 25 })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])
  
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

      <div className="mt-8 flex justify-center w-full relative h-[180px] bg-surface-2 rounded-xl overflow-hidden border border-border/50">
        {/* We use external snake svg mapped from github actions with local fallback */}
        <picture className="w-full h-full object-cover">
          {/* <source media="(prefers-color-scheme: dark)" srcSet="https://raw.githubusercontent.com/dariogeorge21/dariogeorge21/output/github-contribution-grid-snake-dark.svg" /> */}
          <source media="(prefers-color-scheme: light)" srcSet="https://raw.githubusercontent.com/dariogeorge21/dariogeorge21/output/github-contribution-grid-snake.svg" />
          {/* <img alt="github contribution grid snake animation" src="https://raw.githubusercontent.com/dariogeorge21/dariogeorge21/output/github-contribution-grid-snake.svg" onError={(e) => { e.currentTarget.src = "/githubStatsGraphpng.png" }} className="w-full h-full object-cover opacity-80 mix-blend-screen" /> */}
          <img src="/githubStatsGraphpng.png" className="w-full h-full  opacity-80 mix-blend-screen" alt="" />
        </picture>
      </div>
    </div>
  )
}
