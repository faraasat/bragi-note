import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bragi Note - AI Assistant for Communication & Understanding",
  description:
    "AI assistant that helps you catch up, communicate clearly, and understand complex information in seconds.",
  keywords: [
    "AI",
    "communication",
    "productivity",
    "writing assistant",
    "text analysis",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen scifi-bg neural-bg ${inter.className}`}
        suppressHydrationWarning
      >
        <Navbar />
        <main>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
