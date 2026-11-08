"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Volume2,
  Sparkles,
  Award,
  ArrowRight,
  X
} from "lucide-react";
import { KATAKANA_CHARACTERS } from "@/data/katakana";
import { KanaCharacter } from "@/types";
import { AudioButton } from "@/components/ui/AudioButton";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { sound } from "@/lib/sound";

export default function KatakanaPage() {
  const { language } = useLanguage();
  const { addXP, completeLesson } = useGamification();
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [activeModalChar, setActiveModalChar] = useState<KanaCharacter | null>(null);

  const groups = [
    { id: "all", label: "All 46 (সব)" },
    { id: "a-row", label: "A-Row (ア行)" },
    { id: "ka-row", label: "Ka-Row (カ行)" },
    { id: "sa-row", label: "Sa-Row (サ行)" },
    { id: "ta-row", label: "Ta-Row (タ行)" },
    { id: "na-row", label: "Na-Row (ナ行)" },
    { id: "ha-row", label: "Ha-Row (ハ行)" },
    { id: "ma-row", label: "Ma-Row (マ行)" },
    { id: "ya-row", label: "Ya-Row (ヤ行)" },
    { id: "ra-row", label: "Ra-Row (ラ行)" },
    { id: "wa-row", label: "Wa/N (ワ・ン)" },
  ];

  const filtered =
    selectedGroup === "all"
      ? KATAKANA_CHARACTERS
      : KATAKANA_CHARACTERS.filter((c) => c.group === selectedGroup);

  const handleCharClick = (char: KanaCharacter) => {
    sound.playClick();
    setActiveModalChar(char);
    addXP(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold mb-3">
            <Sparkles size={12} />
            <span>Mastery: Katakana (カタカナ)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
            {language === "bn" ? "কাতাকানা ৪৬ বর্ণমালা" : "Complete 46 Katakana Chart"}
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
            {language === "bn"
              ? "বিদেশি শব্দ, বৈজ্ঞানিক পরিভাষা এবং আধুনিক জাপানি পণ্যের নাম লিখতে কাতাকানা ব্যবহৃত হয়। কফি, ক্যামেরা, হোটেল ইত্যাদি শব্দ পড়তে এটি অপরিহার্য।"
              : "Used primarily for foreign loanwords, menu items, and international names. Click any character to hear pronunciation and explore examples."}
          </p>
        </div>

        <Link
          href="/quiz"
          onClick={() => {
            sound.playClick();
            completeLesson("katakana-intro");
          }}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95"
        >
          <Award size={18} />
          <span>Practice Katakana Quiz</span>
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
                ? "bg-amber-500 text-white shadow-sm"
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
            className="group relative bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-3xl p-5 shadow-sm hover:shadow-card transition-all duration-200 cursor-pointer flex flex-col items-center justify-between min-h-[170px]"
          >
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-400 font-semibold">
                {item.strokeCount} {language === "bn" ? "টান" : "strokes"}
              </span>
              <AudioButton text={item.char} size="sm" />
            </div>

            <div className="my-2 text-center">
              <span className="text-4xl sm:text-5xl font-bold font-japanese text-zinc-900 dark:text-white group-hover:scale-110 transition-transform inline-block">
                {item.char}
              </span>
            </div>

            <div className="w-full pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-sm font-black text-amber-600 font-mono">{item.romaji}</span>
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

      {/* Modal */}
      {activeModalChar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalChar(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-200 dark:border-zinc-800 relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalChar(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-2">
              <div className="inline-block p-4 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200">
                <span className="text-6xl font-black font-japanese text-amber-600">
                  {activeModalChar.char}
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <span className="text-xl font-black font-mono text-zinc-900 dark:text-white">
                  {activeModalChar.romaji}
                </span>
                <span className="text-zinc-400">|</span>
                <span className="text-lg font-bold text-amber-600 font-bangla">
                  {activeModalChar.bangla}
                </span>
                <AudioButton text={activeModalChar.char} size="md" />
              </div>
            </div>

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
                  {language === "bn" ? "বিদেশি শব্দে ব্যবহার (Loanword)" : "Loanword Example"}
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
                <span>Script: Katakana (カタカナ)</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModalChar(null)}
              className="mt-6 w-full py-3 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-sm"
            >
              Understood! (বুঝেছি)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
