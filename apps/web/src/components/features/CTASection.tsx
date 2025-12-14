"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Ready to Communicate
          </span>
          <br />
          <span className="text-white">
            with Confidence?
          </span>
        </h2>
        <p className="text-xl mb-12 text-gray-300 max-w-3xl mx-auto">
          Join thousands of professionals who trust Bragi Note for superior communication and understanding in the digital age.
        </p>
        <Link href="/signup">
          <Button size="lg" className="neon-glow-purple hover-lift">
            Start Your Free Trial
          </Button>
        </Link>
      </div>
    </section>
  );
}
