import React from "react";

export function VideoFrame({ src, poster, ratio = "16 / 9", caption, autoPlay = true, loop = true, controls = false, fullBleed = false }) {
  const ref = React.useRef(null);
  const [playing, setPlaying] = React.useState(autoPlay);
  const toggle = () => { const v = ref.current; if (!v) return; if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); } };
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
      <div style={{ position: "relative", aspectRatio: ratio, background: "var(--ink-1000)", overflow: "hidden", borderRadius: fullBleed ? 0 : "var(--radius-md)" }}>
        <video ref={ref} src={src} poster={poster} autoPlay={autoPlay} muted loop={loop} playsInline controls={controls}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {!controls && <button onClick={toggle} aria-label={playing ? "Pause" : "Play"}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent", border: "none", cursor: "pointer" }}>
          <span style={{ position: "absolute", bottom: "var(--space-4)", right: "var(--space-4)", padding: "8px 16px", borderRadius: "var(--radius-pill)", border: "1px solid rgba(255,255,255,.4)", color: "var(--paper)", fontSize: "var(--size-label-s)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", backdropFilter: "blur(8px)" }}>
            {playing ? "pause" : "play"}
          </span>
        </button>}
      </div>
      {caption && <figcaption style={{ fontSize: "var(--size-body-s)", color: "var(--text-muted)" }}>{caption}</figcaption>}
    </figure>
  );
}
