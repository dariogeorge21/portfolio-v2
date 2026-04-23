"use client"

import { motion } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1] as const

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: "left" | "center"
}) {
  return (
    <div
      className={[
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "items-start",
      ].join(" ")}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex items-center gap-3"
      >
        <span
          aria-hidden
          className="h-px w-8 bg-gradient-to-r from-transparent via-neon/80 to-neon/80"
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {eyebrow}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="max-w-4xl font-display text-[40px] font-light leading-[1.02] tracking-[-0.03em] text-balance md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="max-w-xl text-base leading-relaxed text-muted text-pretty"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
