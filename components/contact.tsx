"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Check, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { useState } from "react"
import { SectionHeading } from "./section-heading"

const EASE = [0.22, 1, 0.36, 1] as const

const SOCIALS = [
  {
    label: "Email",
    handle: "hello@dariogeorge.dev",
    href: "mailto:hello@dariogeorge.dev",
    icon: Mail,
  },
  {
    label: "GitHub",
    handle: "@dariogeorge",
    href: "https://github.com",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "in/dariogeorge",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    label: "X",
    handle: "@dariogeorge",
    href: "https://x.com",
    icon: Twitter,
  },
]

type FormState = {
  name: string
  email: string
  message: string
}
type FormErrors = Partial<Record<keyof FormState, string>>

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [focused, setFocused] = useState<keyof FormState | null>(null)
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")

  function validate(values: FormState) {
    const e: FormErrors = {}
    if (!values.name.trim()) e.name = "Your name is required."
    if (!values.email.trim()) e.email = "Your email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "That email doesn’t look quite right."
    if (!values.message.trim() || values.message.trim().length < 10)
      e.message = "Tell me a little more (10+ characters)."
    return e
  }

  function handleChange<K extends keyof FormState>(key: K, value: string) {
    const next = { ...form, [key]: value }
    setForm(next)
    if (errors[key]) {
      const nextErrors = validate(next)
      setErrors(nextErrors)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setStatus("submitting")
    // Simulated submit — replace with server action / route handler
    await new Promise((r) => setTimeout(r, 900))
    setStatus("success")
  }

  return (
    <section
      id="contact"
      className="relative isolate border-t border-border py-28 md:py-40"
      aria-label="Contact"
    >
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-20 bottom-0 h-[500px] w-[500px] rounded-full bg-neon/[0.06] blur-[140px]" />
        <div className="absolute inset-0 bg-dots opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Contact · 04"
          title={
            <>
              Building something
              <br />
              <span className="italic text-muted">worth making? Let&apos;s talk.</span>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
          {/* Left: contact methods */}
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              Direct channels
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {SOCIALS.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                >
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface/70 px-5 py-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-neon/40"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        aria-hidden
                        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong/60 bg-surface-2 text-foreground transition-all duration-500 group-hover:border-neon/60 group-hover:bg-neon/10"
                      >
                        <s.icon
                          size={16}
                          className="transition-colors duration-500 group-hover:text-neon"
                        />
                      </span>
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                          {s.label}
                        </span>
                        <span className="mt-1 block text-sm text-foreground">
                          {s.handle}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-8 rounded-xl border border-border bg-surface/70 p-5"
            >
              <p className="flex items-center gap-2 text-sm text-foreground">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full bg-neon animate-neon-pulse"
                />
                Open to select engagements — Q2 2026.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Founding engineering roles, R&amp;D collaborations, and
                invite-only client work. Typical reply within 24 hours.
              </p>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="md:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 md:p-10">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex min-h-[360px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 14,
                        delay: 0.1,
                      }}
                      className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-neon/40 bg-neon/10 text-neon glow-neon-sm"
                    >
                      <Check size={22} strokeWidth={2.5} />
                    </motion.span>
                    <h3 className="mt-6 font-display text-3xl font-light tracking-tight">
                      Message received.
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      Thanks for reaching out, {form.name || "friend"}. I&apos;ll
                      respond from{" "}
                      <span className="text-foreground">
                        hello@dariogeorge.dev
                      </span>{" "}
                      within a day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle")
                        setForm({ name: "", email: "", message: "" })
                      }}
                      className="mt-8 inline-flex h-10 items-center gap-2 rounded-full border border-border-strong/70 bg-surface-2 px-5 text-sm text-foreground transition-colors hover:border-neon/60"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Field
                        label="Name"
                        htmlFor="name"
                        error={errors.name}
                        focused={focused === "name"}
                      >
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          placeholder="Your name"
                          className="w-full bg-transparent py-3 text-[15px] text-foreground outline-none placeholder:text-muted-2"
                        />
                      </Field>
                      <Field
                        label="Email"
                        htmlFor="email"
                        error={errors.email}
                        focused={focused === "email"}
                      >
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          placeholder="you@company.com"
                          className="w-full bg-transparent py-3 text-[15px] text-foreground outline-none placeholder:text-muted-2"
                        />
                      </Field>
                    </div>
                    <Field
                      label="Message"
                      htmlFor="message"
                      error={errors.message}
                      focused={focused === "message"}
                    >
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        placeholder="What are you building?"
                        className="w-full resize-none bg-transparent py-3 text-[15px] leading-relaxed text-foreground outline-none placeholder:text-muted-2"
                      />
                    </Field>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-muted">
                        Encrypted in transit · never shared.
                      </p>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full border border-neon/50 bg-neon/[0.08] px-6 text-sm font-medium text-foreground transition-all duration-500 hover:border-neon hover:bg-neon/15 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neon/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                        />
                        <span className="relative">
                          {status === "submitting" ? "Sending…" : "Send message"}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="relative transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  error,
  focused,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  focused?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        {label}
      </label>
      <div className="relative">
        {children}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 block h-px bg-border"
        />
        <motion.span
          aria-hidden
          initial={false}
          animate={{
            scaleX: focused || error ? 1 : 0,
            backgroundColor: error
              ? "rgb(255 77 109)"
              : "rgb(0 217 255)",
          }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute inset-x-0 bottom-0 block h-px origin-left"
          style={{
            boxShadow: !error
              ? "0 0 10px rgba(0,217,255,0.6)"
              : "0 0 10px rgba(255,77,109,0.5)",
          }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-xs text-[#ff4d6d]"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
