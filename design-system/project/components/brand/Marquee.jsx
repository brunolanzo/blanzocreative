import React from "react";

export function Marquee({ items = [], speed = 28, separator = "✳", accentEvery = 0, size = "var(--size-display-m)" }) {
  const run = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", borderTop: "1px solid var(--border-hairline)", borderBottom: "1px solid var(--border-hairline)", padding: "var(--space-4) 0" }}>
      <style>{"@keyframes blanzo-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"}</style>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", width: "max-content", animation: `blanzo-marquee ${speed}s linear infinite` }}>
        {run.map((item, i) => (
          <React.Fragment key={i}>
            <span style={{ fontSize: size, fontWeight: "var(--weight-medium)", letterSpacing: "var(--tracking-display)", textTransform: "lowercase", lineHeight: 1, color: accentEvery && (i + 1) % accentEvery === 0 ? "var(--flash-500)" : "var(--text-primary)", whiteSpace: "nowrap" }}>{item}</span>
            <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>{separator}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
