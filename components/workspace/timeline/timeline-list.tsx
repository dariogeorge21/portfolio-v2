"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Trash2 } from "lucide-react"

import { deleteTimelineItem } from "@/app/workspace/(cms)/timeline/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export type TimelineListItem = {
  id: string
  year: string | null
  title: string | null
  org: string | null
  side: "left" | "right" | null
  createdAt: string
}

export function TimelineList({ initial }: { initial: TimelineListItem[] }) {
  const { toast } = useToast()
  const [rows, setRows] = useState(initial)
  const [isPending, startTransition] = useTransition()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Timeline</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage timeline entries.</p>
        </div>
        <Button asChild>
          <Link href="/workspace/timeline/new">New</Link>
        </Button>
      </div>

      <Card className="glass-strong border-border/50">
        <CardHeader>
          <CardTitle>Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-28">Year</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Org</TableHead>
                  <TableHead className="w-24">Side</TableHead>
                  <TableHead className="w-48"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No timeline entries yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {r.year ?? "—"}
                      </TableCell>
                      <TableCell className="font-medium">{r.title ?? "—"}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {r.org ?? "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {r.side ?? "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild size="sm" variant="secondary">
                            <Link href={`/workspace/timeline/${r.id}/edit`}>Edit</Link>
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive" disabled={isPending}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete timeline entry?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove the timeline entry.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    startTransition(async () => {
                                      try {
                                        await deleteTimelineItem(r.id)
                                        setRows((prev) => prev.filter((x) => x.id !== r.id))
                                        toast({ title: "Deleted" })
                                      } catch {
                                        toast({
                                          title: "Failed",
                                          description: "Could not delete timeline entry.",
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
