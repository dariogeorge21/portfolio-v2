"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { Trash2 } from "lucide-react"

import {
  createSkillGroup,
  deleteSkill,
  deleteSkillGroup,
} from "@/app/workspace/(cms)/skills/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export type SkillGroupListItem = {
  id: string
  label: string
  skillCount: number
}

export type SkillListItem = {
  id: string
  name: string
  level: number | null
  note: string | null
  groupId: string | null
  groupLabel: string | null
}

export function SkillsManager({
  initialGroups,
  initialSkills,
}: {
  initialGroups: SkillGroupListItem[]
  initialSkills: SkillListItem[]
}) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const [groupLabel, setGroupLabel] = useState("")
  const [groups, setGroups] = useState<SkillGroupListItem[]>(initialGroups)

  const [query, setQuery] = useState("")
  const [skills, setSkills] = useState<SkillListItem[]>(initialSkills)

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return skills
    return skills.filter((s) => {
      return (
        s.name.toLowerCase().includes(q) ||
        (s.groupLabel ?? "").toLowerCase().includes(q) ||
        (s.note ?? "").toLowerCase().includes(q)
      )
    })
  }, [skills, query])

  const onAddGroup = () => {
    const label = groupLabel.trim()
    if (!label) return

    startTransition(async () => {
      const res = await createSkillGroup({ label })
      if (!res.ok) {
        toast({
          title: "Failed",
          description: res.error,
          variant: "destructive",
        })
        return
      }

      setGroups((prev) =>
        [{ id: (res as any).id, label, skillCount: 0 }, ...prev].sort((a, b) =>
          a.label.localeCompare(b.label),
        ),
      )
      setGroupLabel("")
      toast({ title: "Group created" })
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Skills</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage skill groups and skills.
          </p>
        </div>
        <Button asChild>
          <Link href="/workspace/skills/new">New skill</Link>
        </Button>
      </div>

      <Card className="glass-strong border-border/50">
        <CardHeader>
          <CardTitle>Skill groups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={groupLabel}
              onChange={(e) => setGroupLabel(e.target.value)}
              placeholder="New group label…"
              className="bg-background"
              disabled={isPending}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  onAddGroup()
                }
              }}
            />
            <Button type="button" onClick={onAddGroup} disabled={isPending}>
              Add group
            </Button>
          </div>

          {groups.length === 0 ? (
            <p className="text-sm text-muted-foreground">No groups yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
              {groups
                .slice()
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-surface-2 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {g.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {g.skillCount} skills
                      </p>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost" aria-label="Delete group">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete group?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Deleting a group will also delete skills in that group.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              startTransition(async () => {
                                try {
                                  await deleteSkillGroup(g.id)
                                  setGroups((prev) =>
                                    prev.filter((x) => x.id !== g.id),
                                  )
                                  setSkills((prev) =>
                                    prev.filter((s) => s.groupId !== g.id),
                                  )
                                  toast({ title: "Group deleted" })
                                } catch {
                                  toast({
                                    title: "Failed",
                                    description: "Could not delete group.",
                                    variant: "destructive",
                                  })
                                }
                              })
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-strong border-border/50">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Skills</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Search by name, group, or note.
            </p>
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills…"
            className="bg-background sm:w-72"
          />
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead className="w-28">Level</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="w-40"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSkills.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No skills found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSkills
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {s.groupLabel ?? "—"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {typeof s.level === "number" ? s.level : "—"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {s.note ?? "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button asChild size="sm" variant="secondary">
                              <Link href={`/workspace/skills/${s.id}/edit`}>Edit</Link>
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete skill?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently remove the skill.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      startTransition(async () => {
                                        try {
                                          await deleteSkill(s.id)
                                          setSkills((prev) =>
                                            prev.filter((x) => x.id !== s.id),
                                          )
                                          toast({ title: "Skill deleted" })
                                        } catch {
                                          toast({
                                            title: "Failed",
                                            description: "Could not delete skill.",
                                            variant: "destructive",
                                          })
                                        }
                                      })
                                    }}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
