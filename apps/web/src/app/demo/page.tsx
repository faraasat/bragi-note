"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function DemoPage() {
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState("");

  const handleProcess = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setResult("🎯 AI Analysis Complete!\n\n✨ Key Insights:\n• Your message has a professional tone\n• Consider adding more empathy for better connection\n• The content is clear and well-structured\n\n🚀 Next Steps:\n• Review for emotional impact\n• Consider your audience perspective\n• Optimize for your communication goal");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen scifi-bg neural-bg pt-24">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent glow-text">
              Interactive AI Demo
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of AI-driven communication tools in real-time
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Input Section */}
            <div className="feature-card">
              <h3 className="text-2xl font-bold mb-6 text-cyan-400 glow-text">
                📝 Input Your Text
              </h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your message, email, or any text you want to improve..."
                className="w-full h-80 p-6 bg-black/40 border-2 border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 resize-none text-lg leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleProcess}
                  disabled={!inputText.trim() || isProcessing}
                  className="neon-glow text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="loading-spinner mr-3"></div>
                      Processing with AI...
                    </div>
                  ) : (
                    "🚀 Analyze with AI"
                  )}
                </Button>
              </div>
            </div>

            {/* Results Section */}
            <div className="feature-card">
              <h3 className="text-2xl font-bold mb-6 text-purple-400 glow-text">
                ⚡ AI Analysis Results
              </h3>
              <div className="h-80 p-6 bg-black/40 border-2 border-purple-500/30 rounded-xl text-white relative overflow-hidden">
                {result ? (
                  <div className="space-y-4 text-sm leading-relaxed">
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg backdrop-blur">
                      <h4 className="text-purple-400 font-bold mb-3 text-lg">🎯 Analysis Summary</h4>
                      <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">{result}</pre>
                    </div>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" className="text-xs">
                        📋 Copy Result
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        🔄 Try Again
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div className="text-gray-400">
                      {isProcessing ? (
                        <div className="space-y-4">
                          <div className="loading-spinner mx-auto"></div>
                          <p className="text-lg">AI is analyzing your text...</p>
                          <p className="text-sm">Processing with advanced algorithms</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-6xl">🤖</div>
                          <p className="text-lg">AI Results will appear here</p>
                          <p className="text-sm">Enter text and click analyze to see magic</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="feature-card text-center">
              <div className="text-5xl mb-4 float-animation">⚡</div>
              <h4 className="text-cyan-400 font-bold mb-3 text-xl">Lightning Fast</h4>
              <p className="text-gray-400">Get results in seconds with our optimized AI models</p>
            </div>
            <div className="feature-card text-center">
              <div className="text-5xl mb-4 float-animation" style={{animationDelay: '1s'}}>🎯</div>
              <h4 className="text-purple-400 font-bold mb-3 text-xl">Context Aware</h4>
              <p className="text-gray-400">Understands your specific situation and needs</p>
            </div>
            <div className="feature-card text-center">
              <div className="text-5xl mb-4 float-animation" style={{animationDelay: '2s'}}>🛡️</div>
              <h4 className="text-pink-400 font-bold mb-3 text-xl">Privacy First</h4>
              <p className="text-gray-400">Your data stays secure and private</p>
            </div>
          </div>

          {/* Tech Specs */}
          <div className="mt-16 text-center">
            <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                🔬 Powered by Advanced AI
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">🧠 Natural Language Processing</h4>
                  <p className="text-gray-400 text-sm">Advanced NLP models understand context and sentiment</p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-semibold mb-2">🎨 Style Analysis</h4>
                  <p className="text-gray-400 text-sm">Analyzes tone, clarity, and emotional impact</p>
                </div>
                <div>
                  <h4 className="text-pink-400 font-semibold mb-2">💡 Smart Suggestions</h4>
                  <p className="text-gray-400 text-sm">Provides actionable improvements and alternatives</p>
                </div>
                <div>
                  <h4 className="text-green-400 font-semibold mb-2">🚀 Real-time Processing</h4>
                  <p className="text-gray-400 text-sm">Instant results with no waiting time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
