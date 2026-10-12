import React from "react";

export function Field({ label, type = "text", placeholder, value, onChange, rows, required, hint, id }) {
  const [focus, setFocus] = React.useState(false);
  const Tag = rows ? "textarea" : "input";
  const inputStyle = {
    width: "100%", background: "transparent", color: "var(--text-primary)",
    fontFamily: "var(--font-sans)", fontSize: "var(--size-body-l)", lineHeight: "var(--lh-body)",
    border: "none", borderBottom: `1px solid ${focus ? "var(--flash-500)" : "var(--border-hairline)"}`,
    padding: "10px 0 12px", outline: "none", resize: "vertical",
    transition: "border-color var(--dur-fast) var(--ease-out)",
  };
  return (
    <label htmlFor={id} style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--size-label-s)", fontWeight: "var(--weight-medium)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: focus ? "var(--flash-500)" : "var(--text-muted)", transition: "color var(--dur-fast) var(--ease-out)" }}>
        {label}{required && " *"}
      </span>
      <Tag id={id} type={rows ? undefined : type} rows={rows} placeholder={placeholder} value={value}
        onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={inputStyle} />
      {hint && <span style={{ fontSize: "var(--size-body-s)", color: "var(--text-muted)" }}>{hint}</span>}
    </label>
  );
}
