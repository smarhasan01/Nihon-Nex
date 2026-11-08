"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Clock,
  Layers,
  Award
} from "lucide-react";
import { JLPT_LEVELS } from "@/data/jlpt";
import { useLanguage } from "@/context/LanguageContext";
import { sound } from "@/lib/sound";

export default function JLPTPage() {
  const { language } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<string>("N5");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const currentLevelData = JLPT_LEVELS.find((l) => l.level === selectedLevel) || JLPT_LEVELS[0];

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    sound.playClick();
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
    setShowResults((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto pb-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-sakura-100 dark:bg-rose-950 text-brand-red text-xs font-bold mb-4">
          <GraduationCap size={15} />
          <span>Japanese Language Proficiency Test (日本語能力試験)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white">
          {language === "bn" ? "JLPT N5 থেকে N1 পূর্ণাঙ্গ রোডম্যাপ" : "Complete JLPT Roadmap (N5 to N1)"}
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
          {language === "bn"
            ? "জাপানে পড়াশোনা, স্কলারশিপ বা পেশাগত কাজের জন্য অফিসিয়াল JLPT সনদের স্তরসমূহ, প্রয়োজনীয় কাঞ্জি ও শব্দের সংখ্যা এবং নমুনা প্রশ্ন অনুশীলন।"
            : "The international benchmark for Japanese language certification. Explore difficulty benchmarks, study hours, and test your readiness."}
        </p>
      </div>

      {/* Level Selector Tabs (N5 to N1) */}
      <div className="py-8 flex items-center justify-center gap-3 overflow-x-auto no-scrollbar">
        {JLPT_LEVELS.map((item) => {
          const isSelected = selectedLevel === item.level;
          return (
            <button
              key={item.level}
              onClick={() => {
                sound.playClick();
                setSelectedLevel(item.level);
              }}
              className={`px-5 py-3 rounded-2xl font-black text-sm transition-all duration-200 flex items-center gap-2 shadow-sm ${
                isSelected
                  ? "bg-brand-red text-white shadow-sakura scale-105"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-brand-red"
              }`}
            >
              <span className="text-lg">JLPT {item.level}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  isSelected ? "bg-white/20 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                }`}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Level Detail Panel */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
        {/* Level Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 border-b border-zinc-100 dark:border-zinc-800">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-center">
            <span className="text-xs font-bold text-zinc-400 uppercase">Level Target</span>
            <p className="text-2xl font-black text-brand-red mt-1">JLPT {currentLevelData.level}</p>
            <p className="text-[11px] text-zinc-500 mt-0.5 font-bangla">{currentLevelData.name}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-center">
            <span className="text-xs font-bold text-zinc-400 uppercase">Kanji Count</span>
            <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
              ~{currentLevelData.kanjiCount}
            </p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Joyo Ideograms</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-center">
            <span className="text-xs font-bold text-zinc-400 uppercase">Vocabulary</span>
            <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
              ~{currentLevelData.vocabCount}
            </p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Required words</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-center">
            <span className="text-xs font-bold text-zinc-400 uppercase">Est. Study Hours</span>
            <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
              ~{currentLevelData.studyHours}h
            </p>
            <p className="text-[11px] text-zinc-500 mt-0.5">With Nihon Nex</p>
          </div>
        </div>

        {/* Descriptions & Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              {language === "bn" ? "স্তরের বিবরণ ও উদ্দেশ্য" : "Level Scope & Objectives"}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {language === "bn" ? currentLevelData.descriptionBn : currentLevelData.descriptionEn}
            </p>
            <div className="p-4 rounded-2xl bg-brand-sakura-50 dark:bg-rose-950/20 border border-brand-sakura-200 dark:border-rose-900/40">
              <span className="text-xs font-bold text-brand-red uppercase">Target Audience:</span>
              <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 mt-1">
                {language === "bn"
                  ? currentLevelData.targetAudienceBn
                  : currentLevelData.targetAudienceEn}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              {language === "bn" ? "অর্জিত দক্ষতাসমূহ" : "Key Competencies You Will Master"}
            </h3>
            <div className="space-y-2.5">
              {(language === "bn" ? currentLevelData.skills.bn : currentLevelData.skills.en).map(
                (skill, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Interactive Sample Mock Questions */}
        {currentLevelData.sampleQuestions.length > 0 && (
          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <BookOpen size={18} className="text-brand-red" />
              <span>Sample Practice Questions (নমুনা প্রস্তুতি প্রশ্ন):</span>
            </h3>

            <div className="space-y-6">
              {currentLevelData.sampleQuestions.map((q) => {
                const selected = answers[q.id];
                const isAnswered = showResults[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-5 sm:p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 space-y-4"
                  >
                    <div>
                      <p className="text-base sm:text-lg font-bold font-japanese text-zinc-900 dark:text-white">
                        {q.question}
                      </p>
                      {q.reading && (
                        <p className="text-xs font-mono text-zinc-400 mt-1">{q.reading}</p>
                      )}
                    </div>

                    {/* Option Choices */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle =
                          "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-brand-red text-zinc-800 dark:text-zinc-200";

                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = "bg-emerald-500 text-white border-emerald-600 font-bold";
                          } else if (optIdx === selected) {
                            btnStyle = "bg-rose-500 text-white border-rose-600 font-bold";
                          } else {
                            btnStyle = "opacity-50 border-zinc-200 text-zinc-400";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3.5 rounded-2xl border text-sm font-semibold transition-all text-left flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            <span className="text-xs font-mono opacity-60">0{optIdx + 1}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback and Explanation */}
                    {isAnswered && (
                      <div
                        className={`p-4 rounded-2xl border text-xs sm:text-sm animate-fade-in ${
                          isCorrect
                            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-800 dark:text-emerald-300"
                            : "bg-rose-50 dark:bg-rose-950/30 border-rose-300 text-rose-800 dark:text-rose-300"
                        }`}
                      >
                        <p className="font-bold mb-1">
                          {isCorrect ? "✅ Correct! (সঠিক উত্তর)" : "❌ Incorrect (ভুল উত্তর)"}
                        </p>
                        <p className="leading-relaxed">
                          {language === "bn" ? q.explanationBn : q.explanationEn}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
