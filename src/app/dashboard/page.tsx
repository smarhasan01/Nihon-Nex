"use client";

import React from "react";
import Link from "next/link";
import {
  Flame,
  Zap,
  Heart,
  Trophy,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  Award,
  Layers,
  GraduationCap
} from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { NekoSensei } from "@/components/mascot/NekoSensei";
import { sound } from "@/lib/sound";

export default function StudentDashboardPage() {
  const { xp, level, streak, hearts, completedLessons, achievements, dailyMissions, claimMission, replenishHearts } =
    useGamification();
  const { user, enterDemoMode } = useAuth();
  const { language, t } = useLanguage();

  const userName = user?.name || "Student (শিক্ষার্থী)";

  // Duolingo-style Learning Journey Nodes
  const learningNodes = [
    {
      id: "node-1",
      title: "Hiragana Vowels (あ・い・う・え・お)",
      subtitle: "The 5 core vowels of Japanese",
      href: "/learn/hiragana",
      completed: true,
      current: false,
      locked: false,
      icon: "あ",
    },
    {
      id: "node-2",
      title: "Hiragana Ka & Sa Rows (か・さ)",
      subtitle: "Consonants K and S combinations",
      href: "/learn/hiragana",
      completed: completedLessons.includes("hiragana-ka-sa"),
      current: !completedLessons.includes("hiragana-ka-sa"),
      locked: false,
      icon: "か",
    },
    {
      id: "node-3",
      title: "Essential Greetings & Numbers",
      subtitle: "Ohayou, Arigatou, and 1 to 10",
      href: "/learn/vocabulary",
      completed: completedLessons.includes("vocab-greetings"),
      current: false,
      locked: false,
      icon: "🌸",
    },
    {
      id: "node-4",
      title: "First Sentence: A は B です",
      subtitle: "Topic particle 'wa' and 'desu'",
      href: "/learn/grammar",
      completed: completedLessons.includes("grammar-1"),
      current: false,
      locked: false,
      icon: "⛩️",
    },
    {
      id: "node-5",
      title: "Katakana Foundations",
      subtitle: "Coffee, Taxi, and Loanwords",
      href: "/learn/katakana",
      completed: completedLessons.includes("katakana-intro"),
      current: false,
      locked: false,
      icon: "カ",
    },
    {
      id: "node-6",
      title: "Kanji Basics (日・月・水・火)",
      subtitle: "Sun, Moon, Water, and Fire",
      href: "/learn/kanji",
      completed: false,
      current: false,
      locked: false,
      icon: "日",
    },
    {
      id: "node-7",
      title: "JLPT N5 Mock Exam Milestone",
      subtitle: "Complete practice test with score",
      href: "/jlpt",
      completed: false,
      current: false,
      locked: false,
      icon: "🏆",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-red to-rose-700 text-white rounded-3xl p-6 sm:p-8 shadow-sakura relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
              <Sparkles size={12} />
              <span>Nihon Nex Student Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
              {t("dash.welcome")}, {userName}! 👋
            </h1>
            <p className="text-sm sm:text-base text-rose-100 max-w-xl">
              {language === "bn"
                ? "আজকের দৈনিক লক্ষ্য পূরণ করুন এবং নতুন শব্দ শেখার স্ট্রিক ধরে রাখুন।"
                : "You're doing great! Keep up the daily practice and level up your Japanese."}
            </p>
          </div>

          {/* Quick CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/learn/hiragana"
              onClick={() => sound.playClick()}
              className="px-6 py-3 rounded-2xl bg-white text-brand-red font-bold text-sm hover:bg-rose-50 shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <Play size={16} className="fill-brand-red" />
              <span>{t("dash.continue")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left / Center Column: Learning Pathway (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Progress Overview Bar Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 mb-1">
                <Flame size={16} className="text-amber-500 fill-amber-500" />
                <span>Streak</span>
              </div>
              <span className="text-2xl font-black text-zinc-900 dark:text-white">{streak} Days</span>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">Active Today 🔥</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 mb-1">
                <Zap size={16} className="text-blue-500 fill-blue-500" />
                <span>Total XP</span>
              </div>
              <span className="text-2xl font-black text-zinc-900 dark:text-white">{xp} XP</span>
              <p className="text-[11px] text-zinc-400 mt-1">Next rank at {(level) * 100} XP</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 mb-1">
                <Heart size={16} className="text-rose-500 fill-rose-500" />
                <span>Lives</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-zinc-900 dark:text-white">{hearts}/5</span>
                {hearts < 5 && (
                  <button
                    onClick={() => replenishHearts()}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-600"
                  >
                    Refill
                  </button>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">Refills automatically</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 mb-1">
                <Trophy size={16} className="text-amber-400" />
                <span>Rank</span>
              </div>
              <span className="text-2xl font-black text-zinc-900 dark:text-white">Level {level}</span>
              <p className="text-[11px] text-brand-red font-semibold mt-1">Kohai (後輩)</p>
            </div>
          </div>

          {/* Duolingo-style Learning Journey Tree */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h2 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
                  <Layers size={20} className="text-brand-red" />
                  <span>{t("dash.journey_map")}</span>
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Complete nodes sequentially to unlock advanced modules.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-brand-sakura-100 dark:bg-rose-950 text-brand-red text-xs font-bold">
                Level 1: Novice
              </span>
            </div>

            {/* Path Nodes */}
            <div className="relative space-y-6">
              {/* Vertical connector line */}
              <div className="absolute left-6 top-8 bottom-8 w-1 bg-zinc-200 dark:bg-zinc-800 -z-0" />

              {learningNodes.map((node, index) => {
                return (
                  <div key={node.id} className="relative z-10 flex items-start gap-4 sm:gap-6 group">
                    {/* Node Circle */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base shadow-md transition-transform duration-200 group-hover:scale-110 flex-shrink-0 ${
                        node.completed
                          ? "bg-emerald-500 text-white"
                          : node.current
                          ? "bg-brand-red text-white ring-4 ring-brand-sakura-200 dark:ring-rose-950 animate-pulse"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {node.completed ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <span>{node.icon}</span>
                      )}
                    </div>

                    {/* Node Content Card */}
                    <Link
                      href={node.href}
                      onClick={() => sound.playClick()}
                      className={`flex-1 p-4 rounded-2xl border transition-all ${
                        node.current
                          ? "bg-brand-sakura-50 dark:bg-rose-950/20 border-brand-red"
                          : "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 hover:border-zinc-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                              {node.title}
                            </h3>
                            {node.completed && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                                Completed
                              </span>
                            )}
                            {node.current && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-red text-white animate-pulse">
                                Active Node
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {node.subtitle}
                          </p>
                        </div>

                        <div className="text-zinc-400 group-hover:text-brand-red group-hover:translate-x-1 transition-all">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Daily Missions, Neko Sensei & Achievements (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Neko Sensei Encouragement Widget */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Sensei&apos;s Advice
            </h3>
            <NekoSensei
              mood={streak >= 3 ? "cheering" : "explaining"}
              size="md"
              message={
                language === "bn"
                  ? "খুব চমৎকার চলছে! প্রতিদিন মাত্র ১৫ মিনিট হিরাগানা অনুশীলন করলেই ১ সপ্তাহে সব বর্ণ মনে থাকবে!"
                  : "Gambatte! Consistent 15-minute daily practice is 10x more effective than cramming once a week!"
              }
            />
          </div>

          {/* Daily Missions */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Sparkles size={16} className="text-amber-500" />
                <span>{t("dash.missions")}</span>
              </h3>
              <span className="text-xs text-zinc-400">Resets daily</span>
            </div>

            <div className="space-y-3">
              {dailyMissions.map((mission) => (
                <div
                  key={mission.id}
                  className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {language === "bn" ? mission.titleBn : mission.titleEn}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-red rounded-full"
                          style={{
                            width: `${Math.min(100, (mission.current / mission.target) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {mission.current}/{mission.target}
                      </span>
                    </div>
                  </div>

                  <div>
                    {mission.completed ? (
                      <button
                        onClick={() => claimMission(mission.id)}
                        className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold shadow-sm"
                      >
                        Claim +{mission.xpReward} XP
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-zinc-400">
                        +{mission.xpReward} XP
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Award size={16} className="text-brand-red" />
                <span>{t("dash.achievements")}</span>
              </h3>
              <Link href="/profile" className="text-xs text-brand-red font-bold hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {achievements.slice(0, 3).map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-2xl border flex items-center gap-3 ${
                    ach.unlocked
                      ? "bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60"
                      : "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 opacity-70"
                  }`}
                >
                  <span className="text-2xl">{ach.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                      {language === "bn" ? ach.titleBn : ach.titleEn}
                    </h4>
                    <p className="text-[11px] text-zinc-500 truncate">
                      {language === "bn" ? ach.descBn : ach.descEn}
                    </p>
                  </div>
                  {ach.unlocked ? (
                    <span className="text-[10px] font-bold text-amber-600">Unlocked</span>
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-400">
                      {ach.progress}/{ach.maxProgress}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
