"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Layers,
  ArrowRight
} from "lucide-react";
import { GRAMMAR_PATTERNS } from "@/data/grammar";
import { GrammarPattern } from "@/types";
import { AudioButton } from "@/components/ui/AudioButton";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { sound } from "@/lib/sound";

export default function GrammarPage() {
  const { language } = useLanguage();
  const { addXP, completeLesson } = useGamification();
  const [expandedId, setExpandedId] = useState<string>("grammar-1");

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedId(expandedId === id ? "" : id);
    addXP(2);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3">
            <Sparkles size={12} />
            <span>JLPT N5 Grammar Patterns (文法)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
            {language === "bn" ? "সহজ বাংলা ব্যাখ্যায় জাপানি ব্যাকরণ" : "Japanese Grammar Mastery"}
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
            {language === "bn"
              ? "জাপানি ব্যাকরণ কণা (Particles) এবং বাক্য গঠনের নিয়মাবলী। বাংলা ও জাপানি ভাষার গঠন প্রায় একরকম হওয়ায় নিয়মগুলো সহজেই মুখস্থ হয়ে যায়।"
              : "Clear breakdowns of sentence structures, particles (wa, ga, o, ni), and polite forms explained with Bangla and English insights."}
          </p>
        </div>

        <Link
          href="/quiz"
          onClick={() => {
            sound.playClick();
            completeLesson("grammar-1");
          }}
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95"
        >
          <BookOpen size={18} />
          <span>Grammar Quiz</span>
        </Link>
      </div>

      {/* Grammar Cards Accordion */}
      <div className="py-8 space-y-6">
        {GRAMMAR_PATTERNS.map((item, index) => {
          const isOpen = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-3xl border-2 transition-all duration-200 overflow-hidden shadow-sm ${
                isOpen
                  ? "bg-white dark:bg-zinc-900 border-emerald-500 shadow-md"
                  : "bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
              }`}
            >
              {/* Card Title Banner */}
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      isOpen
                        ? "bg-emerald-500 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                    }`}
                  >
                    0{index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {item.jlptLevel}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-japanese text-zinc-900 dark:text-white">
                        {item.pattern}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
                      {language === "bn" ? item.titleBn : item.titleEn}
                    </p>
                  </div>
                </div>

                <div className="text-zinc-400">
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${
                      isOpen ? "transform rotate-180 text-emerald-500" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Collapsible Content */}
              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-6 animate-fade-in">
                  {/* Formula Box */}
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                      Structure / বাক্য গঠন সূত্র:
                    </span>
                    <p className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-white mt-1">
                      {item.structure}
                    </p>
                  </div>

                  {/* Dual Explanations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                      <h4 className="text-xs font-bold text-zinc-500 uppercase mb-1">
                        বাংলা ব্যাখ্যা (Bengali Insight):
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-bangla">
                        {item.explanationBn}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                      <h4 className="text-xs font-bold text-zinc-500 uppercase mb-1">
                        English Explanation:
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {item.explanationEn}
                      </p>
                    </div>
                  </div>

                  {/* Example Sentences */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Example Sentences (উদাহরণ বাক্য):
                    </h4>
                    <div className="space-y-2.5">
                      {item.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/40 flex items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <p className="text-sm sm:text-base font-bold font-japanese text-zinc-900 dark:text-white">
                              {ex.jp}
                            </p>
                            <p className="text-xs font-mono text-zinc-500">{ex.reading}</p>
                            <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 pt-0.5">
                              <span className="font-bangla font-semibold text-emerald-700 dark:text-emerald-400">
                                {ex.bn}
                              </span>
                              <span className="text-zinc-400">•</span>
                              <span className="text-zinc-500">{ex.en}</span>
                            </div>
                          </div>
                          <AudioButton text={ex.jp} size="sm" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
