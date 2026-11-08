"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Flame,
  Zap,
  Sparkles,
  Medal,
  Crown,
  ArrowRight
} from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { sound } from "@/lib/sound";

export default function LeaderboardPage() {
  const { xp, streak, level } = useGamification();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [league, setLeague] = useState<"weekly" | "all-time">("weekly");

  const currentUserName = user?.name || "You (আপনি)";

  const mockLeaderboard = [
    { rank: 1, name: "Sakura Learner (সাকুরা)", xp: 450, streak: 14, avatar: "🌸", badge: "Gold" },
    { rank: 2, name: "Tanvir Ahmed", xp: 380, streak: 9, avatar: "⛩️", badge: "Silver" },
    { rank: 3, name: "Kenshi_JP", xp: 310, streak: 8, avatar: "🥋", badge: "Bronze" },
    { rank: 4, name: currentUserName, xp: Math.max(xp, 60), streak: streak, avatar: "🐱", isUser: true },
    { rank: 5, name: "Farhana Yasmin", xp: 55, streak: 3, avatar: "🍱" },
    { rank: 6, name: "Tokyo_Bound_2026", xp: 40, streak: 2, avatar: "🚅" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto pb-8">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-500 shadow-sm mb-4">
          <Trophy size={32} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
          {language === "bn" ? "শিক্ষার্থী লিডারবোর্ড" : "Nihon Nex Leaderboard"}
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          {language === "bn"
            ? "প্রতি সপ্তাহে বেশি বেশি এক্সপি (XP) অর্জন করে শীর্ষ স্থানে পৌঁছান এবং বিশেষ ব্যাজ জয় করুন।"
            : "Compete with learners around the world. Top learners advance to the Diamond League each week!"}
        </p>

        {/* Tab Toggle */}
        <div className="mt-6 inline-flex p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => {
              sound.playClick();
              setLeague("weekly");
            }}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              league === "weekly"
                ? "bg-white dark:bg-zinc-900 text-brand-red shadow-sm"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Weekly League
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setLeague("all-time");
            }}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              league === "all-time"
                ? "bg-white dark:bg-zinc-900 text-brand-red shadow-sm"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            All-Time Hall of Fame
          </button>
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm divide-y divide-zinc-100 dark:divide-zinc-800">
        {mockLeaderboard.map((item) => {
          let rankBadge = <span className="font-mono font-bold text-zinc-400">#{item.rank}</span>;
          if (item.rank === 1) {
            rankBadge = <Crown size={22} className="text-amber-500 fill-amber-400" />;
          } else if (item.rank === 2) {
            rankBadge = <Medal size={22} className="text-zinc-400 fill-zinc-300" />;
          } else if (item.rank === 3) {
            rankBadge = <Medal size={22} className="text-amber-700 fill-amber-600" />;
          }

          return (
            <div
              key={item.rank}
              className={`p-4 sm:p-5 flex items-center justify-between transition-colors ${
                item.isUser
                  ? "bg-brand-sakura-50 dark:bg-rose-950/40 border-l-4 border-l-brand-red"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
              }`}
            >
              {/* Rank & User Info */}
              <div className="flex items-center gap-4">
                <div className="w-8 flex items-center justify-center flex-shrink-0">
                  {rankBadge}
                </div>

                <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl flex-shrink-0">
                  {item.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      {item.name}
                    </h3>
                    {item.isUser && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-red text-white">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-0.5">
                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                      <Flame size={12} className="fill-amber-500" />
                      {item.streak} days
                    </span>
                  </div>
                </div>
              </div>

              {/* XP Count */}
              <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400">
                <Zap size={16} className="fill-blue-500" />
                <span>{item.xp} XP</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Encouragement */}
      <div className="mt-8 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
            Want to climb the ranks?
          </h4>
          <p className="text-xs text-zinc-500 mt-0.5">
            Complete daily quizzes and finish Kana lessons to earn +25 XP per module!
          </p>
        </div>
        <Link
          href="/quiz"
          onClick={() => sound.playClick()}
          className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold shadow-sakura flex items-center gap-2"
        >
          <span>Play Quiz Now</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
