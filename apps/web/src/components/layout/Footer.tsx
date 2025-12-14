export function Footer() {
  return (
    <footer className="py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Bragi Note
          </div>
          <p className="text-gray-400 text-lg">
            AI assistant for communication and understanding in the modern world.
          </p>
          <div className="mt-8 flex justify-center space-x-6">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
            </div>
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
            </div>
            <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
