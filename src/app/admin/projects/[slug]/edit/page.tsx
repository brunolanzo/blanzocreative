"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import BlockEditor from "@/components/admin/BlockEditor";
import type { Project, ProjectBlock } from "@/lib/types";

export default function EditProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchProject();
  }, [slug]);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/me");
    if (!res.ok) router.push("/admin");
  };

  const fetchProject = async () => {
    const res = await fetch(`/api/projects/${slug}`);
    if (res.ok) {
      const data = await res.json();
      // Ensure all blocks have ids
      const blocks = (data.blocks || []).map((b: ProjectBlock, i: number) => ({
        ...b,
        id: b.id || `block-${i}-${Date.now()}`,
      }));
      setProject({ ...data, blocks });
    } else {
      router.push("/admin/projects");
    }
    setLoading(false);
  };

  const save = useCallback(async (projectData: Project) => {
    setSaving(true);
    setSaved(false);
    await fetch(`/api/projects/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [slug]);

  const updateField = (field: keyof Project, value: string | boolean) => {
    if (!project) return;
    const updated = { ...project, [field]: value };
    setProject(updated);
  };

  const updateBlocks = (blocks: ProjectBlock[]) => {
    if (!project) return;
    setProject({ ...project, blocks });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/projects" className="flex items-center gap-2">
              <Logo size={24} className="text-black" />
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-bold uppercase tracking-tight truncate max-w-[200px]">
              {project.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs text-green-600 font-semibold">
                Saved
              </span>
            )}
            <Link
              href={`/projects/${project.slug}`}
              target="_blank"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-black transition-colors"
            >
              Preview
            </Link>
            <button
              onClick={() => save(project)}
              disabled={saving}
              className="bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar - Project Settings */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 p-5 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Project Settings
              </h2>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={project.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={project.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={project.year}
                  onChange={(e) => updateField("year", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Thumbnail
                </label>
                <ThumbnailUpload
                  value={project.thumbnail}
                  onChange={(url) => updateField("thumbnail", url)}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => updateField("published", !project.published)}
                  className={`relative w-10 h-6 rounded-full transition-colors ${
                    project.published ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      project.published ? "left-5" : "left-1"
                    }`}
                  />
                </button>
                <span className="text-xs font-semibold text-gray-500">
                  {project.published ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          </div>

          {/* Main - Block Editor */}
          <div>
            <BlockEditor blocks={project.blocks} onChange={updateBlocks} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ThumbnailUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();
      onChange(url);
    }
    setUploading(false);
  };

  return (
    <div>
      {value && (
        <div className="mb-2 aspect-video bg-gray-100 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <label className="block cursor-pointer text-center border border-dashed border-gray-300 py-2 text-xs text-gray-400 hover:border-black hover:text-black transition-colors">
        {uploading ? "Uploading..." : "Upload Thumbnail"}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
