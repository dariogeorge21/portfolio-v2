"use client"

import { useState, useEffect } from "react"

export interface GithubStats {
  followers: number
  publicRepos: number
  isLoading: boolean
}

const FALLBACK_STATS: GithubStats = {
  followers: 75,
  publicRepos: 190,
  isLoading: true,
}

const CACHE_KEY = "dg_github_stats_cache"
const CACHE_TTL_MS = 1000 * 60 * 15 // 15 minutes

export function useGithubStats(username: string = "dariogeorge21") {
  const [stats, setStats] = useState<GithubStats>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem(`${CACHE_KEY}_${username}`)
        if (cached) {
          const parsed = JSON.parse(cached)
          if (
            Date.now() - parsed.timestamp < CACHE_TTL_MS &&
            typeof parsed.followers === "number"
          ) {
            return {
              followers: parsed.followers,
              publicRepos: parsed.publicRepos ?? FALLBACK_STATS.publicRepos,
              isLoading: false,
            }
          }
        }
      } catch {
        // Ignore sessionStorage errors
      }
    }
    return { ...FALLBACK_STATS }
  })

  useEffect(() => {
    let isMounted = true

    async function fetchStats() {
      // 1. Check valid cache
      try {
        const cached = sessionStorage.getItem(`${CACHE_KEY}_${username}`)
        if (cached) {
          const parsed = JSON.parse(cached)
          if (
            Date.now() - parsed.timestamp < CACHE_TTL_MS &&
            typeof parsed.followers === "number"
          ) {
            if (isMounted) {
              setStats({
                followers: parsed.followers,
                publicRepos: parsed.publicRepos ?? FALLBACK_STATS.publicRepos,
                isLoading: false,
              })
            }
            return
          }
        }
      } catch {
        // Ignore cache read errors
      }

      let followers = FALLBACK_STATS.followers
      let publicRepos = FALLBACK_STATS.publicRepos
      let succeeded = false

      // 2. Try internal API route (cached on server)
      try {
        const res = await fetch("/api/github")
        if (res.ok) {
          const data = await res.json()
          if (typeof data.followers === "number") {
            followers = data.followers
            publicRepos = data.publicRepos ?? publicRepos
            succeeded = true
          }
        }
      } catch {
        // Internal route failed, proceed to direct GitHub API
      }

      // 3. Fallback to direct GitHub API
      if (!succeeded) {
        try {
          const res = await fetch(`https://api.github.com/users/${username}`)
          if (res.ok) {
            const data = await res.json()
            if (typeof data.followers === "number") {
              followers = data.followers
              publicRepos =
                typeof data.public_repos === "number"
                  ? Math.max(data.public_repos, 190)
                  : publicRepos
              succeeded = true
            }
          }
        } catch {
          // Direct API failed
        }
      }

      // 4. Save to session cache if succeeded
      if (succeeded) {
        try {
          sessionStorage.setItem(
            `${CACHE_KEY}_${username}`,
            JSON.stringify({
              followers,
              publicRepos,
              timestamp: Date.now(),
            }),
          )
        } catch {
          // Ignore cache write errors
        }
      }

      if (isMounted) {
        setStats({
          followers,
          publicRepos,
          isLoading: false,
        })
      }
    }

    fetchStats()

    return () => {
      isMounted = false
    }
  }, [username])

  return stats
}
