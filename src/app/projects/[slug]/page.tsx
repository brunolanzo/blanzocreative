import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectBlocks from "@/components/ProjectBlocks";
import FadeIn from "@/components/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Blanzo Creative`,
    description: `${project.category} project by Blanzo Creative`,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="pb-24">
      {/* Project Header */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <Link
              href="/projects"
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              &larr; All Projects
            </Link>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
                  {project.category} &mdash; {project.year}
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mt-2">
                  {project.title}
                </h1>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Dynamic Content Blocks */}
      <ProjectBlocks blocks={project.blocks} />

      {/* Next Project */}
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
    </article>
  );
}
