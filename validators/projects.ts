import { z } from "zod"

export const projectTagSchema = z
  .string()
  .trim()
  .min(1)
  .max(100)

export const projectSchema = z.object({
  priorityIndex: z.coerce.number().int().min(1),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  title: z.string().trim().min(1).max(255),
  subtitle: z.string().trim().max(500).optional().nullable(),
  category: z.string().trim().max(255).optional().nullable(),
  year: z.string().trim().max(10).optional().nullable(),
  image: z
    .string()
    .trim()
    .url("Image must be a valid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
  role: z.string().trim().max(255).optional().nullable(),
  longDescription: z.string().trim().max(20000).optional().nullable(),
  liveUrl: z
    .string()
    .trim()
    .url("Live URL must be valid")
    .optional()
    .nullable()
    .or(z.literal("")),
  repoUrl: z
    .string()
    .trim()
    .url("Repo URL must be valid")
    .optional()
    .nullable()
    .or(z.literal("")),
  tags: z.array(projectTagSchema).max(30),
})

export type ProjectInput = z.infer<typeof projectSchema>
