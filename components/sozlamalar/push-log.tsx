"use client"

import { useEffect, useState } from "react"

type LogItem = {
  id: string
  title: string | null
  body: string | null
  sent: number | null
  created_at: string
}

export default function PushLog() {
  const [logs, setLogs] = useState<LogItem[]>([])
  const [loading, setLoading] = useState(false)

  async function load() {
    try {
      setLoading(true)
      const res = await fetch("/api/push/logs", { method: "GET" })
      const j = await res.json().catch(() => [])
      if (Array.isArray(j)) setLogs(j)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="border rounded-xl p-3 bg-background/50">
      <div className="flex items-center justify-between">
        <div className="font-semibold">📌 Oxirgi pushlar</div>
        <button
          onClick={load}
          className="text-xs opacity-70 hover:opacity-100 underline"
          disabled={loading}
        >
          {loading ? "Yuklanmoqda..." : "Yangilash"}
        </button>
      </div>

      {logs.length === 0 ? (
        <div className="text-sm opacity-70 mt-2">Hali push yuborilmagan</div>
      ) : (
        <div className="mt-2 space-y-2">
          {logs.map((l) => (
            <div key={l.id} className="border rounded-lg p-2">
              <div className="text-sm font-medium">{l.title || "(title yo'q)"}</div>
              <div className="text-xs opacity-80 mt-0.5">{l.body || ""}</div>
              <div className="mt-1 flex justify-between text-xs opacity-70">
                <span>Yuborildi: {l.sent ?? 0}</span>
                <span>{new Date(l.created_at).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
