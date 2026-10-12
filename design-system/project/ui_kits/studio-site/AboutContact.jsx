function AboutScreen({ go }) {
  return (
    <div>
      <section style={{ padding: "var(--space-9) var(--gutter-page) var(--section-y)", display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(280px,1fr)", gap: "var(--space-8)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <Eyebrow index="—">about</Eyebrow>
          <Display size="l">a generalist, on purpose<span style={{ color: "var(--flash-500)" }}>.</span></Display>
          <p style={{ margin: 0, maxWidth: "var(--maxw-prose)", fontSize: "var(--size-body-l)" }}>
            I started in motion design and never stopped moving outward. Today I take briefs from the first sketch to the final grade — sometimes alone at a keyframe, sometimes directing a crew.
          </p>
          <p style={{ margin: 0, maxWidth: "var(--maxw-prose)", color: "var(--text-secondary)" }}>
            The logo says it before I do: one line, two letters, no lift of the pen. That's how I like to work — continuous, from idea to delivery, without the brief being re-explained four times.
          </p>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-2)" }}>
            {["motion design", "art direction", "3d", "shooting", "edit", "grade", "sound"].map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
        <video src={A + "motion/logo-short-animated.mp4"} autoPlay muted loop playsInline
          style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: "var(--radius-md)", background: "var(--ink-900)" }} />
      </section>

      <section style={{ padding: "0 var(--gutter-page) var(--section-y)", borderTop: "1px solid var(--border-hairline)", paddingTop: "var(--section-y)" }}>
        <Eyebrow index="01" style={{ marginBottom: "var(--space-6)" }}>how it runs</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "var(--space-6)" }}>
          {[["brief", "One call. I want the constraint, not the mood board."], ["direction", "Concept, references, a look you can approve before anything is animated."], ["make", "Design, shoot, animate — whatever the film needs, in one place."], ["deliver", "Masters, cutdowns, and a motion guide so it survives without me."]].map(([t, d], i) => (
            <div key={t} style={{ borderTop: "1px solid var(--border-hairline)", paddingTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <span style={{ fontSize: "var(--size-label-s)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--flash-500)" }}>{"0" + (i + 1)}</span>
              <span style={{ fontSize: "var(--size-h3)", fontWeight: "var(--weight-medium)", textTransform: "lowercase", letterSpacing: "var(--tracking-heading)" }}>{t}</span>
              <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "var(--size-body-s)" }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ServicesScreen({ go }) {
  return (
    <div>
      <section style={{ padding: "var(--space-9) var(--gutter-page) var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <Eyebrow index="—">services</Eyebrow>
        <Display size="l">from keyframe to crew<span style={{ color: "var(--flash-500)" }}>.</span></Display>
      </section>
      <section style={{ padding: "var(--space-4) var(--gutter-page) var(--section-y)" }}><ServicesList /></section>
    </div>
  );
}

function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", brief: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <section style={{ padding: "var(--space-9) var(--gutter-page) var(--section-y)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(320px,1fr)", gap: "var(--space-9)", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <Eyebrow accent>booking 2026</Eyebrow>
        <Display size="l">tell me what<br />it should feel like<span style={{ color: "var(--flash-500)" }}>.</span></Display>
        <p style={{ margin: 0, maxWidth: "var(--maxw-prose)", color: "var(--text-secondary)" }}>
          Deck, script, or a single sentence — all of it works. I reply within two days.
        </p>
        <a href="mailto:hello@blanzo.studio" style={{ fontSize: "var(--size-h3)", textTransform: "lowercase" }}>hello@blanzo.studio</a>
      </div>
      {sent ? (
        <div style={{ borderTop: "1px solid var(--flash-500)", paddingTop: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <Eyebrow accent>received</Eyebrow>
          <p style={{ margin: 0, fontSize: "var(--size-body-l)" }}>Thanks {form.name || "—"}. I'll come back to you within two days.</p>
          <div><Button variant="outline" size="sm" onClick={() => { setSent(false); setForm({ name: "", email: "", brief: "" }); }}>send another</Button></div>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          <Field id="n" label="Name" value={form.name} onChange={set("name")} placeholder="who's writing" required />
          <Field id="e" label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" required />
          <Field id="b" label="The brief" rows={4} value={form.brief} onChange={set("brief")} placeholder="what moves, for whom, by when" hint="Budget range helps more than a deadline." />
          <Button variant="accent" size="lg" full>send it</Button>
        </form>
      )}
    </section>
  );
}

Object.assign(window, { AboutScreen, ServicesScreen, ContactScreen });
