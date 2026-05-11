"use client"

import type { CSSProperties } from "react"
import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, LayoutGrid, List, Trash2 } from "lucide-react"

import { reorderProjects, deleteProject } from "@/app/workspace/(cms)/projects/actions"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export type ProjectListItem = {
  id: string
  priorityIndex: number
  slug: string
  title: string
  subtitle: string | null
  category: string | null
  year: string | null
  image: string | null
  role: string | null
  updatedAt: string
  tags: string[]
}

function SortableRow({
  row,
  canDrag,
}: {
  row: any
  canDrag: boolean
}) {
  const id = row.original.id as string
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !canDrag })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  }

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={isDragging ? "bg-surface-2" : undefined}
    >
      {row.getVisibleCells().map((cell: any) => (
        <TableCell key={cell.id} className="align-middle">
          {cell.column.id === "drag" ? (
            <button
              type="button"
              className={
                canDrag
                  ? "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                  : "inline-flex items-center justify-center rounded-md p-2 text-muted-foreground opacity-40"
              }
              aria-label={canDrag ? "Drag to reorder" : "Reorder disabled"}
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4" />
            </button>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function ProjectsTable({ initial }: { initial: ProjectListItem[] }) {
  const { toast } = useToast()
  const [mode, setMode] = useState<"table" | "grid">("table")
  const [globalFilter, setGlobalFilter] = useState("")
  const [data, setData] = useState<ProjectListItem[]>(initial)
  const [sorting, setSorting] = useState<any[]>([])
  const [isPending, startTransition] = useTransition()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const columns = useMemo<ColumnDef<ProjectListItem>[]>(
    () => [
      {
        id: "drag",
        header: "",
        cell: () => null,
        size: 40,
      },
      {
        accessorKey: "priorityIndex",
        header: "#",
        cell: (ctx) => (
          <span className="font-mono text-xs text-muted-foreground">
            {ctx.getValue<number>()}
          </span>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: (ctx) => {
          const row = ctx.row.original
          return (
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{row.title}</p>
              <p className="text-xs text-muted-foreground">/{row.slug}</p>
            </div>
          )
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (ctx) => {
          const value = ctx.getValue<string | null>()
          return (
            <span className="text-sm text-muted-foreground">{value ?? "—"}</span>
          )
        },
      },
      {
        accessorKey: "year",
        header: "Year",
        cell: (ctx) => {
          const value = ctx.getValue<string | null>()
          return (
            <span className="text-sm text-muted-foreground">{value ?? "—"}</span>
          )
        },
      },
      {
        id: "tags",
        header: "Tags",
        cell: (ctx) => {
          const tags = ctx.row.original.tags
          return tags.length ? (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border/60 bg-surface-2 px-2 py-0.5 text-xs text-foreground"
                >
                  {t}
                </span>
              ))}
              {tags.length > 4 ? (
                <span className="text-xs text-muted-foreground">
                  +{tags.length - 4}
                </span>
              ) : null}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )
        },
      },
      {
        id: "actions",
        header: "",
        cell: (ctx) => {
          const row = ctx.row.original
          return (
            <div className="flex items-center justify-end gap-2">
              <Button asChild size="sm" variant="secondary">
                <Link href={`/workspace/projects/${row.id}/edit`}>Edit</Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete project?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently remove the project and its tags.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        startTransition(async () => {
                          try {
                            await deleteProject(row.id)
                            setData((prev) =>
                              prev.filter((p) => p.id !== row.id),
                            )
                            toast({ title: "Deleted" })
                          } catch {
                            toast({
                              title: "Failed",
                              description: "Could not delete project.",
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
          )
        },
      },
    ],
    [toast, startTransition],
  )

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const canDrag = sorting.length === 0 && globalFilter.trim() === ""

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setData((prev) => {
      const oldIndex = prev.findIndex((p) => p.id === active.id)
      const newIndex = prev.findIndex((p) => p.id === over.id)
      const next = arrayMove(prev, oldIndex, newIndex).map((p, i) => ({
        ...p,
        priorityIndex: i + 1,
      }))

      startTransition(async () => {
        try {
          await reorderProjects(next.map((p) => p.id))
          toast({ title: "Order updated" })
        } catch {
          toast({
            title: "Reorder failed",
            description: "Could not update project order.",
            variant: "destructive",
          })
        }
      })

      return next
    })
  }

  return (
    <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
      <Card className="glass-strong border-border/50">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Projects</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Drag to reorder when not sorting or searching.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <Input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search projects…"
              className="bg-background sm:w-72"
            />

            <TabsList>
              <TabsTrigger value="table" className="gap-2">
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">Table</span>
              </TabsTrigger>
              <TabsTrigger value="grid" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
              </TabsTrigger>
            </TabsList>

            <Button asChild>
              <Link href="/workspace/projects/new">New</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <TabsContent value="table" className="mt-0">
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={canDrag ? onDragEnd : undefined}
              >
                <SortableContext
                  items={data.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((hg) => (
                        <TableRow key={hg.id}>
                          {hg.headers.map((h) => (
                            <TableHead
                              key={h.id}
                              className={
                                h.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : undefined
                              }
                              onClick={
                                h.column.getCanSort()
                                  ? h.column.getToggleSortingHandler()
                                  : undefined
                              }
                            >
                              {flexRender(
                                h.column.columnDef.header,
                                h.getContext(),
                              )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>

                    <TableBody>
                      {table.getRowModel().rows.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="py-12 text-center text-sm text-muted-foreground"
                          >
                            No projects found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        table.getRowModel().rows.map((row) => (
                          <SortableRow
                            key={row.id}
                            row={row}
                            canDrag={canDrag}
                          />
                        ))
                      )}
                    </TableBody>
                  </Table>
                </SortableContext>
              </DndContext>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Prev
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grid" className="mt-0">
            {data.length === 0 ? (
              <div className="rounded-xl border border-border/60 bg-surface-2 p-10 text-center text-sm text-muted-foreground">
                No projects yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {data
                  .filter((p) => {
                    const q = globalFilter.trim().toLowerCase()
                    if (!q) return true
                    return (
                      p.title.toLowerCase().includes(q) ||
                      p.slug.toLowerCase().includes(q) ||
                      p.tags.some((t) => t.toLowerCase().includes(q))
                    )
                  })
                  .map((p) => (
                    <div
                      key={p.id}
                      className="glass-strong overflow-hidden rounded-2xl border border-border/50"
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-40 w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-40 w-full bg-surface-2" />
                      )}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              #{p.priorityIndex} • {p.category ?? "Uncategorised"}
                            </p>
                            <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
                              {p.title}
                            </h3>
                          </div>
                          <Button asChild size="sm" variant="secondary">
                            <Link href={`/workspace/projects/${p.id}/edit`}>Edit</Link>
                          </Button>
                        </div>

                        {p.subtitle ? (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {p.subtitle}
                          </p>
                        ) : null}

                        {p.tags.length ? (
                          <div className="mt-4 flex flex-wrap gap-1">
                            {p.tags.slice(0, 6).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-border/60 bg-surface-2 px-2 py-0.5 text-xs"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  )
}
