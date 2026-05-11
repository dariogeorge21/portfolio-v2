import { z } from "zod"

const optionalString = z.string().trim().optional().or(z.literal(""))

export const educationSchema = z.object({
  degree: optionalString,
  institution: optionalString,
  location: optionalString,
  period: optionalString,
  description: optionalString,
  achievements: z
    .array(
      z.object({
        achievement: z
          .string()
          .trim()
          .min(1, "Achievement cannot be empty")
          .max(300),
      }),
    )
    .max(20, "Too many achievements")
    .default([]),
})

export type EducationInput = z.infer<typeof educationSchema>
