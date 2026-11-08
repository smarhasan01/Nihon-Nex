"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Heart, Globe, Award, BookOpen, ArrowRight } from "lucide-react";
import { NekoSensei } from "@/components/mascot/NekoSensei";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sakura-100 dark:bg-rose-950 text-brand-red text-xs font-bold">
          <Sparkles size={12} />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white">
          About Nihon Nex (日本ネクス)
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Building the cultural and linguistic bridge between Bangladesh, global Japanese enthusiasts, and the Land of the Rising Sun.
        </p>
      </div>

      {/* Mascot & Vision Banner */}
      <div className="bg-brand-sakura-50/60 dark:bg-zinc-900 border-2 border-brand-sakura-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <NekoSensei
          mood="explaining"
          size="lg"
          message={
            language === "bn"
              ? "নিহন নেক্স-এর মূল লক্ষ্য হলো জাপানি ভাষাকে শিক্ষার্থীদের জন্য সহজ, আনন্দময় ও সবার কাছে পৌঁছানো।"
              : "Our vision is to make Japanese language education accessible, engaging, and culturally enriching for everyone!"
          }
        />
        <div className="space-y-4 text-center md:text-left flex-1">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
            Meet Neko Sensei (ねこ先生)
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Neko Sensei is our original Japanese anime cat teacher. With patient guidance, gentle encouragements, and cheerful celebrations, Neko Sensei makes every student feel confident from the very first stroke of Hiragana to the highest tiers of the JLPT exam.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-800 text-xs font-bold text-brand-red border border-zinc-200 dark:border-zinc-700">
              🌸 100% Free Core Curriculum
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              🇧🇩 Bangla Phonetics & Explanations
            </span>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-brand-red flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Gamified Retention</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Duolingo-style streaks, XP points, and instant sound effects keep your motivation high every single day.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Bangla-Native Context</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Bengali sentence structure matches Japanese perfectly. Learning through Bangla eliminates confusing English intermediate translation layers.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">JLPT Exam Success</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Focused prep modules that prepare students for student visas, Japanese university admission, and corporate employment.
          </p>
        </div>
      </div>
    </div>
  );
}
