import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getPublishedProjects } from "@/lib/projects";
import ProjectBlocks from "@/components/ProjectBlocks";
import FadeIn from "@/components/FadeIn";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Blanzo Creative`,
    description: `${project.category} project by Blanzo Creative`,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getPublishedProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <article className="pb-24">
      {/* Hidden header — title is in the blocks, kept for SEO/accessibility */}
      <section className="pt-16 md:pt-24 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <Link
              href="/projects"
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              &larr; All Projects
            </Link>
          </FadeIn>
          <h1 className="sr-only">{project.title}</h1>
        </div>
      </section>

      {/* Dynamic Content Blocks */}
      <div className="mt-8 md:mt-12">
        <ProjectBlocks blocks={project.blocks} />
      </div>

      {/* Next Project */}
      {nextProject && nextProject.slug !== slug && (
        <section className="mt-24 border-t border-gray-200 pt-16 px-6 md:px-10">
          <div className="max-w-[1400px] mx-auto">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Next Project
              </p>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group block"
              >
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight group-hover:text-gray-500 transition-colors">
                  {nextProject.title}
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  {nextProject.category}
                </p>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}
    </article>
  );
}
