"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, ArrowRight, Github, Globe, X } from "lucide-react"
import { useMemo, useState } from "react"
import { SectionHeading } from "./section-heading"

// Using local placeholder type to ensure the 10 items render perfectly.
// Swap this back with your actual imported Project type when ready.
export type Project = {
  slug: string
  title: string
  subtitle: string
  category: string
  year: string
  image: string
  tags: string[]
  role: string
  longDescription: string
  liveUrl?: string
  repoUrl?: string
}

const CATEGORIES = ["All", "Product", "Web", "Tooling", "Other"] as const
const EASE = [0.22, 1, 0.36, 1] as const

// --- PLACEHOLDER DATA (10 Items) ---
const PLACEHOLDER_PROJECTS: Project[] = Array.from({ length: 10 }).map((_, i) => ({
  slug: `project-${i + 1}`,
  title: `Project Title ${i + 1}`,
  subtitle: "An exploratory design study focused on seamless user experiences and modern tech stacks.",
  category: ["Product", "Web", "Tooling", "Other"][i % 4],
  year: "2024",
  image: `/placeholder-${i + 1}.jpg`, // Ensure you have images or swap this out
  tags: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"].slice(0, (i % 3) + 2),
  role: "Lead Engineer & Designer",
  longDescription: "Detailed case study description goes here. This outlines the challenges faced, the architecture chosen, and the final impact of the shipped product on the end users.",
  liveUrl: "https://example.com",
  repoUrl: "https://github.com",
}))

