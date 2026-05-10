import { z } from "zod"

const nullableUrl = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal(""))

const optionalString = z.string().trim().optional().or(z.literal(""))

export const profileSchema = z.object({
  code: optionalString,
  name: optionalString,
  role: optionalString,
  location: optionalString,
  locationType: optionalString,
  status: optionalString,
  statusLocation: optionalString,

  website: nullableUrl,
  github: nullableUrl,
  linkedin: nullableUrl,
  x: nullableUrl,
  imageLink: nullableUrl,
  resume: nullableUrl,
  buyMeACoffee: nullableUrl,

  email: z
    .string()
    .trim()
    .email("Must be a valid email")
    .optional()
    .or(z.literal("")),
  phone: optionalString,
})

export type ProfileInput = z.infer<typeof profileSchema>
