"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Volume2,
  Sparkles,
  Search,
  RotateCw,
  Layers,
  BookOpen,
  ArrowRight,
  Filter,
  Star,
  CheckCircle2,
  HelpCircle,
  X,
  Trophy,
  Zap,
  BookmarkCheck,
  Grid3X3,
  List
} from "lucide-react";
import { VOCABULARY_LIST } from "@/data/vocabulary";
import { VocabularyItem, VocabularyCategory } from "@/types";
import { AudioButton } from "@/components/ui/AudioButton";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { useAuth } from "@/context/AuthContext";
import { sound } from "@/lib/sound";

const BOOKMARKS_STORAGE_KEY = "nihon_nex_vocab_bookmarks";

export default function VocabularyPage() {
  const { language } = useLanguage();
  const { addXP, completeLesson } = useGamification();
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeJLPT, setActiveJLPT] = useState<string>("N5");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"flashcard" | "table">("flashcard");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // Vocabulary Quiz State
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<VocabularyItem[]>([]);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load Bookmarks on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    let updated: string[];
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter((b) => b !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  const categories: { id: string; labelEn: string; labelBn: string }[] = [
    { id: "all", labelEn: "All Words", labelBn: "সকল শব্দ" },
    { id: "daily", labelEn: "Daily Conversation", labelBn: "দৈনন্দিন কথোপকথন" },
    { id: "greetings", labelEn: "Greetings", labelBn: "অভিবাদন" },
    { id: "numbers", labelEn: "Numbers & Time", labelBn: "সংখ্যা ও সময়" },
    { id: "family", labelEn: "Family & People", labelBn: "পরিবার ও মানুষ" },
    { id: "food", labelEn: "Food & Drinks", labelBn: "খাবার ও পানীয়" },
    { id: "travel", labelEn: "Travel & Places", labelBn: "ভ্রমণ ও স্থান" },
    { id: "education", labelEn: "Education", labelBn: "শিক্ষা" },
    { id: "business", labelEn: "Business & Work", labelBn: "ব্যবসা ও চাকরি" },
    { id: "verbs", labelEn: "Common Verbs", labelBn: "প্রয়োজনীয় ক্রিয়াপদ" },
    { id: "adjectives", labelEn: "Common Adjectives", labelBn: "প্রয়োজনীয় বিশেষণ" },
  ];

  const jlptLevels = ["N5", "N4", "N3", "N2", "N1"];

  // Filter vocabulary
  const filtered = VOCABULARY_LIST.filter((item) => {
    // JLPT level filter (Currently N5 dataset loaded with 115+ words)
    const matchesJLPT = item.jlptLevel === activeJLPT;
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesBookmark = !onlyBookmarks || bookmarks.includes(item.id);

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.japanese.toLowerCase().includes(query) ||
      item.reading.toLowerCase().includes(query) ||
      (item.kanji && item.kanji.toLowerCase().includes(query)) ||
      item.romaji.toLowerCase().includes(query) ||
      item.meaningEn.toLowerCase().includes(query) ||
      item.meaningBn.toLowerCase().includes(query);

    return matchesJLPT && matchesCategory && matchesBookmark && matchesSearch;
  });

  const toggleFlip = (id: string) => {
    sound.playClick();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    addXP(1);
  };

  // Start 5-Question Vocab Quiz
  const startVocabQuiz = () => {
    sound.playClick();
    const pool = filtered.length >= 5 ? filtered : VOCABULARY_LIST;
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuizQuestions(shuffled);
    setQuizIndex(0);
    setQuizSelectedOption(null);
    setQuizAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
    setQuizModalOpen(true);
  };

  const handleQuizAnswer = (option: string) => {
    if (quizAnswered) return;
    setQuizSelectedOption(option);
    setQuizAnswered(true);

    const currentWord = quizQuestions[quizIndex];
    const isCorrect = option === currentWord.meaningBn || option === currentWord.meaningEn;

    if (isCorrect) {
      sound.playCorrect();
      setQuizScore((prev) => prev + 1);
      addXP(10);
    } else {
      sound.playWrong();
    }
  };

  const handleQuizNext = () => {
    sound.playClick();
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex((prev) => prev + 1);
      setQuizSelectedOption(null);
      setQuizAnswered(false);
    } else {
      setQuizFinished(true);
      sound.playFanfare();
      completeLesson("vocab-n5-quiz");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-brand-red text-xs font-bold mb-2">
            <Sparkles size={12} />
            <span>Mastery: Japanese Vocabulary (単語)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white">
            {language === "bn" ? "জাপানি শব্দভাণ্ডার ব্যাংক" : "Japanese Vocabulary Bank"}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            {language === "bn"
              ? "JLPT N5-এর জন্য প্রয়োজনীয় ১০০টিরও বেশি শব্দ। কাঞ্জি, রিডিং, বাংলা ও ইংরেজি অর্থ, সঠিক অডিও উচ্চারণ এবং উদাহরণ বাক্যসহ সাজানো।"
              : "Comprehensive vocabulary database with Kanji, Furigana readings, native audio, contextual example sentences, and Bangla & English translations."}
          </p>
        </div>

        {/* Action Header Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={startVocabQuiz}
            className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-transform active:scale-95"
          >
            <Trophy size={14} />
            <span>Take Vocab Quiz</span>
          </button>
        </div>
      </div>

      {/* 2. JLPT Level Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {jlptLevels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                sound.playClick();
                setActiveJLPT(lvl);
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeJLPT === lvl
                  ? "bg-white dark:bg-zinc-800 text-brand-red shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              JLPT {lvl}
              {lvl === "N5" && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[9px] rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  {VOCABULARY_LIST.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* View Mode & Bookmarked Filter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setOnlyBookmarks(!onlyBookmarks);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              onlyBookmarks
                ? "bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-300"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            }`}
          >
            <Star size={13} className={onlyBookmarks ? "fill-amber-400 text-amber-400" : ""} />
            <span>Bookmarks ({bookmarks.length})</span>
          </button>

          <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setViewMode("flashcard")}
              title="Flashcard View"
              className={`p-1.5 rounded-lg ${
                viewMode === "flashcard"
                  ? "bg-white dark:bg-zinc-800 text-brand-red shadow-sm"
                  : "text-zinc-400"
              }`}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              title="Table View"
              className={`p-1.5 rounded-lg ${
                viewMode === "table"
                  ? "bg-white dark:bg-zinc-800 text-brand-red shadow-sm"
                  : "text-zinc-400"
              }`}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Search Bar & Categories Horizontal Bar */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search word, Kanji, romaji, or Bangla meaning..."
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-brand-red text-zinc-900 dark:text-white"
          />
        </div>

        {/* Category Pills (10 Categories) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold"
                  : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {language === "bn" ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Vocabulary Word Count Notice */}
      <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
        <span>Showing {filtered.length} entries for JLPT {activeJLPT}</span>
        <span className="hidden sm:inline">💡 Click any card to flip for meaning & translation</span>
      </div>

      {/* 5. Main Content: Flashcard Grid OR Clean Table */}
      {viewMode === "flashcard" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const isFlipped = !!flippedCards[item.id];
            const isBookmarked = bookmarks.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleFlip(item.id)}
                className={`group relative min-h-[230px] rounded-3xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between select-none shadow-sm ${
                  isFlipped
                    ? "bg-rose-50/70 dark:bg-[#161B28] border-brand-red/60"
                    : "bg-white dark:bg-[#121622] border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                {/* Card Top: Category, Audio & Bookmark */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 uppercase tracking-wider">
                    {item.category} • {item.jlptLevel}
                  </span>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => toggleBookmark(item.id, e)}
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Word"}
                      className={`p-1.5 rounded-full transition-colors ${
                        isBookmarked
                          ? "text-amber-500 bg-amber-50 dark:bg-amber-950/60"
                          : "text-zinc-400 hover:text-amber-500"
                      }`}
                    >
                      <Star size={14} className={isBookmarked ? "fill-amber-400" : ""} />
                    </button>
                    <AudioButton text={item.japanese} size="sm" />
                    <button
                      onClick={() => toggleFlip(item.id)}
                      title="Flip card"
                      className="p-1.5 rounded-full text-zinc-400 hover:text-brand-red transition-colors"
                    >
                      <RotateCw size={14} className={isFlipped ? "rotate-180" : ""} />
                    </button>
                  </div>
                </div>

                {/* Card Center: Word Presentation */}
                <div className="my-2 text-center">
                  {!isFlipped ? (
                    <>
                      <h3 className="text-2xl sm:text-3xl font-black font-japanese text-zinc-900 dark:text-white">
                        {item.japanese}
                      </h3>
                      <p className="text-xs font-semibold font-mono text-brand-red mt-1">
                        {item.romaji}
                      </p>
                      <p className="text-xs text-zinc-400 font-japanese mt-0.5">
                        ({item.reading})
                      </p>
                    </>
                  ) : (
                    <div className="text-left space-y-2 animate-fade-in">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-400">
                          বাংলা অর্থ (Bengali Meaning):
                        </span>
                        <p className="text-base font-bold text-zinc-900 dark:text-white font-bangla">
                          {item.meaningBn}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-400">
                          English Meaning:
                        </span>
                        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                          {item.meaningEn}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom: Context Example Sentence */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                  <p className="font-japanese font-medium text-zinc-800 dark:text-zinc-200 truncate">
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
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-[#121622] rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-3.5 w-10"></th>
                  <th className="p-3.5">Word</th>
                  <th className="p-3.5">Reading / Romaji</th>
                  <th className="p-3.5">Bangla Meaning</th>
                  <th className="p-3.5">English Meaning</th>
                  <th className="p-3.5">Example</th>
                  <th className="p-3.5 text-right">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3.5">
                      <button
                        onClick={(e) => toggleBookmark(item.id, e)}
                        className={`text-zinc-400 hover:text-amber-500 ${
                          bookmarks.includes(item.id) ? "text-amber-500" : ""
                        }`}
                      >
                        <Star size={14} className={bookmarks.includes(item.id) ? "fill-amber-400" : ""} />
                      </button>
                    </td>
                    <td className="p-3.5 font-bold font-japanese text-sm text-zinc-900 dark:text-white">
                      {item.japanese}
                    </td>
                    <td className="p-3.5 text-zinc-500">
                      <div>{item.reading}</div>
                      <div className="font-mono text-[10px] text-brand-red">{item.romaji}</div>
                    </td>
                    <td className="p-3.5 font-bold font-bangla text-zinc-800 dark:text-zinc-200">
                      {item.meaningBn}
                    </td>
                    <td className="p-3.5 text-zinc-600 dark:text-zinc-400">
                      {item.meaningEn}
                    </td>
                    <td className="p-3.5 text-zinc-500 max-w-xs truncate font-japanese">
                      {item.exampleSentenceJp}
                    </td>
                    <td className="p-3.5 text-right">
                      <AudioButton text={item.japanese} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. Vocabulary Quiz Modal */}
      {quizModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setQuizModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-[#121622] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-brand-sakura-200 dark:border-zinc-800 relative animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuizModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <X size={18} />
            </button>

            {!quizFinished ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
                  <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
                  <span className="text-brand-red">Score: {quizScore}</span>
                </div>

                {/* Question */}
                <div className="text-center py-2 space-y-2">
                  <div className="inline-block p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                    <span className="text-4xl font-black font-japanese text-zinc-900 dark:text-white">
                      {quizQuestions[quizIndex]?.japanese}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-brand-red">
                    {quizQuestions[quizIndex]?.romaji} ({quizQuestions[quizIndex]?.reading})
                  </p>
                  <div className="pt-1 flex justify-center">
                    <AudioButton text={quizQuestions[quizIndex]?.japanese} size="sm" />
                  </div>
                </div>

                <p className="text-center text-xs font-bold text-zinc-500">
                  {language === "bn"
                    ? "এই শব্দটির সঠিক বাংলা অর্থ কোনটি?"
                    : "What is the meaning of this word?"}
                </p>

                {/* 4 Choices */}
                <div className="space-y-2">
                  {[
                    quizQuestions[quizIndex]?.meaningBn,
                    ...VOCABULARY_LIST.filter((v) => v.id !== quizQuestions[quizIndex]?.id)
                      .slice(0, 3)
                      .map((v) => v.meaningBn),
                  ]
                    .sort(() => 0.5 - Math.random())
                    .map((opt, oIdx) => {
                      const isCorrect = opt === quizQuestions[quizIndex]?.meaningBn;
                      let btnStyle =
                        "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200";

                      if (quizAnswered) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-500 text-white border-emerald-600 font-bold";
                        } else if (opt === quizSelectedOption) {
                          btnStyle = "bg-rose-500 text-white border-rose-600 font-bold";
                        } else {
                          btnStyle = "opacity-40 border-zinc-200 text-zinc-400";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={quizAnswered}
                          onClick={() => handleQuizAnswer(opt)}
                          className={`w-full p-3.5 rounded-2xl border text-sm font-bangla font-semibold text-left transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                </div>

                {/* Next */}
                {quizAnswered && (
                  <button
                    onClick={handleQuizNext}
                    className="w-full py-3 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold shadow-sm transition-transform active:scale-95"
                  >
                    {quizIndex + 1 < quizQuestions.length ? "Next Question" : "Finish Quiz"}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-brand-sakura-100 dark:bg-rose-950 flex items-center justify-center text-brand-red">
                  <Trophy size={32} />
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
                  Vocab Quiz Complete!
                </h3>
                <p className="text-sm text-zinc-500">
                  You scored {quizScore} out of {quizQuestions.length} correct!
                </p>
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-xs font-bold text-blue-600">
                  +{quizScore * 10} XP Earned
                </div>
                <button
                  onClick={() => setQuizModalOpen(false)}
                  className="w-full py-3 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold"
                >
                  Close & Continue Studying
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
