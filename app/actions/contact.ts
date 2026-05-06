"use server"

import { Resend } from "resend"

export type ContactSubmission = {
  name: string
  email: string
  message: string
  turnstileToken: string
}

type TurnstileVerifyResponse = {
  success: boolean
  "error-codes"?: string[]
}

export async function submitContact(input: ContactSubmission): Promise<
  | { ok: true }
  | {
      ok: false
      error: string
    }
> {
  const resendApiKey = process.env.RESEND_API_KEY
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY

  if (!resendApiKey) return { ok: false, error: "Missing RESEND_API_KEY." }
  if (!turnstileSecret) return { ok: false, error: "Missing TURNSTILE_SECRET_KEY." }

  const name = input.name?.trim() ?? ""
  const email = input.email?.trim() ?? ""
  const message = input.message?.trim() ?? ""
  const turnstileToken = input.turnstileToken?.trim() ?? ""

  if (!name) return { ok: false, error: "Name is required." }
  if (!email) return { ok: false, error: "Email is required." }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Invalid email address." }
  }
  if (!message || message.length < 10) {
    return { ok: false, error: "Message is too short." }
  }
  if (!turnstileToken) {
    return { ok: false, error: "Captcha token missing." }
  }

  const verifyBody = new URLSearchParams({
    secret: turnstileSecret,
    response: turnstileToken,
  })

  const verifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: verifyBody.toString(),
      cache: "no-store",
    },
  )

  if (!verifyRes.ok) {
    return { ok: false, error: "Captcha verification failed (network)." }
  }

  const verifyJson = (await verifyRes.json()) as TurnstileVerifyResponse
  if (!verifyJson.success) {
    return { ok: false, error: "Captcha verification failed." }
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "edu.dariogeorge21@gmail.com"
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Dario Portfolio <onboarding@resend.dev>"

  const resend = new Resend(resendApiKey)

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    })

    return { ok: true }
  } catch {
    return { ok: false, error: "Failed to send email." }
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}
