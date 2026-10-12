import React from "react";

export function Tag({ children, tone = "default", size = "md" }) {
  const tones = {
    default: { color: "var(--text-secondary)", border: "1px solid var(--border-hairline)", background: "transparent" },
    accent: { color: "var(--flash-500)", border: "1px solid var(--flash-500)", background: "transparent" },
    solid: { color: "var(--ink-1000)", border: "1px solid var(--paper)", background: "var(--paper)" },
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: size === "sm" ? "4px 10px" : "6px 14px",
      fontFamily: "var(--font-sans)", fontSize: size === "sm" ? "var(--size-label-s)" : "var(--size-label)",
      fontWeight: "var(--weight-medium)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase",
      lineHeight: "var(--lh-label)", borderRadius: "var(--radius-pill)", ...tones[tone],
    }}>{children}</span>
  );
}
