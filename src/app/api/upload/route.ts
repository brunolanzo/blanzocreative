import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

// Returns a signed upload URL so the browser can upload directly to Supabase
// This bypasses Vercel's 4.5MB body limit
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getServiceSupabase();
  if (!supabase)
    return NextResponse.json(
      { error: "Storage not configured" },
      { status: 503 }
    );

  const { fileName, contentType } = await req.json();

  if (!fileName) {
    return NextResponse.json(
      { error: "fileName is required" },
      { status: 400 }
    );
  }

  const timestamp = Date.now();
  const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = `projects/${timestamp}-${safeName}`;

  // Create a signed URL for direct upload (valid for 2 minutes)
  const { data, error } = await supabase.storage
    .from("media")
    .createSignedUploadUrl(filePath);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Also return the public URL for after upload completes
  const { data: urlData } = supabase.storage
    .from("media")
    .getPublicUrl(filePath);

  return NextResponse.json({
    signedUrl: data.signedUrl,
    token: data.token,
    path: filePath,
    publicUrl: urlData.publicUrl,
    contentType: contentType || "application/octet-stream",
  });
}
