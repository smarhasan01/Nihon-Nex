"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Zap,
  BookOpen,
  Volume2,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Layers,
  GraduationCap,
  Star,
  Users
} from "lucide-react";
import { NekoSensei } from "@/components/mascot/NekoSensei";
import { AudioButton } from "@/components/ui/AudioButton";
import { useLanguage } from "@/context/LanguageContext";
import { sound } from "@/lib/sound";

export default function HomePage() {
  const { language, t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const previewKana = [
    { char: "あ", romaji: "a", bn: "আ", word: "朝 (asa - Morning)" },
    { char: "い", romaji: "i", bn: "ই", word: "犬 (inu - Dog)" },
    { char: "う", romaji: "u", bn: "উ", word: "海 (umi - Ocean)" },
    { char: "え", romaji: "e", bn: "এ", word: "駅 (eki - Station)" },
    { char: "お", romaji: "o", bn: "ও", word: "お茶 (ocha - Tea)" },
  ];

  const features = [
    {
      icon: Flame,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
      titleEn: "Gamified Learning Streaks",
      titleBn: "গেমিফাইড ধারাবাহিকতা ও রিওয়ার্ড",
      descEn: "Earn daily XP, maintain streaks, level up your rank, and unlock collectible achievement badges.",
      descBn: "প্রতিদিন এক্সপি (XP) অর্জন করুন, স্ট্রিক বজায় রাখুন এবং অর্জিত ব্যাজ দিয়ে নিজের অগ্রগতি উদযাপন করুন।",
    },
    {
      icon: Volume2,
      color: "text-brand-red bg-rose-50 dark:bg-rose-950/40",
      titleEn: "Native Audio Pronunciation",
      titleBn: "সঠিক উচ্চারণ ও অডিও সাপোর্ট",
      descEn: "Click to listen to authentic Japanese pronunciation for every single Kana, word, and grammar example.",
      descBn: "প্রতিটি বর্ণ, শব্দ এবং বাক্যের সাথে রয়েছে এক ক্লিকে স্পষ্ট জাপানি উচ্চারণ শোনার সুবিধা।",
    },
    {
      icon: BookOpen,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
      titleEn: "Dual Bangla & English Explanations",
      titleBn: "বাংলা ও ইংরেজি সহজ ব্যাখ্যা",
      descEn: "Complex Japanese grammatical particles and nuances explained with relatable Bengali and English examples.",
      descBn: "জাপানি ব্যাকরণের জটিল কণা ও নিয়মাবলী সহজ বাংলা ও ইংরেজি উদাহরণের মাধ্যমে প্রাঞ্জলভাবে উপস্থাপিত।",
    },
    {
      icon: GraduationCap,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
      titleEn: "Complete JLPT N5 to N1 Roadmap",
      titleBn: "JLPT N5 থেকে N1 সম্পূর্ণ প্রস্তুতি",
      descEn: "Structured curriculum tailored for Japanese Language Proficiency Test success and Japan study/work visas.",
      descBn: "জাপানে উচ্চশিক্ষা ও চাকরির জন্য অফিসিয়াল JLPT পরীক্ষার প্রতিটি ধাপের গোছানো সিলেবাস ও প্রস্তুতি।",
    },
  ];

  const faqs = [
    {
      qEn: "Can I start learning with zero prior Japanese knowledge?",
      qBn: "আমি কি পূর্বে কোনো জ্ঞান না থাকলেও একদম শূন্য থেকে শুরু করতে পারব?",
      aEn: "Absolutely! Nihon Nex begins with the absolute basics: Hiragana & Katakana with stroke orders, audio pronunciation, and friendly guidance from Neko Sensei.",
      aBn: "অবশ্যই! নিহন নেক্স তৈরি করা হয়েছে একদম প্রারম্ভিক শিক্ষার্থীদের কথা মাথায় রেখে। হিরাগানা ও কাতাকানা থেকে শুরু করে উচ্চারণ ও সহজ বাংলায় দিকনির্দেশনা রয়েছে।",
    },
    {
      qEn: "Why is Japanese explained in Bangla here?",
      qBn: "এখানে কেন বাংলায় জাপানি ভাষা ব্যাখ্যা করা হয়েছে?",
      aEn: "Bengali and Japanese share remarkable grammatical similarities (Subject-Object-Verb word order). Explaining Japanese through Bangla makes sentence construction naturally intuitive!",
      aBn: "বাংলা এবং জাপানি ভাষার বাক্য গঠনের কাঠামোতে (SOV - কর্তা-কর্ম-ক্রিয়া) চমৎকার মিল রয়েছে। ফলে বাংলা ভাষায় জাপানি শিখলে নিয়মগুলো খুব দ্রুত ও স্বাভাবিকভাবে আয়ত্ত করা যায়!",
    },
    {
      qEn: "Is Nihon Nex completely free?",
      qBn: "নিহন নেক্স প্ল্যাটফর্মটি কি সম্পূর্ণ বিনামূল্যে?",
      aEn: "Yes! All beginner lessons, Hiragana, Katakana, vocabulary lists, and practice quizzes are 100% free for all students.",
      aBn: "হ্যাঁ! প্রাথমিক সব পাঠ, হিরাগানা, কাতাকানা, শব্দভাণ্ডার এবং অনুশীলন কুইজ সকল শিক্ষার্থীর জন্য সম্পূর্ণ বিনামূল্যে উন্মুক্ত।",
    },
    {
      qEn: "How does the gamification system work?",
      qBn: "গেমিফিকেশন এবং পয়েন্ট সিস্টেম কীভাবে কাজ করে?",
      aEn: "Every completed lesson and correct quiz gives you XP points. Maintain consecutive days for streaks, manage your hearts (lives), and level up your rank!",
      aBn: "প্রতিটি সম্পন্ন করা পাঠ ও কুইজ থেকে আপনি এক্সপি (XP) পাবেন। প্রতিদিন অনুশীলনের মাধ্যমে স্ট্রিক চালু রাখুন এবং নতুন নতুন ব্যাজ অর্জন করুন!",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle decorative background circles */}
        <div className="absolute top-1/4 right-5 w-72 h-72 bg-brand-sakura-100 dark:bg-rose-950/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-5 w-80 h-80 bg-blue-100 dark:bg-blue-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-sakura-100 dark:bg-rose-950/60 border border-brand-sakura-300 dark:border-rose-900/60 text-brand-red text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles size={15} />
              <span>{t("hero.badge")}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              {language === "bn" ? (
                <>
                  <span className="font-bangla text-zinc-900 dark:text-white">
                    সহজভাবে শিখুন জাপানি ভাষা,
                  </span>
                  <br />
                  <span className="text-brand-red font-bangla">একদম শুরু থেকে।</span>
                </>
              ) : (
                <>
                  <span>Your Journey to Japanese</span>
                  <br />
                  <span className="text-brand-red">Starts Here.</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/learn/hiragana"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm sm:text-base shadow-sakura hover:shadow-lg transition-all transform active:scale-95"
              >
                <span>{t("hero.cta_start")}</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/jlpt"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-red dark:hover:border-brand-red text-zinc-800 dark:text-zinc-200 font-bold text-sm sm:text-base shadow-sm transition-all"
              >
                <GraduationCap size={18} className="text-brand-red" />
                <span>{t("hero.cta_jlpt")}</span>
              </Link>
            </div>

            {/* Stats Micro-Bar */}
            <div className="pt-6 flex items-center gap-6 text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>46 Hiragana + 46 Katakana</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>JLPT N5-N1 Syllabus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>100% Free</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Neko Sensei & Live Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Mascot Showcase Card */}
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border-2 border-brand-sakura-200 dark:border-zinc-800 rounded-3xl p-6 shadow-kawaii relative">
              {/* Floating Japanese Stamp */}
              <div className="absolute -top-4 -right-3 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles size={12} />
                <span>ねこ先生 • Neko Sensei</span>
              </div>

              {/* Neko Sensei with dynamic message */}
              <div className="flex flex-col items-center justify-center pt-2">
                <NekoSensei
                  mood="cheering"
                  size="lg"
                  message={
                    language === "bn"
                      ? "কোন্নিচিওয়া! আমার সাথে আজই জাপানি ভাষা শেখা শুরু করুন!"
                      : "Konnichiwa! Ready to master Japanese together today?"
                  }
                />
              </div>

              {/* Interactive Audio Character Teaser */}
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                  Click to hear Japanese vowels:
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {previewKana.map((item) => (
                    <div
                      key={item.char}
                      className="flex flex-col items-center p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 hover:border-brand-red transition-all group cursor-pointer"
                    >
                      <span className="text-xl font-bold font-japanese text-zinc-900 dark:text-white">
                        {item.char}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">{item.romaji}</span>
                      <div className="mt-1">
                        <AudioButton text={item.char} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LEARNING JOURNEY PREVIEW (Duolingo Style Pathway) */}
      <section className="py-16 bg-brand-off-white dark:bg-zinc-950/60 border-y border-zinc-200/80 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
              {language === "bn" ? "শেখার রোডম্যাপ ও অগ্রগতি" : "Step-by-Step Learning Journey"}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2">
              {language === "bn"
                ? "ধাপে ধাপে সহজ পাঠে হিরাগানা থেকে শুরু করে উচ্চতর জাপানি ভাষায় দক্ষতা অর্জন করুন।"
                : "A gamified pathway that guides you from your first character to fluent Japanese."}
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Hiragana (ひらがな)",
                descEn: "46 basic phonetics, stroke orders, and everyday native Japanese words.",
                descBn: "৪৬টি মৌলিক বর্ণ, লেখার নিয়ম ও দৈনন্দিন জাপানি শব্দ।",
                href: "/learn/hiragana",
                badge: "Start Here",
                color: "border-brand-red",
              },
              {
                step: "02",
                title: "Katakana (カタカナ)",
                descEn: "Loanwords, foreign names, and menu items (Coffee, Ice Cream, Taxi).",
                descBn: "বিদেশি শব্দ, নাম এবং রেস্তোরাঁর মেনু পড়ার বর্ণমালা।",
                href: "/learn/katakana",
                badge: "Step 2",
                color: "border-amber-500",
              },
              {
                step: "03",
                title: "Vocabulary & Grammar",
                descEn: "Essential sentence patterns, particles (は, を, に), and Bangla explanations.",
                descBn: "প্রয়োজনীয় শব্দভাণ্ডার, ব্যাকরণ কণা ও সহজ বাংলা ব্যাখ্যা।",
                href: "/learn/grammar",
                badge: "Step 3",
                color: "border-blue-500",
              },
              {
                step: "04",
                title: "JLPT N5 Preparation",
                descEn: "Practice mock questions, reading drills, and exam-readiness tests.",
                descBn: "অফিসিয়াল সিলেবাসের আলোকে মক টেস্ট ও পরীক্ষার প্রস্তুতি।",
                href: "/jlpt",
                badge: "Exam Goal",
                color: "border-emerald-500",
              },
            ].map((node) => (
              <Link
                key={node.step}
                href={node.href}
                onClick={() => sound.playClick()}
                className="group relative bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-brand-red dark:hover:border-brand-red rounded-3xl p-6 shadow-card hover:shadow-kawaii transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black font-mono text-zinc-300 dark:text-zinc-700 group-hover:text-brand-red transition-colors">
                      {node.step}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-sakura-100 dark:bg-rose-950 text-brand-red">
                      {node.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-brand-red transition-colors">
                    {node.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                    {language === "bn" ? node.descBn : node.descEn}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-red">
                  <span>Explore Lesson</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase">
            Why Nihon Nex?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white mt-2">
            {language === "bn"
              ? "জাপানি ভাষা শেখার সেরা প্ল্যাটফর্ম"
              : "Everything You Need to Master Japanese"}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
            Designed to make language acquisition delightful, culturally immersive, and genuinely practical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-card transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${feat.color} flex items-center justify-center mb-5`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                  {language === "bn" ? feat.titleBn : feat.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {language === "bn" ? feat.descBn : feat.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. GAMIFICATION CALLOUT (Hearts, XP, Streak) */}
      <section className="py-16 bg-gradient-to-br from-brand-sakura-100/60 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                Gamified Motivation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
                {language === "bn"
                  ? "খেলার ছলে শিখুন, প্রতিদিন বাড়ান স্ট্রিক!"
                  : "Learning Feels Like a Game, Not a Chore."}
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {language === "bn"
                  ? "প্রতিটি পাঠে রয়েছে লাইফ (Hearts), সঠিক উত্তরে এক্সপি (XP), এবং প্রতিদিন চর্চায় স্ট্রিক রাখার চ্যালেঞ্জ। পিছিয়ে পড়ার কোনো সুযোগ নেই!"
                  : "Stay engaged with hearts, level progression, and daily missions. Build a strong habit that leads to permanent language retention."}
              </p>
              <div className="pt-2">
                <Link
                  href="/quiz"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-sm shadow-md hover:opacity-90 transition-all"
                >
                  <Zap size={16} className="text-amber-400" />
                  <span>Try a Quick Practice Quiz</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-500 mb-2">
                  <Flame size={20} className="fill-amber-500" />
                </div>
                <span className="text-2xl font-black text-zinc-900 dark:text-white">Daily Streak</span>
                <p className="text-xs text-zinc-500 mt-1">Consistency creates fluency</p>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-500 mb-2">
                  <Zap size={20} className="fill-blue-500" />
                </div>
                <span className="text-2xl font-black text-zinc-900 dark:text-white">XP Rewards</span>
                <p className="text-xs text-zinc-500 mt-1">Level up with each completed quiz</p>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-500 mb-2">
                  <Award size={20} className="text-rose-500" />
                </div>
                <span className="text-2xl font-black text-zinc-900 dark:text-white">Badges</span>
                <p className="text-xs text-zinc-500 mt-1">Unlock anime achievement trophies</p>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-500 mb-2">
                  <Users size={20} className="text-emerald-500" />
                </div>
                <span className="text-2xl font-black text-zinc-900 dark:text-white">Leaderboards</span>
                <p className="text-xs text-zinc-500 mt-1">Learn alongside fellow enthusiasts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS (Clearly Labeled Sample Content as instructed) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Community Voices (Sample Student Experiences)
          </span>
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white mt-1">
            Loved by Learners Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Tanvir Ahmed",
              role: "JLPT N5 Aspirant, Dhaka",
              review:
                "Having Bangla explanations side-by-side with Japanese particles changed everything for me. It finally clicked why 'wa' and 'ga' are different!",
              avatar: "👨‍🎓",
            },
            {
              name: "Sumaiya Akter",
              role: "Tokyo Language School Applicant",
              review:
                "Neko Sensei's quizzes and the audio playback make memorizing Hiragana and Katakana genuinely fun instead of a chore.",
              avatar: "👩‍💼",
            },
            {
              name: "Rezaul Karim",
              role: "Anime & Manga Enthusiast",
              review:
                "I started just to understand anime dialogue without subtitles, and within 3 weeks I can already read all the Katakana signs in Tokyo videos!",
              avatar: "🌸",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-full bg-brand-sakura-100 dark:bg-zinc-800 flex items-center justify-center text-lg">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{item.name}</h4>
                  <p className="text-[11px] text-zinc-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
              {language === "bn" ? "সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveFaq(isOpen ? null : idx);
                    }}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-sm sm:text-base font-bold text-zinc-900 dark:text-white hover:text-brand-red transition-colors"
                  >
                    <span>{language === "bn" ? faq.qBn : faq.qEn}</span>
                    <ChevronDown
                      size={18}
                      className={`text-zinc-400 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180 text-brand-red" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
                      {language === "bn" ? faq.aBn : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM BANNER CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-brand-red text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-sakura">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              Start Today
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              {language === "bn"
                ? "জাপানের স্বপ্ন আজ থেকেই শুরু হোক।"
                : "Ready to Start Your Japanese Adventure?"}
            </h2>
            <p className="text-sm sm:text-base text-rose-100 leading-relaxed">
              Join thousands of learners mastering Hiragana, Katakana, and JLPT with Nihon Nex. It takes just 10 minutes a day.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/learn/hiragana"
                onClick={() => sound.playFanfare()}
                className="px-6 py-3.5 rounded-2xl bg-white text-brand-red font-bold text-sm sm:text-base hover:bg-rose-50 shadow-lg transition-transform active:scale-95"
              >
                Begin Lesson 1 Free
              </Link>
              <Link
                href="/dashboard"
                onClick={() => sound.playClick()}
                className="px-6 py-3.5 rounded-2xl bg-brand-red-hover border border-white/30 text-white font-bold text-sm sm:text-base hover:bg-black/20 transition-all"
              >
                Open Student Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
