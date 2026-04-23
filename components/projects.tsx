"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Github, Globe, Plus, X } from "lucide-react"
import { useMemo, useState } from "react"
import { projects, type Project } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"

const CATEGORIES = ["All", "Product", "AI", "Web", "Tooling"] as const
const EASE = [0.22, 1, 0.36, 1] as const

export function Projects() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All")
  const [selected, setSelected] = useState<Project | null>(null)
  const [expanded, setExpanded] = useState(false)

  const filtered = useMemo(() => {
    const base = filter === "All" ? projects : projects.filter((p) => p.category === filter)
    return expanded ? base : base.slice(0, 4)
  }, [filter, expanded])

  return (
    <section
      id="work"
      className="relative isolate py-28 md:py-40"
      aria-label="Selected work"
    >
      {/* Subtle background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-background via-background/80 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Selected work · 01"
          title="A portfolio of designed objects."
          description="Products I&apos;ve shipped, research I&apos;ve published, tools I&apos;ve open-sourced. Each one an argument for restraint and craft."
        />

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter projects"
        >
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setFilter(cat)
                  setExpanded(false)
                }}
                className={[
                  "group relative inline-flex h-9 items-center rounded-full border px-4 text-xs transition-all duration-400",
                  isActive
                    ? "border-neon/60 bg-neon/[0.08] text-foreground"
                    : "border-border bg-surface/40 text-muted hover:border-border-strong hover:text-foreground",
                ].join(" ")}
              >
                <span className="relative">
                  {cat}
                  {isActive && (
                    <motion.span
                      layoutId="filter-underline"
                      className="absolute -bottom-[3px] left-0 h-px w-full bg-neon"
                      style={{ boxShadow: "0 0 10px rgba(0,217,255,0.7)" }}
                    />
                  )}
                </span>
              </button>
            )
          })}
          <span
            aria-hidden
            className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-2 md:inline"
          >
            {filtered.length.toString().padStart(2, "0")} / {projects.length.toString().padStart(2, "0")}
          </span>
        </motion.div>

        {/* Gallery — asymmetrical grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-6 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                onOpen={() => setSelected(p)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Load more */}
        {filter === "All" && !expanded && projects.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 flex justify-center"
          >
            <button
              onClick={() => setExpanded(true)}
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-border-strong/70 bg-surface/60 px-6 text-sm text-foreground backdrop-blur transition-all duration-500 hover:border-neon/70"
            >
              <Plus
                size={14}
                className="transition-transform duration-500 group-hover:rotate-90"
              />
              View more projects
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  // Asymmetric layout: featured projects span wider
  const isLarge = project.featured || index === 0
  const spanClass = isLarge
    ? "md:col-span-4"
    : index % 5 === 2
      ? "md:col-span-2"
      : "md:col-span-3"

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        ease: EASE,
        delay: Math.min(index * 0.08, 0.4),
      }}
      className={[
        "group relative overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-500 hover:border-neon/40",
        spanClass,
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`Open ${project.title} case study`}
        data-cursor="hover"
      >
        {/* Image */}
        <div
          className={[
            "relative w-full overflow-hidden bg-surface-2",
            isLarge ? "aspect-[16/10]" : "aspect-[16/11]",
          ].join(" ")}
        >
          <Image
            src={project.image}
            alt={`${project.title} — ${project.subtitle}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
          {/* Gradient veil */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
          />
          {/* Neon sweep on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.18),transparent_60%)]" />
          </div>
          {/* Top meta */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
            <span className="inline-flex h-7 items-center rounded-full border border-white/15 bg-black/40 px-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur">
              {project.category}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              {project.year}
            </span>
          </div>
          {/* Bottom caption */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
              </div>
              <span
                aria-hidden
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur transition-all duration-500 group-hover:border-neon/70 group-hover:bg-neon/10"
              >
                <ArrowUpRight
                  size={16}
                  className="text-white/80 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon"
                />
              </span>
            </div>
          </div>
        </div>

        {/* Footer tags */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border px-5 py-4 md:px-6">
          {project.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
            >
              {t}
            </span>
          )).reduce<React.ReactNode[]>((acc, node, idx, arr) => {
            acc.push(node)
            if (idx < arr.length - 1)
              acc.push(
                <span
                  key={`dot-${idx}`}
                  aria-hidden
                  className="inline-block h-1 w-1 rounded-full bg-muted-2"
                />,
              )
            return acc
          }, [])}
        </div>
      </button>

      {/* Glow border on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "0 0 0 1px rgba(0,217,255,0.25), 0 30px 80px -40px rgba(0,217,255,0.45)",
        }}
      />
    </motion.article>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex items-end justify-center overflow-hidden md:items-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "6%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "6%", opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-border bg-surface shadow-2xl md:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border p-6 md:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                  {project.category} · {project.year}
                </p>
                <h3 className="mt-2 font-display text-2xl font-light tracking-tight md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted md:text-base">
                  {project.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border-strong/60 bg-surface-2 text-foreground transition-colors hover:border-neon/60"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-2">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
              </div>

              <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-3 md:p-8">
                <div className="md:col-span-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    Case
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground/90">
                    {project.longDescription}
                  </p>
                </div>
                <aside className="space-y-6 md:border-l md:border-border md:pl-8">
                  <Meta label="Role" value={project.role} />
                  <Meta label="Year" value={project.year} />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      Stack
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <li
                          key={t}
                          className="inline-flex h-7 items-center rounded-full border border-border bg-surface-2 px-3 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/80"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex flex-wrap items-center gap-3 border-t border-border bg-surface p-6 md:p-8">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-11 items-center gap-2 rounded-full border border-neon/50 bg-neon/[0.08] px-5 text-sm font-medium text-foreground transition-all duration-500 hover:border-neon hover:bg-neon/15"
                >
                  <Globe size={14} />
                  Live site
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong/70 bg-surface-2 px-5 text-sm text-foreground transition-colors hover:border-neon/50"
                >
                  <Github size={14} />
                  Repository
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        {label}
      </p>
      <p className="mt-2 text-sm text-foreground">{value}</p>
    </div>
  )
}
