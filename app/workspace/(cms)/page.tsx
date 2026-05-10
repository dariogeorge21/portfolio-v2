import Link from "next/link"

import { prisma } from "@/lib/db/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function WorkspaceDashboardPage() {
  const [projectCountRes, skillCountRes, latestProjectsRes] =
    await Promise.allSettled([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.project.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          updatedAt: true,
        },
      }),
    ])

  const projectCount = projectCountRes.status === "fulfilled" ? projectCountRes.value : 0
  const skillCount = skillCountRes.status === "fulfilled" ? skillCountRes.value : 0
  const latestProjects =
    latestProjectsRes.status === "fulfilled" ? latestProjectsRes.value : []

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage portfolio content and publish updates.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link href="/workspace/projects/new">New project</Link>
          </Button>
          <Button asChild>
            <Link href="/workspace/profile">Edit profile</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="glass-strong border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl font-semibold tracking-tight">
              {projectCount}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-strong border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl font-semibold tracking-tight">
              {skillCount}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-strong border-border/50 sm:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Latest updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No projects yet.</p>
            ) : (
              <ul className="space-y-2">
                {latestProjects.map((p) => (
                  <li key={p.id} className="flex items-center justify-between">
                    <Link
                      href={`/workspace/projects/${p.id}/edit`}
                      className="text-sm text-foreground hover:underline"
                    >
                      {p.title}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
