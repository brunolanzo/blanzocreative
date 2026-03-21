import Link from "next/link";
import type { Project } from "@/lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
        {project.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-black text-gray-300/50 uppercase">
                {project.title.charAt(0)}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-tight group-hover:text-gray-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{project.category}</p>
        </div>
        <span className="text-xs text-gray-400 font-medium mt-1">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
