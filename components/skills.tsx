"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { skillGroups } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"

const EASE = [0.22, 1, 0.36, 1] as const
const SWITCH_INTERVAL = 50000

type ViewMode = "chips" | "progress"

type SkillItem = {
  name: string
  note?: string
  level?: number
}

type SkillGroup = {
  label: string
  items: SkillItem[]
}

export function Skills() {
  const [mode, setMode] = useState<ViewMode>("chips")
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMode((prev) => (prev === "chips" ? "progress" : "chips"))
    }, SWITCH_INTERVAL)

    return () => window.clearInterval(interval)
  }, [])

  const groups = skillGroups as SkillGroup[]

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden border-t border-white/10 py-28 md:py-40"
      aria-label="Skills and expertise"
    >
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_22%,transparent_78%,rgba(255,255,255,0.02))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Capabilities · 03"
          title={
            <>
              A full-stack practice,
              <br />
              <span className="italic text-muted">
                focused on building practical products.
              </span>
            </>
          }
          description="I work across the stack, leveraging modern frameworks and tools to create scalable, efficient solutions."
        />

        {/* Mode chip */}
        <div className="mt-6 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
            {mode === "chips" ? "Grouped view" : "Measured view"}
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
            auto-switches every 5 seconds
          </span>
        </div>

        <LayoutGroup id="skills-morph">
          <motion.div
            layout
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-7"
          >
            {groups.map((group, index) => (
              <SkillGlassCard
                key={group.label}
                group={group}
                index={index}
                mode={mode}
                reduceMotion={reduceMotion ?? false}
              />
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}

function SkillGlassCard({
  group,
  index,
  mode,
  reduceMotion,
}: {
  group: SkillGroup
  index: number
  mode: ViewMode
  reduceMotion: boolean
}) {
  const { ref, motionStyle, onMouseMove, onMouseLeave } = useMagneticTilt(
    !reduceMotion
  )

  return (
    <div className="[perspective:1200px]">
      <motion.article
        ref={ref}
        layout
        initial={false}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={
          reduceMotion
            ? undefined
            : {
                ...motionStyle,
                transformStyle: "preserve-3d",
              }
        }
        whileHover={
          reduceMotion
            ? { y: -3 }
            : {
                scale: 1.012,
              }
        }
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 26,
          mass: 0.75,
        }}
        className="group relative min-h-[240px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,19,34,0.82),rgba(10,14,24,0.62))] p-6 shadow-[0_24px_90px_-38px_rgba(0,0,0,0.72)] backdrop-blur-2xl md:p-7"
      >
        {/* glass glow layers */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_36%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_28%,transparent_72%,rgba(255,255,255,0.05))] opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          <div className="absolute -left-24 -top-20 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-44 w-44 rounded-full bg-fuchsia-400/10 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[15px] font-medium tracking-tight text-white/92 md:text-base">
                {group.label}
              </h3>
              <motion.p
                key={`${group.label}-${mode}-sub`}
                initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/28"
              >
                {mode === "chips" ? "Grouped focus areas" : "Measured strength"}
              </motion.p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/30">
                0{index + 1}
              </span>
              <motion.span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full bg-cyan-300/80 shadow-[0_0_18px_rgba(103,232,249,0.55)]"
                animate={{
                  opacity: [0.55, 1, 0.55],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <AnimatePresence mode="wait" initial={false}>
            {mode === "chips" ? (
              <motion.div
                key="chips"
                initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-wrap gap-2.5"
              >
                {group.items.map((item, itemIndex) => (
                  <ChipToken
                    key={item.name}
                    name={item.name}
                    note={item.note}
                    index={itemIndex}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="space-y-3.5"
              >
                {group.items.map((item, itemIndex) => (
                  <ProgressRow
                    key={`${item.name}-${mode}`}
                    name={item.name}
                    level={
                      typeof item.level === "number"
                        ? item.level
                        : Math.max(46, 88 - index * 8 - itemIndex * 5)
                    }
                    note={item.note}
                    delay={index * 0.08 + itemIndex * 0.05}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    </div>
  )
}

function ChipToken({
  name,
  note,
  index,
}: {
  name: string
  note?: string
  index: number
}) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{
        duration: 0.28,
        ease: EASE,
        delay: index * 0.025,
      }}
      whileHover={{ y: -2, scale: 1.02 }}
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[13px] font-medium tracking-tight text-white/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md transition-colors duration-300 hover:border-cyan-300/30 hover:bg-white/[0.08]"
    >
      {name}
      {note ? (
        <span className="ml-2 hidden text-[11px] font-normal text-white/40 sm:inline">
          — {note}
        </span>
      ) : null}
    </motion.span>
  )
}

function ProgressRow({
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
  const rowRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rowRef, { once: true, margin: "-50px" })

  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useMotionValueEvent(count, "change", (latest) => {
    setDisplay(Math.round(latest))
  })

  useEffect(() => {
    if (!inView) return

    const controls = animate(count, level, {
      duration: 1.1,
      ease: EASE,
      delay,
    })

    return () => controls.stop()
  }, [inView, level, delay, count])

  return (
    <motion.div
      ref={rowRef}
      layout
      initial={false}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium tracking-tight text-white/90">
          {name}
        </span>

        <span className="font-mono text-[11px] tabular-nums text-white/42">
          {display}%
        </span>
      </div>

      <div className="relative mt-2.5 h-2 overflow-hidden rounded-full bg-black/25 ring-1 ring-white/6">
        <motion.div
          initial={{ width: "0%" }}
          animate={inView ? { width: `${level}%` } : { width: "0%" }}
          transition={{
            duration: 1.1,
            ease: EASE,
            delay,
          }}
          className="relative h-full rounded-full bg-gradient-to-r from-cyan-300/70 via-white/90 to-violet-300/80 shadow-[0_0_18px_rgba(103,232,249,0.35)]"
        >
          <span className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white/40 blur-sm" />
        </motion.div>
      </div>

      {note ? (
        <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
          {note}
        </p>
      ) : null}
    </motion.div>
  )
}

function useMagneticTilt(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useSpring(0, { stiffness: 180, damping: 18, mass: 0.7 })
  const y = useSpring(0, { stiffness: 180, damping: 18, mass: 0.7 })
  const rotateX = useSpring(0, { stiffness: 160, damping: 18, mass: 0.7 })
  const rotateY = useSpring(0, { stiffness: 160, damping: 18, mass: 0.7 })
  const scale = useSpring(1, { stiffness: 180, damping: 20, mass: 0.7 })

  const reset = () => {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    const dx = px - 0.5
    const dy = py - 0.5

    x.set(dx * 10)
    y.set(dy * 10)
    rotateX.set(-dy * 10)
    rotateY.set(dx * 12)
    scale.set(1.02)
  }

  const onMouseLeave = () => {
    if (!enabled) return
    reset()
  }

  return {
    ref,
    motionStyle: { x, y, rotateX, rotateY, scale },
    onMouseMove,
    onMouseLeave,
  }
}