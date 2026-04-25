"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react"
import { useRef } from "react"
import { ParticleField } from "./particle-field"

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Parallax bg
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const headline = ["Love", "coding |", "lifelong", "learner."]

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-end overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40"
      aria-label="Introduction"
    >
      {/* Layered backgrounds */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        {/* Base grid */}
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        {/* Orbs */}
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-neon/10 blur-[120px] animate-drift-slow" />
        <div className="absolute -right-24 top-10 h-[380px] w-[380px] rounded-full bg-[#4d7cff]/10 blur-[100px] animate-drift" />
        {/* Particle field */}
        <ParticleField className="absolute inset-0 h-full w-full" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,7,13,0.4)_60%,rgba(5,7,13,1)_100%)]" />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-background" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="mx-auto w-full max-w-7xl px-6 md:px-10"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="flex items-center gap-4"
        >
          <span
            aria-hidden
            className="h-px w-12 bg-gradient-to-r from-transparent via-neon/80 to-transparent"
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            <span className="text-neon">◆</span>&nbsp;&nbsp;Portfolio · MMXXVI
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="mt-8 font-display text-[14vw] font-light leading-[0.92] tracking-[-0.035em] text-balance md:text-[104px] lg:text-[128px]">
          {headline.map((word, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1.1,
                  ease: EASE,
                  delay: 0.25 + i * 0.09,
                }}
                className="inline-block"
              >
                {i === 2 ? (
                  <>
                    <span className="relative italic text-gradient-neon">
                      lifelong
                      <motion.span
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: 1.2,
                          ease: EASE,
                          delay: 1.3,
                        }}
                        className="absolute -bottom-1 left-0 block h-[2px] w-full origin-left bg-neon"
                        style={{
                          boxShadow: "0 0 14px rgba(0,217,255,0.7)",
                        }}
                      />
                    </span>
                  </>
                ) : (
                  <span className="text-gradient">{word}</span>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub content row */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Left: intro */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="md:col-span-5"
          >
            <p className="max-w-md text-[15px] leading-relaxed text-muted md:text-base">
              I&apos;m <span className="text-foreground">Dario George</span> —
              a computer science student and developer building practical and cool 
              projects. Focused on continuous learning and coding.
            </p>
          </motion.div>

          {/* Middle: stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1 }}
            className="grid grid-cols-2 gap-6 md:col-span-4 md:col-start-7"
          >
            <StatItem
              label="Based"
              value="New Delhi"
              sub="Remote-friendly"
            />
            <StatItem
              label="Status"
              value={
                <span className="inline-flex items-center gap-2">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-neon opacity-60 animate-ping" />
                    <span className="relative inline-block h-2 w-2 rounded-full bg-neon" />
                  </span>
                  Student
                </span>
              }
              sub="SJCET Palai"
            />
          </motion.div>

          {/* Right: CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
            className="flex flex-wrap items-center gap-4 md:col-span-3 md:justify-end"
          >
            <a
              href="#work"
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full border border-neon/50 bg-neon/[0.08] px-6 text-sm font-medium text-foreground transition-all duration-500 hover:border-neon hover:bg-neon/15"
              data-cursor="hover"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neon/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
              />
              <span className="relative">View the work</span>
              <ArrowUpRight
                size={16}
                className="relative transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="https://www.buymeacoffee.com/dariogeorge21"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-12 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              data-cursor="hover"
            >
              <Sparkles size={14} className="text-neon" />
              <span className="relative">
                Buy me a coffee
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100"
                />
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
        aria-label="Scroll to work"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-strong/60"
        >
          <ArrowDown size={14} className="text-neon" />
        </motion.span>
      </motion.a>

      {/* Corner marks */}
      <CornerMark className="left-6 top-24 md:left-10 md:top-28" />
      <CornerMark className="right-6 top-24 md:right-10 md:top-28" mirror />
    </section>
  )
}

function StatItem({
  label,
  value,
  sub,
}: {
  label: string
  value: React.ReactNode
  sub?: string
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        {label}
      </p>
      <p className="mt-2 font-display text-base font-medium text-foreground">
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-muted-2">{sub}</p>}
    </div>
  )
}

function CornerMark({
  className,
  mirror,
}: {
  className?: string
  mirror?: boolean
}) {
  return (
    <span
      aria-hidden
      className={[
        "pointer-events-none absolute hidden h-4 w-4 md:block",
        mirror ? "rotate-90" : "",
        className,
      ].join(" ")}
    >
      <span className="absolute left-0 top-0 h-full w-px bg-neon/60" />
      <span className="absolute left-0 top-0 h-px w-full bg-neon/60" />
    </span>
  )
}
