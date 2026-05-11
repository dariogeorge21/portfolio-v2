"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Trash2 } from "lucide-react"

import { deleteEducation } from "@/app/workspace/(cms)/education/actions"
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

export type EducationListItem = {
  id: string
  degree: string | null
  institution: string | null
  location: string | null
  period: string | null
  createdAt: string
  achievementsCount: number
}

export function EducationList({ initial }: { initial: EducationListItem[] }) {
  const { toast } = useToast()
  const [rows, setRows] = useState(initial)
  const [isPending, startTransition] = useTransition()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Education</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage education entries and achievements.
          </p>
        </div>
        <Button asChild>
          <Link href="/workspace/education/new">New</Link>
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
                  <TableHead>Degree</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead className="w-28">Achievements</TableHead>
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
                      No education entries yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">
                        {r.degree ?? "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {r.institution ?? "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {r.period ?? "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {r.achievementsCount}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild size="sm" variant="secondary">
                            <Link href={`/workspace/education/${r.id}/edit`}>Edit</Link>
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
                                <AlertDialogTitle>Delete education entry?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove the entry and all achievements.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    startTransition(async () => {
                                      try {
                                        await deleteEducation(r.id)
                                        setRows((prev) => prev.filter((x) => x.id !== r.id))
                                        toast({ title: "Deleted" })
                                      } catch {
                                        toast({
                                          title: "Failed",
                                          description: "Could not delete education entry.",
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
