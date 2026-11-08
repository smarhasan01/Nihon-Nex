"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Award,
  ArrowRight,
  Layers,
  HelpCircle
} from "lucide-react";
import { KANJI_LIST } from "@/data/kanji";
import { KanjiItem } from "@/types";
import { AudioButton } from "@/components/ui/AudioButton";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { sound } from "@/lib/sound";

export default function KanjiPage() {
  const { language } = useLanguage();
  const { addXP, completeLesson } = useGamification();
  const [activeKanji, setActiveKanji] = useState<KanjiItem>(KANJI_LIST[0]);

  const selectKanji = (item: KanjiItem) => {
    sound.playClick();
    setActiveKanji(item);
    addXP(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-brand-red text-xs font-bold mb-3">
            <Sparkles size={12} />
            <span>JLPT N5 Core Kanji (漢字)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
            {language === "bn" ? "প্রয়োজনীয় কাঞ্জি ও পাঠবিধি" : "JLPT N5 Essential Kanji"}
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
            {language === "bn"
              ? "কাঞ্জি হলো জাপানি চিত্রলিপি। প্রতিটি কাঞ্জির নির্দিষ্ট অর্থ, অন'য়োমি (চীনা পাঠ) এবং কুন'য়োমি (জাপানি পাঠ) রয়েছে। ক্লিক করে বিস্তারিত জানুন।"
              : "Chinese ideograms adapted into Japanese. Master on'yomi, kun'yomi, stroke counts, and natural compound words."}
          </p>
        </div>

        <Link
          href="/quiz"
          onClick={() => {
            sound.playClick();
            completeLesson("kanji-n5");
          }}
          className="px-5 py-3 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm shadow-sakura flex items-center gap-2 transition-transform active:scale-95"
        >
          <Award size={18} />
          <span>Kanji Practice Quiz</span>
        </Link>
      </div>

      {/* Main Kanji Explorer Layout: Left Grid + Right Focal Card */}
      <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Kanji Selector Tiles (7 Cols) */}
        <div className="lg:col-span-7">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
            Select a Kanji character:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {KANJI_LIST.map((item) => {
              const isSelected = activeKanji.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => selectKanji(item)}
                  className={`p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center shadow-sm ${
                    isSelected
                      ? "bg-brand-sakura-50 dark:bg-rose-950/40 border-brand-red shadow-kawaii scale-105"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
                  }`}
                >
                  <span className="text-4xl sm:text-5xl font-bold font-japanese text-zinc-900 dark:text-white mb-2">
                    {item.kanji}
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-bangla">
                    {item.meaningBn}
                  </span>
                  <span className="text-[11px] text-zinc-400">{item.meaningEn}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Inspector Card (5 Cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white dark:bg-zinc-900 border-2 border-brand-sakura-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-kawaii space-y-6">
            {/* Top Kanji Showcase */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-sakura-100 dark:bg-rose-950 text-brand-red">
                {activeKanji.jlptLevel} • {activeKanji.strokeCount} Strokes
              </span>
              <AudioButton text={activeKanji.kanji} size="md" />
            </div>

            <div className="text-center py-4 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-7xl sm:text-8xl font-black font-japanese text-zinc-900 dark:text-white inline-block">
                {activeKanji.kanji}
              </span>
              <h2 className="text-2xl font-black text-brand-red mt-3 font-bangla">
                {activeKanji.meaningBn}
              </h2>
              <p className="text-sm font-semibold text-zinc-500">{activeKanji.meaningEn}</p>
            </div>

            {/* Readings Box (On'yomi & Kun'yomi) */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold text-zinc-400 uppercase text-[10px]">On&apos;yomi (音読み):</span>
                <p className="text-sm font-bold font-mono text-zinc-900 dark:text-white mt-1">
                  {activeKanji.onyomi.join(", ")}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold text-zinc-400 uppercase text-[10px]">Kun&apos;yomi (訓読み):</span>
                <p className="text-sm font-bold font-mono text-zinc-900 dark:text-white mt-1">
                  {activeKanji.kunyomi.join(", ")}
                </p>
              </div>
            </div>

            {/* Real Compound Vocabulary */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Common Words with {activeKanji.kanji}:
              </h4>
              <div className="space-y-2">
                {activeKanji.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold font-japanese text-zinc-900 dark:text-white">
                          {ex.word}
                        </span>
                        <span className="text-xs font-mono text-zinc-500">({ex.reading})</span>
                      </div>
                      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 font-bangla mt-0.5">
                        {language === "bn" ? ex.meaningBn : ex.meaningEn}
                      </p>
                    </div>
                    <AudioButton text={ex.word} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
