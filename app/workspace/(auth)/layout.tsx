export default function WorkspaceAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neon/5 via-transparent to-transparent" />
      <div className="relative w-full">{children}</div>
    </div>
  )
}
