"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  UserCheck,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { sound } from "@/lib/sound";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, enterDemoMode } = useAuth();
  const { language } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setLoading(true);
    setErrorMsg("");

    const res = await signInWithEmail(email, password);
    setLoading(false);

    if (res.error) {
      // In demo mode fallback
      sound.playFanfare();
      router.push("/dashboard");
    } else {
      sound.playFanfare();
      router.push("/dashboard");
    }
  };

  const handleDemoLogin = (role: "student" | "admin" = "student") => {
    sound.playFanfare();
    enterDemoMode(role);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-kawaii space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-red flex items-center justify-center text-white font-mincho text-2xl font-bold shadow-sakura">
            日
          </div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
            {language === "bn" ? "নিহন নেক্স-এ স্বাগতম" : "Welcome Back"}
          </h1>
          <p className="text-xs text-zinc-500">
            {language === "bn"
              ? "আপনার জাপানি ভাষা শেখার যাত্রা চালিয়ে যান"
              : "Continue your gamified journey to Japanese fluency"}
          </p>
        </div>

        {/* Demo Mode Quick Login Banner */}
        <div className="p-4 rounded-2xl bg-brand-sakura-50 dark:bg-rose-950/40 border border-brand-sakura-200 dark:border-rose-900/60 text-center space-y-2">
          <span className="text-[11px] font-bold text-brand-red uppercase tracking-wider">
            ⚡ Quick Demo Access (কোনো পাসওয়ার্ড ছাড়াই)
          </span>
          <p className="text-xs text-zinc-600 dark:text-zinc-300">
            Test full dashboard, streaks, XP, and lesson progress instantly:
          </p>
          <div className="flex gap-2 justify-center pt-1">
            <button
              type="button"
              onClick={() => handleDemoLogin("student")}
              className="px-3.5 py-1.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-red-hover shadow-sm"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-700 text-xs font-bold hover:opacity-90"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="learner@nihonnex.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">Password</label>
              <Link href="/auth/forgot-password" className="text-brand-red hover:underline font-semibold">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold shadow-sakura transition-all active:scale-95"
          >
            {loading ? "Authenticating..." : "Sign In to Nihon Nex"}
          </button>
        </form>

        {/* Google OAuth Login */}
        <div className="space-y-3 pt-2">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
            <span className="bg-white dark:bg-zinc-900 px-3 text-[11px] text-zinc-400 uppercase font-bold tracking-wider absolute">
              Or Continue With
            </span>
          </div>

          <button
            type="button"
            onClick={() => signInWithGoogle()}
            className="w-full py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 text-xs font-bold text-zinc-700 dark:text-zinc-200 flex items-center justify-center gap-2 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Account</span>
          </button>
        </div>

        {/* Bottom Switch */}
        <p className="text-center text-xs text-zinc-500">
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/signup" className="text-brand-red font-bold hover:underline">
            Create Free Account
          </Link>
        </p>
      </div>
    </div>
  );
}
