"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Achievement, DailyMission, GamificationState } from "@/types";
import { sound } from "@/lib/sound";

interface GamificationContextType extends GamificationState {
  addXP: (amount: number, reason?: string) => void;
  decrementHeart: () => boolean; // returns false if out of hearts
  replenishHearts: () => void;
  completeLesson: (lessonId: string) => void;
  claimMission: (missionId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-step",
    titleEn: "First Step (初めの一歩)",
    titleBn: "প্রথম পদক্ষেপ",
    descEn: "Complete your very first Japanese lesson",
    descBn: "আপনার প্রথম জাপানি ভাষার পাঠ সম্পন্ন করুন",
    icon: "🌸",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: "hiragana-apprentice",
    titleEn: "Kana Apprentice",
    titleBn: "কানা শিক্ষানবিস",
    descEn: "Learn 10 Hiragana or Katakana characters",
    descBn: "১০টি হিরাগানা বা কাতাকানা বর্ণ শিখুন",
    icon: "🎴",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: "streak-3",
    titleEn: "Dedication Trio",
    titleBn: "অটল সাধক",
    descEn: "Maintain a 3-day learning streak",
    descBn: "টানা ৩ দিন শেখার ধারাবাহিকতা বজায় রাখুন",
    icon: "🔥",
    unlocked: false,
    progress: 1,
    maxProgress: 3,
  },
  {
    id: "quiz-master",
    titleEn: "Quiz Champion",
    titleBn: "কুইজ বিজয়ী",
    descEn: "Score 100% on any practice quiz",
    descBn: "যেকোনো কুইজে ১০০% সঠিক উত্তর দিন",
    icon: "👑",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: "vocab-collector",
    titleEn: "Word Collector",
    titleBn: "শব্দ সংগ্রাহক",
    descEn: "Master 15 Japanese vocabulary words",
    descBn: "১৫টি জাপানি শব্দ আত্মস্থ করুন",
    icon: "📚",
    unlocked: false,
    progress: 0,
    maxProgress: 15,
  },
];

const DEFAULT_MISSIONS: DailyMission[] = [
  {
    id: "mission-xp",
    titleEn: "Earn 30 XP today",
    titleBn: "আজকে ৩০ এক্সপি (XP) অর্জন করুন",
    xpReward: 15,
    completed: false,
    current: 0,
    target: 30,
  },
  {
    id: "mission-lesson",
    titleEn: "Complete 1 full lesson",
    titleBn: "১টি সম্পূর্ণ পাঠ সম্পন্ন করুন",
    xpReward: 20,
    completed: false,
    current: 0,
    target: 1,
  },
  {
    id: "mission-quiz",
    titleEn: "Ace 1 interactive quiz",
    titleBn: "১টি কুইজে অংশগ্রহণ করুন",
    xpReward: 25,
    completed: false,
    current: 0,
    target: 1,
  },
];

const STORAGE_KEY = "nihon_nex_gamification_v1";

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GamificationState>({
    xp: 60,
    level: 1,
    streak: 1,
    lastActiveDate: new Date().toISOString().split("T")[0],
    hearts: 5,
    maxHearts: 5,
    completedLessons: ["hiragana-intro"],
    achievements: DEFAULT_ACHIEVEMENTS,
    dailyMissions: DEFAULT_MISSIONS,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({
          ...prev,
          ...parsed,
          // Calculate streak check
          level: Math.floor((parsed.xp || 0) / 100) + 1,
        }));
      }
    } catch {
      // LocalStorage error fallback
    }
  }, []);

  // Sync to localStorage
  const saveState = (newState: GamificationState) => {
    setState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // Fallback
    }
  };

  const addXP = (amount: number) => {
    const newXP = state.xp + amount;
    const oldLevel = state.level;
    const newLevel = Math.floor(newXP / 100) + 1;

    // Check level up
    if (newLevel > oldLevel) {
      sound.playFanfare();
    } else {
      sound.playCorrect();
    }

    // Update daily mission progress
    const updatedMissions = state.dailyMissions.map((m) => {
      if (m.id === "mission-xp") {
        const current = Math.min(m.target, m.current + amount);
        return { ...m, current, completed: current >= m.target };
      }
      return m;
    });

    saveState({
      ...state,
      xp: newXP,
      level: newLevel,
      dailyMissions: updatedMissions,
    });
  };

  const decrementHeart = (): boolean => {
    if (state.hearts <= 1) {
      sound.playWrong();
      saveState({ ...state, hearts: 0 });
      return false;
    }
    sound.playWrong();
    saveState({ ...state, hearts: state.hearts - 1 });
    return true;
  };

  const replenishHearts = () => {
    sound.playFanfare();
    saveState({ ...state, hearts: state.maxHearts });
  };

  const completeLesson = (lessonId: string) => {
    if (state.completedLessons.includes(lessonId)) {
      // already completed, small bonus XP
      addXP(5);
      return;
    }

    const newCompleted = [...state.completedLessons, lessonId];
    sound.playFanfare();

    // Check first lesson achievement
    const updatedAchievements = state.achievements.map((ach) => {
      if (ach.id === "first-step") {
        return { ...ach, unlocked: true, progress: 1 };
      }
      if (ach.id === "hiragana-apprentice" && (lessonId.includes("hiragana") || lessonId.includes("katakana"))) {
        const prog = Math.min(ach.maxProgress, ach.progress + 1);
        return { ...ach, progress: prog, unlocked: prog >= ach.maxProgress };
      }
      return ach;
    });

    // Check daily mission
    const updatedMissions = state.dailyMissions.map((m) => {
      if (m.id === "mission-lesson") {
        return { ...m, current: 1, completed: true };
      }
      return m;
    });

    const newXP = state.xp + 25; // +25 XP for first completion
    const newLevel = Math.floor(newXP / 100) + 1;

    saveState({
      ...state,
      xp: newXP,
      level: newLevel,
      completedLessons: newCompleted,
      achievements: updatedAchievements,
      dailyMissions: updatedMissions,
    });
  };

  const claimMission = (missionId: string) => {
    const mission = state.dailyMissions.find((m) => m.id === missionId);
    if (!mission || !mission.completed) return;

    addXP(mission.xpReward);
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return state.completedLessons.includes(lessonId);
  };

  return (
    <GamificationContext.Provider
      value={{
        ...state,
        addXP,
        decrementHeart,
        replenishHearts,
        completeLesson,
        claimMission,
        isLessonCompleted,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error("useGamification must be used within a GamificationProvider");
  }
  return context;
}
