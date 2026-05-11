"use client"

import { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { timelineSchema, type TimelineInput } from "@/validators/timeline"
import {
  createTimelineItem,
  updateTimelineItem,
} from "@/app/workspace/(cms)/timeline/actions"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function TimelineForm({
  mode,
  itemId,
  initial,
}: {
  mode: "create" | "edit"
  itemId?: string
  initial: TimelineInput
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const form = useForm<TimelineInput>({
    resolver: zodResolver(timelineSchema),
    defaultValues: initial,
    mode: "onSubmit",
  })

  const onSubmit = (values: TimelineInput) => {
    startTransition(async () => {
      const payload: TimelineInput = {
        ...values,
        year: values.year || "",
        title: values.title || "",
        org: values.org || "",
        description: values.description || "",
        side: values.side,
      }

      const res =
        mode === "create"
          ? await createTimelineItem(payload)
          : await updateTimelineItem(String(itemId), payload)

      if (!res.ok) {
        toast({ title: "Failed", description: res.error, variant: "destructive" })
        return
      }

      toast({ title: mode === "create" ? "Timeline entry created" : "Timeline entry updated" })

      if (mode === "create") {
        router.push(`/workspace/timeline/${(res as any).id}/edit`)
      }

      router.refresh()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle>Timeline entry</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" placeholder="2024" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="side"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Side</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={(v) => field.onChange(v)}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Auto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Auto</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="org"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
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

        <div className="flex items-center justify-end gap-2">
          <Button asChild type="button" variant="secondary">
            <Link href="/workspace/timeline">Back</Link>
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
