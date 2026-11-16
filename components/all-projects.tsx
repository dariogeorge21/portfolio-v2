"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react"
import { portfolioProjects, type Project } from "@/lib/projects-data"
import { ProjectModal } from "./projects"

const EASE = [0.22, 1, 0.36, 1] as const

type StatusFilter = "all" | "live" | "github"

export function AllProjects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Dynamically derive unique categories from the project dataset
  const categories = useMemo(() => {
    const set = new Set<string>()
    portfolioProjects.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return ["All", ...Array.from(set)]
  }, [])

  // Filter projects based on search query, category, and link availability
  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((project) => {
      // Category filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false
      }

      // Status/link filter
      if (statusFilter === "live" && !project.liveUrl) {
        return false
      }
      if (statusFilter === "github" && !project.repoUrl) {
        return false
      }

      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim()
        const matchTitle = project.title.toLowerCase().includes(query)
        const matchSubtitle = project.subtitle.toLowerCase().includes(query)
        const matchDesc = project.longDescription.toLowerCase().includes(query)
        const matchTags = project.tags.some((tag) =>
          tag.toLowerCase().includes(query),
        )
        const matchRole = project.role.toLowerCase().includes(query)
        const matchCategory = project.category.toLowerCase().includes(query)

        if (
          !matchTitle &&
          !matchSubtitle &&
          !matchDesc &&
          !matchTags &&
          !matchRole &&
          !matchCategory
        ) {
          return false
        }
      }

      return true
    })
  }, [selectedCategory, statusFilter, searchQuery])

  const liveCount = useMemo(
    () => portfolioProjects.filter((p) => Boolean(p.liveUrl)).length,
    [],
  )
  const repoCount = useMemo(
    () => portfolioProjects.filter((p) => Boolean(p.repoUrl)).length,
    [],
  )

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setStatusFilter("all")
  }

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    statusFilter !== "all"

  return (
    <div className="relative isolate min-h-screen pt-28 pb-32 md:pt-36 md:pb-40">
      {/* Background Ambience */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-neon/8 blur-[140px]" />
        <div className="absolute top-1/2 -right-32 h-[450px] w-[450px] rounded-full bg-[#5d3bf6]/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.06),transparent_40%),linear-gradient(to_bottom,transparent_0%,rgba(5,7,13,0.9)_85%,var(--background)_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Back navigation & Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-8"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full border border-border-strong/60 bg-surface/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted backdrop-blur transition-all duration-300 hover:border-neon/60 hover:text-foreground hover:shadow-[0_0_20px_-8px_rgba(0,217,255,0.4)]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-neon"
            />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="flex flex-col gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span
              aria-hidden
              className="h-px w-8 bg-gradient-to-r from-transparent via-neon/80 to-neon/80"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              Projects Archive · Index
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="max-w-4xl"
          >
            <h1 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              All Projects &amp;{" "}
              <span className="italic text-gradient-neon">Creations.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              A comprehensive showcase of web applications, productivity
              tools, APIs, and automation scripts built with focus on clean
              architecture and practical utility.
            </p>
          </motion.div>

          {/* Metrics summary chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-foreground/80">
              <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
              <span>
                Total Projects:{" "}
                <strong className="text-foreground">
                  {portfolioProjects.length}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-foreground/80">
              <Globe size={13} className="text-neon" />
              <span>
                Live Deployments:{" "}
                <strong className="text-foreground">{liveCount}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-foreground/80">
              <Github size={13} className="text-muted-foreground" />
              <span>
                Open Source Repos:{" "}
                <strong className="text-foreground">{repoCount}</strong>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Filter and Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-12 rounded-3xl border border-white/5 bg-surface/60 p-5 backdrop-blur-xl md:mt-16 md:p-6"
        >
          <div className="flex flex-col gap-5">
            {/* Search Input & Quick Status Toggles */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search box */}
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, stack, keyword, or role..."
                  className="w-full rounded-2xl border border-border-strong/60 bg-surface-2/80 py-3 pl-11 pr-10 font-sans text-sm text-foreground placeholder:text-muted/60 focus:border-neon/70 focus:outline-none focus:ring-1 focus:ring-neon/70 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Status link filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted mr-1 hidden sm:inline">
                  Filter By:
                </span>
                <button
                  type="button"
                  onClick={() => setStatusFilter("all")}
                  className={[
                    "rounded-xl px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300",
                    statusFilter === "all"
                      ? "border border-neon/60 bg-neon/15 text-neon shadow-[0_0_15px_-5px_rgba(0,217,255,0.4)]"
                      : "border border-border bg-surface-2 text-muted hover:border-border-strong hover:text-foreground",
                  ].join(" ")}
                >
                  All Status
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("live")}
                  className={[
                    "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300",
                    statusFilter === "live"
                      ? "border border-neon/60 bg-neon/15 text-neon shadow-[0_0_15px_-5px_rgba(0,217,255,0.4)]"
                      : "border border-border bg-surface-2 text-muted hover:border-border-strong hover:text-foreground",
                  ].join(" ")}
                >
                  <Globe size={12} />
                  Has Live Demo
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("github")}
                  className={[
                    "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300",
                    statusFilter === "github"
                      ? "border border-neon/60 bg-neon/15 text-neon shadow-[0_0_15px_-5px_rgba(0,217,255,0.4)]"
                      : "border border-border bg-surface-2 text-muted hover:border-border-strong hover:text-foreground",
                  ].join(" ")}
                >
                  <Github size={12} />
                  Has GitHub
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted mr-2 flex items-center gap-1.5">
                <Layers size={13} />
                Category:
              </span>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={[
                      "rounded-full px-3.5 py-1.5 font-mono text-xs transition-all duration-300",
                      isActive
                        ? "border border-neon bg-neon/15 text-neon font-medium shadow-[0_0_15px_-5px_rgba(0,217,255,0.4)]"
                        : "border border-border/80 bg-surface-2/60 text-muted hover:border-border-strong hover:text-foreground",
                    ].join(" ")}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Counter and Results Header */}
        <div className="mt-8 flex items-center justify-between px-1">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Showing{" "}
            <span className="text-foreground font-medium">
              {filteredProjects.length}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-medium">
              {portfolioProjects.length}
            </span>{" "}
            projects
          </p>

          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="font-mono text-xs uppercase tracking-wider text-neon hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div className="mt-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project, idx) => (
                  <ProjectCardGridItem
                    key={project.slug}
                    project={project}
                    index={idx}
                    onOpenModal={() => setSelectedProject(project)}
                  />
                ))}
              </motion.div>
            ) : (
              /* Empty state */
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-surface/50 py-20 px-6 text-center backdrop-blur-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-2 text-muted">
                  <SlidersHorizontal size={22} />
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-foreground">
                  No projects found
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted">
                  No projects match your current filters. Try searching with
                  different terms or reset the filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 rounded-full border border-neon/60 bg-neon/10 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground hover:border-neon hover:bg-neon/20 transition-all"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}

function ProjectCardGridItem({
  project,
  index,
  onOpenModal,
}: {
  project: Project
  index: number
  onOpenModal: () => void
}) {
  const hasLive = Boolean(project.liveUrl)
  const hasRepo = Boolean(project.repoUrl)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.6,
        ease: EASE,
        delay: Math.min((index % 6) * 0.05, 0.3),
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-surface backdrop-blur-xl transition-all duration-500 hover:border-neon/50 hover:shadow-[0_0_35px_-12px_rgba(0,217,255,0.22)]"
    >
      {/* Background visual highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-neon/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex flex-col p-6 sm:p-7">
        {/* Top Meta: Category & Year */}
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex h-7 items-center rounded-full border border-white/10 bg-surface-2 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
            {project.category}
          </span>
          <span className="font-mono text-xs text-muted tracking-widest">
            {project.year}
          </span>
        </div>

        {/* Project Title and Subtitle */}
        <div className="mt-5">
          <button
            type="button"
            onClick={onOpenModal}
            className="text-left group/title focus:outline-none"
          >
            <h3 className="font-display text-xl font-medium tracking-tight text-white/95 transition-colors duration-300 group-hover/title:text-neon sm:text-2xl">
              {project.title}
            </h3>
          </button>
          <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
            {project.subtitle}
          </p>
        </div>

        {/* Role & Description snippet */}
        <div className="mt-4 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Role:
            </span>
            <span className="font-mono text-[11px] text-foreground/80">
              {project.role}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/60 line-clamp-3">
            {project.longDescription}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex h-6 items-center rounded-md border border-white/5 bg-surface-2/80 px-2.5 font-mono text-[10px] uppercase tracking-wider text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Action links (handling conditional live and github links) */}
      <div className="mt-auto border-t border-white/5 bg-surface-2/30 px-6 py-4 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* External Links cluster */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Live Link handling */}
            {hasLive ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${project.title}`}
                className="group/link inline-flex h-9 items-center gap-1.5 rounded-full border border-neon/50 bg-neon/10 px-3.5 text-xs font-medium text-foreground transition-all duration-300 hover:border-neon hover:bg-neon/20 hover:text-white"
              >
                <Globe size={13} className="text-neon" />
                <span>Live Demo</span>
                <ArrowUpRight
                  size={13}
                  className="text-neon transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            ) : (
              <span
                title="No public live demo for this project"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.02] px-3 font-mono text-[11px] text-muted/60"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-muted/40" />
                No Live Link
              </span>
            )}

            {/* GitHub Repo handling */}
            {hasRepo ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open GitHub repository for ${project.title}`}
                className="group/repo inline-flex h-9 items-center gap-1.5 rounded-full border border-border-strong/70 bg-surface px-3.5 text-xs font-medium text-foreground transition-all duration-300 hover:border-neon/60 hover:bg-surface-2"
              >
                <Github
                  size={13}
                  className="transition-transform duration-300 group-hover/repo:scale-110"
                />
                <span>Code</span>
              </a>
            ) : (
              <span
                title="Source code is private or internal"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.02] px-3 font-mono text-[11px] text-muted/60"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-muted/40" />
                Private Repo
              </span>
            )}
          </div>

          {/* Details / Modal opener */}
          <button
            type="button"
            onClick={onOpenModal}
            className="group/btn inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-neon transition-colors"
          >
            <span>Details</span>
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
