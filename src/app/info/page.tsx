import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Info — Blanzo Creative",
  description:
    "Meet Bruno Lanzo — motion design specialist with 15+ years crafting visuals for Globo, Uber, Warner Bros. Discovery, and more.",
};

const clients = [
  { name: "Rede Globo", short: "Globo" },
  { name: "Uber" },
  { name: "Warner Bros. Discovery", short: "Warner" },
  { name: "HBO Max", short: "HBO" },
  { name: "XP Inc.", short: "XP" },
  { name: "Keeta" },
  { name: "Unilever" },
  { name: "Johnnie Walker", short: "JW" },
  { name: "OKX" },
  { name: "World" },
  { name: "MediaMonks" },
  { name: "Livemode" },
  { name: "Gupy" },
  { name: "Nomad" },
  { name: "Carrot Collective", short: "Carrot" },
  { name: "Live Agency" },
  { name: "Editora Abril", short: "Abril" },
  { name: "MIXTV" },
];

const timeline = [
  { period: "2007", role: "Started at Editora Abril, one of Brazil's largest media houses" },
  { period: "2009 — 2017", role: "Motion Designer at Rede Globo — 8 years crafting promos across drama, sports, news, and reality" },
  { period: "2017 — 2019", role: "Senior Motion Designer & Art Director at Uber — brand, performance, and CRM campaigns" },
  { period: "2019 — 2021", role: "Senior Motion Designer at XP Inc. — high-impact motion for fintech marketing" },
  { period: "2021 — 2024", role: "Senior Creative to Streaming Art Manager LATAM at Warner Bros. Discovery — pivotal role in the HBO Max launch" },
  { period: "2024", role: "Founded Blanzo Creative — one-person creative shop, partnering with brands and agencies worldwide" },
  { period: "2025 — Now", role: "Video Creative Manager at Keeta — leading internal and external audiovisual production and execution" },
];

export default function InfoPage() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Info
          </h1>
        </FadeIn>

        {/* Hero — Photo + Intro */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Photo */}
          <FadeIn delay={100}>
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 flex items-center justify-center relative overflow-hidden">
              <span className="text-gray-400 text-sm uppercase tracking-widest">
                Photo
              </span>
            </div>
          </FadeIn>

          {/* Personal Intro */}
          <FadeIn delay={200}>
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  The person behind Blanzo
                </p>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                  Bruno Lanzo
                </h2>
                <p className="text-gray-400 font-semibold mt-2">
                  Motion Design Specialist &middot; Creative Leader &middot; Generalist
                </p>
              </div>

              <p className="text-lg md:text-xl font-bold leading-snug">
                The name says it all. <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent">Blanzo</span> is
                Bruno + Lanzo — a name born from movement, just like everything I do.
              </p>

              <div className="space-y-5 text-gray-500 leading-relaxed">
                <p>
                  For over 15 years, I&apos;ve been putting things in motion. From my
                  early days at Rede Globo — where I spent nearly a decade shaping
                  the visual language of Brazil&apos;s biggest network — to leading
                  creative teams at Uber, building motion systems for XP Inc., and
                  playing a key role in the HBO Max launch across Latin America at
                  Warner Bros. Discovery.
                </p>
                <p>
                  I&apos;m recognized as a generalist in the best sense of the word:
                  equally comfortable leading a creative team of 20 or sitting alone in
                  After Effects at 2am pushing pixels until the animation feels right.
                  I can concept, direct, design, animate, and deliver — from brief to
                  final render. That range is what makes Blanzo Creative different.
                </p>
                <p>
                  Today, I also explore the intersection of creativity and artificial
                  intelligence — using AI-powered tools and workflows to push the
                  boundaries of what&apos;s possible in motion design, accelerate
                  production, and unlock new forms of visual storytelling that didn&apos;t
                  exist a few years ago.
                </p>
                <p>
                  In 2024, I took everything I&apos;d learned across media, tech, and
                  finance and built Blanzo Creative — a one-person creative shop where
                  brands get senior-level craft without the agency overhead. Currently,
                  I also serve as Video Creative Manager at Keeta, leading audiovisual
                  production and execution both internally and with external partners.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Quote */}
        <FadeIn delay={100}>
          <div className="mt-24 md:mt-32 py-16 md:py-20 border-t border-b border-gray-200 text-center max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight">
              &ldquo;I don&apos;t just make things move.
              <br />
              <span className="bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
                I make them matter.
              </span>&rdquo;
            </blockquote>
          </div>
        </FadeIn>

        {/* Clients */}
        <div className="mt-24">
          <FadeIn>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Brands & Agencies I&apos;ve Worked With
            </h2>
            <p className="text-sm text-gray-400 mb-12">
              From broadcast television to tech, fintech, and global brands.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="aspect-[3/2] border border-gray-200 flex items-center justify-center p-4 hover:border-gray-400 hover:bg-gray-50 transition-all group"
                >
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider text-center group-hover:text-gray-500 transition-colors">
                    {client.short || client.name}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-xs text-gray-300 text-center">
              Logo placeholders — replace with actual client logos
            </p>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <FadeIn>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
              Journey
            </h2>
          </FadeIn>
          <div className="space-y-0">
            {timeline.map((item, index) => (
              <FadeIn key={index} delay={index * 50}>
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-5 border-b border-gray-100">
                  <span className="text-sm font-bold text-gray-300 uppercase tracking-wider md:w-48 md:flex-shrink-0">
                    {item.period}
                  </span>
                  <span className="text-base font-medium text-gray-700">
                    {item.role}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
