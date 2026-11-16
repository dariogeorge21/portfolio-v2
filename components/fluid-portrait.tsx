"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * FLUID_CONFIG
 * Tweakable timing, physics, refraction and optical parameters.
 */
export const FLUID_CONFIG = {
  holdDelay: 0.8,         // Seconds to hold full fluid before drain begins
  drainDuration: 5.5,     // Seconds for the fluid level to drain top to bottom
  residueDuration: 3.0,   // Seconds for lingering droplets/film to evaporate
  blurMax: 0.024,         // Max depth blur in UV space (~16px equivalent)
  ior: 1.38,              // Refractive index for water in glass
  tint: [0.0, 0.85, 1.0], // Faint cool cyan attenuation tint (normalized RGB)
  waveAmp: 0.018,         // Meniscus wave undulation amplitude
}

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uImageResolution;
uniform float uTime;
uniform float uFluidLevel;
uniform float uResidueLevel;
uniform float uResidueAlpha;
uniform float uMotion;
uniform float uLightSweep;
uniform float uBlurMax;
uniform float uIor;
uniform vec3 uTint;
uniform float uWaveAmp;

varying vec2 vUv;

// --- Simplex Noise 2D ---
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
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Aspect ratio cover UV calculation
vec2 getCoverUv(vec2 uv, vec2 canvasRes, vec2 imgRes) {
  float cAspect = canvasRes.x / max(canvasRes.y, 1.0);
  float iAspect = imgRes.x / max(imgRes.y, 1.0);
  vec2 nUv = uv;
  if (cAspect > iAspect) {
    float s = cAspect / iAspect;
    nUv.y = (uv.y - 0.5) * s + 0.5;
  } else {
    float s = iAspect / cAspect;
    nUv.x = (uv.x - 0.5) * s + 0.5;
  }
  return clamp(nUv, 0.0, 1.0);
}

// 12-tap Poisson/Golden-angle spiral depth blur
vec4 sampleBlurred(sampler2D tex, vec2 uv, float radius) {
  if (radius <= 0.0006) {
    return texture2D(tex, vec2(uv.x, 1.0 - uv.y));
  }
  vec4 col = vec4(0.0);
  float total = 0.0;
  const int TAPS = 12;
  for (int i = 0; i < TAPS; i++) {
    float angle = float(i) * 2.39996323; // Golden angle
    float r = sqrt(float(i + 1) / float(TAPS)) * radius;
    vec2 offset = vec2(cos(angle), sin(angle)) * r;
    vec2 sUv = clamp(uv + offset, 0.001, 0.999);
    float weight = 1.0 - (r / max(radius, 0.001)) * 0.45;
    col += texture2D(tex, vec2(sUv.x, 1.0 - sUv.y)) * weight;
    total += weight;
  }
  return col / total;
}

