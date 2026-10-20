"use client"

import { GitHubCalendar } from "react-github-calendar"

interface GithubContributionsProps {
  username?: string
}

export function GithubContributions({
  username = "dariogeorge21",
}: GithubContributionsProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border/50 bg-surface-2 p-4 md:p-5 flex items-center justify-center text-muted">
      <GitHubCalendar
        username={username}
        colorScheme="dark"
        blockSize={10}
        blockMargin={3}
        blockRadius={2}
        fontSize={12}
      />
    </div>
  )
}

