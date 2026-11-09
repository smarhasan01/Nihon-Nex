"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Zap,
  Globe,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Moon,
  Sun,
  LayoutDashboard,
  BookOpen,
  Headphones,
  Mic,
  GraduationCap,
  Sparkles,
  Trophy,
  Bookmark
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { sound } from "@/lib/sound";

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { streak, xp } = useGamification();
  const { user, signOut, enterDemoMode } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLearnDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    sound.playClick();
    setLanguage(language === "en" ? "bn" : "en");
  };

  const learnSubItems = [
    { href: "/learn/hiragana", label: "Hiragana (ひらがな)", desc: "46 foundational phonetic characters", icon: "あ" },
    { href: "/learn/katakana", label: "Katakana (カタカナ)", desc: "46 loanword characters", icon: "カ" },
    { href: "/learn/grammar", label: "Grammar (文法)", desc: "Sentence patterns & particles in Bangla", icon: "⛩️" },
    { href: "/learn/kanji", label: "Essential Kanji (漢字)", desc: "Joyo ideograms & readings", icon: "日" },
    { href: "/learn/listening", label: "Listening (聴解)", desc: "Audio dialogue practice", icon: "🎧" },
    { href: "/learn/speaking", label: "Speaking (会話)", desc: "Pronunciation & accent drills", icon: "🎙️" },
  ];

  const isLearnActive = pathname.startsWith("/learn") && pathname !== "/learn/vocabulary";

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B0E14]/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="font-mincho text-lg font-bold">日</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white font-sans">
                NIHON<span className="text-brand-red">NEX</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-brand-sakura-100 dark:bg-rose-950/60 text-brand-red font-semibold">
                日本
              </span>
            </div>
          </div>
        </Link>

        {/* Streamlined Desktop Navigation (5 Core Items) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* 1. Home */}
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className={`px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-xl transition-all ${
              pathname === "/"
                ? "text-brand-red bg-rose-50 dark:bg-rose-950/40"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            }`}
          >
            {t("nav.home")}
          </Link>

          {/* 2. Learn Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                sound.playClick();
                setLearnDropdownOpen(!learnDropdownOpen);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-xl transition-all ${
                isLearnActive
                  ? "text-brand-red bg-rose-50 dark:bg-rose-950/40"
                  : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              }`}
            >
              <span>{t("nav.learn")}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${learnDropdownOpen ? "rotate-180 text-brand-red" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {learnDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-[#121622] rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-2 space-y-1 animate-fade-in z-50">
                {learnSubItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      sound.playClick();
                      setLearnDropdownOpen(false);
                    }}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                      pathname === item.href
                        ? "bg-rose-50 dark:bg-rose-950/40 text-brand-red"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    <span className="text-base font-bold w-6 text-center">{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold leading-none">{item.label}</p>
                      <p className="text-[11px] text-zinc-400 mt-1">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 3. Vocabulary */}
          <Link
            href="/learn/vocabulary"
            onClick={() => sound.playClick()}
            className={`px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-xl transition-all ${
              pathname === "/learn/vocabulary"
                ? "text-brand-red bg-rose-50 dark:bg-rose-950/40"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            }`}
          >
            {t("nav.vocabulary")}
          </Link>

          {/* 4. JLPT */}
          <Link
            href="/jlpt"
            onClick={() => sound.playClick()}
            className={`px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-xl transition-all ${
              pathname === "/jlpt"
                ? "text-brand-red bg-rose-50 dark:bg-rose-950/40"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            }`}
          >
            {t("nav.jlpt")}
          </Link>

          {/* 5. Practice (Quiz) */}
          <Link
            href="/quiz"
            onClick={() => sound.playClick()}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-xl transition-all ${
              pathname === "/quiz"
                ? "text-brand-red bg-rose-50 dark:bg-rose-950/40"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            }`}
          >
            <span>Practice</span>
            <span className="px-1.5 py-0.2 text-[9px] rounded-full bg-brand-red text-white font-bold">
              Quiz
            </span>
          </Link>
        </nav>

        {/* Right Section: Compact Stats, Language, Theme & Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Streak & XP Pill */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
            <span className="flex items-center gap-1 text-amber-500" title={`${streak} day streak`}>
              <Flame size={14} className="fill-amber-500" />
              <span>{streak}</span>
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <span className="flex items-center gap-1 text-blue-500" title={`${xp} Total XP`}>
              <Zap size={13} className="fill-blue-500" />
              <span>{xp}</span>
            </span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            title="Switch Language (English / বাংলা)"
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:border-brand-red transition-all"
          >
            <Globe size={13} className="text-brand-red" />
            <span className="font-bangla">{language === "en" ? "বাংলা" : "EN"}</span>
          </button>

          {/* Theme Toggle (Connected to ThemeContext) */}
          <button
            onClick={() => {
              sound.playClick();
              toggleTheme();
            }}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
            className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* User Auth or Dashboard / Demo Button */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <Link
                href="/dashboard"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-bold hover:opacity-90 shadow-sm"
              >
                <LayoutDashboard size={13} />
                <span className="hidden lg:inline">{t("nav.dashboard")}</span>
              </Link>
              <button
                onClick={() => signOut()}
                title="Log Out"
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => enterDemoMode("student")}
                className="hidden sm:inline-flex px-2.5 py-1.5 text-xs font-bold text-brand-red bg-rose-50 dark:bg-rose-950/60 rounded-xl hover:bg-rose-100 transition-colors"
              >
                Demo
              </button>
              <Link
                href="/auth/login"
                className="px-3 py-1.5 text-xs font-bold text-white bg-brand-red hover:bg-brand-red-hover rounded-xl shadow-sm transition-all"
              >
                {t("nav.login")}
              </Link>
            </div>
          )}

          {/* Mobile Drawer Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B0E14] px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 text-xs font-bold">
            <Link
              href="/"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-center"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-center"
            >
              Dashboard
            </Link>
            <Link
              href="/learn/vocabulary"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-center text-brand-red font-bold"
            >
              Vocabulary Bank
            </Link>
            <Link
              href="/jlpt"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-center"
            >
              JLPT Roadmaps
            </Link>
            <Link
              href="/quiz"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-center col-span-2"
            >
              Interactive Practice Quizzes
            </Link>
          </div>

          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Learn Modules:
            </p>
            <div className="space-y-1">
              {learnSubItems.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <span className="w-5 text-center">{sub.icon}</span>
                  <span>{sub.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