void main() {
  vec2 uv = vUv;
  vec2 baseUv = getCoverUv(uv, uResolution, uImageResolution);

  // If fluid is fully drained and residue evaporated, render transparent
  if (uFluidLevel <= -0.04 && uResidueAlpha <= 0.002) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // --- Live Meniscus Wave Calculation ---
  float waveTime = uTime * (1.8 + uMotion * 2.2);
  float effectiveAmp = uWaveAmp * (1.0 + uMotion * 1.6);
  float wave = sin(uv.x * 12.0 + waveTime) * effectiveAmp
             + cos(uv.x * 23.0 - waveTime * 1.2) * (effectiveAmp * 0.35)
             + sin(uv.x * 37.0 + waveTime * 0.7) * (effectiveAmp * 0.15);

  float tilt = sin(uTime * 1.2) * 0.006 * (1.0 + uMotion * 2.0);
  wave += (uv.x - 0.5) * tilt;

  float meniscusY = uFluidLevel + wave;

  bool isUnderFluid = uv.y < meniscusY;
  float distToMeniscus = abs(uv.y - meniscusY);

  // --- Fluid Refraction & Motion ---
  float noiseSpeed = 0.32 + uMotion * 0.9;
  vec2 noiseCoord = uv * 5.0 + vec2(0.0, uTime * noiseSpeed);
  vec2 flow = vec2(
    snoise(noiseCoord),
    snoise(noiseCoord + vec2(43.7, 19.3))
  );

  float refrStrength = (0.015 + uMotion * 0.022) * (uIor - 1.0) / 0.38;
  vec2 fluidDisplacement = flow * refrStrength;

  // Depth-aware blur
  float depth = clamp((meniscusY - uv.y) / 0.35, 0.0, 1.0);
  float blurRadius = isUnderFluid ? (uBlurMax * (0.25 + 0.75 * depth)) : 0.0;

  // --- Lingering Wet Residue / Film Above Meniscus ---
  float residueMask = 0.0;
  vec2 residueDisplacement = vec2(0.0);
  float residueBlur = 0.0;

  if (!isUnderFluid && uv.y <= uResidueLevel && uResidueAlpha > 0.005) {
    float dropletNoise = snoise(uv * 46.0 + vec2(0.0, -uTime * 0.08));
    float streakNoise = snoise(vec2(uv.x * 62.0, uv.y * 12.0 - uTime * 0.18));
    
    float drops = smoothstep(0.66, 0.84, dropletNoise);
    float streaks = smoothstep(0.70, 0.88, streakNoise) * 0.5;

    float rowFade = clamp((uResidueLevel - uv.y) * 4.0, 0.0, 1.0);
    residueMask = (drops + streaks) * uResidueAlpha * rowFade;

    residueDisplacement = vec2(
      snoise(uv * 68.0),
      snoise(uv * 68.0 + 31.4)
    ) * 0.007 * residueMask;

    residueBlur = 0.003 * residueMask;
  }

  // --- Sample Texture with Chromatic Aberration ---
  vec2 totalDisplacement = isUnderFluid ? fluidDisplacement : residueDisplacement;
  float totalBlur = isUnderFluid ? blurRadius : residueBlur;

  vec2 uvR = clamp(baseUv + totalDisplacement * 1.05, 0.001, 0.999);
  vec2 uvG = clamp(baseUv + totalDisplacement * 1.00, 0.001, 0.999);
  vec2 uvB = clamp(baseUv + totalDisplacement * 0.95, 0.001, 0.999);

  float colR = sampleBlurred(uTexture, uvR, totalBlur).r;
  float colG = sampleBlurred(uTexture, uvG, totalBlur).g;
  float colB = sampleBlurred(uTexture, uvB, totalBlur).b;

  vec3 finalColor = vec3(colR, colG, colB);
  float finalAlpha = 0.0;

  if (isUnderFluid) {
    finalAlpha = 1.0;

    // Translucent cool cyan fluid tint & attenuation
    vec3 fluidTint = mix(vec3(1.0), uTint, 0.14 + depth * 0.12);
    finalColor *= fluidTint;
    finalColor += uTint * (0.018 + depth * 0.032);

    // Caustic shimmer
    float caustic = pow(snoise(uv * 18.0 + uTime * 0.6) * 0.5 + 0.5, 3.2) * 0.075 * depth;
    finalColor += vec3(caustic);

    // Micro-bubbles rising slowly inside fluid
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float bx = fract(0.24 + fi * 0.33 + sin(uTime * 0.2 + fi) * 0.035);
      float by = fract(0.12 + fi * 0.34 + uTime * (0.035 + fi * 0.014));
      if (by < meniscusY) {
        float bDist = length((uv - vec2(bx, by)) * vec2(1.0, uResolution.y / uResolution.x));
        float bubble = smoothstep(0.009, 0.004, bDist) * 0.20;
        finalColor += vec3(bubble);
      }
    }

    // Meniscus surface highlight
    float meniscusHighlight = smoothstep(0.014, 0.0, distToMeniscus);
    finalColor += vec3(0.7, 0.95, 1.0) * meniscusHighlight * 0.62;
  } else if (residueMask > 0.01) {
    // Wet residue layer blending over the clear photo underneath
    finalAlpha = residueMask * 0.85;

    float dropGlint = pow(max(0.0, snoise(uv * 48.0 + 12.0)), 4.0) * residueMask * 0.38;
    finalColor += vec3(0.6, 0.92, 1.0) * dropGlint;
  }

  // --- Glass Tank Edge Highlights & Specular Sweep ---
  float edgeDistX = min(uv.x, 1.0 - uv.x);
  float edgeDistY = min(uv.y, 1.0 - uv.y);
  float innerRim = smoothstep(0.022, 0.002, min(edgeDistX, edgeDistY)) * 0.14;

  float topLip = smoothstep(0.96, 1.0, uv.y) * 0.09;

  float sweepLine = fract(uLightSweep + uv.x * 0.5 - uv.y * 0.3);
  float lightSweep = smoothstep(0.0, 0.1, sweepLine) * smoothstep(0.2, 0.1, sweepLine) * 0.12;

  if (finalAlpha > 0.0) {
    finalColor += vec3(innerRim + topLip + lightSweep);
  }

  gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), finalAlpha);
}
`

interface FluidPortraitProps {
  imageSrc: string
  className?: string
  cardRef?: React.RefObject<HTMLDivElement | null>
}

export function FluidPortrait({
  imageSrc,
  className = "",
  cardRef,
}: FluidPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spillCanvasRef = useRef<HTMLCanvasElement>(null)

  const [hasWebGL, setHasWebGL] = useState(true)
  const [isDraining, setIsDraining] = useState(false)
  const [isDrained, setIsDrained] = useState(false)
  const [spillOpacity, setSpillOpacity] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsDrained(true)
      return
    }

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // 2. WebGL support test
    let glTest: WebGLRenderingContext | null = null
    try {
      glTest =
        canvas.getContext("webgl") ||
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null)
    } catch {
      glTest = null
    }

    if (!glTest) {
      setHasWebGL(false)
      return
    }

    // 3. Three.js Scene Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // Uniforms
    const uniforms = {
      uTexture: { value: new THREE.Texture() },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageResolution: { value: new THREE.Vector2(4, 5) },
      uTime: { value: 0 },
      uFluidLevel: { value: 1.0 },       // Starts 100% full
      uResidueLevel: { value: 1.0 },
      uResidueAlpha: { value: 1.0 },
      uMotion: { value: 0.0 },
      uLightSweep: { value: 0.0 },
      uBlurMax: { value: FLUID_CONFIG.blurMax },
      uIor: { value: FLUID_CONFIG.ior },
      uTint: { value: new THREE.Vector3(...FLUID_CONFIG.tint) },
      uWaveAmp: { value: FLUID_CONFIG.waveAmp },
    }

    // Texture loader with CORS & complete callback
    const loader = new THREE.TextureLoader()
    loader.load(
      imageSrc,
      (tex) => {
        tex.minFilter = THREE.LinearFilter
        tex.magFilter = THREE.LinearFilter
        tex.generateMipmaps = false
        uniforms.uTexture.value = tex
        if (tex.image) {
          uniforms.uImageResolution.value.set(
            tex.image.naturalWidth || tex.image.width || 4,
            tex.image.naturalHeight || tex.image.height || 5
          )
        }
      },
      undefined,
      () => {
        // Fallback texture if failed
      }
    )

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Resize handler
    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      renderer.setSize(w, h, false)
      uniforms.uResolution.value.set(w * dpr, h * dpr)
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    // Scroll motion excitation
    let targetMotion = 0
    let currentMotion = 0

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity() || 0) / 1200
        targetMotion = Math.min(1.0, targetMotion + vel * 0.45)
      },
    })

    type SpillDrop = {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      alpha: number
    }
    let spillDrops: SpillDrop[] = []
    let isSpillActive = false

    // GSAP Drain Timeline triggered at ~35% viewport threshold
    let sequenceTriggered = false
    const drainTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top 65%",
      once: true,
      onEnter: () => {
        if (sequenceTriggered) return
        sequenceTriggered = true
        setIsDraining(true)

        const tl = gsap.timeline({
          delay: FLUID_CONFIG.holdDelay,
        })

        // 1. Drain fluid from 1.0 down to -0.05
        tl.to(
          uniforms.uFluidLevel,
          {
            value: -0.05,
            duration: FLUID_CONFIG.drainDuration,
            ease: "power2.inOut",
          },
          0
        )

        // 2. Residue level trails slightly behind
        tl.to(
          uniforms.uResidueLevel,
          {
            value: -0.05,
            duration: FLUID_CONFIG.drainDuration + 0.6,
            ease: "power2.inOut",
          },
          0.3
        )

        // 3. Card soft 3D perspective tilt near the end
        if (cardRef?.current) {
          tl.to(
            cardRef.current,
            {
              rotateX: 1.4,
              rotateY: -0.8,
              duration: 1.4,
              ease: "power1.inOut",
              yoyo: true,
              repeat: 1,
            },
            FLUID_CONFIG.drainDuration - 1.6
          )
        }

        // 4. Spill trigger near bottom edge
        tl.add(() => {
          isSpillActive = true
          gsap.to(
            {},
            {
              duration: 2.4,
              onUpdate: function () {
                setSpillOpacity(1.0 - this.progress())
              },
              onComplete: () => {
                isSpillActive = false
              },
            }
          )
        }, FLUID_CONFIG.drainDuration - 1.4)

        // 5. Evaporate residue droplets to fully clear
        tl.to(
          uniforms.uResidueAlpha,
          {
            value: 0.0,
            duration: FLUID_CONFIG.residueDuration,
            ease: "power2.inOut",
          },
          FLUID_CONFIG.drainDuration + 0.5
        )

        // 6. Light sweep beam across glass
        tl.to(
          uniforms.uLightSweep,
          {
            value: 1.0,
            duration: 3.5,
            ease: "power1.inOut",
          },
          0.6
        )

        // Mark as fully drained and completed
        tl.add(() => {
          setIsDrained(true)
        }, "+=0.4")
      },
    })

    // Animation Loop with Visibility Pause
    let isVisible = true
    let animationId = 0
    const clock = new THREE.Clock()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    const animateLoop = () => {
      animationId = requestAnimationFrame(animateLoop)

      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()
      uniforms.uTime.value = elapsedTime

      // Smooth motion damping
      currentMotion += (targetMotion - currentMotion) * 0.08
      targetMotion *= 0.94
      uniforms.uMotion.value = currentMotion

      renderer.render(scene, camera)

      // Animate secondary spill droplets if active
      if (isSpillActive && spillCanvasRef.current) {
        const spillCanvas = spillCanvasRef.current
        const spillCtx = spillCanvas.getContext("2d")
        if (spillCtx) {
          const sw = spillCanvas.width
          const sh = spillCanvas.height
          spillCtx.clearRect(0, 0, sw, sh)

          // Spawn droplets
          if (Math.random() < 0.35 && spillDrops.length < 18) {
            spillDrops.push({
              x: (0.3 + Math.random() * 0.4) * sw,
              y: 0,
              vx: (Math.random() - 0.5) * 0.8,
              vy: 1.2 + Math.random() * 1.8,
              r: 1.5 + Math.random() * 2.5,
              alpha: 0.65,
            })
          }

          // Draw spill drops
          spillCtx.fillStyle = "rgba(0, 217, 255, 0.45)"
          spillCtx.shadowColor = "rgba(0, 217, 255, 0.6)"
          spillCtx.shadowBlur = 8

          for (let i = spillDrops.length - 1; i >= 0; i--) {
            const d = spillDrops[i]
            d.y += d.vy
            d.x += d.vx
            d.vy += 0.09 // gravity
            d.alpha -= 0.014

            if (d.y > sh || d.alpha <= 0) {
              spillDrops.splice(i, 1)
              continue
            }

            spillCtx.beginPath()
            spillCtx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
            spillCtx.fill()
          }
        }
      }
    }

    animateLoop()

    // Cleanup & Destroy method
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
      scrollTrigger.kill()
      drainTrigger.kill()

      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (uniforms.uTexture.value) {
        uniforms.uTexture.value.dispose()
      }
    }
  }, [imageSrc, cardRef])

  // CSS Fallback if WebGL is unavailable
  if (!hasWebGL) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 z-10 transition-all duration-1000 ${
          isDrained ? "opacity-0" : "opacity-100 backdrop-blur-md"
        } ${className}`}
      />
    )
  }

  const spillElement = (
    <div
      className="pointer-events-none absolute -bottom-14 left-1/2 -translate-x-1/2 w-64 h-20 -z-10 overflow-hidden"
      style={{ opacity: spillOpacity }}
      aria-hidden
    >
      <canvas
        ref={spillCanvasRef}
        width={320}
        height={80}
        className="h-full w-full"
      />
    </div>
  )

  return (
    <>
      <div
        ref={containerRef}
        className={`pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit] ${className}`}
        aria-hidden
      >
        {/* Three.js Fluid WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className={`h-full w-full rounded-[inherit] transition-opacity duration-700 ${
            isDrained ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Overflow Spill Stream Canvas (escapes clipped container boundary to trail gracefully past bottom lip) */}
      {isMounted && cardRef?.current
        ? createPortal(spillElement, cardRef.current)
        : spillElement}
    </>
  )
}
