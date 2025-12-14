"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
            AI Assistant for
          </span>
          <br />
          <span className="glow-text text-cyan-400">
            Communication
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Harness the power of artificial intelligence to{' '}
          <span className="text-cyan-400 font-semibold">catch up on missed conversations</span>,{' '}
          <span className="text-purple-400 font-semibold">communicate with clarity</span>, and{' '}
          <span className="text-pink-400 font-semibold">understand complex information</span> in seconds.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link href="/signup">
            <Button size="lg" className="neon-glow hover-lift">
              Start Your Journey
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl float-animation"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl float-animation" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl float-animation" style={{animationDelay: '4s'}}></div>
    </section>
  );
}
