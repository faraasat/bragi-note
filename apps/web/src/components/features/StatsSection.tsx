"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div
      ref={countRef}
      className="text-4xl md:text-5xl font-bold mb-2 font-mono"
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-transparent to-purple-900/10"></div>

      {/* Animated Lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Network Statistics
            </span>
          </h2>
          <p className="text-gray-400">
            Real-time metrics from our quantum neural network
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative glass p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all neon-border-animated text-center hover:scale-105 hover:shadow-2xl backdrop-blur-xl">
              <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="text-cyan-400 mb-1">
                <AnimatedCounter end={10} suffix="K+" />
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Neural Nodes
              </div>
              <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div
              className="relative glass p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all neon-border-animated text-center hover:scale-105 hover:shadow-2xl backdrop-blur-xl"
              style={{ animationDelay: "1s" }}
            >
              <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="text-purple-400 mb-1">
                <AnimatedCounter end={1} suffix="M+" />
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Processed
              </div>
              <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"></div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div
              className="relative glass p-8 rounded-2xl border border-pink-500/20 hover:border-pink-500/50 transition-all neon-border-animated text-center hover:scale-105 hover:shadow-2xl backdrop-blur-xl"
              style={{ animationDelay: "2s" }}
            >
              <div className="absolute top-2 right-2 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="text-pink-400 mb-1 flex items-center justify-center gap-2">
                <AnimatedCounter end={99} suffix=".9%" />
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Uptime
              </div>
              <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full"></div>
            </div>
          </div>

          <div className="group relative">
            <div
              className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl b50 transition-all neon-border-animated text-center hover:scale-105 hover:shadow-2xl backdrop-blur-xl"
              style={{ animationDelay: "3s" }}
            ></div>
            <div
              className="relative glass p-8 rounded-2xl border border-pink-500/20 hover:border-pink-500/50 transition-all neon-border-animated text-center hover:scale-105 hover:shadow-2xl backdrop-blur-xl"
              style={{ animationDelay: "2s" }}
            >
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="text-green-400 mb-1 flex items-center justify-center gap-2">
                <span className="text-4xl md:text-5xl font-bold font-mono">
                  24/7
                </span>
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Online
              </div>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.8)]"></div>
                <div
                  className="w-2 h-2 bg-green-400/60 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.6)]"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-400/30 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.4)]"
                  style={{ animationDelay: "0.6s" }}
                ></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.8)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-cyan-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>SOC 2 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-purple-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>End-to-End Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-pink-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
