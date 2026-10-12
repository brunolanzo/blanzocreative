import React from "react";

const sizes = { xl: "var(--size-display-xl)", l: "var(--size-display-l)", m: "var(--size-display-m)" };

export function Display({ children, size = "l", as = "h1", accent, style }) {
  const Tag = as;
  return (
    <Tag style={{
      margin: 0, fontFamily: "var(--font-sans)", fontWeight: "var(--weight-medium)",
      fontSize: sizes[size] || sizes.l, lineHeight: "var(--lh-display)", letterSpacing: "var(--tracking-display)",
      textTransform: "lowercase", color: "var(--text-primary)", ...style,
    }}>
      {children}
      {accent && <span style={{ color: "var(--flash-500)" }}>.</span>}
    </Tag>
  );
}
