"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/**
 * Premium custom cursor with an elegant tracking ring + dot.
 * Transforms on interactive elements. Hidden on touch devices.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.35 })
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.35 })

  const dotX = useSpring(x, { stiffness: 900, damping: 38, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 900, damping: 38, mass: 0.2 })

  useEffect(() => {
    // Only enable on fine pointer devices that don't prefer reduced motion
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!mq.matches || reduce.matches) return

    setEnabled(true)
    document.documentElement.classList.add("has-custom-cursor")

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (hidden) setHidden(false)
    }
    const handleLeave = () => setHidden(true)
    const handleEnter = () => setHidden(false)

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label[for], [data-cursor="hover"]'
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest(interactiveSelector)) setHovering(true)
    }
    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest(interactiveSelector)) setHovering(false)
    }

    window.addEventListener("mousemove", handleMove, { passive: true })
    window.addEventListener("mouseleave", handleLeave)
    window.addEventListener("mouseenter", handleEnter)
    window.addEventListener("mouseover", handleOver)
    window.addEventListener("mouseout", handleOut)

    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseleave", handleLeave)
      window.removeEventListener("mouseenter", handleEnter)
      window.removeEventListener("mouseover", handleOver)
      window.removeEventListener("mouseout", handleOut)
    }
  }, [x, y, hidden])

  if (!enabled) return null

  return (
    <>
      {/* Outer tracking ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80"
          animate={{
            width: hovering ? 52 : 28,
            height: hovering ? 52 : 28,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      </motion.div>
      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-neon"
          animate={{
            width: hovering ? 6 : 4,
            height: hovering ? 6 : 4,
            opacity: hidden ? 0 : 1,
            boxShadow: hovering
              ? "0 0 18px 4px rgba(0,217,255,0.65)"
              : "0 0 10px 2px rgba(0,217,255,0.4)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
      </motion.div>
    </>
  )
}
