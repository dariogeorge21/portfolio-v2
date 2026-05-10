import { redirect } from "next/navigation"

import { getServerAuthSession } from "@/lib/auth/nextauth"
import { WorkspaceShell } from "@/components/workspace/shell"

export default async function WorkspaceCmsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerAuthSession()
  if (!session) redirect("/workspace/sign-in")

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-25" />
      <WorkspaceShell
        user={{
          username: (session.user as any)?.username ?? session.user?.name,
          role: (session.user as any)?.role,
        }}
      >
        {children}
      </WorkspaceShell>
    </div>
  )
}
