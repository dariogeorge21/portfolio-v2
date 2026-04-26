import { Activity } from "lucide-react"

async function getWakatimeStats() {
  const token = process.env.WAKATIME_API_KEY
  
  if (!token) return null

  try {
    // WakaTime endpoint for encoded API Key
    const res = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers: {
        Authorization: `Basic ${Buffer.from(token).toString('base64')}`
      },
      next: { revalidate: 3600 }
    })

    if (!res.ok) return null
    const data = await res.json()
    return data.data
  } catch (error) {
    return null
  }
}

export async function WakatimeWidget() {
  const stats = await getWakatimeStats()

  // Fallback data if no key or error
  const languages = stats?.languages?.slice(0, 5) || [
    { name: "TypeScript", percent: 35.2 },
    { name: "Markdown", percent: 32.1 },
    { name: "Other", percent: 21.4 },
    { name: "SQL", percent: 6.8 },
    { name: "JSON", percent: 3.5 },
  ]
  const totalTime = stats?.human_readable_total || "28 hrs 40 mins"

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Activity className="text-neon" size={24} />
          <h3 className="font-display text-xl tracking-tight">Weekly Activity</h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted bg-surface-2 border border-border px-3 py-1.5 rounded-full">
          {totalTime}
        </span>
      </div>

      <div className="space-y-6 flex-1 justify-center flex flex-col">
        {languages.map((lang: any) => (
          <div key={lang.name} className="group">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground">{lang.name}</span>
              <span className="font-mono text-[11px] text-muted">{lang.percent.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden border border-border/40">
              <div 
                className="h-full bg-gradient-to-r from-neon/60 to-neon rounded-full" 
                style={{ width: `${lang.percent}%`, boxShadow: "0 0 10px rgba(0,217,255,0.4)" }} 
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs text-muted text-center">Data powered by WakaTime</p>
    </div>
  )
}
