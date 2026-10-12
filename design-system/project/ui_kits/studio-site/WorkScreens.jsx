const FILTERS = ["all", "motion", "identity", "production", "3d"];

function WorkScreen({ go }) {
  const [filter, setFilter] = React.useState("all");
  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.tags.some((t) => t.includes(filter)));
  return (
    <div>
      <section style={{ padding: "var(--space-9) var(--gutter-page) var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <Eyebrow index="—">work</Eyebrow>
        <Display size="l">selected work<span style={{ color: "var(--flash-500)" }}>.</span></Display>
        <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-3)" }}>
          {FILTERS.map((f) => (
            <Button key={f} size="sm" variant={filter === f ? "accent" : "outline"} onClick={() => setFilter(f)}>{f}</Button>
          ))}
        </div>
      </section>
      <section style={{ padding: "var(--space-6) var(--gutter-page) var(--section-y)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "var(--space-7) var(--space-6)", alignItems: "start" }}>
        {list.map((p) => <ProjectTile key={p.id} {...p} onClick={() => go("case")} />)}
        {list.length === 0 && <p style={{ color: "var(--text-muted)" }}>nothing under that filter yet.</p>}
      </section>
    </div>
  );
}

function CaseStudyScreen({ go }) {
  const p = PROJECTS[0];
  return (
    <div>
      <section style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
        <video src={p.video} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--protect-gradient)" }} />
        <div style={{ position: "absolute", left: "var(--gutter-page)", bottom: "var(--space-7)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <Eyebrow accent index={p.index}>case study</Eyebrow>
          <Display size="l">{p.title}</Display>
        </div>
      </section>

      <section style={{ padding: "var(--section-y) var(--gutter-page)", display: "grid", gridTemplateColumns: "minmax(240px,1fr) minmax(0,2fr)", gap: "var(--space-8)", borderBottom: "1px solid var(--border-hairline)" }}>
        <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          {[["client", p.client], ["year", p.year], ["role", "direction · design · animation"], ["deliverables", "logo system, 6 stings, motion guide"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              <dt style={{ fontSize: "var(--size-label-s)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>{k}</dt>
              <dd style={{ margin: 0, fontSize: "var(--size-body)", color: "var(--text-primary)" }}>{v}</dd>
            </div>
          ))}
        </dl>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <p style={{ margin: 0, maxWidth: "var(--maxw-prose)", fontSize: "var(--size-body-l)", color: "var(--text-primary)" }}>
            The mark is one continuous line: the b and the l drawn in a single gesture. Everything else in the system follows that rule — nothing appears, everything is drawn.
          </p>
          <p style={{ margin: 0, maxWidth: "var(--maxw-prose)", color: "var(--text-secondary)" }}>
            Trim path in, trim path out, 2.4 seconds, one easing curve. The loop reads as a signature rather than an animation, which is the point: the studio is a person.
          </p>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        </div>
      </section>

      <section style={{ padding: "var(--section-y) var(--gutter-page)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
        <VideoFrame src={A + "motion/logo-trimpath-loop-short.mp4"} ratio="1 / 1" caption="Short loop — social" />
        <VideoFrame src={A + "motion/logo-trimpath-ball-loop-short.mp4"} ratio="1 / 1" caption="Ball study — dot behaviour" />
      </section>

      <section style={{ padding: "0 var(--gutter-page) var(--section-y)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-5)", flexWrap: "wrap", borderTop: "1px solid var(--border-hairline)", paddingTop: "var(--space-6)" }}>
        <Button variant="ghost" onClick={() => go("work")}>← all work</Button>
        <Button variant="outline" onClick={() => go("case")}>next project →</Button>
      </section>
    </div>
  );
}

Object.assign(window, { WorkScreen, CaseStudyScreen });
