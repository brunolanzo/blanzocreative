import React from "react";

export function ProjectTile({ title, client, year, tags = [], ratio = "16 / 9", poster, video, onClick, index }) {
  const [hover, setHover] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    if (hover) { v.play?.().catch(() => {}); } else { v.pause?.(); v.currentTime = 0; }
  }, [hover]);
  return (
    <a onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "block", cursor: "pointer", textDecoration: "none", border: "none", color: "inherit" }}>
      <div style={{ position: "relative", aspectRatio: ratio, overflow: "hidden", background: "var(--ink-800)", borderRadius: "var(--radius-md)" }}>
        {poster && <img src={poster} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform var(--dur-slow) var(--ease-out), opacity var(--dur-base) var(--ease-out)", transform: hover ? "scale(1.04)" : "scale(1)", opacity: hover && video ? 0 : 1 }} />}
        {video && <video ref={ref} src={video} muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: hover ? 1 : 0, transition: "opacity var(--dur-base) var(--ease-out)" }} />}
        {index != null && <span style={{ position: "absolute", top: "var(--space-4)", left: "var(--space-4)", fontSize: "var(--size-label-s)", letterSpacing: "var(--tracking-label)", color: "var(--paper)", mixBlendMode: "difference", fontVariantNumeric: "tabular-nums" }}>{index}</span>}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-4)", marginTop: "var(--space-4)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          <span style={{ fontSize: "var(--size-h3)", fontWeight: "var(--weight-medium)", letterSpacing: "var(--tracking-heading)", textTransform: "lowercase", color: hover ? "var(--flash-500)" : "var(--text-primary)", transition: "color var(--dur-fast) var(--ease-out)" }}>{title}</span>
          {client && <span style={{ fontSize: "var(--size-body-s)", color: "var(--text-muted)" }}>{client}</span>}
        </div>
        {year && <span style={{ fontSize: "var(--size-label-s)", letterSpacing: "var(--tracking-label)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{year}</span>}
      </div>
      {tags.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
        {tags.map((t) => <span key={t} style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-hairline)", fontSize: "var(--size-label-s)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-secondary)" }}>{t}</span>)}
      </div>}
    </a>
  );
}
