export type Project = {
  slug: string
  title: string
  subtitle: string
  year: string
  role: string
  category: "Product" | "AI" | "Web" | "Tooling"
  description: string
  longDescription: string
  tags: string[]
  image: string
  accent?: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "nebula",
    title: "Nebula Analytics",
    subtitle: "Real-time financial intelligence platform",
    year: "2025",
    role: "Founding engineer",
    category: "Product",
    description:
      "A sub-second, multi-tenant analytics layer built on streaming SQL with a gallery-grade dashboard.",
    longDescription:
      "Nebula is a real-time analytics surface for fintech operators. I designed the streaming ingestion pipeline, tenant-scoped query engine, and the product's motion language. The result: a p95 under 180ms across millions of events per day, with a UI that feels like a designed object rather than a dashboard.",
    tags: ["Next.js", "TypeScript", "ClickHouse", "tRPC", "Framer Motion"],
    image: "/project-nebula.jpg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    slug: "aurora",
    title: "Aurora",
    subtitle: "On-device retrieval for private knowledge",
    year: "2025",
    role: "Creator",
    category: "AI",
    description:
      "A privacy-first semantic search layer that runs locally — no server, no keys, no compromise.",
    longDescription:
      "Aurora indexes your documents on-device using quantized embeddings and a custom HNSW index compiled to WebAssembly. I focused on making the experience feel instantaneous and quiet — no loading states, no dashboards, just answers.",
    tags: ["Rust", "WebAssembly", "ONNX", "React", "IndexedDB"],
    image: "/project-aurora.jpg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    slug: "vertex",
    title: "Vertex",
    subtitle: "Mobile-first commerce toolkit",
    year: "2024",
    role: "Engineer · Designer",
    category: "Product",
    description:
      "A composable storefront kit with a motion system tuned for 120Hz displays.",
    longDescription:
      "Vertex is a commerce toolkit I built to solve my own frustration with heavyweight storefront frameworks. Every route is RSC-first, every interaction is measured in frames, and the checkout ships with built-in analytics and anti-fraud primitives.",
    tags: ["Next.js", "React Server Components", "Stripe", "Postgres"],
    image: "/project-vertex.jpg",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "helios",
    title: "Helios",
    subtitle: "Distributed simulation engine",
    year: "2024",
    role: "Research engineer",
    category: "AI",
    description:
      "A GPU-accelerated simulation harness for reinforcement learning agents.",
    longDescription:
      "Built during coursework and extended into a research prototype, Helios distributes environment rollouts across heterogeneous GPUs with a zero-copy transport layer. Paper draft in progress.",
    tags: ["Python", "CUDA", "PyTorch", "Ray"],
    image: "/project-helios.jpg",
    repoUrl: "#",
  },
  {
    slug: "obsidian",
    title: "Obsidian CLI",
    subtitle: "A developer toolchain, re-imagined",
    year: "2023",
    role: "Maintainer",
    category: "Tooling",
    description:
      "An opinionated CLI that replaces a dozen scripts with one elegant surface.",
    longDescription:
      "Obsidian wraps the handful of scripts every engineering team writes — formatters, migrators, release helpers — into a single composable CLI with a beautiful TUI. 3k+ stars, used in production at a handful of startups.",
    tags: ["Go", "Bubble Tea", "OpenTelemetry"],
    image: "/project-obsidian.jpg",
    repoUrl: "#",
  },
  {
    slug: "meridian",
    title: "Meridian",
    subtitle: "Editorial commerce for a luxury atelier",
    year: "2023",
    role: "Lead engineer",
    category: "Web",
    description:
      "A bespoke storefront and CMS for a boutique menswear label.",
    longDescription:
      "Commissioned work. I built a hand-crafted storefront with a motion system, a lightweight headless CMS, and an editorial template language that the client's team can author without engineering support.",
    tags: ["Next.js", "Sanity", "Shopify", "GSAP"],
    image: "/project-meridian.jpg",
    liveUrl: "#",
  },
]

export type SkillGroup = {
  label: string
  items: { name: string; level: number; note?: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", level: 95, note: "Daily driver · strict mode" },
      { name: "Python", level: 88, note: "ML + backend" },
      { name: "Rust", level: 72, note: "Systems + WASM" },
      { name: "Go", level: 68, note: "CLIs + services" },
      { name: "SQL", level: 90, note: "Postgres, ClickHouse" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "Next.js", level: 96 },
      { name: "React", level: 95 },
      { name: "Node.js", level: 90 },
      { name: "PyTorch", level: 78 },
      { name: "Three.js", level: 70 },
    ],
  },
  {
    label: "Platform",
    items: [
      { name: "AWS", level: 82 },
      { name: "Vercel", level: 92 },
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 70 },
      { name: "PostgreSQL", level: 88 },
    ],
  },
  {
    label: "Craft",
    items: [
      { name: "Motion Design", level: 88 },
      { name: "Design Systems", level: 90 },
      { name: "Performance", level: 92 },
      { name: "Accessibility", level: 84 },
    ],
  },
]

export type TimelineItem = {
  year: string
  title: string
  org: string
  description: string
  side: "left" | "right"
}

export const timeline: TimelineItem[] = [
  {
    year: "2025",
    title: "Founding Engineer",
    org: "Nebula Analytics",
    description:
      "Building the product from zero — streaming ingestion, query engine, and the motion system.",
    side: "left",
  },
  {
    year: "2024",
    title: "Research Engineer",
    org: "University CS Lab",
    description:
      "GPU-accelerated simulation for RL. First-author paper in submission.",
    side: "right",
  },
  {
    year: "2023",
    title: "Engineering Intern",
    org: "Fortune 500 · Platform team",
    description:
      "Shipped a developer tooling suite used by 400+ engineers internally.",
    side: "left",
  },
  {
    year: "2022",
    title: "Began CS Degree",
    org: "Top-10 program",
    description:
      "Focused on systems, machine learning, and human-computer interaction.",
    side: "right",
  },
]

export const stats = [
  { value: "40+", label: "Shipped projects" },
  { value: "3.9", label: "GPA · CS" },
  { value: "3k★", label: "OSS impact" },
  { value: "6", label: "Years writing code" },
]
