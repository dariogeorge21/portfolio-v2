import { z } from "zod"

const optionalString = z.string().trim().optional().or(z.literal(""))

const timelineSideSchema = z.preprocess(
  (v) => (v === "" ? undefined : v),
  z.enum(["left", "right"]).optional(),
)

export const timelineSchema = z.object({
  year: optionalString,
  title: optionalString,
  org: optionalString,
  description: optionalString,
  side: timelineSideSchema,
})

export type TimelineInput = z.infer<typeof timelineSchema>
