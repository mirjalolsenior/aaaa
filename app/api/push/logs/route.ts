import { NextResponse } from "next/server"
import { createSupabaseAdmin } from "../_supabaseAdmin"

export const runtime = "nodejs"

export async function GET() {
  const supabase = createSupabaseAdmin()
  const { data, error } = await supabase
    .from("push_logs")
    .select("id,title,body,sent,created_at")
    .order("created_at", { ascending: false })
    .limit(10)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data || [])
}
