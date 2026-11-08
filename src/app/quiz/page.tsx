"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Zap,
  Heart,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Award
} from "lucide-react";
import { SAMPLE_QUIZZES } from "@/data/interactiveQuizzes";
import { QuizQuestion } from "@/types";
import { NekoSensei } from "@/components/mascot/NekoSensei";
import { AudioButton } from "@/components/ui/AudioButton";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { sound } from "@/lib/sound";

export default function QuizPage() {
  const { language, t } = useLanguage();
  const { addXP, decrementHeart, hearts, replenishHearts } = useGamification();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ: QuizQuestion = SAMPLE_QUIZZES[currentIndex];
  const progressPercent = ((currentIndex + 1) / SAMPLE_QUIZZES.length) * 100;

  const handleSelectOption = (opt: string) => {
    if (isAnswerChecked) return;
    sound.playClick();
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerChecked) return;

    const correct = selectedOption === currentQ.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
      addXP(10, "Correct Quiz Answer");
    } else {
      decrementHeart();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex + 1 < SAMPLE_QUIZZES.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      // Quiz Finished!
      setQuizFinished(true);
      sound.playFanfare();

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#D90016", "#FFB7C5", "#FBBF24", "#3B82F6"],
        });
      } catch {
        // Fallback
      }

      // Bonus XP for perfect score
      if (score + (isCorrect ? 1 : 0) === SAMPLE_QUIZZES.length) {
        addXP(15, "Perfect Quiz Score Bonus");
      }
    }
  };

  const handleRestartQuiz = () => {
    sound.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 min-h-[75vh] flex flex-col justify-center">
      {/* Top Header & Progress */}
      {!quizFinished && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Question {currentIndex + 1} of {SAMPLE_QUIZZES.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-xl">
                <Heart size={14} className="fill-rose-500" />
                {hearts}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-blue-500 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-xl">
                <Zap size={14} className="fill-blue-500" />
                +10 XP
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-red rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* QUIZ INTERFACE */}
      {!quizFinished ? (
        <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-kawaii space-y-6">
          {/* Question Prompt */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-sakura-100 dark:bg-rose-950 text-brand-red uppercase tracking-wider">
                {currentQ.type}
              </span>
              {currentQ.audioText && (
                <AudioButton text={currentQ.audioText} size="sm" label="Play Audio" />
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug">
              {language === "bn" && currentQ.promptBn ? currentQ.promptBn : currentQ.prompt}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              let style =
                "bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 hover:border-brand-red text-zinc-800 dark:text-zinc-200";

              if (isSelected) {
                style = "bg-brand-sakura-50 dark:bg-rose-950/40 border-brand-red text-brand-red font-bold ring-2 ring-brand-sakura-200";
              }

              if (isAnswerChecked) {
                if (opt === currentQ.correctAnswer) {
                  style = "bg-emerald-500 text-white border-emerald-600 font-bold ring-2 ring-emerald-300";
                } else if (isSelected && !isCorrect) {
                  style = "bg-rose-500 text-white border-rose-600 font-bold";
                } else {
                  style = "opacity-40 border-zinc-200 text-zinc-400";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl border text-left font-semibold text-sm sm:text-base transition-all flex items-center justify-between ${style}`}
                >
                  <span className="font-japanese">{opt}</span>
                  <span className="text-xs font-mono opacity-50">0{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Card */}
          {isAnswerChecked && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3 animate-fade-in ${
                isCorrect
                  ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-800 dark:text-emerald-300"
                  : "bg-rose-50 dark:bg-rose-950/30 border-rose-300 text-rose-800 dark:text-rose-300"
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 size={24} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={24} className="text-rose-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-bold text-sm">
                  {isCorrect ? "Sugoi! Correct! (+10 XP)" : "Incorrect! (-1 Life)"}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {language === "bn" ? currentQ.explanationBn : currentQ.explanationEn}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Action Button */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Answer carefully to protect your hearts!</span>

            {!isAnswerChecked ? (
              <button
                disabled={!selectedOption}
                onClick={handleCheckAnswer}
                className={`px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all ${
                  selectedOption
                    ? "bg-brand-red hover:bg-brand-red-hover text-white active:scale-95 shadow-sakura"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {t("btn.check")}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl font-bold text-sm bg-brand-red hover:bg-brand-red-hover text-white shadow-sakura transition-all active:scale-95 flex items-center gap-2"
              >
                <span>{currentIndex + 1 < SAMPLE_QUIZZES.length ? t("btn.next") : t("btn.finish")}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* QUIZ RESULTS SCREEN */
        <div className="bg-white dark:bg-zinc-900 border-2 border-brand-sakura-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-kawaii text-center space-y-6 animate-scale-up">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-sakura-100 dark:bg-rose-950 flex items-center justify-center text-brand-red shadow-sakura">
            <Trophy size={40} />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white">
              Quiz Completed! おめでとう!
            </h2>
            <p className="text-sm text-zinc-500">
              You scored {score} out of {SAMPLE_QUIZZES.length} questions correctly.
            </p>
          </div>

          {/* XP & Score Badge */}
          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-1.5 text-base font-bold text-blue-600">
              <Zap size={18} className="fill-blue-600" />
              <span>+{score * 10} XP Earned</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-600">|</span>
            <div className="flex items-center gap-1 text-base font-bold text-emerald-600">
              <Award size={18} />
              <span>{Math.round((score / SAMPLE_QUIZZES.length) * 100)}% Accuracy</span>
            </div>
          </div>

          {/* Neko Sensei Reaction */}
          <div className="py-2 flex justify-center">
            <NekoSensei
              mood={score >= 4 ? "cheering" : "explaining"}
              size="md"
              message={
                score >= 4
                  ? "অসাধারণ ফলাফল! আপনি খুব দ্রুত জাপানি ভাষা আয়ত্ত করছেন!"
                  : "ভালো চেষ্টা! ভুলগুলো আরেকবার দেখে নিয়ে পুনরায় অনুশীলন করুন!"
              }
            />
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-sm flex items-center gap-2"
            >
              <RotateCcw size={16} />
              <span>{t("btn.retry")}</span>
            </button>
            <Link
              href="/dashboard"
              onClick={() => sound.playClick()}
              className="px-6 py-3 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm shadow-sakura flex items-center gap-2"
            >
              <span>Back to Dashboard</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
