import React from "react";

export function Eyebrow({ children, accent = false, index, as = "div", style }) {
  const Tag = as;
  return (
    <Tag style={{
      display: "flex", alignItems: "center", gap: "var(--space-3)",
      fontFamily: "var(--font-sans)", fontSize: "var(--size-label)", fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-label)", textTransform: "uppercase", lineHeight: "var(--lh-label)",
      color: accent ? "var(--flash-500)" : "var(--text-muted)", ...style,
    }}>
      {index != null && <span style={{ color: accent ? "var(--flash-500)" : "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{index}</span>}
      {index != null && <span style={{ width: 24, height: 1, background: "currentColor", opacity: .5 }} />}
      <span>{children}</span>
    </Tag>
  );
}
