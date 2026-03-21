import Link from "next/link";
import { projects } from "@/data/projects";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Projects — Blanzo Creative",
  description: "Explore our selected work across branding, motion design, and visual storytelling.",
};

export default function ProjectsPage() {
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
              <Link
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-black text-gray-300/50 uppercase">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-tight group-hover:text-gray-500 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      {project.category}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 font-medium mt-1">
                    {project.year}
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
