import { prisma } from "@/lib/db/prisma"
import { ProjectForm } from "@/components/workspace/projects/project-form"
import type { ProjectInput } from "@/validators/projects"

export const revalidate = 0

export default async function NewProjectPage() {
  const last = await prisma.project.findFirst({
    orderBy: { priorityIndex: "desc" },
    select: { priorityIndex: true },
  })

  const initial: ProjectInput = {
    priorityIndex: (last?.priorityIndex ?? 0) + 1,
    slug: "",
    title: "",
    subtitle: "",
    category: "",
    year: "",
    image: "",
    role: "",
    longDescription: "",
    liveUrl: "",
    repoUrl: "",
    tags: [],
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">New project</h1>
      <ProjectForm mode="create" initial={initial} />
    </div>
  )
}
