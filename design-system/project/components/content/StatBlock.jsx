import React from "react";

export function StatBlock({ value, label, accent = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      <span style={{ fontSize: "var(--size-display-m)", fontWeight: "var(--weight-medium)", lineHeight: "var(--lh-display)", letterSpacing: "var(--tracking-display)", color: accent ? "var(--flash-500)" : "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{value}</span>
      <span style={{ fontSize: "var(--size-label)", fontWeight: "var(--weight-medium)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}
