import Link from "next/link";
import { projects } from "@/data/projects";
import FadeIn from "@/components/FadeIn";
import LogoBackground from "@/components/LogoBackground";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <LogoBackground />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9]">
              We create
              <br />
              <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent">
                bold visuals
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              A creative studio crafting visual experiences through motion,
              design, and storytelling. We bring brands to life with purposeful
              creativity.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="border-2 border-black text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                Start a Project
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
              Selected Work
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.slice(0, 4).map((project, index) => (
              <FadeIn key={project.slug} delay={index * 100}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-black text-gray-300/50 uppercase">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-tight group-hover:text-gray-500 transition-colors">
                        {project.title}
                      </h3>
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

          <FadeIn delay={200}>
            <div className="mt-16 text-center">
              <Link
                href="/projects"
                className="inline-block border-b-2 border-black pb-1 text-sm font-bold uppercase tracking-widest hover:text-gray-500 hover:border-gray-500 transition-colors"
              >
                View All Projects
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Studio CTA */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              Let&apos;s create
              <br />
              something{" "}
              <span className="bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
                extraordinary
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-gray-500 text-lg max-w-xl mx-auto">
              We partner with brands and agencies to craft memorable visual
              experiences that move people.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <Link
              href="/contact"
              className="inline-block mt-10 bg-black text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
