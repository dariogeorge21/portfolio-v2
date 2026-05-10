const COOKIE_NAME = "pv2_workspace_pin"

export function getWorkspacePinCookieName() {
  return COOKIE_NAME
}

type VerifyResult =
  | { ok: true; verifiedAt: number }
  | { ok: false; reason: string }

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

function bytesToBase64Url(bytes: Uint8Array) {
  const base64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(bytes).toString("base64")
      : (() => {
          let binary = ""
          for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          return btoa(binary)
        })()
  return base64.replaceAll("+", "-").replaceAll("/", "_").replaceAll(/=+$/g, "")
}

async function hmacSha256Base64Url(params: { secret: string; payload: string }) {
  const webCrypto = globalThis.crypto
  if (!webCrypto?.subtle) throw new Error("WEBCRYPTO_UNAVAILABLE")

  const enc = new TextEncoder()
  const key = await webCrypto.subtle.importKey(
    "raw",
    enc.encode(params.secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const sig = await webCrypto.subtle.sign("HMAC", key, enc.encode(params.payload))
  return bytesToBase64Url(new Uint8Array(sig))
}

export async function createWorkspacePinCookieValue(params: {
  secret: string
  now?: number
}) {
  const verifiedAt = params.now ?? Date.now()
  const payload = String(verifiedAt)
  const sig = await hmacSha256Base64Url({ secret: params.secret, payload })
  return `${payload}.${sig}`
}

export async function verifyWorkspacePinCookieValue(params: {
  secret: string
  value: string | undefined
  maxAgeMs: number
  now?: number
}): Promise<VerifyResult> {
  const now = params.now ?? Date.now()
  const value = params.value
  if (!value) return { ok: false, reason: "missing" }

  const [payload, sig] = value.split(".")
  if (!payload || !sig) return { ok: false, reason: "malformed" }

  let expectedSig: string
  try {
    expectedSig = await hmacSha256Base64Url({ secret: params.secret, payload })
  } catch {
    return { ok: false, reason: "misconfigured" }
  }

  if (!constantTimeEqual(expectedSig, sig)) {
    return { ok: false, reason: "invalid_signature" }
  }

  const verifiedAt = Number(payload)
  if (!Number.isFinite(verifiedAt)) return { ok: false, reason: "bad_timestamp" }

  if (verifiedAt > now + 10_000) return { ok: false, reason: "future" }
  if (now - verifiedAt > params.maxAgeMs) return { ok: false, reason: "expired" }

  return { ok: true, verifiedAt }
}
