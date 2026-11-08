"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Award,
  Flame,
  Zap,
  Heart,
  Volume2,
  VolumeX,
  Target,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import { useLanguage } from "@/context/LanguageContext";
import { sound } from "@/lib/sound";

export default function ProfilePage() {
  const { user } = useAuth();
  const { xp, level, streak, hearts, completedLessons, achievements } = useGamification();
  const { language } = useLanguage();

  const [targetJLPT, setTargetJLPT] = useState<string>("N5");
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const toggleMute = () => {
    const next = !isMuted;
    sound.setMuted(next);
    setIsMuted(next);
    if (!next) sound.playClick();
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Card Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-sakura-100 dark:bg-rose-950 flex items-center justify-center text-4xl shadow-sakura">
          🐱
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
              {user?.name || "Nihon Nex Learner"}
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-red text-white">
              Level {level} Student
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-mono">{user?.email || "guest@nihonnex.com"}</p>
          <p className="text-xs text-zinc-500 pt-1">
            Goal: Master Japanese through JLPT {targetJLPT}
          </p>
        </div>

        {/* Quick Audio Setting Toggle */}
        <button
          onClick={toggleMute}
          title={isMuted ? "Unmute game sounds" : "Mute game sounds"}
          className="p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-brand-red text-zinc-600 dark:text-zinc-300 flex items-center gap-2 text-xs font-bold"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>{isMuted ? "Sounds Muted" : "Sounds On"}</span>
        </button>
      </div>

      {/* Gamification Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
          <Zap size={20} className="mx-auto text-blue-500 fill-blue-500 mb-1" />
          <span className="text-2xl font-black text-zinc-900 dark:text-white">{xp}</span>
          <p className="text-xs text-zinc-400">Total XP</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
          <Flame size={20} className="mx-auto text-amber-500 fill-amber-500 mb-1" />
          <span className="text-2xl font-black text-zinc-900 dark:text-white">{streak}</span>
          <p className="text-xs text-zinc-400">Day Streak</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
          <Award size={20} className="mx-auto text-brand-red mb-1" />
          <span className="text-2xl font-black text-zinc-900 dark:text-white">
            {unlockedCount}/{achievements.length}
          </span>
          <p className="text-xs text-zinc-400">Badges Unlocked</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
          <CheckCircle2 size={20} className="mx-auto text-emerald-500 mb-1" />
          <span className="text-2xl font-black text-zinc-900 dark:text-white">
            {completedLessons.length}
          </span>
          <p className="text-xs text-zinc-400">Lessons Finished</p>
        </div>
      </div>

      {/* Target JLPT Level Picker */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Target size={18} className="text-brand-red" />
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">
            Target JLPT Exam Goal:
          </h2>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {["N5", "N4", "N3", "N2", "N1"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                sound.playClick();
                setTargetJLPT(lvl);
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                targetJLPT === lvl
                  ? "bg-brand-red text-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Complete Achievements Showcase */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
              <Award size={20} className="text-brand-red" />
              <span>Achievement Trophies</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Unlock special badges as you progress through lessons and maintain streaks.
            </p>
          </div>
          <span className="text-xs font-bold text-brand-red bg-brand-sakura-100 dark:bg-rose-950 px-3 py-1 rounded-full">
            {unlockedCount} of {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                ach.unlocked
                  ? "bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60 shadow-sm"
                  : "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 opacity-60"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                {ach.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                    {language === "bn" ? ach.titleBn : ach.titleEn}
                  </h4>
                  {ach.unlocked && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                      Earned
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                  {language === "bn" ? ach.descBn : ach.descEn}
                </p>

                {/* Progress bar */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {ach.progress}/{ach.maxProgress}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
