"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeading } from "./section-heading"
import { stats, timeline } from "@/lib/portfolio-data"
import { Award, Code2, GitBranch, Star } from "lucide-react"

const EASE = [0.22, 1, 0.36, 1] as const

const BADGES = [
  { icon: Star, label: "Arctic Code Vault", sub: "2020" },
  { icon: Award, label: "Pro Contributor", sub: "500+ commits" },
  { icon: GitBranch, label: "Open Source", sub: "3k★ maintainer" },
  { icon: Code2, label: "Pair Extraordinaire", sub: "Team-first" },
]

export function About() {
  return (
    <section
      id="about"
      className="relative isolate py-28 md:py-40"
      aria-label="About Dario George"
    >
      {/* Soft bg accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[560px] w-[560px] rounded-full bg-neon/[0.05] blur-[160px]"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <SectionHeading
          eyebrow="About · 02"
          title={
            <>
              Engineer by training,
              <br />
              <span className="italic text-muted">designer by obsession.</span>
            </>
          }
        />

        {/* Split layout */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12 md:gap-12 lg:gap-16">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="md:col-span-5"
          >
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border-strong/40 bg-surface">
                <Image
                  src="/dario-portrait.jpg"
                  alt="Portrait of Dario George"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority={false}
                />
                {/* Subtle neon frame on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent"
                />
                {/* Signature overlay */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      Portrait
                    </p>
                    <p className="mt-1 font-display text-lg tracking-tight text-foreground">
                      Dario George
                    </p>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    2026
                  </p>
                </div>
              </div>
              {/* Decorative corner accent */}
              <span
                aria-hidden
                className="absolute -bottom-3 -right-3 h-16 w-16 rounded-xl border border-neon/40 bg-neon/[0.05] backdrop-blur glow-neon-sm"
              />
            </div>
          </motion.div>

          {/* Biography */}
          <div className="md:col-span-7">
            <Biography />

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-surface p-5"
                >
                  <p className="font-display text-3xl font-light tracking-tight text-foreground md:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* GitHub badges */}
            <div className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                GitHub · achievements
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {BADGES.map((b, i) => (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      ease: EASE,
                      delay: 0.1 * i,
                      type: "spring",
                      stiffness: 220,
                      damping: 18,
                    }}
                    className="group rounded-xl border border-border bg-surface p-4 transition-colors hover:border-neon/40"
                  >
                    <b.icon
                      size={18}
                      className="text-neon transition-transform duration-500 group-hover:scale-110"
                    />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {b.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {b.sub}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24 md:mt-32">
          <motion.p
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
              Trajectory
            </span>
          </motion.p>

          <div className="relative mt-10">
            {/* Vertical line */}
            <span
              aria-hidden
              className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-neon/40 via-border to-transparent md:left-1/2 md:block"
            />
            <span
              aria-hidden
              className="absolute left-4 top-0 h-full w-px bg-border md:hidden"
            />

            <ol className="space-y-10 md:space-y-16">
              {timeline.map((t, i) => {
                const isLeft = t.side === "left"
                return (
                  <li
                    key={i}
                    className={[
                      "relative pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0",
                      isLeft ? "" : "",
                    ].join(" ")}
                  >
                    {/* Dot */}
                    <span
                      aria-hidden
                      className="absolute left-[11px] top-2 inline-flex h-3 w-3 -translate-x-1/2 md:left-1/2"
                    >
                      <span className="absolute inset-0 rounded-full bg-neon/30" />
                      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon shadow-[0_0_12px_rgba(0,217,255,0.8)]" />
                    </span>

                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 10 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: EASE }}
                      className={[
                        "rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong md:p-7",
                        isLeft
                          ? "md:col-start-1 md:mr-8 md:text-right"
                          : "md:col-start-2 md:ml-8",
                      ].join(" ")}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon">
                        {t.year}
                      </p>
                      <h3 className="mt-3 font-display text-xl tracking-tight text-foreground">
                        {t.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{t.org}</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground/90 text-foreground/80">
                        {t.description}
                      </p>
                    </motion.div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Biography with staggered line reveal.
 */
function Biography() {
  const lines = [
    "I build products that feel inevitable — engineered with care and",
    "designed with restraint. My work spans real-time analytics, on-device",
    "AI, and developer tooling, with motion treated as a first-class",
    "discipline rather than decoration.",
    "",
    "Currently studying computer science while shipping side projects and",
    "consulting with select teams. Always interested in talking to people",
    "who care about craft as much as I do.",
  ]

  return (
    <div>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
      >
        Biography
      </motion.p>

      <div className="mt-5 max-w-xl font-display text-xl font-light leading-[1.5] tracking-[-0.01em] text-foreground/90 md:text-2xl md:leading-[1.45]">
        {lines.map((line, i) =>
          line === "" ? (
            <div key={i} className="h-5" aria-hidden />
          ) : (
            <span key={i} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.9,
                  ease: EASE,
                  delay: 0.06 * i + 0.2,
                }}
                className="inline-block"
              >
                {line}
              </motion.span>
            </span>
          ),
        )}
      </div>
    </div>
  )
}
