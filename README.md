# NIHON NEX 🇯🇵 — Modern Anime-Inspired Japanese Learning Platform

> **Tagline:** Learn Japanese. Unlock Japan.  
> **Bangla Headline:** সহজভাবে শিখুন জাপানি ভাষা, একদম শুরু থেকে।

NIHON NEX is a complete, modern, gamified Japanese language learning web platform designed to take students from absolute zero through JLPT N1. Combining Duolingo-style gamification (XP, streaks, hearts/lives, daily missions, and badges) with an original anime mascot **Neko Sensei (ねこ先生)**, high-fidelity Japanese audio pronunciation, and bilingual explanations in both **Bengali (বাংলা)** and **English**.

---

## 🌟 Key Features

1. **Original Mascot: Neko Sensei (ねこ先生)**
   - Interactive anime cat teacher with emotional state reactions (`happy`, `cheering`, `explaining`, `thinking`, `proud`).
   - Guides learners through lessons, offers mnemonics, and celebrates quiz achievements.
   - 100% original custom vector artwork (free from any copyrighted character constraints).

2. **Full Japanese Kana Matrices**
   - **46 Hiragana (ひらがな):** Stroke counts, audio pronunciation, phonetic romaji, Bengali transliteration, example vocabulary, and memory mnemonics.
   - **46 Katakana (カタカナ):** Dedicated loanword examples (Coffee, Ice cream, Taxi, Cake), audio pronunciation, and stroke visualizer.

3. **Categorized Vocabulary Bank**
   - Categorized by Greetings, Numbers (1-100), Food & Dining, Travel & Transit, and Family.
   - Interactive flip flashcards with Bengali and English meanings and contextual Japanese example sentences.

4. **JLPT N5 Grammar Mastery**
   - Structured formula breakdowns for Japanese particles (`は`, `が`, `を`, `に`, `の`, `か`).
   - Deep-dive explanations in clear Bengali and English.

5. **JLPT N5 to N1 Roadmap**
   - Comprehensive breakdowns of all 5 JLPT levels: Joyo Kanji counts, required vocabulary, study hours, and real practice mock test questions.

6. **Interactive Quiz Engine & Gamification**
   - Multiple choice, character recognition, vocabulary matching, and listening questions with native audio.
   - Real-time score validation, XP rewards (+10 XP per question, +15 XP perfect score bonus), lives deduction (-1 heart on error), confetti celebration animations, and instant Bengali/English explanations.

7. **Duolingo-Style Student Dashboard**
   - Personalized learning path node tree with active/completed milestones.
   - Daily missions with claimable XP rewards.
   - Collectible achievement badges (First Step, Kana Apprentice, 3-Day Streak, Quiz Champion).

8. **Dual Language Interface (বাংলা / English)**
   - Instant language toggle in the navigation bar translating navigation, buttons, instructions, and headlines.

9. **Zero-Latency Web Audio & Native Speech Synthesis**
   - Integrated Web Audio synthesizer for tactile sound effects (correct chime, wrong boop, fanfare) without heavy asset downloads.
   - Browser Web Speech API (`ja-JP`) for native Japanese pronunciation.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** TypeScript 5 (Strict type checking)
- **Styling:** Tailwind CSS with custom Japanese design tokens (Torii red `#D90016`, Sakura pink `#FFB7C5`, Washi cream `#F7F6F2`)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security, Auth SSR)
- **Deployment:** Vercel

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
```bash
cd D:\NihonNex
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project credentials (obtained from your [Supabase Dashboard](https://supabase.com)):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*(Note: If you run the app without Supabase keys, the built-in **Demo Mode** will automatically provide a seamless local learning experience!)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Database Setup

1. Log into your [Supabase Console](https://supabase.com/dashboard).
2. Create a new project named `nihon-nex`.
3. Open the **SQL Editor** from the left sidebar.
4. Copy the entire contents of `supabase/migrations/20261108_nihon_nex_schema.sql` and run it.
5. This script creates:
   - `profiles` table with automated trigger on user sign-up
   - `lessons`, `lesson_progress`, `vocabulary`, `grammar`, `kanji`
   - `quizzes`, `quiz_questions`, `quiz_attempts`
   - `achievements`, `user_achievements`
   - Complete Row Level Security (RLS) policies ensuring student privacy.

---

## 🔐 Google OAuth Setup (Optional)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project and configure the **OAuth consent screen**.
3. Under **Credentials**, create an **OAuth 2.0 Client ID** (Web Application).
4. Set **Authorized redirect URIs** to your Supabase callback URL:
   `https://<your-project-id>.supabase.co/auth/v1/callback`
5. In your **Supabase Dashboard**, navigate to **Authentication -> Providers -> Google**.
6. Paste your Google Client ID and Secret and toggle **Enable Google Provider**.

---

## 📦 Deployment to Vercel

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial Nihon Nex release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nihon-nex.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your `nihon-nex` GitHub repository.
4. Add the environment variables from `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
5. Click **Deploy**!

---

## 📄 License & Credits

Built with ❤️ for Japanese language learners in Bangladesh and worldwide.  
© 2026 **NIHON NEX (日本ネクス)**. All rights reserved.
