"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Bragi
            </span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium">
              Pricing
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="neon-glow relative group overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
