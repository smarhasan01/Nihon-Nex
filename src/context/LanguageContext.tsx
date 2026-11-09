"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.learn": "Learn Japanese",
    "nav.hiragana": "Hiragana",
    "nav.katakana": "Katakana",
    "nav.vocabulary": "Vocabulary",
    "nav.grammar": "Grammar",
    "nav.kanji": "Kanji",
    "nav.jlpt": "JLPT Hub",
    "nav.quizzes": "Quizzes",
    "nav.dashboard": "Dashboard",
    "nav.leaderboard": "Leaderboard",
    "nav.login": "Log In",
    "nav.signup": "Get Started",
    "nav.profile": "Profile",

    // Hero
    "hero.badge": "🌸 Learn Japanese in Bangla & English",
    "hero.title1": "Your Journey to Japanese",
    "hero.title2": "Starts Here.",
    "hero.subtitle":
      "Master Hiragana, Katakana, Kanji, and JLPT through fun anime-inspired gamified lessons with Neko Sensei. Designed especially for Bengali & global learners.",
    "hero.cta_start": "Start Learning Free",
    "hero.cta_jlpt": "Explore JLPT Roadmap",

    // Gamification
    "game.streak": "Streak",
    "game.xp": "XP",
    "game.hearts": "Hearts",
    "game.level": "Level",
    "game.days": "days",

    // Mascot
    "mascot.greeting": "Konnichiwa! I'm Neko Sensei! Ready to unlock Japan with me today?",
    "mascot.correct": "Sugoi! Excellent job! You're making rapid progress!",
    "mascot.wrong": "Daijoubu! Don't worry! Let's review and try once more!",

    // Dashboard
    "dash.welcome": "Welcome back",
    "dash.daily_goal": "Daily Goal",
    "dash.continue": "Continue Learning",
    "dash.recommended": "Recommended Next Lesson",
    "dash.missions": "Daily Missions",
    "dash.achievements": "Recent Achievements",
    "dash.journey_map": "Your Learning Path",

    // General
    "btn.listen": "Listen",
    "btn.practice": "Practice",
    "btn.next": "Next",
    "btn.check": "Check Answer",
    "btn.finish": "Finish Quiz",
    "btn.retry": "Try Again",
  },
  bn: {
    // Navigation
    "nav.home": "হোম",
    "nav.learn": "জাপানি শিখুন",
    "nav.hiragana": "হিরাগানা",
    "nav.katakana": "কাতাকানা",
    "nav.vocabulary": "শব্দভাণ্ডার",
    "nav.grammar": "ব্যাকরণ",
    "nav.kanji": "কাঞ্জি",
    "nav.jlpt": "JLPT প্রস্তুতি",
    "nav.quizzes": "কুইজ ও অনুশীলন",
    "nav.dashboard": "ড্যাশবোর্ড",
    "nav.leaderboard": "লিডারবোর্ড",
    "nav.login": "লগইন",
    "nav.signup": "শুরু করুন",
    "nav.profile": "প্রোফাইল",

    // Hero
    "hero.badge": "🌸 বাংলায় সহজে জাপানি ভাষা শিক্ষা",
    "hero.title1": "সহজভাবে শিখুন জাপানি ভাষা,",
    "hero.title2": "একদম শুরু থেকে।",
    "hero.subtitle":
      "নেকো সেনসেই-এর সাথে গেমিফাইড পাঠে হিরাগানা, কাতাকানা, কাঞ্জি ও JLPT জয় করুন। বাংলা এবং ইংরেজি দুই মাধ্যমেই শেখার এক অনন্য অভিজ্ঞতা।",
    "hero.cta_start": "বিনা খরচে শুরু করুন",
    "hero.cta_jlpt": "JLPT রোডম্যাপ দেখুন",

    // Gamification
    "game.streak": "ধারাবাহিকতা (Streak)",
    "game.xp": "এক্সপি (XP)",
    "game.hearts": "লাইফ (Hearts)",
    "game.level": "লেভেল",
    "game.days": "দিন",

    // Mascot
    "mascot.greeting": "কোন্নিচিওয়া! আমি নেকো সেনসেই! আজ আমার সাথে জাপানি শেখার জন্য প্রস্তুত?",
    "mascot.correct": "সুগোই! দারুণ হয়েছে! আপনি খুব দ্রুত শিখছেন!",
    "mascot.wrong": "দাইজৌবু! চিন্তা করবেন না! চলুন আরেকবার চেষ্টা করি!",

    // Dashboard
    "dash.welcome": "স্বাগতম",
    "dash.daily_goal": "দৈনিক লক্ষ্য",
    "dash.continue": "শেখা চালিয়ে যান",
    "dash.recommended": "পরবর্তী প্রস্তাবিত পাঠ",
    "dash.missions": "দৈনিক মিশন",
    "dash.achievements": "অর্জিত ব্যাজসমূহ",
    "dash.journey_map": "আপনার শেখার পথ",

    // General
    "btn.listen": "শুনুন",
    "btn.practice": "অনুশীলন",
    "btn.next": "পরবর্তী",
    "btn.check": "উত্তর যাচাই করুন",
    "btn.finish": "কুইজ সম্পন্ন করুন",
    "btn.retry": "আবার চেষ্টা করুন",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("bn"); // Default to Bengali as per project primary audience

  useEffect(() => {
    const saved = localStorage.getItem("nihon_nex_lang") as Language;
    if (saved && (saved === "en" || saved === "bn")) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    } else {
      document.documentElement.lang = "bn";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("nihon_nex_lang", lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
