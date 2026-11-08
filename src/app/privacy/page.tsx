import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Privacy Policy & Terms</h1>
        <p className="text-xs text-zinc-500">Last updated: November 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-sm text-zinc-600 dark:text-zinc-400 space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">1. Information We Collect</h2>
          <p>
            Nihon Nex respects your privacy. We collect basic account information (such as your name and email address) when you sign up or log in via Supabase Auth or Google OAuth. We also persist your learning progress (XP, streaks, and quiz results) locally and securely on our database.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">2. Educational Content & Rights</h2>
          <p>
            Educational materials on Nihon Nex are designed for open language learning. All original Japanese mnemonics and explanations in Bangla and English are created specifically for the Nihon Nex platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">3. Cookies and Local Storage</h2>
          <p>
            We utilize browser LocalStorage to save your language preference (Bangla/English), dark/light mode preference, and learning streak so you never lose your progress even when offline.
          </p>
        </section>
      </div>
    </div>
  );
}
