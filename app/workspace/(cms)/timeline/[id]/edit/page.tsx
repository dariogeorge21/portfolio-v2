import { notFound } from "next/navigation"

import { prisma } from "@/lib/db/prisma"
import { TimelineForm } from "@/components/workspace/timeline/timeline-form"
import type { TimelineInput } from "@/validators/timeline"

export const revalidate = 0

export default async function EditTimelinePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const item = await prisma.timelineItem.findUnique({ where: { id } })
  if (!item) notFound()

  const initial: TimelineInput = {
    year: item.year ?? "",
    title: item.title ?? "",
    org: item.org ?? "",
    description: item.description ?? "",
    side: item.side ?? undefined,
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Edit timeline entry</h1>
      <TimelineForm mode="edit" itemId={id} initial={initial} />
    </div>
  )
}
