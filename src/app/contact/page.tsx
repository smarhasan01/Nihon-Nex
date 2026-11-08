"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Course Question");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playFanfare();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sakura-100 dark:bg-rose-950 text-brand-red text-xs font-bold">
          <MessageSquare size={12} />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
          Contact Nihon Nex (お問い合わせ)
        </h1>
        <p className="text-sm text-zinc-500">
          Have questions about Japanese lessons, JLPT preparation, or platform feedback? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-kawaii">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Arigatou! Message Received!
            </h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Thank you, {name}! Our team will review your message and reply to {email} as soon as possible.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                setSubmitted(false);
                setMessage("");
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sakib Rahman"
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sakib@example.com"
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-red"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Topic of Inquiry</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-red"
              >
                <option value="Course Question">Japanese Language Course Question</option>
                <option value="JLPT Guidance">JLPT Roadmap & Study Advice</option>
                <option value="Bug Report">Technical Feedback or Bug Report</option>
                <option value="Partnership">Partnership & Cultural Exchange</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Your Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help your Japanese learning journey today?"
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-red"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white text-sm font-bold shadow-sakura transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Send size={15} />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
