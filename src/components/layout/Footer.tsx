"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, Heart, Sparkles, BookOpen, Globe2, ShieldCheck } from "lucide-react";
import { sound } from "@/lib/sound";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sound.playFanfare();
    setSubscribed(true);
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-900 mt-20 relative overflow-hidden">
      {/* Decorative Torii Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-brand-red/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-white font-mincho text-lg font-bold">
                日
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                NIHON<span className="text-brand-red">NEX</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Your modern, anime-inspired Japanese language learning and cultural gateway. Master Japanese from zero to JLPT N1 through gamified lessons with Neko Sensei.
            </p>
            <p className="text-xs text-zinc-500 font-bangla">
              সহজভাবে ও আনন্দ নিয়ে জাপানি ভাষা শিখুন একদম শুরু থেকে।
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-brand-sakura-300">
                <Sparkles size={12} className="text-brand-red" />
                Free for all learners
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
                <Globe2 size={12} />
                Bangla & English
              </span>
            </div>
          </div>

          {/* Quick Learning Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Learning Hub
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn/hiragana" className="hover:text-brand-sakura-300 transition-colors">
                  Hiragana Chart (46)
                </Link>
              </li>
              <li>
                <Link href="/learn/katakana" className="hover:text-brand-sakura-300 transition-colors">
                  Katakana Chart (46)
                </Link>
              </li>
              <li>
                <Link href="/learn/vocabulary" className="hover:text-brand-sakura-300 transition-colors">
                  Vocabulary Bank
                </Link>
              </li>
              <li>
                <Link href="/learn/grammar" className="hover:text-brand-sakura-300 transition-colors">
                  Grammar Patterns
                </Link>
              </li>
              <li>
                <Link href="/learn/kanji" className="hover:text-brand-sakura-300 transition-colors">
                  Essential Kanji
                </Link>
              </li>
            </ul>
          </div>

          {/* JLPT Preparation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              JLPT Roadmaps
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jlpt" className="hover:text-brand-sakura-300 transition-colors">
                  JLPT N5 (Beginner)
                </Link>
              </li>
              <li>
                <Link href="/jlpt" className="hover:text-brand-sakura-300 transition-colors">
                  JLPT N4 (Elementary)
                </Link>
              </li>
              <li>
                <Link href="/jlpt" className="hover:text-brand-sakura-300 transition-colors">
                  JLPT N3 (Intermediate)
                </Link>
              </li>
              <li>
                <Link href="/jlpt" className="hover:text-brand-sakura-300 transition-colors">
                  JLPT N2 (Business Prep)
                </Link>
              </li>
              <li>
                <Link href="/jlpt" className="hover:text-brand-sakura-300 transition-colors">
                  JLPT N1 (Mastery)
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Daily Kanji */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Daily Japanese Tip
            </h4>
            <p className="text-xs text-zinc-400">
              Get one Japanese word & cultural insight delivered to your inbox every morning.
            </p>
            {subscribed ? (
              <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl text-xs text-rose-300 font-semibold">
                🎉 Arigatou! You are subscribed to Daily Nihon Nex!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-red"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-brand-red hover:bg-brand-red-hover text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send size={12} />
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} NIHON NEX (日本ネクス). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-brand-red fill-brand-red" /> for Japanese Language Learners in Bangladesh & Worldwide.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
