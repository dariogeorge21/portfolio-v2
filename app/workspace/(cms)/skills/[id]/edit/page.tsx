import { notFound } from "next/navigation"

import { prisma } from "@/lib/db/prisma"
import { SkillForm } from "@/components/workspace/skills/skill-form"
import type { SkillInput } from "@/validators/skills"

export const revalidate = 0

export default async function EditSkillPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const [skill, groups] = await Promise.all([
    prisma.skill.findUnique({ where: { id } }),
    prisma.skillGroup.findMany({
      orderBy: { label: "asc" },
      select: { id: true, label: true },
    }),
  ])

  if (!skill) notFound()

  const initial: SkillInput = {
    groupId: skill.groupId ?? "",
    name: skill.name,
    level: skill.level ?? undefined,
    note: skill.note ?? "",
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Edit skill</h1>
      <SkillForm mode="edit" skillId={id} initial={initial} groups={groups} />
    </div>
  )
}
