import { prisma } from "@/lib/db/prisma"
import { TimelineList } from "@/components/workspace/timeline/timeline-list"

export const revalidate = 0

export default async function TimelinePage() {
  const items = await prisma.timelineItem.findMany({
    orderBy: { createdAt: "asc" },
  })

  return (
    <TimelineList
      initial={items.map((i) => ({
        id: i.id,
        year: i.year,
        title: i.title,
        org: i.org,
        side: i.side,
        createdAt: i.createdAt.toISOString(),
      }))}
    />
  )
}
