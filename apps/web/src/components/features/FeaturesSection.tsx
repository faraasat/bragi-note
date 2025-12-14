"use client";

export function FeaturesSection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full border border-purple-500/30">
            <span className="text-xs text-purple-300 font-medium tracking-wider uppercase">Neural Capabilities</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Three Quantum Layers
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced AI protocols engineered for next-generation digital consciousness
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Catch Up Feature */}
          <div className="holographic-card group p-8 relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-400/5 rounded-full blur-2xl group-hover:bg-cyan-400/15 transition-all"></div>
            <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg group-hover:shadow-cyan-500/50">
                <svg className="w-8 h-8 text-cyan-400 icon-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                Did I Miss Anything?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                Upload meeting transcripts or chat exports. Get intelligent summaries of what changed, decisions made, action items, and deadlines—so you're never out of the loop.
              </p>
              
              <div className="space-y-3">
                {['Decision mapping with causal chains', 'Priority-sorted action vectors', 'Temporal deadline synthesis', 'Personalized query detection'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover/item:shadow-[0_0_8px_rgba(0,212,255,0.8)] transition-shadow"></div>
                    <span className="text-sm text-gray-400 group-hover/item:text-gray-300 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-cyan-500/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Processing Speed</span>
                  <span className="text-cyan-400 font-mono">&lt;500ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Say It Better Feature */}
          <div className="holographic-card group p-8 relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/5 rounded-full blur-2xl group-hover:bg-purple-400/15 transition-all"></div>
            <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg group-hover:shadow-purple-500/50">
                <svg className="w-8 h-8 text-purple-400 icon-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">
                Say It Better
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                Rewrite emotionally risky messages before you send them. Choose your intent—calm, professional, firm but kind—and AI refines your message without changing its meaning.
              </p>
              
              <div className="space-y-3">
                {['Conflict de-escalation protocols', 'Professional calibration matrix', 'Empathy-enhanced messaging', 'Feedback delivery optimization'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 group-hover/item:shadow-[0_0_8px_rgba(179,71,217,0.8)] transition-shadow"></div>
                    <span className="text-sm text-gray-400 group-hover/item:text-gray-300 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-purple-500/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Accuracy Rate</span>
                  <span className="text-purple-400 font-mono">99.2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Explain It Feature */}
          <div className="holographic-card group p-8 relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-pink-400/5 rounded-full blur-2xl group-hover:bg-pink-400/15 transition-all"></div>
            <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg group-hover:shadow-pink-500/50">
                <svg className="w-8 h-8 text-pink-400 icon-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-pink-400 group-hover:text-pink-300 transition-colors">
                Explain It Like I'm Stressed
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                Paste complex documents—bank notices, legal contracts, medical reports—and get clear, calming explanations that tell you what it means for you.
              </p>
              
              <div className="space-y-3">
                {['Medical jargon translation', 'Legal document parsing', 'Financial clarity interface', 'Technical simplification'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 group-hover/item:shadow-[0_0_8px_rgba(255,0,127,0.8)] transition-shadow"></div>
                    <span className="text-sm text-gray-400 group-hover/item:text-gray-300 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-pink-500/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Clarity Score</span>
                  <span className="text-pink-400 font-mono">A+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
