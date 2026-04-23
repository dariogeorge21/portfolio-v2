import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Sora, Geist_Mono } from "next/font/google"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollProgress } from "@/components/scroll-progress"

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dario George — Developer · Computer Science",
  description:
    "The portfolio of Dario George. Developer and computer science student crafting refined digital products with engineering rigor and editorial taste.",
  generator: "v0.app",
  keywords: [
    "Dario George",
    "developer",
    "computer science",
    "portfolio",
    "full-stack",
    "software engineer",
    "TypeScript",
    "Next.js",
  ],
  authors: [{ name: "Dario George" }],
  openGraph: {
    title: "Dario George — Developer · Computer Science",
    description:
      "A luxury portfolio showcasing premium digital products, engineering, and design.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased selection:bg-neon selection:text-background">
        <ScrollProgress />
        <CustomCursor />
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
