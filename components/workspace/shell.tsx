"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Menu, Search } from "lucide-react"

import { WORKSPACE_NAV } from "@/components/workspace/nav"
import { ThemeToggle } from "@/components/workspace/theme-toggle"
import {
  WorkspaceCommandPalette,
  openWorkspaceCommandPalette,
} from "@/components/workspace/command-palette"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function WorkspaceShell({
  user,
  children,
}: {
  user: { username?: string | null; role?: string | null }
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const Nav = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="space-y-1">
      {WORKSPACE_NAV.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={[
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-surface-2 text-foreground"
                : "text-muted-foreground hover:bg-surface-2/60 hover:text-foreground",
            ].join(" ")}
          >
            <item.icon
              className={[
                "h-4 w-4 transition-colors",
                active ? "text-neon" : "text-muted-foreground group-hover:text-foreground",
              ].join(" ")}
            />
            <span className="font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen">
      <WorkspaceCommandPalette />

      <div className="mx-auto grid max-w-9xl grid-cols-1 gap-0 px-4 py-6 md:grid-cols-[280px_1fr] md:px-8">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] self-start md:block">
          <div className="glass-strong h-full rounded-2xl border border-border/50 p-4">
            <div className="mb-4 px-2">
              <p className="font-display text-sm font-medium tracking-tight">
                Workspace
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Content Management Panel
              </p>
            </div>
            <Nav />
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0">
          <header className="sticky top-0 z-30 mb-6">
            <div className="glass-strong rounded-2xl border border-border/50 px-3 py-3 md:px-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label="Open navigation"
                      >
                        <Menu className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-surface">
                      <div className="mb-4">
                        <p className="font-display text-lg font-semibold tracking-tight">
                          Workspace
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Navigate sections
                        </p>
                      </div>
                      <Nav onNavigate={() => router.refresh()} />
                    </SheetContent>
                  </Sheet>

                  <Button
                    type="button"
                    variant="secondary"
                    className="gap-2"
                    onClick={() => openWorkspaceCommandPalette()}
                  >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                    <span className="ml-2 hidden rounded-md border border-border/60 px-2 py-0.5 text-xs text-muted-foreground sm:inline">
                      Ctrl K
                    </span>
                  </Button>
                </div>

                <div className="flex items-center gap-1">
                  <ThemeToggle />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="ghost" className="px-3">
                        <span className="text-sm font-medium">
                          {user.username ?? "User"}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {user.username ?? "Workspace user"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Role: {user.role ?? "admin"}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          router.push("/")
                        }}
                      >
                        Back to site
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={async () => {
                          await signOut({ redirect: false })
                          router.push("/workspace/sign-in")
                          router.refresh()
                        }}
                      >
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
