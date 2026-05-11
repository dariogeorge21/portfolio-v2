import { prisma } from "@/lib/db/prisma"
import { ProjectsTable } from "@/components/workspace/projects/projects-table"

export const revalidate = 0

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { priorityIndex: "asc" },
    include: {
      tags: { select: { tag: true } },
    },
  })

  return (
    <div className="space-y-6">
      <ProjectsTable
        initial={projects.map((p) => ({
          id: p.id,
          priorityIndex: p.priorityIndex,
          slug: p.slug,
          title: p.title,
          subtitle: p.subtitle,
          category: p.category,
          year: p.year,
          image: p.image,
          role: p.role,
          updatedAt: p.updatedAt.toISOString(),
          tags: p.tags.map((t) => t.tag),
        }))}
      />
    </div>
  )
}
