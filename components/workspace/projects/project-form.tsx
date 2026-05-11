"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { MarkdownEditor } from "@/components/workspace/forms/markdown-editor"
import { slugify } from "@/components/workspace/forms/slug"
import { TagInput } from "@/components/workspace/forms/tag-input"
import { createProject, updateProject } from "@/app/workspace/(cms)/projects/actions"
import { projectSchema, type ProjectInput } from "@/validators/projects"

export function ProjectForm({
  mode,
  projectId,
  initial,
}: {
  mode: "create" | "edit"
  projectId?: string
  initial: ProjectInput
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [slugTouched, setSlugTouched] = useState(mode === "edit")

  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initial,
  })

  const title = form.watch("title")
  const slug = form.watch("slug")

  useEffect(() => {
    if (slugTouched) return
    const next = slugify(title || "")
    if (!next) return
    if (next !== slug) form.setValue("slug", next, { shouldValidate: true })
  }, [title, slugTouched, slug, form])

  const onSubmit = (values: ProjectInput) => {
    startTransition(async () => {
      const payload: ProjectInput = {
        ...values,
        subtitle: values.subtitle || null,
        category: values.category || null,
        year: values.year || null,
        image: values.image || null,
        role: values.role || null,
        longDescription: values.longDescription || null,
        liveUrl: values.liveUrl || null,
        repoUrl: values.repoUrl || null,
        tags: values.tags ?? [],
      }

      const res =
        mode === "create"
          ? await createProject(payload)
          : await updateProject(String(projectId), payload)

      if (!res.ok) {
        toast({
          title: "Failed",
          description: res.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: mode === "create" ? "Project created" : "Project updated",
      })

      if (mode === "create") {
        router.push(`/workspace/projects/${(res as any).id}/edit`)
      }

      router.refresh()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle>Basics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        setSlugTouched(true)
                        field.onChange(e)
                      }}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priorityIndex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Subtitle</FormLabel>
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
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                  {field.value ? (
                    <div className="mt-3 overflow-hidden rounded-xl border border-border/60 bg-surface-2">
                      <img
                        src={String(field.value)}
                        alt="Project image preview"
                        className="h-48 w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="liveUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live URL</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repo URL</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project tags</FormLabel>
                  <FormControl>
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Type and press Enter…"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="glass-strong border-border/50">
          <CardHeader>
            <CardTitle>Description (Markdown)</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long description</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Write Markdown…"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/workspace/projects")}
          >
            Back
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
