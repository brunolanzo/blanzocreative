import { getServiceSupabase } from "./supabase";
import type { Project } from "./types";

const fallbackProjects: Project[] = [
  {
    slug: "sample-project",
    title: "Sample Project",
    category: "Branding",
    thumbnail: "",
    year: "2025",
    published: true,
    blocks: [
      { id: "1", type: "title", content: "Sample Project" },
      { id: "2", type: "description", content: "Set up Supabase and create projects through the admin panel at /admin." },
    ],
  },
];

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = getServiceSupabase();
  if (!supabase) return fallbackProjects;

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return fallbackProjects;
    return data;
  } catch {
    return fallbackProjects;
  }
}

// Gets project by slug - includes unpublished for preview
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = getServiceSupabase();
  if (!supabase) return fallbackProjects.find((p) => p.slug === slug) || null;

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return fallbackProjects.find((p) => p.slug === slug) || null;
    }
    return data;
  } catch {
    return fallbackProjects.find((p) => p.slug === slug) || null;
  }
}
