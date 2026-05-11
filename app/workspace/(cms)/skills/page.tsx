import { prisma } from "@/lib/db/prisma"
import { SkillsManager } from "@/components/workspace/skills/skills-manager"

export const revalidate = 0

export default async function SkillsPage() {
  const [groups, skills] = await Promise.all([
    prisma.skillGroup.findMany({
      orderBy: { label: "asc" },
      include: { skills: { select: { id: true } } },
    }),
    prisma.skill.findMany({
      orderBy: { name: "asc" },
      include: { group: { select: { label: true } } },
    }),
  ])

  return (
    <SkillsManager
      initialGroups={groups.map((g) => ({
        id: g.id,
        label: g.label,
        skillCount: g.skills.length,
      }))}
      initialSkills={skills.map((s) => ({
        id: s.id,
        name: s.name,
        level: s.level,
        note: s.note,
        groupId: s.groupId,
        groupLabel: s.group?.label ?? null,
      }))}
    />
  )
}
