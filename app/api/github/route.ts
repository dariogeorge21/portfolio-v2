import { NextResponse } from "next/server"

export const dynamic = "force-static"
export const revalidate = 3600

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/dariogeorge21", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "portfolio-app",
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return NextResponse.json({ followers: 75, publicRepos: 177 }, { status: 200 })
    }

    const data = await res.json()
    return NextResponse.json({
      followers: typeof data.followers === "number" ? data.followers : 75,
      publicRepos: typeof data.public_repos === "number" ? data.public_repos : 177,
    })
  } catch {
    return NextResponse.json({ followers: 75, publicRepos: 177 }, { status: 200 })
  }
}
