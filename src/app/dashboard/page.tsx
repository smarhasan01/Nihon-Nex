"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Zap,
  Heart,
  Trophy,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
  Layers,
  GraduationCap,
  Calendar,
  Volume2,
  Star
} from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { NekoSensei } from "@/components/mascot/NekoSensei";
import { AudioButton } from "@/components/ui/AudioButton";
import { VOCABULARY_LIST } from "@/data/vocabulary";
import { sound } from "@/lib/sound";

export default function StudentDashboardPage() {
  const { xp, level, streak, hearts, completedLessons, dailyMissions } = useGamification();
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const userName = user?.name || "Learner (শিক্ষার্থী)";

  // Featured Vocabulary of the Day
  const todayWord = VOCABULARY_LIST[3] || VOCABULARY_LIST[0]; // ありがとうございます or おはようございます

  // Calculate Daily Goal Progress (Target: 30 XP)
  const dailyTargetXP = 30;
  const currentDailyXP = Math.min(dailyTargetXP, xp % 100);
  const dailyGoalPercent = Math.round((currentDailyXP / dailyTargetXP) * 100);

  // Modular Progress
  const progressStats = [
    { name: "Hiragana", completed: 46, total: 46, percent: 100, href: "/learn/hiragana" },
    { name: "Katakana", completed: 32, total: 46, percent: 70, href: "/learn/katakana" },
    { name: "Vocabulary", completed: Math.min(completedLessons.length * 15, 115), total: 115, percent: Math.min(100, Math.round((completedLessons.length * 15 / 115) * 100)), href: "/learn/vocabulary" },
    { name: "Grammar", completed: 3, total: 5, percent: 60, href: "/learn/grammar" },
    { name: "Kanji", completed: 4, total: 8, percent: 50, href: "/learn/kanji" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-[#121622] dark:to-[#1a202e] text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
              <Sparkles size={12} className="text-amber-400" />
              <span>Nihon Nex Student Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
              {t("dash.welcome")}, {userName}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed">
              {language === "bn"
                ? "আজকের পাঠ শুরু করুন, প্রতিদিনের স্ট্রিক ধরে রাখুন এবং নতুন শব্দ আত্মস্থ করুন।"
                : "Track your learning progress, maintain your daily streak, and master vocabulary."}
            </p>
          </div>

          {/* Quick Resume Button */}
          <Link
            href="/learn/vocabulary"
            onClick={() => sound.playClick()}
            className="px-6 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm shadow-sakura transition-transform active:scale-95 flex items-center gap-2 flex-shrink-0"
          >
            <Play size={16} className="fill-white" />
            <span>{t("dash.continue")}</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-1">
            <span>Day Streak</span>
            <Flame size={16} className="text-amber-500 fill-amber-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-white">{streak} Days</p>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Active Today 🔥
          </span>
        </div>

        {/* XP */}
        <div className="bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-1">
            <span>Total XP</span>
            <Zap size={16} className="text-blue-500 fill-blue-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-white">{xp} XP</p>
          <span className="text-[11px] font-semibold text-zinc-400">
            Rank: Level {level}
          </span>
        </div>

        {/* Daily Goal */}
        <div className="bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-1">
            <span>Daily Goal</span>
            <Calendar size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-white">{dailyGoalPercent}%</p>
          <span className="text-[11px] font-semibold text-zinc-400">
            {currentDailyXP}/{dailyTargetXP} XP today
          </span>
        </div>

        {/* Hearts / Lives */}
        <div className="bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-1">
            <span>Hearts (Lives)</span>
            <Heart size={16} className="text-rose-500 fill-rose-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-white">{hearts}/5</p>
          <span className="text-[11px] font-semibold text-rose-500">
            Protected for quizzes
          </span>
        </div>
      </div>

      {/* 3. Main Dashboard Layout (7 Cols Left + 5 Cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Progress & Recommended Next Lessons (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Module Learning Progress */}
          <div className="bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Layers size={18} className="text-brand-red" />
                <span>Learning Curriculum Progress</span>
              </h2>
              <span className="text-xs font-bold text-zinc-400">JLPT N5 Core</span>
            </div>

            <div className="space-y-3.5">
              {progressStats.map((stat) => (
                <Link
                  key={stat.name}
                  href={stat.href}
                  onClick={() => sound.playClick()}
                  className="block p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-zinc-800 dark:text-zinc-200 group-hover:text-brand-red transition-colors">
                      {stat.name}
                    </span>
                    <span className="text-zinc-400 font-mono">
                      {stat.completed}/{stat.total} ({stat.percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-red rounded-full transition-all duration-300"
                      style={{ width: `${stat.percent}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended Lessons */}
          <div className="bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <BookOpen size={18} className="text-blue-500" />
              <span>Recommended Next Steps</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Link
                href="/learn/vocabulary"
                onClick={() => sound.playClick()}
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-brand-red transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-brand-red">Vocabulary Bank</span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                    Master 115+ N5 Words
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Flashcards with Bangla & audio
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-brand-red">
                  <span>Start Practice</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/quiz"
                onClick={() => sound.playClick()}
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-brand-red transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-amber-500">Interactive Quiz</span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                    Practice Character Recognition
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Earn +10 XP per question
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-600">
                  <span>Take Quiz</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Vocabulary of the Day & Neko Sensei (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Vocabulary of the Day Card */}
          <div className="bg-white dark:bg-[#121622] border-2 border-brand-sakura-200 dark:border-zinc-800 rounded-3xl p-6 shadow-kawaii space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-brand-red uppercase tracking-wider">
                今日の単語 • Vocab of the Day
              </span>
              <AudioButton text={todayWord.japanese} size="sm" />
            </div>

            <div className="text-center py-3 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-2xl sm:text-3xl font-black font-japanese text-zinc-900 dark:text-white">
                {todayWord.japanese}
              </h3>
              <p className="text-xs font-semibold font-mono text-brand-red mt-1">
                {todayWord.romaji} ({todayWord.reading})
              </p>
              <p className="text-base font-bold text-zinc-900 dark:text-white font-bangla mt-2">
                {todayWord.meaningBn}
              </p>
              <p className="text-xs text-zinc-400">{todayWord.meaningEn}</p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-zinc-400 uppercase text-[10px]">Example Sentence:</span>
              <p className="font-japanese font-medium text-zinc-800 dark:text-zinc-200">
                {todayWord.exampleSentenceJp}
              </p>
              <p className="text-[11px] text-zinc-500 font-bangla">
                {language === "bn" ? todayWord.exampleSentenceBn : todayWord.exampleSentenceEn}
              </p>
            </div>

            <Link
              href="/learn/vocabulary"
              className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold text-center block transition-colors"
            >
              Explore Full Vocabulary Bank (115+ Words)
            </Link>
          </div>

          {/* Neko Sensei Encouragement Card */}
          <div className="bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Neko Sensei&apos;s Advice
            </span>
            <NekoSensei
              mood="explaining"
              size="md"
              message={
                language === "bn"
                  ? "প্রতিদিন মাত্র ১৫ মিনিট চর্চা করুন। শব্দভাণ্ডার বাড়াতে ফ্ল্যাশকার্ডগুলো অন্তত একবার রিভিশন দিন!"
                  : "Gambatte! Just 15 minutes of spaced repetition a day guarantees rapid language retention!"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
