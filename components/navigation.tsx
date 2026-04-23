"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("#work")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean,
    ) as Element[]
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/80 bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10"
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Dario George — home"
          >
            <span
              aria-hidden
              className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-strong/60 bg-surface transition-colors group-hover:border-neon/60"
            >
              <span className="absolute inset-0 rounded-full bg-neon/0 transition-colors group-hover:bg-neon/10" />
              <span className="font-display text-sm font-semibold tracking-tight">
                DG
              </span>
            </span>
            <span className="hidden font-display text-sm font-medium tracking-tight md:inline">
              Dario George
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative inline-flex h-10 items-center px-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        aria-hidden
                        className={[
                          "absolute -bottom-1 left-0 h-px origin-left bg-neon transition-transform duration-500",
                          isActive
                            ? "w-full scale-x-100"
                            : "w-full scale-x-0 group-hover:scale-x-100",
                        ].join(" ")}
                        style={{
                          boxShadow: isActive
                            ? "0 0 10px rgba(0,217,255,0.7)"
                            : undefined,
                        }}
                      />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full border border-border-strong/70 bg-surface/60 px-5 text-sm font-medium text-foreground backdrop-blur transition-all duration-500 hover:border-neon/70"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neon/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative flex items-center gap-2">
                Let&apos;s talk
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-neon animate-neon-pulse"
                />
              </span>
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong/60 bg-surface/60 text-foreground backdrop-blur md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4.5 w-4.5" size={18} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-border bg-surface p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-medium tracking-tight">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong/60 bg-surface-2 text-foreground"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <ul className="mt-12 flex flex-col gap-1">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 * i + 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between border-b border-border py-5 text-foreground"
                    >
                      <span className="font-display text-3xl font-light tracking-tight">
                        {link.label}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  Say hello
                </p>
                <a
                  href="mailto:hello@dariogeorge.dev"
                  className="mt-2 block font-display text-lg tracking-tight text-foreground"
                >
                  hello@dariogeorge.dev
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
