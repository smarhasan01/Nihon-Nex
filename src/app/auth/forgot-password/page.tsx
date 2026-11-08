"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playFanfare();
    setSent(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-kawaii space-y-6">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-brand-red transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Login</span>
        </Link>

        <div className="space-y-1">
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white">Reset Password</h1>
          <p className="text-xs text-zinc-500">
            Enter your registered email address and we will send password reset instructions.
          </p>
        </div>

        {sent ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 size={16} />
              <span>Password Reset Link Sent!</span>
            </div>
            <p>
              Please check your inbox at <strong>{email}</strong> for instructions to reset your password.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold shadow-sakura transition-all active:scale-95"
            >
              Send Reset Instructions
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
