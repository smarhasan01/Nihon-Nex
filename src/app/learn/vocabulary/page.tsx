"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Volume2,
  Sparkles,
  Search,
  RotateCw,
  Layers,
  BookOpen,
  ArrowRight,
  Filter
} from "lucide-react";
import { VOCABULARY_LIST } from "@/data/vocabulary";
import { VocabularyItem } from "@/types";
import { AudioButton } from "@/components/ui/AudioButton";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { sound } from "@/lib/sound";

export default function VocabularyPage() {
  const { language } = useLanguage();
  const { addXP, completeLesson } = useGamification();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const categories = [
    { id: "all", label: "All Words (সব)" },
    { id: "greetings", label: "Greetings (অভিবাদন)" },
    { id: "numbers", label: "Numbers (সংখ্যা)" },
    { id: "food", label: "Food & Drinks (খাবার)" },
    { id: "travel", label: "Travel & Transit (ভ্রমণ)" },
    { id: "family", label: "People & Family (মানুষ)" },
  ];

  const filtered = VOCABULARY_LIST.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.japanese.toLowerCase().includes(query) ||
      item.reading.toLowerCase().includes(query) ||
      item.romaji.toLowerCase().includes(query) ||
      item.meaningEn.toLowerCase().includes(query) ||
      item.meaningBn.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const toggleFlip = (id: string) => {
    sound.playClick();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    addXP(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-xs font-bold mb-3">
            <Sparkles size={12} />
            <span>JLPT N5 Core Vocabulary (単語)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
            {language === "bn" ? "প্রয়োজনীয় জাপানি শব্দভাণ্ডার" : "Japanese Vocabulary Bank"}
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
            {language === "bn"
              ? "প্রাত্যহিক জীবনের প্রয়োজনীয় শব্দ, উচ্চারণ ও বাংলা অর্থ। ফ্ল্যাশকার্ডে ক্লিক করে উল্টিয়ে উদাহরণ বাক্য ও অর্থ দেখুন।"
              : "Essential words with native audio, Bengali meanings, and contextual example sentences. Click any card to flip!"}
          </p>
        </div>

        <Link
          href="/quiz"
          onClick={() => {
            sound.playClick();
            completeLesson("vocab-greetings");
          }}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95"
        >
          <BookOpen size={18} />
          <span>Test Vocab Knowledge</span>
        </Link>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="py-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search word, romaji, or Bangla..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 text-zinc-900 dark:text-white"
          />
        </div>
      </div>

      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isFlipped = !!flippedCards[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleFlip(item.id)}
              className={`relative min-h-[220px] rounded-3xl p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-card select-none ${
                isFlipped
                  ? "bg-blue-50/80 dark:bg-zinc-800/80 border-blue-400 dark:border-blue-800"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-blue-400"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 uppercase tracking-wider">
                  {item.category} • {item.jlptLevel}
                </span>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <AudioButton text={item.japanese} size="sm" />
                  <button
                    onClick={() => toggleFlip(item.id)}
                    title="Flip card"
                    className="p-1.5 rounded-full text-zinc-400 hover:text-blue-600 transition-colors"
                  >
                    <RotateCw size={14} className={isFlipped ? "rotate-180" : ""} />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="my-3 text-center">
                {!isFlipped ? (
                  <>
                    <h3 className="text-2xl sm:text-3xl font-black font-japanese text-zinc-900 dark:text-white">
                      {item.japanese}
                    </h3>
                    <p className="text-sm font-semibold font-mono text-blue-600 dark:text-blue-400 mt-1">
                      {item.romaji}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5 font-japanese">
                      ({item.reading})
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-4 italic">
                      Click to flip for Bangla & English meanings
                    </p>
                  </>
                ) : (
                  <div className="text-left space-y-2 animate-fade-in">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-400">Bangla Meaning:</span>
                      <p className="text-lg font-bold text-zinc-900 dark:text-white font-bangla">
                        {item.meaningBn}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-400">English Meaning:</span>
                      <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        {item.meaningEn}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Context sentence */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                <p className="font-japanese font-medium text-zinc-700 dark:text-zinc-300 truncate">
                  {item.exampleSentenceJp}
                </p>
                <p className="text-[11px] text-zinc-500 font-bangla truncate mt-0.5">
                  {language === "bn" ? item.exampleSentenceBn : item.exampleSentenceEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
