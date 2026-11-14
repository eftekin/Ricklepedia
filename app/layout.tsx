import "./globals.css";
import type { Metadata } from "next";
import { Rubik, Figtree } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

const rubik = Rubik({ subsets: ["latin"], weight: "800", variable: "--font-rubik" });
const figtree = Figtree({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-figtree" });

export const metadata: Metadata = {
  title: "Ricklepedia",
  description: "Every Rick and Morty character and episode from seasons 1 to 5, searchable.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rubik.variable} ${figtree.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
