"use client"

import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { SkillGroup, Skill as SkillModel } from "@prisma/client"
import { skillSchema, type SkillInput } from "@/validators/skills"
import { createSkill, updateSkill } from "@/app/workspace/(cms)/skills/actions"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function SkillForm({
  mode,
  skillId,
  initial,
  groups,
}: {
  mode: "create" | "edit"
  skillId?: string
  initial: SkillInput
  groups: Pick<SkillGroup, "id" | "label">[]
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const form = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: initial,
    mode: "onSubmit",
  })

  const onSubmit = (values: SkillInput) => {
    startTransition(async () => {
      const res =
        mode === "create"
          ? await createSkill(values)
          : await updateSkill(String(skillId), values)

      if (!res.ok) {
        toast({
          title: "Failed",
          description: res.error,
          variant: "destructive",
        })
        return
      }

      toast({ title: mode === "create" ? "Skill created" : "Skill updated" })

      if (mode === "create") {
        router.push(`/workspace/skills/${(res as any).id}/edit`)
      }

      router.refresh()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle>Skill</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <Select
                    value={field.value || ""}
                    onValueChange={(v) => field.onChange(v)}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="No group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">No group</SelectItem>
                      {groups.map((g) => (
                        <SelectItem key={g.id} value={g.id}>
                          {g.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level (0–10)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const raw = e.target.value
                        field.onChange(raw === "" ? undefined : Number(raw))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-background" placeholder="Optional" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-2">
          <Button asChild type="button" variant="secondary">
            <Link href="/workspace/skills">Back</Link>
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
