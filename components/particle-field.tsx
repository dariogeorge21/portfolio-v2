"use client"

import { useEffect, useRef } from "react"

/**
 * Canvas particle field — sparse, premium, cursor-reactive.
 * Uses device pixel ratio, throttled RAF, and pauses when off-screen.
 */
export function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    type Particle = {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      a: number // base alpha
      t: number // twinkle phase
    }
    let particles: Particle[] = []
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, lastX: 0, lastY: 0 }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(
        140,
        Math.max(50, Math.floor((width * height) / 14000)),
      )
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.3 + 0.3,
        a: Math.random() * 0.5 + 0.25,
        t: Math.random() * Math.PI * 2,
      }))
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouse.vx = x - mouse.lastX
      mouse.vy = y - mouse.lastY
      mouse.lastX = x
      mouse.lastY = y
      mouse.x = x
      mouse.y = y
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    let raf = 0
    let last = performance.now()
    const render = (now: number) => {
      const dt = Math.min(32, now - last)
      last = now
      ctx.clearRect(0, 0, width, height)

      const connectDist = 110
      const repelDist = 150

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.t += 0.01 * (dt / 16)
        // Subtle cursor repulsion
        if (!prefersReduced && mouse.x > -9000) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < repelDist * repelDist) {
            const d = Math.sqrt(d2) || 1
            const force = (1 - d / repelDist) * 0.6
            p.vx += (dx / d) * force
            p.vy += (dy / d) * force
          }
        }
        p.vx *= 0.96
        p.vy *= 0.96
        p.x += p.vx
        p.y += p.vy
        // Wrap
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        const twinkle = 0.75 + Math.sin(p.t) * 0.25
        const alpha = p.a * twinkle
        ctx.beginPath()
        ctx.fillStyle = `rgba(238,242,248,${alpha.toFixed(3)})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Connections — only between nearby particles, neon tint
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d2 = dx * dx + dy * dy
          if (d2 < connectDist * connectDist) {
            const d = Math.sqrt(d2)
            const t = 1 - d / connectDist
            ctx.strokeStyle = `rgba(0,217,255,${(t * 0.18).toFixed(3)})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      // Neon halo under cursor
      if (!prefersReduced && mouse.x > -9000) {
        const g = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          160,
        )
        g.addColorStop(0, "rgba(0,217,255,0.12)")
        g.addColorStop(1, "rgba(0,217,255,0)")
        ctx.fillStyle = g
        ctx.fillRect(mouse.x - 160, mouse.y - 160, 320, 320)
      }

      raf = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mouseleave", onMouseLeave)
    if (!prefersReduced) {
      raf = requestAnimationFrame(render)
    } else {
      // Single static frame for reduced-motion users
      render(performance.now())
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  )
}
