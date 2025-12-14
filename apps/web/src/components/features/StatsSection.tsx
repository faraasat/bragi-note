export function StatsSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl font-bold text-cyan-400 mb-2">10K+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl font-bold text-purple-400 mb-2">1M+</div>
            <div className="text-gray-400">Messages Processed</div>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl font-bold text-pink-400 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-gray-400">AI Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
