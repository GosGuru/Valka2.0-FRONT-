"use client";
import { Play, Pause } from "lucide-react";

interface MinimalPlayPauseButtonProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
}

export default function MinimalPlayPauseButton({
  isPlaying,
  togglePlayPause,
}: MinimalPlayPauseButtonProps) {
  return (
    <button
      onClick={togglePlayPause}
      className="w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none"
      aria-label={isPlaying ? "Pausar" : "Reproducir"}
    >
      {isPlaying ? (
        <Pause className="w-12 h-12 text-white hover:text-[#f94510] transition-colors duration-300" />
      ) : (
        <Play className="w-12 h-12 text-white hover:text-[#f94510] transition-colors duration-300 ml-1" />
      )}
    </button>
  );
}
