import { prisma } from "@/lib/db/prisma"
import { ContactContentForm } from "@/components/workspace/contact/contact-content-form"
import type { ContactContentInput } from "@/validators/contact-content"

export const revalidate = 0

export default async function ContactContentPage() {
  const content = await prisma.contactContent.findFirst({
    orderBy: { createdAt: "asc" },
  })

  const initial: ContactContentInput = {
    topHead: content?.topHead ?? "",
    subHead: content?.subHead ?? "",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Contact Content
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Controls the copy displayed above the public contact form.
        </p>
      </div>

      <ContactContentForm initial={initial} />
    </div>
  )
}
