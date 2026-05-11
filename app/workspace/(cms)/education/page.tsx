import { prisma } from "@/lib/db/prisma"
import { EducationList } from "@/components/workspace/education/education-list"

export const revalidate = 0

export default async function EducationPage() {
  const education = await prisma.education.findMany({
    orderBy: { createdAt: "asc" },
    include: { achievements: { select: { id: true } } },
  })

  return (
    <EducationList
      initial={education.map((e) => ({
        id: e.id,
        degree: e.degree,
        institution: e.institution,
        location: e.location,
        period: e.period,
        createdAt: e.createdAt.toISOString(),
        achievementsCount: e.achievements.length,
      }))}
    />
  )
}
