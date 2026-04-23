"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

const EASE = [0.22, 1, 0.36, 1] as const

export function Footer() {
  return (
    <footer
      className="relative isolate overflow-hidden border-t border-border bg-background pt-24 pb-10"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              Signing off
            </p>
            <h3 className="mt-4 max-w-3xl font-display text-[12vw] font-extralight leading-[0.9] tracking-[-0.04em] text-foreground md:text-[96px] lg:text-[128px]">
              <span className="text-gradient">Until next</span>{" "}
              <span className="italic text-gradient-neon">commit.</span>
            </h3>
          </div>
          <a
            href="#top"
            className="group inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
            data-cursor="hover"
          >
            <span className="relative">
              Back to top
              <span
                aria-hidden
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100"
              />
            </span>
            <span
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong/60 bg-surface transition-all duration-500 group-hover:border-neon/60 group-hover:bg-neon/10"
            >
              <ArrowUp size={14} className="group-hover:text-neon" />
            </span>
          </a>
        </motion.div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 text-xs text-muted md:flex-row md:items-center">
          <p className="font-mono uppercase tracking-[0.25em]">
            © MMXXVI · Dario George
          </p>
          <p className="font-mono uppercase tracking-[0.25em]">
            Hand-built with <span className="text-neon">Next.js</span> · Hosted
            on <span className="text-foreground">Vercel</span>
          </p>
          <p className="font-mono uppercase tracking-[0.25em]">
            Available worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}
