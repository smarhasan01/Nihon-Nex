"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Heart,
  Zap,
  Globe,
  Menu,
  X,
  BookOpen,
  Sparkles,
  Trophy,
  User,
  LogOut,
  Moon,
  Sun,
  LayoutDashboard
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { useAuth } from "@/context/AuthContext";
import { sound } from "@/lib/sound";

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { streak, hearts, xp, replenishHearts } = useGamification();
  const { user, signOut, enterDemoMode } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleLanguage = () => {
    sound.playClick();
    setLanguage(language === "en" ? "bn" : "en");
  };

  const toggleTheme = () => {
    sound.playClick();
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { href: "/learn/hiragana", label: t("nav.hiragana") },
    { href: "/learn/katakana", label: t("nav.katakana") },
    { href: "/learn/vocabulary", label: t("nav.vocabulary") },
    { href: "/learn/grammar", label: t("nav.grammar") },
    { href: "/learn/kanji", label: t("nav.kanji") },
    { href: "/jlpt", label: t("nav.jlpt") },
    { href: "/quiz", label: t("nav.quizzes"), badge: "XP" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 group"
        >
          {/* Brand Seal Icon */}
          <div className="w-10 h-10 rounded-2xl bg-brand-red flex items-center justify-center text-white shadow-sakura group-hover:scale-105 transition-transform duration-200">
            <span className="font-mincho text-xl font-bold">日</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white font-sans">
                NIHON<span className="text-brand-red">NEX</span>
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-brand-sakura-100 dark:bg-rose-950 text-brand-red text-[10px] font-semibold">
                日本
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-medium tracking-wide">
              Learn Japanese • Unlock Japan
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => sound.playClick()}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-150 ${
                  isActive
                    ? "text-brand-red bg-brand-sakura-50 dark:bg-rose-950/40"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1 px-1.5 py-0.2 text-[9px] rounded-full bg-brand-red text-white font-bold animate-pulse">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-red rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Counters & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hearts Counter */}
          <button
            onClick={() => {
              if (hearts < 5) replenishHearts();
            }}
            title={hearts < 5 ? "Click to replenish hearts!" : "Full lives!"}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold transition-transform active:scale-95"
          >
            <Heart size={15} className="fill-rose-500 text-rose-500" />
            <span>{hearts}</span>
          </button>

          {/* Streak Counter */}
          <div
            title={`${streak} day streak! Keep it going!`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 text-xs font-bold"
          >
            <Flame size={15} className="fill-amber-500 text-amber-500 animate-pulse" />
            <span>{streak}</span>
          </div>

          {/* XP Counter */}
          <div
            title={`${xp} Total Experience Points`}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold"
          >
            <Zap size={14} className="fill-blue-500 text-blue-500" />
            <span>{xp} XP</span>
          </div>

          {/* Language Switcher (EN / BN) */}
          <button
            onClick={toggleLanguage}
            title="Switch Language (English / বাংলা)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:border-brand-red transition-all"
          >
            <Globe size={14} className="text-brand-red" />
            <span>{language === "en" ? "বাংলা" : "English"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* User Auth or Demo Mode Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold hover:opacity-90"
              >
                <User size={13} />
                <span className="hidden md:inline max-w-[80px] truncate">{user.name}</span>
              </Link>
              <button
                onClick={() => signOut()}
                title="Log Out"
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => enterDemoMode("student")}
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-bold text-brand-red bg-brand-sakura-100 dark:bg-rose-950/60 rounded-xl hover:bg-brand-sakura-200 transition-colors"
              >
                Demo
              </button>
              <Link
                href="/auth/login"
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-brand-red hover:bg-brand-red-hover rounded-xl shadow-sakura transition-all"
              >
                {t("nav.login")}
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-3 pb-6 space-y-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-brand-sakura-50 dark:hover:bg-zinc-900"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-brand-red text-white">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
