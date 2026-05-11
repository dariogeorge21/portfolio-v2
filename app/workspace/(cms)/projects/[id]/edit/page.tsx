import { notFound } from "next/navigation"

import { prisma } from "@/lib/db/prisma"
import { ProjectForm } from "@/components/workspace/projects/project-form"
import type { ProjectInput } from "@/validators/projects"

export const revalidate = 0

export default async function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const project = await prisma.project.findUnique({
    where: { id },
    include: { tags: { select: { tag: true } } },
  })

  if (!project) notFound()

  const initial: ProjectInput = {
    priorityIndex: project.priorityIndex,
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle ?? "",
    category: project.category ?? "",
    year: project.year ?? "",
    image: project.image ?? "",
    role: project.role ?? "",
    longDescription: project.longDescription ?? "",
    liveUrl: project.liveUrl ?? "",
    repoUrl: project.repoUrl ?? "",
    tags: project.tags.map((t) => t.tag),
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Edit project</h1>
      <ProjectForm mode="edit" projectId={id} initial={initial} />
    </div>
  )
}
