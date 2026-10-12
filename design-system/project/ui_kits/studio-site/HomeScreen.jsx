const PROJECTS = [
  { id: "trim-path", index: "01", title: "trim path in / out", client: "Blanzo — self-initiated", year: "2025", tags: ["motion", "type in motion"], ratio: "16 / 9", video: A + "motion/logo-trimpath-loop-long.mp4" },
  { id: "bl-loop", index: "02", title: "bl loop", client: "Blanzo — identity", year: "2025", tags: ["identity", "2d"], ratio: "4 / 5", video: A + "motion/logo-trimpath-loop-short.mp4" },
  { id: "ball", index: "03", title: "ball study", client: "Blanzo — R&D", year: "2024", tags: ["motion", "study"], ratio: "1 / 1", video: A + "motion/logo-trimpath-ball-loop-short.mp4" },
  { id: "signature", index: "04", title: "signature draw-on", client: "Blanzo — identity", year: "2024", tags: ["identity", "direction"], ratio: "16 / 9", video: A + "motion/logo-full-animated.mp4" },
];

function HomeScreen({ go }) {
  return (
    <div>
      <section style={{ position: "relative", minHeight: "82vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "var(--space-9) var(--gutter-page) var(--space-8)", overflow: "hidden" }}>
        <video src={A + "motion/logo-trimpath-loop-long.mp4"} autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .45 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--protect-gradient)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <Eyebrow accent>creative studio · motion first</Eyebrow>
          <Display size="xl">one mind,<br />whole production<span style={{ color: "var(--flash-500)" }}>.</span></Display>
          <p style={{ margin: 0, maxWidth: "48ch", fontSize: "var(--size-body-l)", color: "var(--text-secondary)" }}>
            I move between high-end motion design and full creative production — direction, shoot, edit, finish. One brief, one head, no handoff tax.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", marginTop: "var(--space-2)" }}>
            <Button variant="primary" size="lg" onClick={() => go("work")}>see the work</Button>
            <Button variant="outline" size="lg" onClick={() => go("contact")}>start a project</Button>
          </div>
        </div>
      </section>

      <Marquee items={["motion design", "creative direction", "3d", "production", "edit", "grade"]} accentEvery={3} speed={30} size="var(--size-display-m)" />

      <Section eyebrow="selected work" index="01" title="things that move">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "var(--space-7) var(--space-6)", alignItems: "start" }}>
          {PROJECTS.map((p) => <ProjectTile key={p.id} {...p} onClick={() => go("case")} />)}
        </div>
        <div style={{ marginTop: "var(--space-7)" }}><Button variant="ghost" onClick={() => go("work")}>all projects →</Button></div>
      </Section>

      <Section eyebrow="capabilities" index="02" title="what I actually do" style={{ borderTop: "1px solid var(--border-hairline)" }}>
        <ServicesList />
      </Section>

      <Section style={{ borderTop: "1px solid var(--border-hairline)", display: "flex", gap: "var(--space-9)", flexWrap: "wrap" }}>
        <StatBlock value="12+" label="years in motion" accent />
        <StatBlock value="240" label="films delivered" />
        <StatBlock value="8" label="countries shot in" />
        <StatBlock value="1" label="generalist" />
      </Section>
    </div>
  );
}

const SERVICES = [
  { index: "01", title: "motion design", description: "Frame-by-frame craft: type in motion, 2D systems, 3D, broadcast packages and social cutdowns built from one master.", tags: ["2d", "3d", "type in motion", "broadcast"] },
  { index: "02", title: "creative direction", description: "The idea before the frame. Concept, references, look, and the team to make it — I direct and I stay through delivery.", tags: ["concept", "art direction", "pitch"] },
  { index: "03", title: "production", description: "Full production house when you need one: crew, camera, location, edit, sound and grade coordinated end to end.", tags: ["shoot", "edit", "grade", "sound"] },
  { index: "04", title: "brand in motion", description: "Identity systems designed to move — logo behaviour, transitions, motion guidelines your team can actually use.", tags: ["identity", "guidelines", "toolkits"] },
];

function ServicesList() {
  const [open, setOpen] = React.useState(0);
  return <div>{SERVICES.map((s, i) => <ServiceRow key={s.index} {...s} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}</div>;
}

Object.assign(window, { HomeScreen, ServicesList, SERVICES, PROJECTS });
