"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Volume2,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  X
} from "lucide-react";
import { HIRAGANA_CHARACTERS } from "@/data/hiragana";
import { KanaCharacter } from "@/types";
import { AudioButton } from "@/components/ui/AudioButton";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { sound } from "@/lib/sound";

export default function HiraganaPage() {
  const { language } = useLanguage();
  const { addXP, completeLesson } = useGamification();
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [activeModalChar, setActiveModalChar] = useState<KanaCharacter | null>(null);

  const groups = [
    { id: "all", label: "All 46 (সব)" },
    { id: "a-row", label: "A-Row (あ行)" },
    { id: "ka-row", label: "Ka-Row (か行)" },
    { id: "sa-row", label: "Sa-Row (さ行)" },
    { id: "ta-row", label: "Ta-Row (た行)" },
    { id: "na-row", label: "Na-Row (な行)" },
    { id: "ha-row", label: "Ha-Row (は行)" },
    { id: "ma-row", label: "Ma-Row (ま行)" },
    { id: "ya-row", label: "Ya-Row (や行)" },
    { id: "ra-row", label: "Ra-Row (ら行)" },
    { id: "wa-row", label: "Wa/N (わ・ん)" },
  ];

  const filtered =
    selectedGroup === "all"
      ? HIRAGANA_CHARACTERS
      : HIRAGANA_CHARACTERS.filter((c) => c.group === selectedGroup);

  const handleCharClick = (char: KanaCharacter) => {
    sound.playClick();
    setActiveModalChar(char);
    addXP(1); // small exploration reward
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sakura-100 dark:bg-rose-950 text-brand-red text-xs font-bold mb-3">
            <Sparkles size={12} />
            <span>Mastery: Hiragana (ひらがな)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
            {language === "bn" ? "হিরাগানা ৪৬ বর্ণমালা" : "Complete 46 Hiragana Chart"}
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
            {language === "bn"
              ? "জাপানি ভাষার প্রথম ও প্রধান বর্ণমালা। প্রতিটি কার্ডে ক্লিক করে শুনুন সঠিক জাপানি উচ্চারণ, বাংলা প্রতিবর্ণ ও মনে রাখার সহজ টেকনিক।"
              : "The foundational script of the Japanese language. Click any character to hear native audio pronunciation, stroke counts, and mnemonic associations."}
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/quiz"
          onClick={() => {
            sound.playClick();
            completeLesson("hiragana-intro");
          }}
          className="px-5 py-3 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm shadow-sakura flex items-center gap-2 transition-transform active:scale-95"
        >
          <Award size={18} />
          <span>Practice Hiragana Quiz</span>
        </Link>
      </div>

      {/* Row Filter Buttons */}
      <div className="py-6 overflow-x-auto flex items-center gap-2 no-scrollbar">
        {groups.map((grp) => (
          <button
            key={grp.id}
            onClick={() => {
              sound.playClick();
              setSelectedGroup(grp.id);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedGroup === grp.id
                ? "bg-brand-red text-white shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {grp.label}
          </button>
        ))}
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filtered.map((item) => (
          <div
            key={item.char}
            onClick={() => handleCharClick(item)}
            className="group relative bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-brand-red dark:hover:border-brand-red rounded-3xl p-5 shadow-sm hover:shadow-kawaii transition-all duration-200 cursor-pointer flex flex-col items-center justify-between min-h-[170px]"
          >
            {/* Top row: Stroke & Audio */}
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-400 font-semibold">
                {item.strokeCount} {language === "bn" ? "টান" : "strokes"}
              </span>
              <AudioButton text={item.char} size="sm" />
            </div>

            {/* Big Character */}
            <div className="my-2 text-center">
              <span className="text-4xl sm:text-5xl font-bold font-japanese text-zinc-900 dark:text-white group-hover:scale-110 transition-transform inline-block">
                {item.char}
              </span>
            </div>

            {/* Phonetic Details */}
            <div className="w-full pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-sm font-black text-brand-red font-mono">{item.romaji}</span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-bangla">
                  {item.bangla}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 truncate mt-0.5">{item.exampleWord}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Character Details Modal */}
      {activeModalChar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalChar(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-brand-sakura-200 dark:border-zinc-800 relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalChar(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <X size={20} />
            </button>

            {/* Character Header */}
            <div className="text-center space-y-2">
              <div className="inline-block p-4 rounded-3xl bg-brand-sakura-50 dark:bg-rose-950/40 border border-brand-sakura-200">
                <span className="text-6xl font-black font-japanese text-brand-red">
                  {activeModalChar.char}
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <span className="text-xl font-black font-mono text-zinc-900 dark:text-white">
                  {activeModalChar.romaji}
                </span>
                <span className="text-zinc-400">|</span>
                <span className="text-lg font-bold text-brand-red font-bangla">
                  {activeModalChar.bangla}
                </span>
                <AudioButton text={activeModalChar.char} size="md" />
              </div>
            </div>

            {/* Details & Mnemonic */}
            <div className="mt-6 space-y-4 text-sm">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                <span className="text-xs font-bold text-zinc-500 uppercase">
                  {language === "bn" ? "মনে রাখার সহজ উপায় (Mnemonic)" : "Memory Mnemonic"}
                </span>
                <p className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 mt-1">
                  💡 {language === "bn" ? activeModalChar.mnemonic.bn : activeModalChar.mnemonic.en}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                <span className="text-xs font-bold text-zinc-500 uppercase">
                  {language === "bn" ? "উদাহরণ শব্দ (Example Word)" : "Example Vocabulary"}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <p className="text-sm font-bold font-japanese text-zinc-900 dark:text-white">
                      {activeModalChar.exampleWord}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {language === "bn"
                        ? activeModalChar.exampleMeaningBn
                        : activeModalChar.exampleMeaningEn}
                    </p>
                  </div>
                  <AudioButton text={activeModalChar.exampleWord} size="sm" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                <span>Strokes: {activeModalChar.strokeCount}</span>
                <span>Script: Hiragana (ひらがな)</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModalChar(null)}
              className="mt-6 w-full py-3 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-sm"
            >
              Got it! (বুঝেছি)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
