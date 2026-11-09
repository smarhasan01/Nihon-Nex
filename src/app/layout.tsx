import type { Metadata } from "next";
import { inter, notoSansJP, shipporiMincho, benSen } from "@/lib/fonts";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { GamificationProvider } from "@/context/GamificationContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SakuraPetals } from "@/components/ui/SakuraPetals";

export const metadata: Metadata = {
  title: "Nihon Nex 🇯🇵 | Learn Japanese. Unlock Japan.",
  description:
    "A modern, anime-inspired Japanese language learning platform. Master Hiragana, Katakana, Vocabulary, Kanji, and JLPT N5-N1 through gamified lessons in Bangla and English.",
  keywords: [
    "Learn Japanese",
    "Bangla Japanese learning",
    "হিরাগানা",
    "কাতাকানা",
    "জাপানি শব্দভাণ্ডার",
    "JLPT N5 Bangla",
    "Nihon Nex",
  ],
  authors: [{ name: "Nihon Nex Team" }],
  openGraph: {
    title: "Nihon Nex — Learn Japanese. Unlock Japan.",
    description: "Gamified Japanese learning platform with Bangla & English explanations.",
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
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansJP.variable} ${shipporiMincho.variable} ${benSen.variable}`}
    >
      <head>
        {/* Anti-FOUC theme detector script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('nihon_nex_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-brand-sakura-200 selection:text-brand-red">
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
