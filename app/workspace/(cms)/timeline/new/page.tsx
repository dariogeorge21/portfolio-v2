import { TimelineForm } from "@/components/workspace/timeline/timeline-form"
import type { TimelineInput } from "@/validators/timeline"

export const revalidate = 0

export default async function NewTimelinePage() {
  const initial: TimelineInput = {
    year: "",
    title: "",
    org: "",
    description: "",
    side: undefined,
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">New timeline entry</h1>
      <TimelineForm mode="create" initial={initial} />
    </div>
  )
}
