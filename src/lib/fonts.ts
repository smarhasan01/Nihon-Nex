import { Inter, Noto_Sans_JP, Shippori_Mincho, Hind_Siliguri } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

export const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});
