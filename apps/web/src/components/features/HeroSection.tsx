"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface Particle {
  id: number;
  left: string;
  delay: number;
  size: number;
}

export function HeroSection() {
  const [particles] = useState<Particle[]>(() => 
    // Generate random particles on mount
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      size: Math.random() * 4 + 2,
    }))
  );

  return (
    <section className="pt-32 pb-20 text-center relative overflow-hidden scan-line">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-purple-900/10"></div>
      
      {/* Animated Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle bg-cyan-400"
          style={{
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full border border-cyan-500/30 hover:border-cyan-400/50 transition-all hover:scale-105 cursor-default">
          <div className="relative">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          </div>
          <span className="text-sm text-cyan-300 font-medium tracking-wide">Powered by Advanced AI</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="inline-block bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent animate-gradient-x">
            Bragi Note
          </span>
          <br />
          <span className="text-4xl md:text-5xl inline-block text-gray-300">
            Your AI Assistant for
          </span>
          <br />
          <span className="inline-block glow-text text-sky-400 hover:scale-105 transition-transform cursor-default">
            Communication & Clarity
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Never feel left behind again. Bragi Note helps you{' '}
          <span className="text-cyan-400 font-semibold relative">
            catch up on what you missed
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></span>
          </span>,{' '}
          <span className="text-purple-400 font-semibold relative">
            communicate with confidence
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></span>
          </span>, and{' '}
          <span className="text-pink-400 font-semibold relative">
            understand complex information
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></span>
          </span> in seconds.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <Link href="/signup">
            <Button size="lg" className="neon-glow hover-lift shimmer group relative overflow-hidden border-2 border-cyan-400/50 hover:border-cyan-400 transition-all">
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Started Free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" size="lg" className="group relative overflow-hidden border-2 hover:bg-white/5 transition-all">
              <span className="relative z-10 flex items-center gap-2">
                <div className="relative">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                See Features
              </span>
            </Button>
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-gray-400">Enterprise-Grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-gray-400">Real-Time Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-gray-400">Privacy First</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl float-animation"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl float-animation" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl float-animation" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl float-animation" style={{animationDelay: '1s'}}></div>
    </section>
  );
}
