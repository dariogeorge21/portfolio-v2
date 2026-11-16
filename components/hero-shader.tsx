"use client"

import { useEffect, useRef } from "react"

const VERTEX_SHADER_SOURCE = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER_SOURCE = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
    dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p = p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

float random(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.12;

  vec2 mouseOffset = (u_mouse / u_resolution.xy - 0.5) * 0.25;
  vec2 pos = st + mouseOffset;

  // Organic warp layers
  float n1 = fbm(pos * 0.85 + vec2(t * 0.35, t * 0.18));
  float n2 = fbm(pos * 1.25 - vec2(t * 0.25, -t * 0.45) + vec2(n1 * 0.55));
  float n3 = fbm(pos * 0.65 + vec2(n2 * 0.75, t * 0.22));

  // Cosmic dark palette (#05070d base, deep navy, violet, and electric cyan)
  vec3 bg = vec3(0.0196, 0.0274, 0.051);       // #05070d
  vec3 deepBlue = vec3(0.043, 0.075, 0.165); // #0b132a
  vec3 subtleViolet = vec3(0.082, 0.047, 0.188);
  vec3 neonCyan = vec3(0.0, 0.85, 1.0);       // #00d9ff
  vec3 indigo = vec3(0.20, 0.28, 0.65);

  vec3 color = bg;
  color = mix(color, deepBlue, smoothstep(-0.35, 0.75, n1));
  color = mix(color, subtleViolet, smoothstep(0.05, 0.95, n2) * 0.65);
  color = mix(color, indigo, smoothstep(0.25, 0.95, n3) * 0.40);

  // Subtle electric cyan luminescence along wave crests
  float glow = smoothstep(0.55, 0.95, n1 * n2 + 0.25);
  color += neonCyan * glow * 0.18;

  // Radial vignette focusing attention on the center
  vec2 center = vUv - 0.5;
  float dist = length(center);
  color = mix(color, bg, smoothstep(0.18, 0.92, dist));

  // Fine tactile film grain
  float grain = (random(gl_FragCoord.xy + fract(u_time * 1.3)) - 0.5) * 0.024;
  color += vec3(grain);

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`

export function HeroShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null)

    if (!gl) return

    let animationFrameId = 0
    let isVisible = true

    // Compile Shader helper
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(VERTEX_SHADER_SOURCE, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(FRAGMENT_SHADER_SOURCE, gl.FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      return
    }

    gl.useProgram(program)

    // Full screen quad
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const positionLocation = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    const timeLocation = gl.getUniformLocation(program, "u_time")
    const mouseLocation = gl.getUniformLocation(program, "u_mouse")

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX
      mouse.targetY = window.innerHeight - e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    const resize = () => {
      const parent = canvas.parentElement
      const width = parent ? parent.clientWidth : window.innerWidth
      const height = parent ? parent.clientHeight : window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener("resize", resize, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    const startTime = performance.now()

    const render = () => {
      if (isVisible) {
        const currentTime = (performance.now() - startTime) / 1000

        // Smooth mouse lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.05
        mouse.y += (mouse.targetY - mouse.y) * 0.05

        gl.uniform1f(timeLocation, currentTime)
        gl.uniform2f(mouseLocation, mouse.x, mouse.y)

        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resize)
      observer.disconnect()

      if (positionBuffer) gl.deleteBuffer(positionBuffer)
      if (program) gl.deleteProgram(program)
      if (vertexShader) gl.deleteShader(vertexShader)
      if (fragmentShader) gl.deleteShader(fragmentShader)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  )
}
