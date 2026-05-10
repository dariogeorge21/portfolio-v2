import { z } from "zod"

export const skillGroupSchema = z.object({
  label: z.string().trim().min(1, "Group label is required").max(255),
})

export type SkillGroupInput = z.infer<typeof skillGroupSchema>

export const skillSchema = z.object({
  groupId: z.string().uuid().optional().or(z.literal("")),
  name: z.string().trim().min(1, "Skill name is required").max(255),
  level: z
    .union([z.number().int().min(0).max(10), z.nan()])
    .optional()
    .transform((v) => (typeof v === "number" && Number.isFinite(v) ? v : undefined)),
  note: z.string().trim().optional().or(z.literal("")),
})

export type SkillInput = z.infer<typeof skillSchema>
