"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { speakJapanese } from "@/lib/tts";
import { sound } from "@/lib/sound";

interface AudioButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export function AudioButton({ text, size = "md", className = "", label }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const sizeClasses = {
    sm: "p-1.5 text-xs",
    md: "p-2.5 text-sm",
    lg: "p-3.5 text-base",
  }[size];

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  }[size];

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;

    sound.playClick();
    setIsPlaying(true);
    await speakJapanese(text);
    setIsPlaying(false);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={`Listen to Japanese pronunciation: ${text}`}
      aria-label={`Pronounce ${text}`}
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-200 active:scale-90 ${
        isPlaying
          ? "bg-brand-red text-white shadow-sakura animate-pulse"
          : "bg-brand-sakura-100 hover:bg-brand-sakura-200 text-brand-red dark:bg-rose-950/60 dark:hover:bg-rose-900 dark:text-rose-300"
      } ${sizeClasses} ${className}`}
    >
      {isPlaying ? (
        <Volume2 size={iconSizes} className="animate-bounce" />
      ) : (
        <Volume2 size={iconSizes} />
      )}
      {label && <span className="font-medium pr-1">{label}</span>}
    </button>
  );
}
