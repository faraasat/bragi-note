import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 border-t border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Bragi
              </div>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-md">
              Quantum-enhanced neural communication platform for the decentralized future. 
              Transcend information barriers with advanced AI protocols.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84', color: 'cyan' },
                { name: 'GitHub', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z', color: 'purple' },
                { name: 'Discord', icon: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z', color: 'pink' },
              ].map((social) => (
                <Link key={social.name} href="#" className="group">
                  <div className={`w-11 h-11 rounded-xl bg-${social.color}-500/10 border border-${social.color}-500/30 flex items-center justify-center hover:bg-${social.color}-500/20 hover:border-${social.color}-500/50 transition-all group-hover:scale-110`}>
                    <svg className={`w-5 h-5 text-${social.color}-400 icon-glow`} fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-cyan-400 transition-colors"></span>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-cyan-400 transition-colors"></span>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-cyan-400 transition-colors"></span>
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-cyan-400 transition-colors"></span>
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Bragi. <span className="text-cyan-400/50">All rights reserved.</span>
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                Terms
              </Link>
              <div className="w-1 h-1 rounded-full bg-gray-700"></div>
              <Link href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                Privacy
              </Link>
              <div className="w-1 h-1 rounded-full bg-gray-700"></div>
              <Link href="#" className="text-gray-500 hover:text-pink-400 transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
    </footer>
  );
}
