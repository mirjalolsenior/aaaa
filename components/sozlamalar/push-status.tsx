"use client"

import { useEffect, useState } from "react"

export default function PushStatus() {
  const [permission, setPermission] = useState<string>("tekshirilmoqda...")
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    try {
      setToken(localStorage.getItem("fcm_token") || localStorage.getItem("push_token") || null)
    } catch {
      setToken(null)
    }

    if (!("Notification" in window)) {
      setPermission("Brauzer pushni qo'llamaydi ❌")
      return
    }

    if (Notification.permission === "granted") setPermission("Ruxsat berilgan ✅")
    else if (Notification.permission === "denied") setPermission("Ruxsat rad etilgan ❌")
    else setPermission("Ruxsat so'ralmagan ⚠️")
  }, [])

  return (
    <div className="border rounded-xl p-3 bg-background/50">
      <div className="font-semibold">Push holati</div>
      <div className="text-sm mt-1">Ruxsat: <b>{permission}</b></div>
      <div className="text-xs mt-2 opacity-80 break-all">Token: {token || "yo'q"}</div>
      {!token ? (
        <div className="text-xs mt-2 text-destructive">Token yo'q — test yuborishda push chiqmasligi mumkin.</div>
      ) : null}
    </div>
  )
}
