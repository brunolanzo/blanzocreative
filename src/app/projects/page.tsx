import { getPublishedProjects } from "@/lib/projects";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects — Blanzo Creative",
  description: "Explore our selected work across branding, motion design, and visual storytelling.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Projects
          </h1>
          <p className="mt-4 text-gray-500 text-lg max-w-xl">
            A curated selection of our work across branding, motion, and visual design.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 100}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        {projects.length === 0 && (
          <FadeIn>
            <p className="text-center text-gray-400 py-20">
              No projects published yet.
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
