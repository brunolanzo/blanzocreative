import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Studio — Blanzo Creative",
  description: "Learn about our creative studio, our process, and what drives us.",
};

export default function StudioPage() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Studio
          </h1>
        </FadeIn>

        {/* Intro */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <FadeIn delay={100}>
            <p className="text-2xl md:text-3xl font-bold leading-tight">
              We are a creative studio focused on building meaningful visual
              experiences for brands that dare to stand out.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="space-y-6 text-gray-500 leading-relaxed">
              <p>
                At Blanzo Creative, we believe that great design is more than
                aesthetics — it&apos;s strategy made visible. Every project we
                take on begins with understanding the core story, then
                translating it into visuals that resonate.
              </p>
              <p>
                Our work spans branding, motion design, visual identity systems,
                and creative direction. We partner with both emerging startups
                and established brands, bringing the same level of craft and
                attention to every engagement.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Studio Image Placeholder */}
        <FadeIn delay={100}>
          <div className="mt-20 aspect-[21/9] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 flex items-center justify-center">
            <span className="text-gray-300 text-sm uppercase tracking-widest">
              Studio Image
            </span>
          </div>
        </FadeIn>

        {/* What We Do */}
        <div className="mt-24">
          <FadeIn>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
              What We Do
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Brand Identity",
                desc: "Complete visual systems that define how brands look, feel, and communicate across every touchpoint.",
              },
              {
                title: "Motion Design",
                desc: "Dynamic motion content for campaigns, social media, product launches, and digital experiences.",
              },
              {
                title: "Creative Direction",
                desc: "Strategic creative leadership that ensures visual consistency and impact across all deliverables.",
              },
            ].map((service, index) => (
              <FadeIn key={service.title} delay={index * 100}>
                <div className="border-t-2 border-black pt-6">
                  <h3 className="text-lg font-bold uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mt-24">
          <FadeIn>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
              Our Values
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Bold by Default",
                desc: "We don't play it safe. Every decision, from color to motion, is intentional and unapologetic.",
              },
              {
                title: "Craft Over Speed",
                desc: "We take the time to get it right. Quality is non-negotiable.",
              },
              {
                title: "Story First",
                desc: "Design without meaning is decoration. We start with the narrative.",
              },
              {
                title: "Partnership",
                desc: "We work with our clients, not for them. Collaboration produces the best outcomes.",
              },
            ].map((value, index) => (
              <FadeIn key={value.title} delay={index * 100}>
                <div className="p-8 bg-gray-50">
                  <h3 className="text-lg font-bold uppercase tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
