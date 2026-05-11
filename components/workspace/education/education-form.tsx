"use client"

import { useMemo, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"

import { educationSchema, type EducationInput } from "@/validators/education"
import {
  createEducation,
  updateEducation,
} from "@/app/workspace/(cms)/education/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function EducationForm({
  mode,
  educationId,
  initial,
}: {
  mode: "create" | "edit"
  educationId?: string
  initial: EducationInput
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const form = useForm<EducationInput>({
    resolver: zodResolver(educationSchema),
    defaultValues: initial,
    mode: "onSubmit",
  })

  const achievements = useFieldArray<EducationInput, "achievements">({
    control: form.control,
    name: "achievements",
  })

  const isEmpty = useMemo(() => achievements.fields.length === 0, [achievements.fields.length])

  const onSubmit = (values: EducationInput) => {
    startTransition(async () => {
      const payload: EducationInput = {
        ...values,
        degree: values.degree || "",
        institution: values.institution || "",
        location: values.location || "",
        period: values.period || "",
        description: values.description || "",
        achievements: (values.achievements ?? [])
          .map((a) => ({ achievement: a.achievement.trim() }))
          .filter((a) => a.achievement.length > 0),
      }

      const res =
        mode === "create"
          ? await createEducation(payload)
          : await updateEducation(String(educationId), payload)

      if (!res.ok) {
        toast({
          title: "Failed",
          description: res.error,
          variant: "destructive",
        })
        return
      }

      toast({ title: mode === "create" ? "Education created" : "Education updated" })

      if (mode === "create") {
        router.push(`/workspace/education/${(res as any).id}/edit`)
      }

      router.refresh()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" placeholder="2019 — 2023" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="glass-strong border-border/50">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Achievements</CardTitle>
            <Button
              type="button"
              variant="secondary"
              onClick={() => achievements.append({ achievement: "" })}
              disabled={isPending}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {isEmpty ? (
              <p className="text-sm text-muted-foreground">No achievements yet.</p>
            ) : (
              achievements.fields.map((f, idx) => (
                <div key={f.id} className="flex items-start gap-2">
                  <FormField
                    control={form.control}
                    name={`achievements.${idx}.achievement`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-background"
                            placeholder="e.g. Dean’s list"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Remove achievement"
                    onClick={() => achievements.remove(idx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-2">
          <Button asChild type="button" variant="secondary">
            <Link href="/workspace/education">Back</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? mode === "create"
                ? "Creating…"
                : "Saving…"
              : mode === "create"
                ? "Create"
                : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
