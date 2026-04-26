import { Github } from "lucide-react"

async function getStats() {
  const token = process.env.GITHUB_TOKEN
  const username = "dariogeorge21"
  
  if (!token) {
    return { followers: 57, publicRepos: 25 } // graceful fallback
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 }
    })
    
    if (!userRes.ok) throw new Error("Failed")
    const user = await userRes.json()

    return {
      followers: user.followers,
      publicRepos: user.public_repos,
    }
  } catch (e) {
    return { followers: 57, publicRepos: 25 } 
  }
}

export async function GithubWidget() {
  const stats = await getStats()
  
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
        {/* We use external snake svg mapped from github actions */}
        <picture className="w-full h-full object-cover">
          <source media="(prefers-color-scheme: dark)" srcSet="https://raw.githubusercontent.com/dariogeorge21/dariogeorge21/output/github-contribution-grid-snake-dark.svg" />
          <source media="(prefers-color-scheme: light)" srcSet="https://raw.githubusercontent.com/dariogeorge21/dariogeorge21/output/github-contribution-grid-snake.svg" />
          <img alt="github contribution grid snake animation" src="https://raw.githubusercontent.com/dariogeorge21/dariogeorge21/output/github-contribution-grid-snake.svg" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
        </picture>
      </div>
    </div>
  )
}
