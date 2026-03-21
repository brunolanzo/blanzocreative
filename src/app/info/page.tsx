import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Info — Blanzo Creative",
  description: "Information about Blanzo Creative studio, clients, and recognition.",
};

export default function InfoPage() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Info
          </h1>
        </FadeIn>

        {/* About */}
        <div className="mt-16 max-w-3xl">
          <FadeIn delay={100}>
            <p className="text-2xl md:text-3xl font-bold leading-tight">
              Blanzo Creative is an independent creative studio specializing in
              branding, motion design, and visual storytelling.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-8 text-gray-500 leading-relaxed">
              Founded with the belief that bold visuals can transform how brands
              connect with their audiences, we work at the intersection of design
              and motion to deliver experiences that are both strategic and
              visually striking. Our studio operates with a focused team of
              creatives who bring diverse perspectives to every project.
            </p>
          </FadeIn>
        </div>

        {/* Clients */}
        <div className="mt-24">
          <FadeIn>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
              Selected Clients
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Client One",
                "Client Two",
                "Client Three",
                "Client Four",
                "Client Five",
                "Client Six",
                "Client Seven",
                "Client Eight",
              ].map((client) => (
                <div
                  key={client}
                  className="py-6 px-4 border border-gray-200 flex items-center justify-center"
                >
                  <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Awards / Recognition */}
        <div className="mt-24">
          <FadeIn>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
              Recognition
            </h2>
          </FadeIn>
          <div className="space-y-0">
            {[
              { award: "Award Name", org: "Organization", year: "2024" },
              { award: "Award Name", org: "Organization", year: "2024" },
              { award: "Award Name", org: "Organization", year: "2023" },
              { award: "Award Name", org: "Organization", year: "2023" },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 50}>
                <div className="flex justify-between items-center py-5 border-b border-gray-100">
                  <div>
                    <span className="font-bold text-sm uppercase tracking-tight">
                      {item.award}
                    </span>
                    <span className="text-gray-400 text-sm ml-4">
                      {item.org}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{item.year}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-24">
          <FadeIn>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
              Team
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Your Name", role: "Founder & Creative Director" },
              { name: "Team Member", role: "Motion Designer" },
              { name: "Team Member", role: "Brand Designer" },
            ].map((member, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div>
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 mb-4" />
                  <h3 className="text-base font-bold uppercase tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
