"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import type { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchProjects();
  }, []);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/me");
    if (!res.ok) router.push("/admin");
  };

  const fetchProjects = async () => {
    const res = await fetch("/api/projects?all=true");
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
    setLoading(false);
  };

  const createProject = async () => {
    if (!newTitle.trim()) return;
    const slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        slug,
        category: "",
        year: new Date().getFullYear().toString(),
        blocks: [],
      }),
    });

    if (res.ok) {
      const project = await res.json();
      router.push(`/admin/projects/${project.slug}/edit`);
    }
  };

  const deleteProject = async (slug: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${slug}`, { method: "DELETE" });
    fetchProjects();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <Logo size={28} className="text-black" />
          <h1 className="text-lg font-black uppercase tracking-tight">
            Projects
          </h1>
        </div>
        <div className="flex gap-3">
          <Link
            href="/"
            className="text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-black transition-colors"
          >
            View Site
          </Link>
          <button
            onClick={() => setShowNew(true)}
            className="bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            New Project
          </button>
        </div>
      </div>

      {/* New Project Modal */}
      {showNew && (
        <div className="mb-8 bg-white border border-gray-200 p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4">
            New Project
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Project title"
              className="flex-1 border-b-2 border-gray-200 py-2 text-base font-medium focus:border-black outline-none bg-transparent"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && createProject()}
            />
            <button
              onClick={createProject}
              className="bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowNew(false);
                setNewTitle("");
              }}
              className="text-gray-400 hover:text-black px-3 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects List */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-sm">No projects yet</p>
          <button
            onClick={() => setShowNew(true)}
            className="mt-4 text-sm font-bold uppercase tracking-wider hover:text-gray-500 border-b-2 border-black pb-1"
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-white border border-gray-200 px-6 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    project.published ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {project.category || "No category"} &middot; {project.year}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/admin/projects/${project.slug}/edit`}
                  className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProject(project.slug)}
                  className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
