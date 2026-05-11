import { prisma } from "@/lib/db/prisma"
import { SkillForm } from "@/components/workspace/skills/skill-form"
import type { SkillInput } from "@/validators/skills"

export const revalidate = 0

export default async function NewSkillPage() {
  const groups = await prisma.skillGroup.findMany({
    orderBy: { label: "asc" },
    select: { id: true, label: true },
  })

  const initial: SkillInput = {
    groupId: "",
    name: "",
    level: undefined,
    note: "",
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">New skill</h1>
      <SkillForm mode="create" initial={initial} groups={groups} />
    </div>
  )
}
