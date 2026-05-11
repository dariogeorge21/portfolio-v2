"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/db/prisma"
import { assertWorkspaceAccess } from "@/lib/workspace/guards"
import { projectSchema } from "@/validators/projects"

export async function createProject(input: unknown) {
  await assertWorkspaceAccess()

  const parsed = projectSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid project data." }
  }

  const data = parsed.data

  const existing = await prisma.project.findUnique({ where: { slug: data.slug } })
  if (existing) return { ok: false as const, error: "Slug already exists." }

  const created = await prisma.project.create({
    data: {
      priorityIndex: data.priorityIndex,
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle || null,
      category: data.category || null,
      year: data.year || null,
      image: data.image || null,
      role: data.role || null,
      longDescription: data.longDescription || null,
      liveUrl: data.liveUrl || null,
      repoUrl: data.repoUrl || null,
      tags: {
        create: data.tags.map((tag) => ({ tag })),
      },
    },
  })

  revalidatePath("/")
  revalidatePath("/workspace/projects")

  return { ok: true as const, id: created.id }
}

export async function updateProject(projectId: string, input: unknown) {
  await assertWorkspaceAccess()

  const parsed = projectSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid project data." }
  }

  const data = parsed.data

  const existing = await prisma.project.findUnique({ where: { id: projectId } })
  if (!existing) return { ok: false as const, error: "Project not found." }

  // Prevent slug collisions
  if (data.slug !== existing.slug) {
    const slugTaken = await prisma.project.findUnique({ where: { slug: data.slug } })
    if (slugTaken) return { ok: false as const, error: "Slug already exists." }
  }

  await prisma.project.update({
    where: { id: projectId },
    data: {
      priorityIndex: data.priorityIndex,
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle || null,
      category: data.category || null,
      year: data.year || null,
      image: data.image || null,
      role: data.role || null,
      longDescription: data.longDescription || null,
      liveUrl: data.liveUrl || null,
      repoUrl: data.repoUrl || null,
      tags: {
        deleteMany: {},
        create: data.tags.map((tag) => ({ tag })),
      },
    },
  })

  revalidatePath("/")
  revalidatePath("/workspace/projects")
  revalidatePath(`/workspace/projects/${projectId}/edit`)

  return { ok: true as const }
}

export async function deleteProject(projectId: string) {
  await assertWorkspaceAccess()

  await prisma.project.delete({ where: { id: projectId } })

  revalidatePath("/")
  revalidatePath("/workspace/projects")

  return { ok: true as const }
}

export async function reorderProjects(orderedIds: string[]) {
  await assertWorkspaceAccess()

  const ids = orderedIds.filter(Boolean)
  if (ids.length === 0) return { ok: true as const }

  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.project.update({
        where: { id },
        data: { priorityIndex: index + 1 },
      }),
    ),
  )

  revalidatePath("/")
  revalidatePath("/workspace/projects")

  return { ok: true as const }
}
