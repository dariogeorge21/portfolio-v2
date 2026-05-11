"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/db/prisma"
import { assertWorkspaceAccess } from "@/lib/workspace/guards"
import { timelineSchema } from "@/validators/timeline"

export async function createTimelineItem(input: unknown) {
  await assertWorkspaceAccess()

  const parsed = timelineSchema.safeParse(input)
  if (!parsed.success) return { ok: false as const, error: "Invalid timeline item." }

  const data = parsed.data

  const created = await prisma.timelineItem.create({
    data: {
      year: data.year || null,
      title: data.title || null,
      org: data.org || null,
      description: data.description || null,
      side: data.side ?? null,
    },
  })

  revalidatePath("/")
  revalidatePath("/workspace/timeline")

  return { ok: true as const, id: created.id }
}

export async function updateTimelineItem(id: string, input: unknown) {
  await assertWorkspaceAccess()

  const parsed = timelineSchema.safeParse(input)
  if (!parsed.success) return { ok: false as const, error: "Invalid timeline item." }

  const data = parsed.data

  const existing = await prisma.timelineItem.findUnique({ where: { id }, select: { id: true } })
  if (!existing) return { ok: false as const, error: "Timeline item not found." }

  await prisma.timelineItem.update({
    where: { id },
    data: {
      year: data.year || null,
      title: data.title || null,
      org: data.org || null,
      description: data.description || null,
      side: data.side ?? null,
    },
  })

  revalidatePath("/")
  revalidatePath("/workspace/timeline")
  revalidatePath(`/workspace/timeline/${id}/edit`)

  return { ok: true as const }
}

export async function deleteTimelineItem(id: string) {
  await assertWorkspaceAccess()

  await prisma.timelineItem.delete({ where: { id } })

  revalidatePath("/")
  revalidatePath("/workspace/timeline")

  return { ok: true as const }
}
