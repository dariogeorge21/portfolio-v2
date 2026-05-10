"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/db/prisma"
import { assertWorkspaceAccess } from "@/lib/workspace/guards"
import { skillGroupSchema, skillSchema } from "@/validators/skills"

export async function createSkillGroup(input: unknown) {
  await assertWorkspaceAccess()

  const parsed = skillGroupSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid group data." }
  }

  const created = await prisma.skillGroup.create({
    data: { label: parsed.data.label },
  })

  revalidatePath("/workspace/skills")

  return { ok: true as const, id: created.id }
}

export async function deleteSkillGroup(id: string) {
  await assertWorkspaceAccess()

  await prisma.skillGroup.delete({ where: { id } })

  revalidatePath("/workspace/skills")

  return { ok: true as const }
}

export async function createSkill(input: unknown) {
  await assertWorkspaceAccess()

  const parsed = skillSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid skill data." }
  }

  const data = parsed.data

  const created = await prisma.skill.create({
    data: {
      name: data.name,
      note: data.note || null,
      level: data.level ?? null,
      groupId: data.groupId ? data.groupId : null,
    },
  })

  revalidatePath("/workspace/skills")

  return { ok: true as const, id: created.id }
}

export async function updateSkill(id: string, input: unknown) {
  await assertWorkspaceAccess()

  const parsed = skillSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid skill data." }
  }

  const data = parsed.data

  await prisma.skill.update({
    where: { id },
    data: {
      name: data.name,
      note: data.note || null,
      level: data.level ?? null,
      groupId: data.groupId ? data.groupId : null,
    },
  })

  revalidatePath("/workspace/skills")
  revalidatePath(`/workspace/skills/${id}/edit`)

  return { ok: true as const }
}

export async function deleteSkill(id: string) {
  await assertWorkspaceAccess()

  await prisma.skill.delete({ where: { id } })

  revalidatePath("/workspace/skills")

  return { ok: true as const }
}
