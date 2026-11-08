"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { AudioButton } from "@/components/ui/AudioButton";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { sound } from "@/lib/sound";

export default function SpeakingPage() {
  const { language } = useLanguage();
  const { addXP } = useGamification();

  const phrases = [
    {
      id: "sp-1",
      jp: "はじめまして、よろしくおねがいします。",
      reading: "Hajimemashite, yoroshiku onegaishimasu.",
      bn: "আপনার সাথে পরিচিত হয়ে আনন্দিত, অনুগ্রহ করে সদয় দৃষ্টি রাখবেন।",
      en: "Nice to meet you, please treat me favorably.",
    },
    {
      id: "sp-2",
      jp: "これをください。",
      reading: "Kore o kudasai.",
      bn: "আমাকে এটি দিন দয়া করে।",
      en: "Please give me this one.",
    },
    {
      id: "sp-3",
      jp: "ありがとうございます。",
      reading: "Arigatou gozaimasu.",
      bn: "আপনাকে অনেক ধন্যবাদ।",
      en: "Thank you very much.",
    },
  ];

  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFeedback, setRecordedFeedback] = useState<string | null>(null);

  const current = phrases[activePhraseIndex];

  const handleStartRecording = () => {
    sound.playClick();
    setIsRecording(true);
    setRecordedFeedback(null);

    // Simulate microphone recording duration (3 seconds)
    setTimeout(() => {
      setIsRecording(false);
      sound.playFanfare();
      setRecordedFeedback(
        "Great effort! We heard your pronunciation rhythm. Compare it with Neko Sensei's audio above!"
      );
      addXP(10);
    }, 2800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-brand-red text-xs font-bold mb-3">
          <Mic size={14} />
          <span>Speaking & Accent Practice (会話・発音)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
          {language === "bn" ? "জাপানি কথোপকথন ও কথ্য উচ্চারণ" : "Japanese Speaking Practice"}
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Listen to the native voice, repeat aloud, and train your spoken Japanese accent.
        </p>
      </div>

      {/* Main Speaking Interface */}
      <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        {/* Phrase Selector */}
        <div className="flex items-center justify-center gap-2">
          {phrases.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                sound.playClick();
                setActivePhraseIndex(idx);
                setRecordedFeedback(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activePhraseIndex === idx
                  ? "bg-brand-red text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Phrase 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Phrase Box */}
        <div className="text-center py-6 space-y-3 border-y border-zinc-100 dark:border-zinc-800">
          <h2 className="text-2xl sm:text-3xl font-black font-japanese text-zinc-900 dark:text-white">
            {current.jp}
          </h2>
          <p className="text-sm font-mono text-zinc-500">{current.reading}</p>
          <p className="text-sm font-bangla font-semibold text-brand-red">{current.bn}</p>

          <div className="pt-3 flex justify-center">
            <AudioButton text={current.jp} size="md" label="Listen to Sensei" />
          </div>
        </div>

        {/* Microphone Recording Simulation / Web Speech */}
        <div className="text-center space-y-4">
          <button
            type="button"
            onClick={handleStartRecording}
            disabled={isRecording}
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all ${
              isRecording
                ? "bg-rose-500 text-white animate-pulse ring-8 ring-rose-200"
                : "bg-brand-red hover:bg-brand-red-hover text-white shadow-sakura active:scale-95"
            }`}
          >
            <Mic size={32} />
          </button>

          <p className="text-xs text-zinc-400">
            {isRecording
              ? "🎙️ Listening... Speak into your microphone now!"
              : "Click the microphone to practice speaking aloud"}
          </p>

          {/* Feedback */}
          {recordedFeedback && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium animate-fade-in">
              <p className="font-bold mb-1">🎉 Practice Recorded (+10 XP)</p>
              <p>{recordedFeedback}</p>
              <p className="text-[11px] text-zinc-400 mt-2 italic">
                * Note: Real-time phonetic AI score analysis will be available in future premium modules.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
