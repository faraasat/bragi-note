export function FeaturesSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Three Dimensions of AI
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Revolutionary AI-powered tools designed for the modern digital landscape
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Catch Up Feature */}
          <div className="feature-card group hover-lift">
            <div className="text-6xl mb-6 float-animation">📝</div>
            <h3 className="text-2xl font-bold mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">
              Did I Miss Anything?
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Upload meeting transcripts or chat exports to get intelligent summaries of what you missed with advanced context understanding.
            </p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                Key decisions made with reasoning
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                Action items prioritized for you
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                Critical deadlines with risk assessment
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                Questions directed at you specifically
              </li>
            </ul>
          </div>

          {/* Say It Better Feature */}
          <div className="feature-card group hover-lift">
            <div className="text-6xl mb-6 float-animation" style={{animationDelay: '1s'}}>✍️</div>
            <h3 className="text-2xl font-bold mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">
              Say It Better
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Rewrite messages with AI-powered emotional intelligence to improve tone, clarity, and professionalism without changing your core message.
            </p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                De-escalate conflicts gracefully
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Professional tone optimization
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Clear and kind communication
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Constructive feedback delivery
              </li>
            </ul>
          </div>

          {/* Explain It Feature */}
          <div className="feature-card group hover-lift">
            <div className="text-6xl mb-6 float-animation" style={{animationDelay: '2s'}}>🧠</div>
            <h3 className="text-2xl font-bold mb-4 text-pink-400 group-hover:text-pink-300 transition-colors">
              Explain It Like I'm Stressed
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform complex documents into calming, understandable explanations using advanced AI comprehension algorithms.
            </p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                Medical information simplified
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                Legal documents decoded
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                Financial notices clarified
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                Technical terms humanized
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
