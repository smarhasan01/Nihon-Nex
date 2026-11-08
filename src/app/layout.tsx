import type { Metadata } from "next";
import { inter, notoSansJP, shipporiMincho, hindSiliguri } from "@/lib/fonts";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { GamificationProvider } from "@/context/GamificationContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SakuraPetals } from "@/components/ui/SakuraPetals";

export const metadata: Metadata = {
  title: "Nihon Nex 🇯🇵 | Learn Japanese. Unlock Japan.",
  description:
    "A modern, anime-inspired Japanese language learning platform. Master Hiragana, Katakana, Kanji, and JLPT N5-N1 through gamified lessons in Bangla and English.",
  keywords: [
    "Learn Japanese",
    "Bangla Japanese learning",
    "হিরাগানা",
    "কাতাকানা",
    "JLPT N5 Bangla",
    "Nihon Nex",
    "Japanese language course",
  ],
  authors: [{ name: "Nihon Nex Team" }],
  openGraph: {
    title: "Nihon Nex — Learn Japanese. Unlock Japan.",
    description: "Gamified anime-inspired Japanese learning platform with Bangla & English explanations.",
    siteName: "Nihon Nex",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSansJP.variable} ${shipporiMincho.variable} ${hindSiliguri.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col selection:bg-brand-sakura-200 selection:text-brand-red">
        <AuthProvider>
          <LanguageProvider>
            <GamificationProvider>
              <SakuraPetals />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </GamificationProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
