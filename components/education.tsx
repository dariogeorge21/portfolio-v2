"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "./section-heading"
import { education } from "@/lib/portfolio-data"
import { GraduationCap, MapPin, Calendar } from "lucide-react"

const EASE = [0.22, 1, 0.36, 1] as const

export function Education() {
  return (
    <section
      id="education"
      className="relative isolate py-20 md:py-28"
      aria-label="Education"
    >
      {/* Soft bg accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full bg-neon/[0.04] blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <SectionHeading
          eyebrow="Education · 03"
          title={
            <>
              Academic journey and
              <br />
              <span className="italic text-muted">continuous growth.</span>
            </>
          }
        />

        {/* Education Cards */}
        <div className="mt-12 md:mt-16 space-y-4 md:space-y-5">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -30, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: 0.1 * i,
              }}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface/40 p-6 md:p-7 backdrop-blur transition-all duration-300 hover:border-neon/30 hover:bg-surface/60"
            >
              {/* Hover gradient background */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-neon/5 via-transparent to-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden
              />

              {/* Content wrapper */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Degree */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-neon/10 p-2">
                        <GraduationCap
                          size={18}
                          className="text-neon"
                        />
                      </div>
                      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground">
                        {edu.degree}
                      </h3>
                    </div>

                    {/* Institution and meta info */}
                    <div className="mt-3 space-y-1.5">
                      <p className="text-sm font-medium text-muted">
                        {edu.institution}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="opacity-60" />
                          {edu.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="opacity-60" />
                          {edu.period}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                  {edu.description}
                </p>

                {/* Achievements */}
                {edu.achievements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-full bg-neon/8 px-3 py-1 text-xs font-medium text-neon/90 border border-neon/20"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle glow on hover */}
              <div
                className="absolute -inset-full bg-gradient-to-r from-neon/0 via-neon/3 to-neon/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"
                aria-hidden
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
