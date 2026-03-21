"use client";

import Logo from "./Logo";

export default function LogoBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Large animated logo in background */}
      <div className="logo-bg-animate">
        <Logo size={600} className="text-black opacity-[0.03]" />
      </div>
      {/* Secondary smaller logos for depth */}
      <div className="absolute top-20 left-20 logo-bg-animate" style={{ animationDelay: "-10s", animationDuration: "45s" }}>
        <Logo size={200} className="text-black opacity-[0.02]" />
      </div>
      <div className="absolute bottom-20 right-20 logo-bg-animate" style={{ animationDelay: "-20s", animationDuration: "60s" }}>
        <Logo size={300} className="text-black opacity-[0.02]" />
      </div>
    </div>
  );
}
