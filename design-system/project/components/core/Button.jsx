import React from "react";

const sizes = {
  sm: { padding: "8px 16px", fontSize: "var(--size-label-s)", letterSpacing: "var(--tracking-label)" },
  md: { padding: "13px 26px", fontSize: "var(--size-label)", letterSpacing: "var(--tracking-label)" },
  lg: { padding: "18px 36px", fontSize: "0.8125rem", letterSpacing: "var(--tracking-label)" },
};

const variants = {
  primary: { background: "var(--paper)", color: "var(--ink-1000)", border: "1px solid var(--paper)" },
  accent: { background: "var(--flash-500)", color: "var(--paper)", border: "1px solid var(--flash-500)" },
  outline: { background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-strong)" },
  ghost: { background: "transparent", color: "var(--text-primary)", border: "1px solid transparent" },
};

export function Button({ children, variant = "primary", size = "md", href, disabled = false, full = false, onClick, ...rest }) {
  const Tag = href ? "a" : "button";
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const style = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)",
    width: full ? "100%" : "auto",
    fontFamily: "var(--font-sans)", fontWeight: "var(--weight-medium)", textTransform: "uppercase",
    borderRadius: "var(--radius-pill)", cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.35 : 1, textDecoration: "none", whiteSpace: "nowrap",
    transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out)",
    transform: press && !disabled ? "scale(.97)" : "scale(1)",
    ...sizes[size], ...v,
  };
  if (hover && !disabled) {
    if (variant === "primary") Object.assign(style, { background: "var(--flash-500)", color: "var(--paper)", borderColor: "var(--flash-500)" });
    if (variant === "accent") Object.assign(style, { background: "var(--flash-400)", borderColor: "var(--flash-400)" });
    if (variant === "outline") Object.assign(style, { borderColor: "var(--paper)" });
    if (variant === "ghost") Object.assign(style, { color: "var(--flash-500)" });
  }
  return (
    <Tag href={href} onClick={disabled ? undefined : onClick} disabled={Tag === "button" ? disabled : undefined} style={style}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)} {...rest}>
      {children}
    </Tag>
  );
}
