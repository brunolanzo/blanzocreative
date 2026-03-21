"use client";

import { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  aspectRatio?: "horizontal" | "vertical" | "square";
  className?: string;
}

export default function VideoPlayer({
  src,
  poster,
  aspectRatio = "horizontal",
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const aspectClasses = {
    horizontal: "aspect-video",
    vertical: "aspect-[9/16]",
    square: "aspect-square",
  };

  return (
    <div className={`video-container relative group ${aspectClasses[aspectRatio]} ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <button
        onClick={toggleSound}
        className="absolute bottom-4 right-4 bg-black/70 hover:bg-black text-white px-3 py-2 rounded-full text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? "Sound On" : "Sound Off"}
      </button>
    </div>
  );
}
