import crypto from "crypto"
import { NextResponse } from "next/server"
import {
  createWorkspacePinCookieValue,
  getWorkspacePinCookieName,
} from "@/lib/workspace/pin-cookie"

type Body = { pin?: string }

function safeEqualString(a: string, b: string) {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

export async function POST(req: Request) {
  const correctPin = process.env.WORKSPACE_PIN
  const signingSecret = process.env.NEXTAUTH_SECRET

  if (!correctPin) {
    return NextResponse.json(
      { ok: false, error: "Server misconfigured." },
      { status: 500 },
    )
  }
  if (!signingSecret) {
    return NextResponse.json(
      { ok: false, error: "Missing NEXTAUTH_SECRET." },
      { status: 500 },
    )
  }

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 })
  }

  const pin = String(body.pin ?? "").trim()
  if (!/^[0-9]{4}$/.test(pin)) {
    return NextResponse.json({ ok: false, error: "Invalid PIN." }, { status: 400 })
  }

  if (!safeEqualString(pin, String(correctPin))) {
    return NextResponse.json({ ok: false, error: "Incorrect PIN." }, { status: 401 })
  }

  const maxAgeSeconds = 60 * 30
  const cookieValue = await createWorkspacePinCookieValue({ secret: signingSecret })

  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: getWorkspacePinCookieName(),
    value: cookieValue,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/workspace",
    maxAge: maxAgeSeconds,
  })

  return res
}
