"use client";

import React from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";

export type NekoMood = "happy" | "cheering" | "explaining" | "thinking" | "proud";

interface NekoSenseiProps {
  mood?: NekoMood;
  message?: string;
  size?: "sm" | "md" | "lg";
  showBubble?: boolean;
  className?: string;
}

export function NekoSensei({
  mood = "happy",
  message,
  size = "md",
  showBubble = true,
  className = "",
}: NekoSenseiProps) {
  const dimensions = {
    sm: { width: 80, height: 80 },
    md: { width: 140, height: 140 },
    lg: { width: 200, height: 200 },
  }[size];

  const handleMascotClick = () => {
    sound.playClick();
  };

  return (
    <div className={`flex items-end gap-3 select-none ${className}`}>
      {/* Speech Bubble */}
      {showBubble && message && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative max-w-xs md:max-w-md bg-white dark:bg-zinc-900 border-2 border-brand-sakura-300 dark:border-rose-900/60 rounded-3xl p-4 shadow-kawaii text-zinc-800 dark:text-zinc-100 mb-6"
        >
          <p className="text-sm md:text-base font-medium leading-relaxed">{message}</p>
          {/* Bubble tail */}
          <div className="absolute -bottom-2.5 right-6 w-5 h-5 bg-white dark:bg-zinc-900 border-r-2 border-b-2 border-brand-sakura-300 dark:border-rose-900/60 transform rotate-45" />
        </motion.div>
      )}

      {/* Neko Sensei Original Vector SVG */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMascotClick}
        className="cursor-pointer relative flex-shrink-0"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <svg
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F9F6F0" />
            </linearGradient>
            <linearGradient id="sakuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFCCD5" />
              <stop offset="100%" stopColor="#FF8DA1" />
            </linearGradient>
            <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Animated Tail */}
          <motion.path
            d="M 155 160 C 185 150, 190 100, 175 90 C 165 85, 160 110, 150 140"
            stroke="#101010"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            animate={{ rotate: [0, 8, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            style={{ originX: "155px", originY: "160px" }}
          />

          {/* Cat Ears */}
          {/* Left Ear */}
          <path
            d="M 45 75 L 25 25 L 75 40 Z"
            fill="url(#bodyGrad)"
            stroke="#101010"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M 40 65 L 32 35 L 65 47 Z" fill="url(#sakuraGrad)" />

          {/* Right Ear */}
          <path
            d="M 155 75 L 175 25 L 125 40 Z"
            fill="url(#bodyGrad)"
            stroke="#101010"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M 160 65 L 168 35 L 135 47 Z" fill="url(#sakuraGrad)" />

          {/* Cat Head Body */}
          <ellipse
            cx="100"
            cy="95"
            rx="65"
            ry="55"
            fill="url(#bodyGrad)"
            stroke="#101010"
            strokeWidth="6"
          />

          {/* Sensei Headband (Hachimaki) */}
          <path
            d="M 37 80 C 70 70, 130 70, 163 80"
            stroke="#D90016"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          {/* Torii / Hinomaru Circle on Headband */}
          <circle cx="100" cy="74" r="7" fill="#FFFFFF" />
          <circle cx="100" cy="74" r="4.5" fill="#D90016" />

          {/* Blush Cheeks */}
          <ellipse cx="60" cy="112" rx="10" ry="6" fill="#FF8DA1" opacity="0.65" />
          <ellipse cx="140" cy="112" rx="10" ry="6" fill="#FF8DA1" opacity="0.65" />

          {/* Whisker Lines */}
          {/* Left */}
          <line x1="30" y1="102" x2="52" y2="105" stroke="#101010" strokeWidth="3" strokeLinecap="round" />
          <line x1="28" y1="114" x2="50" y2="114" stroke="#101010" strokeWidth="3" strokeLinecap="round" />
          {/* Right */}
          <line x1="170" y1="102" x2="148" y2="105" stroke="#101010" strokeWidth="3" strokeLinecap="round" />
          <line x1="172" y1="114" x2="150" y2="114" stroke="#101010" strokeWidth="3" strokeLinecap="round" />

          {/* Eyes based on mood */}
          {mood === "happy" || mood === "cheering" ? (
            <>
              {/* Happy Smiling Arc Eyes (^ ‿ ^) */}
              <path
                d="M 68 98 Q 78 88 88 98"
                stroke="#101010"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 112 98 Q 122 88 132 98"
                stroke="#101010"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : mood === "explaining" ? (
            <>
              {/* Intelligent Glasses */}
              <circle cx="78" cy="98" r="14" stroke="#101010" strokeWidth="3.5" fill="#EAF2F8" fillOpacity="0.4" />
              <circle cx="122" cy="98" r="14" stroke="#101010" strokeWidth="3.5" fill="#EAF2F8" fillOpacity="0.4" />
              <line x1="92" y1="98" x2="108" y2="98" stroke="#101010" strokeWidth="3.5" />
              {/* Pupils */}
              <circle cx="78" cy="98" r="5" fill="#101010" />
              <circle cx="122" cy="98" r="5" fill="#101010" />
            </>
          ) : (
            <>
              {/* Curious Big Anime Eyes */}
              <ellipse cx="78" cy="98" rx="8" ry="11" fill="#101010" />
              <ellipse cx="122" cy="98" rx="8" ry="11" fill="#101010" />
              <circle cx="75" cy="94" r="3.5" fill="#FFFFFF" />
              <circle cx="119" cy="94" r="3.5" fill="#FFFFFF" />
            </>
          )}

          {/* Cute Nose and Mouth (ω) */}
          <path d="M 97 106 L 103 106 L 100 110 Z" fill="#D90016" />
          <path
            d="M 92 114 C 95 119, 100 119, 100 114 C 100 119, 105 119, 108 114"
            stroke="#101010"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Lower Body */}
          <path
            d="M 60 145 C 50 170, 65 190, 100 190 C 135 190, 150 170, 140 145 Z"
            fill="url(#bodyGrad)"
            stroke="#101010"
            strokeWidth="6"
          />

          {/* Collar with Red Ribbon & Gold Bell */}
          <path
            d="M 66 142 C 85 152, 115 152, 134 142"
            stroke="#D90016"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Golden Bell */}
          <circle cx="100" cy="154" r="10" fill="url(#bellGrad)" stroke="#101010" strokeWidth="3" />
          <circle cx="100" cy="154" r="2.5" fill="#101010" />
          <line x1="94" y1="158" x2="106" y2="158" stroke="#101010" strokeWidth="2" />

          {/* Paws */}
          {mood === "cheering" ? (
            <>
              {/* Both Paws raised high in victory! */}
              <ellipse cx="45" cy="130" rx="12" ry="10" fill="#FFFFFF" stroke="#101010" strokeWidth="4" />
              <ellipse cx="155" cy="130" rx="12" ry="10" fill="#FFFFFF" stroke="#101010" strokeWidth="4" />
            </>
          ) : mood === "explaining" ? (
            <>
              {/* Left paw down, Right paw holding Sensei pointer */}
              <ellipse cx="70" cy="165" rx="10" ry="8" fill="#FFFFFF" stroke="#101010" strokeWidth="4" />
              {/* Teaching stick */}
              <line x1="130" y1="165" x2="165" y2="120" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
              <polygon points="163,115 168,125 158,125" fill="#F59E0B" />
              <ellipse cx="130" cy="165" rx="10" ry="8" fill="#FFFFFF" stroke="#101010" strokeWidth="4" />
            </>
          ) : (
            <>
              {/* Sitting cute paws */}
              <ellipse cx="82" cy="178" rx="11" ry="8" fill="#FFFFFF" stroke="#101010" strokeWidth="4" />
              <ellipse cx="118" cy="178" rx="11" ry="8" fill="#FFFFFF" stroke="#101010" strokeWidth="4" />
            </>
          )}
        </svg>
      </motion.div>
    </div>
  );
}
