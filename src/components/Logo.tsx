"use client";

export default function Logo({
  className = "",
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Geometric "B" mark for Blanzo */}
      <rect x="10" y="10" width="80" height="80" fill="currentColor" />
      <rect x="20" y="20" width="30" height="25" fill="white" />
      <rect x="20" y="55" width="30" height="25" fill="white" />
      <rect x="55" y="30" width="15" height="10" fill="white" />
      <rect x="55" y="60" width="15" height="10" fill="white" />
    </svg>
  );
}
