import { z } from "zod"

export const contactContentSchema = z.object({
  topHead: z.string().trim().optional().or(z.literal("")),
  subHead: z.string().trim().optional().or(z.literal("")),
})

export type ContactContentInput = z.infer<typeof contactContentSchema>
