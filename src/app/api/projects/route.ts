import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

const DB_ERROR = NextResponse.json(
  { error: "Database not configured" },
  { status: 503 }
);

export async function GET(req: NextRequest) {
  const supabase = getServiceSupabase();
  if (!supabase) return DB_ERROR;

  const session = await getSession();
  const showAll = req.nextUrl.searchParams.get("all") === "true" && session;

  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (!showAll) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase) return DB_ERROR;

  const body = await req.json();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      slug: body.slug,
      title: body.title,
      category: body.category || "",
      thumbnail: body.thumbnail || "",
      year: body.year || new Date().getFullYear().toString(),
      published: body.published ?? false,
      blocks: body.blocks || [],
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
