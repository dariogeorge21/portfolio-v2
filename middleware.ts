import { NextResponse, type NextRequest } from "next/server"
import {
  getWorkspacePinCookieName,
  verifyWorkspacePinCookieValue,
} from "@/lib/workspace/pin-cookie"

export async function middleware(req: NextRequest) {
  const signingSecret = process.env.NEXTAUTH_SECRET
  if (!signingSecret) {
    // Fail closed: workspace must not be accessible.
    const url = req.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  const cookieName = getWorkspacePinCookieName()
  const cookieValue = req.cookies.get(cookieName)?.value

  const verified = await verifyWorkspacePinCookieValue({
    secret: signingSecret,
    value: cookieValue,
    maxAgeMs: 30 * 60 * 1000,
  })

  if (!verified.ok) {
    const url = req.nextUrl.clone()
    url.pathname = "/"
    url.searchParams.set("workspace", "locked")
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/workspace/:path*"],
}
