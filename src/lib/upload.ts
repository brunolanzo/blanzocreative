/**
 * Upload a file directly to Supabase Storage via signed URL.
 * This bypasses Vercel's 4.5MB body size limit.
 *
 * Flow:
 * 1. Ask our API for a signed upload URL
 * 2. PUT the file directly to Supabase from the browser
 * 3. Return the public URL
 */
export async function uploadFile(
  file: File,
  onProgress?: (msg: string) => void
): Promise<string> {
  const sizeMB = file.size / (1024 * 1024);

  if (sizeMB > 50) {
    throw new Error(`File too large (${sizeMB.toFixed(1)}MB). Max: 50MB.`);
  }

  onProgress?.(`Getting upload URL...`);

  // Step 1: Get signed URL from our API
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Upload init failed (${res.status})`);
  }

  const { signedUrl, publicUrl } = await res.json();

  // Step 2: Upload file directly to Supabase
  onProgress?.(`Uploading ${sizeMB.toFixed(1)}MB...`);

  const uploadRes = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!uploadRes.ok) {
    const text = await uploadRes.text().catch(() => "");
    throw new Error(`Upload failed (${uploadRes.status}): ${text}`);
  }

  return publicUrl;
}
