import React from "react";

export function Logo({ variant = "wordmark", theme = "light-on-dark", height = 32, animated = false, base = ".", style }) {
  const white = theme === "light-on-dark";
  if (animated) {
    const src = variant === "wordmark" ? `${base}/assets/motion/logo-full-animated.mp4` : `${base}/assets/motion/logo-short-animated.mp4`;
    return <video src={src} autoPlay muted loop playsInline style={{ height, width: "auto", mixBlendMode: white ? "screen" : "multiply", ...style }} />;
  }
  const files = {
    wordmark: white ? "wordmark-white.png" : "wordmark-black.png",
    monogram: white ? "monogram-white.png" : "monogram-black.png",
    badge: "badge-black.png",
  };
  return <img src={`${base}/assets/logo/${files[variant] || files.wordmark}`} alt="Blanzo" style={{ height, width: "auto", ...style }} />;
}
