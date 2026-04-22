"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/**
 * Minimalist neon scroll-progress indicator pinned to the top.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.2,
  })

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-neon"
      style={{
        scaleX: width,
        boxShadow: "0 0 12px 0 rgba(0,217,255,0.6)",
      }}
    />
  )
}
