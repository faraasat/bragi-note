import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="container mx-auto px-6 text-center mb-20">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Three Tools. One Goal.
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Never feel overwhelmed, misunderstood, or left behind again.
        </p>
      </section>

      {/* Feature 1: Did I Miss Anything */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="holographic-card p-12">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-cyan-400">
              Did I Miss Anything?
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              &quot;I was sick / overwhelmed / busy — and now I&apos;m lost.&quot;
            </p>
            <p className="text-gray-400 leading-relaxed">
              Upload meeting transcripts, Slack exports, or chat histories.
              Bragi Note analyzes what happened while you were away and tells
              you exactly what you need to know.
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-xl border border-cyan-500/20">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                What It Returns
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                  <span>What changed while you were gone</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                  <span>Decisions made and why</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                  <span>Actions you need to take</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                  <span>Deadlines you must not miss</span>
                </li>
              </ul>
            </div>

            <div className="glass p-6 rounded-xl border border-cyan-500/20">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                Perfect For
              </h3>
              <p className="text-gray-300">
                Students, remote workers, freelancers, managers, parents, and
                anyone who fears being left behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Say It Better */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div className="glass p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">
                How It Works
              </h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">1.</span>
                  <span>Paste your message</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">2.</span>
                  <span>
                    Select your intent: Calm, Professional, Kind but Firm,
                    De-escalate Conflict
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">3.</span>
                  <span>AI rewrites it without changing meaning</span>
                </li>
              </ol>
            </div>

            <div className="glass p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">
                Use Cases
              </h3>
              <p className="text-gray-300">
                Work emails, customer support, team communication, personal
                relationships, and any high-stakes messages.
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 holographic-card p-12">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-purple-400">
              Say It Better
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              &quot;I don&apos;t want to ruin this relationship.&quot;
            </p>
            <p className="text-gray-400 leading-relaxed">
              Avoid sending angry emails, passive-aggressive messages, or
              emotionally charged texts. AI fixes emotionally risky
              communication before you hit send.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 3: Explain It Like I'm Stressed */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="holographic-card p-12">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-pink-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-pink-400">
              Explain It Like I&apos;m Stressed
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              &quot;I don&apos;t understand this important thing.&quot;
            </p>
            <p className="text-gray-400 leading-relaxed">
              Paste complex documents and get clear, calming explanations. No
              panic, no jargon—just what it means for you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-xl border border-pink-500/20">
              <h3 className="text-lg font-semibold text-pink-300 mb-3">
                Document Types
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                  <span>Bank emails and financial notices</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                  <span>Legal notices and contracts</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                  <span>Medical reports and test results</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                  <span>Academic feedback and research</span>
                </li>
              </ul>
            </div>

            <div className="glass p-6 rounded-xl border border-pink-500/20">
              <h3 className="text-lg font-semibold text-pink-300 mb-3">
                What You Get
              </h3>
              <p className="text-gray-300">
                Calm, simple explanations with &quot;What this means for you&quot;
                clarity—without the stress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 text-center">
        <div className="holographic-card p-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ready to Try Bragi Note?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start for free. No credit card required.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="neon-glow-purple hover-lift text-lg px-12 py-6"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
