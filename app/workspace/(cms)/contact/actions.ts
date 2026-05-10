"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/db/prisma"
import { assertWorkspaceAccess } from "@/lib/workspace/guards"
import { contactContentSchema } from "@/validators/contact-content"

export async function upsertContactContent(input: unknown) {
  await assertWorkspaceAccess()

  const parsed = contactContentSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid contact content." }
  }

  const data = parsed.data

  const existing = await prisma.contactContent.findFirst({
    select: { id: true },
    orderBy: { createdAt: "asc" },
  })

  const normalized = {
    topHead: data.topHead || null,
    subHead: data.subHead || null,
  }

  if (existing) {
    await prisma.contactContent.update({
      where: { id: existing.id },
      data: normalized,
    })
  } else {
    await prisma.contactContent.create({ data: normalized })
  }

  revalidatePath("/")
  revalidatePath("/workspace/contact")

  return { ok: true as const }
}
