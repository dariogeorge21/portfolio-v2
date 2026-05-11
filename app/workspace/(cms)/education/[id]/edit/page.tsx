import { notFound } from "next/navigation"

import { prisma } from "@/lib/db/prisma"
import { EducationForm } from "@/components/workspace/education/education-form"
import type { EducationInput } from "@/validators/education"

export const revalidate = 0

export default async function EditEducationPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const edu = await prisma.education.findUnique({
    where: { id },
    include: { achievements: { select: { achievement: true } } },
  })

  if (!edu) notFound()

  const initial: EducationInput = {
    degree: edu.degree ?? "",
    institution: edu.institution ?? "",
    location: edu.location ?? "",
    period: edu.period ?? "",
    description: edu.description ?? "",
    achievements: edu.achievements.map((a) => ({ achievement: a.achievement })),
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Edit education</h1>
      <EducationForm mode="edit" educationId={id} initial={initial} />
    </div>
  )
}