export function Projects() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All")
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = useMemo(() => {
    return filter === "All" 
      ? PLACEHOLDER_PROJECTS 
      : PLACEHOLDER_PROJECTS.filter((p) => p.category === filter)
  }, [filter])

  // Split into chunks of 10 for the dual-bento display
  const displayItems = filtered.slice(0, 10)

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
          title="A portfolio of my work."
          description="Products and projects I've built, showcasing my journey, coding skills, and focus on practical engineering."
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
                onClick={() => setFilter(cat)}
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
            {displayItems.length.toString().padStart(2, "0")} / {PLACEHOLDER_PROJECTS.length.toString().padStart(2, "0")}
          </span>
        </motion.div>

        {/* BENTO LAYOUT GALLERY (10 Items Alternating) */}
        <div className="mt-10 md:mt-14 space-y-5 md:space-y-6">
          <AnimatePresence mode="popLayout">
            
            {/* Block 1: Items 1-5 (Right-heavy) */}
            {displayItems.length >= 5 && (
              <motion.div 
                key="block-1"
                className="flex flex-col lg:flex-row items-stretch gap-5 md:gap-6"
              >
                {/* Left Column */}
                <div className="flex w-full flex-col gap-5 lg:w-5/12 md:gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <ProjectCard project={displayItems[0]} index={0} layoutType="square" onOpen={() => setSelected(displayItems[0])} />
                    <ProjectCard project={displayItems[1]} index={1} layoutType="square" onOpen={() => setSelected(displayItems[1])} />
                  </div>
                  <ProjectCard project={displayItems[2]} index={2} layoutType="rectangle" onOpen={() => setSelected(displayItems[2])} />
                </div>

                {/* Right Column */}
                <div className="flex w-full flex-col gap-5 lg:w-7/12 md:gap-6">
                  <ProjectCard project={displayItems[3]} index={3} layoutType="pill" onOpen={() => setSelected(displayItems[3])} />
                  <ProjectCard project={displayItems[4]} index={4} layoutType="large" onOpen={() => setSelected(displayItems[4])} />
                </div>
              </motion.div>
            )}

            {/* Block 2: Items 6-10 (Left-heavy / Mirrored) */}
            {displayItems.length >= 10 && (
              <motion.div 
                key="block-2"
                className="flex flex-col lg:flex-row items-stretch gap-5 md:gap-6"
              >
                {/* Left Column (Flipped) */}
                <div className="flex w-full flex-col gap-5 lg:w-7/12 md:gap-6">
                  <ProjectCard project={displayItems[5]} index={5} layoutType="large" onOpen={() => setSelected(displayItems[5])} />
                  <ProjectCard project={displayItems[6]} index={6} layoutType="pill" onOpen={() => setSelected(displayItems[6])} />
                </div>

                {/* Right Column (Flipped) */}
                <div className="flex w-full flex-col gap-5 lg:w-5/12 md:gap-6">
                  <ProjectCard project={displayItems[7]} index={7} layoutType="rectangle" onOpen={() => setSelected(displayItems[7])} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <ProjectCard project={displayItems[8]} index={8} layoutType="square" onOpen={() => setSelected(displayItems[8])} />
                    <ProjectCard project={displayItems[9]} index={9} layoutType="square" onOpen={() => setSelected(displayItems[9])} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* IMAGE PLACEHOLDER TEXT */}
        {filter === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-20 max-w-3xl text-center md:mt-32"
          >
            <h2 className="mb-4 font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl lg:text-4xl">
              2023 is finally coming to a close.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted/90 md:text-lg">
              Not the most straightforward year, perhaps, but an important one for our growing business.
            </p>
          </motion.div>
        )}

        {/* CTA TO /PROJECTS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/projects"
            className="group inline-flex h-12 items-center gap-3 rounded-full border border-border-strong/70 bg-surface/60 px-8 text-sm font-medium text-foreground backdrop-blur transition-all duration-500 hover:border-neon/70 hover:bg-surface"
          >
            Explore all projects
            <ArrowRight
              size={16}
              className="text-muted transition-all duration-500 group-hover:translate-x-1 group-hover:text-neon"
            />
          </Link>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

type LayoutType = "square" | "rectangle" | "pill" | "large"

function ProjectCard({
  project,
  index,
  onOpen,
  layoutType,
}: {
  project: Project
  index: number
  onOpen: () => void
  layoutType: LayoutType
}) {
  const isPill = layoutType === "pill"

  const shapeClasses = {
    square: "aspect-square rounded-[2rem] md:rounded-[2.5rem]",
    rectangle: "aspect-square sm:aspect-[2/1] rounded-[2rem] md:rounded-[2.5rem]",
    pill: "h-28 lg:h-32 rounded-[2rem] lg:rounded-[3rem]",
    large: "flex-1 min-h-[300px] lg:min-h-0 rounded-[2rem] md:rounded-[2.5rem]",
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay: Math.min((index % 5) * 0.08, 0.4) }}
      className={[
        "group relative flex flex-col overflow-hidden border border-border bg-surface transition-all duration-500 hover:border-neon/40 hover:shadow-[0_0_40px_-15px_rgba(0,217,255,0.15)]",
        shapeClasses[layoutType],
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 flex w-full flex-col text-left"
        aria-label={`Open ${project.title} case study`}
      >
        {/* Full Cover Placeholder Background (Gradient fallback) & Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-2 to-background">
          {/* Note: In Next.js, an invalid src will crash. You can add a placeholder image in your public folder or use this unoptimized img for purely structural testing */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)` }}
          />
          {/* Overlay Gradient for Text Readability */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent"
          />
        </div>

        {/* Neon sweep on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,217,255,0.18),transparent_60%)]" />
        </div>

        {/* Embedded Content */}
        {isPill ? (
          <div className="relative z-10 flex h-full w-full items-center justify-between px-6 lg:px-10">
            <div className="flex items-center gap-4 lg:gap-6">
              <span className="hidden h-8 items-center rounded-full border border-white/15 bg-black/40 px-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur sm:inline-flex">
                {project.category}
              </span>
              <h3 className="max-w-[200px] truncate font-display text-xl font-medium tracking-tight text-white/95 sm:max-w-xs lg:max-w-md lg:text-2xl">
                {project.title}
              </h3>
            </div>
            <span
              aria-hidden
              className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur transition-all duration-500 group-hover:border-neon/70 group-hover:bg-neon/10"
            >
              <ArrowUpRight
                size={18}
                className="text-white/80 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon"
              />
            </span>
          </div>
        ) : (
          <div className="relative z-10 flex h-full flex-col justify-between p-6 lg:p-8">
            {/* Top Meta */}
            <div className="flex items-start justify-between">
              <span className="inline-flex h-7 items-center rounded-full border border-white/15 bg-black/40 px-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur">
                {project.category}
              </span>
              <span className="rounded-md bg-black/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 backdrop-blur">
                {project.year}
              </span>
            </div>

            {/* Bottom Caption & Tags */}
            <div className="mt-auto flex flex-col gap-3">
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight text-white/95 lg:text-3xl">
                  {project.title}
                </h3>
                {layoutType !== "square" && (
                  <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/70">
                    {project.subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="flex flex-wrap items-center gap-2">
                  {project.tags
                    .slice(0, layoutType === "large" ? 4 : 2)
                    .map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50"
                      >
                        {t}
                      </span>
                    ))
                    .reduce<React.ReactNode[]>((acc, node, idx, arr) => {
                      acc.push(node)
                      if (idx < arr.length - 1)
                        acc.push(
                          <span
                            key={`dot-${idx}`}
                            className="inline-block h-1 w-1 rounded-full bg-white/20"
                          />
                        )
                      return acc
                    }, [])}
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
        )}
      </button>
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
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)` }}
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