import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Learning Path — From ChatGPT to Agents",
  description:
    "A free, no-signup compendium of YouTube videos that takes you from using ChatGPT on your phone to understanding AI agents, automations, loops, and the new world of agentic AI.",
  keywords: [
    "AI",
    "ChatGPT",
    "agents",
    "AI agents",
    "automation",
    "learning path",
    "curriculum",
    "no code",
  ],
  authors: [{ name: "Pardo de Figueroa" }],
  creator: "Pardo de Figueroa",
  metadataBase: new URL("https://pardofigueroa.org"),
  openGraph: {
    title: "AI Learning Path — From ChatGPT to Agents",
    description:
      "Answer 5 questions, get a curated set of YouTube videos that brings you from ChatGPT-on-your-phone to understanding the agents world.",
    type: "website",
    locale: "en_US",
    siteName: "AI Learning Path",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Learning Path — From ChatGPT to Agents",
    description:
      "Answer 5 questions, get a curated set of YouTube videos that brings you from ChatGPT-on-your-phone to understanding the agents world.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="bg-canvas text-body antialiased">
        <NuqsAdapter>
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
}
