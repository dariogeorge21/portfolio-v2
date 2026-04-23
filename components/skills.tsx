"use client"

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef } from "react"
import { skillGroups } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"

const EASE = [0.22, 1, 0.36, 1] as const

export function Skills() {
  return (
    <section
      id="skills"
      className="relative isolate border-t border-border py-28 md:py-40"
      aria-label="Skills and expertise"
    >
      {/* Subtle dot bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dots opacity-[0.3] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Capabilities · 03"
          title={
            <>
              A full-stack practice,
              <br />
              <span className="italic text-muted">
                sharpened on edge cases.
              </span>
            </>
          }
          description="I work end-to-end: from type-safe APIs and streaming systems down to the last ease curve. Below, a calibrated look at what I use daily versus occasionally."
        />

        {/* Skills grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE, delay: gi * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong md:p-7"
            >
              {/* Label */}
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-medium tracking-tight">
                  {group.label}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  0{gi + 1}
                </span>
              </div>

              {/* Skill list */}
              <ul className="mt-6 space-y-4">
                {group.items.map((item, i) => (
                  <SkillRow
                    key={item.name}
                    name={item.name}
                    level={item.level}
                    note={item.note}
                    delay={gi * 0.1 + i * 0.05}
                  />
                ))}
              </ul>

              {/* Corner glow */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-neon/[0.08] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>

        {/* Marquee of tools */}
        <div className="mt-20 overflow-hidden border-y border-border py-6">
          <div className="relative">
            <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
              {[...MARQUEE_TOOLS, ...MARQUEE_TOOLS].map((tool, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-3 font-display text-2xl font-light tracking-tight text-muted md:text-3xl"
                >
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-neon/80"
                  />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const MARQUEE_TOOLS = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Rust",
  "Python",
  "PyTorch",
  "PostgreSQL",
  "ClickHouse",
  "Three.js",
  "Framer Motion",
  "Figma",
  "Vercel",
  "AWS",
  "Docker",
]

function SkillRow({
  name,
  level,
  note,
  delay,
}: {
  name: string
  level: number
  note?: string
  delay: number
}) {
  const rowRef = useRef<HTMLLIElement>(null)
  const inView = useInView(rowRef, { once: true, margin: "-60px" })

  // Animated counter
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (inView) {
      const controls = animate(count, level, {
        duration: 1.4,
        ease: EASE,
        delay,
      })
      return () => controls.stop()
    }
  }, [inView, level, delay, count])

  return (
    <li ref={rowRef} className="group/row">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <motion.span
          className="font-mono text-[11px] tabular-nums text-muted"
          aria-hidden
        >
          <motion.span>{rounded}</motion.span>
          <span>%</span>
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="relative mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.4,
            ease: EASE,
            delay,
          }}
          className="relative h-full rounded-full bg-gradient-to-r from-neon/60 via-neon to-white/90"
          style={{
            boxShadow: "0 0 10px rgba(0,217,255,0.5)",
          }}
        >
          {/* Sweep shimmer */}
          <span
            aria-hidden
            className="absolute inset-0 overflow-hidden rounded-full"
          >
            <span
              className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              style={{
                animation: "sweep 2.6s ease-in-out infinite",
                animationDelay: `${delay + 1}s`,
              }}
            />
          </span>
        </motion.div>
      </div>

      {note && (
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2">
          {note}
        </p>
      )}
    </li>
  )
}
