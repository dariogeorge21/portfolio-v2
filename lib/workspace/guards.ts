import { cookies } from "next/headers"
import { getServerAuthSession } from "@/lib/auth/nextauth"
import {
  getWorkspacePinCookieName,
  verifyWorkspacePinCookieValue,
} from "@/lib/workspace/pin-cookie"

export async function requireWorkspaceSession() {
  const session = await getServerAuthSession()
  if (!session) throw new Error("UNAUTHENTICATED")
  return session
}

export async function requireWorkspacePinCookie() {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error("MISCONFIGURED")

  const cookieName = getWorkspacePinCookieName()
  const cookieValue = cookies().get(cookieName)?.value

  const verified = await verifyWorkspacePinCookieValue({
    secret,
    value: cookieValue,
    maxAgeMs: 30 * 60 * 1000,
  })

  return verified
}

export async function assertWorkspaceAccess() {
  const verified = await requireWorkspacePinCookie()
  if (!verified.ok) throw new Error("PIN_REQUIRED")
  const session = await requireWorkspaceSession()
  return session
}
