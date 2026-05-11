import { EducationForm } from "@/components/workspace/education/education-form"
import type { EducationInput } from "@/validators/education"

export const revalidate = 0

export default async function NewEducationPage() {
  const initial: EducationInput = {
    degree: "",
    institution: "",
    location: "",
    period: "",
    description: "",
    achievements: [],
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">New education</h1>
      <EducationForm mode="create" initial={initial} />
    </div>
  )
}
