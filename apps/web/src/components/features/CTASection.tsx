"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Card */}
          <div className="holographic-card p-12 md:p-16 text-center relative overflow-hidden">
            {/* Scan Line Effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full border border-cyan-500/30">
                <svg className="w-4 h-4 text-cyan-400 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm text-cyan-300 font-medium">Limited Beta Access</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Activate Neural
                </span>
                <br />
                <span className="text-white glow-text">
                  Interface
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Join <span className="text-cyan-400 font-semibold">10,000+</span> pioneers leveraging quantum AI for 
                <span className="text-purple-400 font-semibold"> next-gen communication</span> in the decentralized future.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                <Link href="/signup">
                  <Button size="lg" className="neon-glow-purple hover-lift shimmer group relative text-lg px-12 py-6">
                    <span className="relative z-10 flex items-center gap-3">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Initialize System
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-cyan-300 mb-1">Instant Access</div>
                    <div className="text-sm text-gray-400">No credit card required</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-300 mb-1">Secure Protocol</div>
                    <div className="text-sm text-gray-400">Military-grade encryption</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-pink-500/5 border border-pink-500/20">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-pink-300 mb-1">Fast Deploy</div>
                    <div className="text-sm text-gray-400">Live in 60 seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
