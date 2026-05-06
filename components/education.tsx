"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "./section-heading"
import { education } from "@/lib/portfolio-data"
import { ArrowUpRight } from "lucide-react"

// Ultra-smooth custom easing for cinematic motion
const EASE = [0.16, 1, 0.3, 1] as const

function EducationRow({ edu, index }: { edu: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-b border-white/10 py-10 transition-colors duration-500 first:border-t hover:border-white/30 md:py-14"
    >
      {/* Subtle background bloom on hover - Awwwards staple */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-neon/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left: Period (Editorial Mono) */}
        <div className="lg:col-span-3">
          <span className="font-mono text-sm tracking-[0.2em] text-neon/70 uppercase transition-colors duration-300 group-hover:text-neon">
            {edu.period}
          </span>
        </div>

        {/* Right: Content & Typography */}
        <div className="lg:col-span-9">
          {/* Degree Title with X-axis Hover Translation */}
          <motion.div
            animate={{ x: isHovered ? 16 : 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-start justify-between md:items-center"
          >
            <h3 className="font-display text-3xl font-medium tracking-tight text-white transition-colors duration-500 md:text-4xl lg:text-5xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50">
              {edu.degree}
            </h3>
            
            {/* Interactive Arrow Indicator */}
            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-neon/30 group-hover:bg-neon/10 md:flex">
              <ArrowUpRight className="text-white/40 transition-colors duration-500 group-hover:text-neon" size={20} />
            </div>
          </motion.div>

          {/* Subtitle: Institution & Location */}
          <motion.div 
            animate={{ x: isHovered ? 16 : 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.02 }}
            className="mt-4 flex flex-wrap items-center gap-2 text-base md:text-lg text-white/50"
          >
            <span className="font-medium text-white/80">{edu.institution}</span>
            <span className="hidden text-white/20 md:inline-block">—</span>
            <span className="text-sm tracking-wide md:text-base">{edu.location}</span>
          </motion.div>

          {/* Description */}
          <motion.div
            animate={{ x: isHovered ? 16 : 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.04 }}
          >
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70 md:text-base">
              {edu.description}
            </p>
          </motion.div>

          {/* Editorial Achievements List (Replacing Chips) */}
          {edu.achievements && edu.achievements.length > 0 && (
            <motion.div 
              animate={{ x: isHovered ? 16 : 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
              className="mt-8 flex flex-col gap-3"
            >
              {edu.achievements.map((achievement: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-neon/50 transition-colors duration-300 group-hover:text-neon">
                    ▹
                  </span>
                  <span className="text-sm font-medium tracking-wide text-white/40 transition-colors duration-300 group-hover:text-white/60">
                    {achievement}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Education() {
  return (
    <section
      id="education"
      className="relative isolate py-24 md:py-40"
      aria-label="Education"
    >
      {/* Ambient Cosmic Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-neon/[0.02] blur-[150px]"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: Sticky Title area */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <SectionHeading
                eyebrow="Education · 03"
                title={
                  <>
                    Academic
                    <br />
                    <span className="italic text-white/40">Foundations.</span>
                  </>
                }
              />
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 max-w-sm text-sm leading-relaxed text-white/40 md:text-base"
              >
                A timeline of exploration, continuous learning, and the structural groundwork that shapes my technical approach today.
              </motion.p>
            </div>
          </div>

          {/* Right Column: The Scrolling Editorial Roster */}
          <div className="lg:col-span-8 lg:pl-10">
            <div className="flex flex-col">
              {education.map((edu, i) => (
                <EducationRow key={edu.degree} edu={edu} index={i} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}