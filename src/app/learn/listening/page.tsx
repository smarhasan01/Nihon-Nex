"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Volume2,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react";
import { AudioButton } from "@/components/ui/AudioButton";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { sound } from "@/lib/sound";

export default function ListeningPage() {
  const { language } = useLanguage();
  const { addXP } = useGamification();

  const listeningExercises = [
    {
      id: "listen-1",
      audioPhrase: "すみません、とうきょうえきはどこですか？",
      reading: "Sumimasen, Toukyou eki wa doko desu ka?",
      translationEn: "Excuse me, where is Tokyo Station?",
      translationBn: "মাফ করবেন, টোকিও স্টেশনটি কোথায়?",
      questionEn: "What is the speaker asking for?",
      questionBn: "বক্তা কী জানতে চাচ্ছেন?",
      options: [
        "Directions to Tokyo Station (টোকিও স্টেশনের পথ)",
        "The price of green tea (সবুজ চায়ের দাম)",
        "What time the train departs (ট্রেন ছাড়ার সময়)",
        "Whether they are a teacher (তিনি শিক্ষক কি না)",
      ],
      correctIndex: 0,
      explanationEn: "とうきょうえき (Tokyo Station) + どこ (Where) = Asking for station location.",
      explanationBn: "とうきょうえき (টোকিও স্টেশন) + どこ (কোথায়) নির্দেশ করায় বক্তা স্টেশনের পথ খুঁজছেন।",
    },
    {
      id: "listen-2",
      audioPhrase: "これは にほんの おちゃです。どうぞ のんでください。",
      reading: "Kore wa nihon no ocha desu. Douzo nonde kudasai.",
      translationEn: "This is Japanese green tea. Please, go ahead and drink it.",
      translationBn: "এটি জাপানের সবুজ চা। অনুগ্রহ করে পান করুন।",
      questionEn: "What is being offered to you?",
      questionBn: "আপনাকে কী দেওয়ার প্রস্তাব করা হচ্ছে?",
      options: [
        "A train ticket (ট্রেনের টিকিট)",
        "Japanese green tea (জাপানি সবুজ চা)",
        "A souvenir book (একটি উপহারের বই)",
        "Sushi lunch (সুশি দুপুরের খাবার)",
      ],
      correctIndex: 1,
      explanationEn: "'にほんのおちゃ' means Japanese green tea, and 'のんでください' means please drink.",
      explanationBn: "'にほんのおちゃ' অর্থ জাপানের সবুজ চা এবং 'のんでください' অর্থ অনুগ্রহ করে পান করুন।",
    },
  ];

  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [revealTranscript, setRevealTranscript] = useState(false);

  const current = listeningExercises[activeExerciseIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    sound.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === current.correctIndex) {
      sound.playCorrect();
      addXP(10);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (activeExerciseIndex + 1 < listeningExercises.length) {
      setActiveExerciseIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setRevealTranscript(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-xs font-bold mb-3">
          <Headphones size={14} />
          <span>Listening Comprehension (聴解)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
          {language === "bn" ? "জাপানি শ্রবণ দক্ষতা অনুশীলন" : "Japanese Listening Practice"}
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          {language === "bn"
            ? "অডিও মনোযোগ দিয়ে শুনুন এবং প্রশ্নের সঠিক উত্তর নির্বাচন করুন। প্রয়োজনে ট্র্যান্সক্রিপ্ট উন্মোচন করুন।"
            : "Train your ears to understand native Japanese rhythm, speed, and real conversational nuances."}
        </p>
      </div>

      {/* Main Exercise Card */}
      <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        {/* Audio Player Unit */}
        <div className="p-6 rounded-3xl bg-blue-50/60 dark:bg-zinc-800/60 border border-blue-200 dark:border-zinc-700 text-center space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Audio Track {activeExerciseIndex + 1} of {listeningExercises.length}
          </span>

          <div className="flex items-center justify-center gap-3">
            <AudioButton text={current.audioPhrase} size="lg" label="Play Audio Clip" />
          </div>

          <p className="text-xs text-zinc-400">
            Click as many times as you need to catch the dialogue clearly.
          </p>
        </div>

        {/* Question Prompt */}
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
            {language === "bn" ? current.questionBn : current.questionEn}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              let style =
                "bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 hover:border-blue-500 text-zinc-800 dark:text-zinc-200";

              if (isAnswered) {
                if (optIdx === current.correctIndex) {
                  style = "bg-emerald-500 text-white border-emerald-600 font-bold";
                } else if (isSelected) {
                  style = "bg-rose-500 text-white border-rose-600 font-bold";
                } else {
                  style = "opacity-40 border-zinc-200 text-zinc-400";
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(optIdx)}
                  className={`p-4 rounded-2xl border text-sm font-semibold text-left transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  <span className="text-xs font-mono opacity-50">0{optIdx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation & Transcript Accordion */}
        {isAnswered && (
          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 animate-fade-in">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setRevealTranscript(!revealTranscript)}
                className="text-xs font-bold text-blue-600 flex items-center gap-1.5 hover:underline"
              >
                {revealTranscript ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{revealTranscript ? "Hide Transcript" : "Reveal Japanese Transcript"}</span>
              </button>

              {activeExerciseIndex + 1 < listeningExercises.length && (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  <span>Next Track</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

            {revealTranscript && (
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs sm:text-sm">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Japanese:</span>
                  <p className="font-bold font-japanese text-base text-zinc-900 dark:text-white">
                    {current.audioPhrase}
                  </p>
                  <p className="text-xs font-mono text-zinc-400">{current.reading}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Bangla:</span>
                  <p className="font-bangla font-semibold text-zinc-800 dark:text-zinc-200">
                    {current.translationBn}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
