"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/db/prisma"
import { assertWorkspaceAccess } from "@/lib/workspace/guards"
import { educationSchema } from "@/validators/education"

export async function createEducation(input: unknown) {
  await assertWorkspaceAccess()

  const parsed = educationSchema.safeParse(input)
  if (!parsed.success) return { ok: false as const, error: "Invalid education data." }

  const data = parsed.data

  const created = await prisma.education.create({
    data: {
      degree: data.degree || null,
      institution: data.institution || null,
      location: data.location || null,
      period: data.period || null,
      description: data.description || null,
      achievements: {
        create: data.achievements.map((a) => ({ achievement: a.achievement })),
      },
    },
  })

  revalidatePath("/")
  revalidatePath("/workspace/education")

  return { ok: true as const, id: created.id }
}

export async function updateEducation(id: string, input: unknown) {
  await assertWorkspaceAccess()

  const parsed = educationSchema.safeParse(input)
  if (!parsed.success) return { ok: false as const, error: "Invalid education data." }

  const data = parsed.data

  const existing = await prisma.education.findUnique({ where: { id }, select: { id: true } })
  if (!existing) return { ok: false as const, error: "Education not found." }

  await prisma.education.update({
    where: { id },
    data: {
      degree: data.degree || null,
      institution: data.institution || null,
      location: data.location || null,
      period: data.period || null,
      description: data.description || null,
      achievements: {
        deleteMany: {},
        create: data.achievements.map((a) => ({ achievement: a.achievement })),
      },
    },
  })

  revalidatePath("/")
  revalidatePath("/workspace/education")
  revalidatePath(`/workspace/education/${id}/edit`)

  return { ok: true as const }
}

export async function deleteEducation(id: string) {
  await assertWorkspaceAccess()

  await prisma.education.delete({ where: { id } })

  revalidatePath("/")
  revalidatePath("/workspace/education")

  return { ok: true as const }
}
