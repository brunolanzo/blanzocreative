import React from "react";

export function ServiceRow({ index, title, description, tags = [], open = false, onToggle }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onToggle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ borderTop: "1px solid var(--border-hairline)", padding: "var(--space-5) 0", cursor: onToggle ? "pointer" : "default" }}>
      <div style={{ display: "grid", gridTemplateColumns: "56px 1fr auto", alignItems: "baseline", gap: "var(--space-4)" }}>
        <span style={{ fontSize: "var(--size-label)", letterSpacing: "var(--tracking-label)", color: hover || open ? "var(--flash-500)" : "var(--text-muted)", fontVariantNumeric: "tabular-nums", transition: "color var(--dur-fast) var(--ease-out)" }}>{index}</span>
        <span style={{ fontSize: "var(--size-h2)", fontWeight: "var(--weight-medium)", letterSpacing: "var(--tracking-heading)", textTransform: "lowercase", color: hover || open ? "var(--flash-500)" : "var(--text-primary)", transition: "color var(--dur-fast) var(--ease-out)" }}>{title}</span>
        {onToggle && <span style={{ fontSize: "var(--size-h3)", color: hover || open ? "var(--flash-500)" : "var(--text-muted)", transform: open ? "rotate(45deg)" : "none", transition: "transform var(--dur-base) var(--ease-draw), color var(--dur-fast) var(--ease-out)", lineHeight: 1 }}>+</span>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "var(--space-4)", maxHeight: open ? 320 : 0, opacity: open ? 1 : 0, overflow: "hidden", transition: "max-height var(--dur-base) var(--ease-draw), opacity var(--dur-base) var(--ease-out)" }}>
        <span />
        <div style={{ paddingTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <p style={{ margin: 0, maxWidth: "var(--maxw-prose)", color: "var(--text-secondary)", fontSize: "var(--size-body-l)" }}>{description}</p>
          {tags.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
            {tags.map((t) => <span key={t} style={{ padding: "6px 14px", borderRadius: "var(--radius-pill)", border: "1px solid var(--border-hairline)", fontSize: "var(--size-label-s)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-secondary)" }}>{t}</span>)}
          </div>}
        </div>
      </div>
    </div>
  );
}
