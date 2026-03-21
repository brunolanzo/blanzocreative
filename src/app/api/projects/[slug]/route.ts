import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

const DB_ERROR = NextResponse.json(
  { error: "Database not configured" },
  { status: 503 }
);

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const supabase = getServiceSupabase();
  if (!supabase) return DB_ERROR;

  const { slug } = await params;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase) return DB_ERROR;

  const { slug } = await params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("projects")
    .update({
      title: body.title,
      slug: body.slug,
      category: body.category,
      thumbnail: body.thumbnail,
      year: body.year,
      published: body.published,
      blocks: body.blocks,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase) return DB_ERROR;

  const { slug } = await params;
  const { error } = await supabase.from("projects").delete().eq("slug", slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
