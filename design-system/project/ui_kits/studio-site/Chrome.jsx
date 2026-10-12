const A = "../../assets/";
const NAV = [["work", "work"], ["services", "services"], ["about", "about"], ["contact", "contact"]];

function Nav({ route, go }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const el = document.getElementById("scroller");
    if (!el) return;
    const on = () => setScrolled(el.scrollTop > 24);
    el.addEventListener("scroll", on);
    return () => el.removeEventListener("scroll", on);
  }, []);
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px var(--gutter-page)", background: scrolled ? "rgba(0,0,0,.72)" : "transparent", backdropFilter: scrolled ? "var(--blur-panel)" : "none", borderBottom: scrolled ? "1px solid var(--border-hairline)" : "1px solid transparent", transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)" }}>
      <a onClick={() => go("home")} style={{ border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
        <img src={A + "logo/wordmark-white.png"} alt="Blanzo" style={{ height: 26 }} />
      </a>
      <nav style={{ display: "flex", gap: "var(--space-6)", alignItems: "center" }}>
        {NAV.map(([id, label]) => (
          <a key={id} onClick={() => go(id)} style={{ border: "none", cursor: "pointer", fontSize: "var(--size-label)", fontWeight: "var(--weight-medium)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: route === id ? "var(--flash-500)" : "var(--text-primary)" }}>{label}</a>
        ))}
        <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--size-label-s)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--flash-500)" }} />booking 2026
        </span>
      </nav>
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border-hairline)", padding: "var(--space-8) var(--gutter-page) var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--space-6)", flexWrap: "wrap" }}>
        <Display size="m">let's make it move<span style={{ color: "var(--flash-500)" }}>.</span></Display>
        <Button variant="primary" size="lg" onClick={() => go("contact")}>start a project</Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-5)", flexWrap: "wrap", fontSize: "var(--size-body-s)", color: "var(--text-muted)" }}>
        <div style={{ display: "flex", gap: "var(--space-5)" }}>
          <a href="#" style={{ borderColor: "transparent" }}>instagram</a>
          <a href="#" style={{ borderColor: "transparent" }}>vimeo</a>
          <a href="#" style={{ borderColor: "transparent" }}>linkedin</a>
        </div>
        <img src={A + "logo/monogram-white.png"} alt="" style={{ height: 20, opacity: .6 }} />
        <span>© 2026 Blanzo Creative Studio</span>
      </div>
    </footer>
  );
}

function Section({ eyebrow, index, title, children, style }) {
  return (
    <section style={{ padding: "var(--section-y) var(--gutter-page)", ...style }}>
      {(eyebrow || title) && <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginBottom: "var(--space-7)" }}>
        {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
        {title && <Display size="m">{title}</Display>}
      </div>}
      {children}
    </section>
  );
}

Object.assign(window, { Nav, Footer, Section, A });
