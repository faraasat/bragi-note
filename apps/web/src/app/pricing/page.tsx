import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="container mx-auto px-6 text-center mb-20">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Start free. Upgrade when you're ready.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <div className="holographic-card p-8 relative">
            <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

            <h3 className="text-2xl font-bold mb-2 text-cyan-400">Free</h3>
            <div className="text-5xl font-bold mb-6 text-white">$0</div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-cyan-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">
                  10 catch-up summaries/month
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-cyan-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">20 message rewrites/month</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-cyan-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">
                  5 document explanations/month
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-cyan-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">Basic browser extension</span>
              </li>
            </ul>

            <Link href="/signup" className="block">
              <Button variant="outline" className="w-full">
                Start Free
              </Button>
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="holographic-card p-8 relative border-2 border-purple-500/50 z-5">
            <div className="absolute z-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>

            <h3 className="text-2xl font-bold mb-2 text-purple-400">Pro</h3>
            <div className="text-5xl font-bold mb-2 text-white">$12</div>
            <div className="text-gray-400 mb-6">/month or $99/year</div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-purple-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">
                  <strong className="text-white">Unlimited</strong> all features
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-purple-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">Advanced AI models</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-purple-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">Priority processing</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-purple-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">
                  Learning & personalization
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-purple-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">Export & sharing options</span>
              </li>
            </ul>

            <Link href="/signup" className="block">
              <Button className="w-full neon-glow-purple">
                Start Pro Trial
              </Button>
            </Link>
          </div>

          {/* Team Tier */}
          <div className="holographic-card p-8 relative">
            <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>

            <h3 className="text-2xl font-bold mb-2 text-pink-400">Team</h3>
            <div className="text-5xl font-bold mb-2 text-white">$49</div>
            <div className="text-gray-400 mb-6">/user/month</div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-pink-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">All Pro features</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-pink-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">Team analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-pink-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">Shared templates</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-pink-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">Admin controls</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-pink-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">Integration APIs</span>
              </li>
            </ul>

            <Link href="/contact" className="block">
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section className="container mx-auto px-6">
        <div className="holographic-card p-12 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Enterprise</h2>
          <p className="text-xl text-gray-300 mb-8">
            Custom solutions for large organizations with advanced security,
            compliance, and integration needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="neon-glow">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
