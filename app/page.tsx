import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-[#09090b] min-h-screen text-zinc-100 font-sans selection:bg-orange-500/30 flex flex-col">
      <div className="max-w-[390px] mx-auto w-full min-h-screen relative overflow-hidden flex flex-col bg-[#09090b] shadow-2xl">
        
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[200px] bg-orange-600/15 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Navbar */}
        <header className="flex items-center justify-center pt-8 pb-4 relative z-10">
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
            ABTalks
          </h1>
        </header>

        <main className="flex-1 px-5 relative z-10 pb-20">
          
          {/* Hero Section */}
          <section className="text-center pt-10 pb-8 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              Registration Open
            </div>
            
            <h2 className="text-4xl font-black tracking-tight leading-[1.1] mb-5 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
              Build your coding habit.<br/>Get discovered.
            </h2>
            
            <p className="text-zinc-400 text-[15px] leading-relaxed mb-8 max-w-[280px]">
              Join 500+ students in a 60-day coding challenge. Build daily, submit proof, get noticed by recruiters.
            </p>
            
            <Link 
              href="/dashboard"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Start Your 60-Day Journey
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </section>

          {/* Stats Row */}
          <section className="grid grid-cols-3 divide-x divide-zinc-800/50 py-6 border-y border-zinc-800/50 my-6 bg-zinc-900/20 rounded-3xl">
            <div className="flex flex-col items-center text-center gap-1">
              <span className="text-xl font-black text-white">500+</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Students</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-600">60</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Days</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <span className="text-xl font-black text-white">Top</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Companies</span>
            </div>
          </section>

          {/* Feature Cards */}
          <section className="py-6 space-y-4">
            <h3 className="text-lg font-bold text-zinc-100 mb-4 tracking-tight">The Program</h3>
            
            <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-3xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 border border-orange-500/20">
                <span className="text-xl">🎯</span>
              </div>
              <h4 className="font-bold text-white mb-2 text-lg">Pick a Track</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">Choose your specialization from Web Dev, App Dev, or AI/ML. Tailored paths for maximum growth.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-3xl backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center mb-3 border border-zinc-700/50">
                  <span className="text-lg">🔥</span>
                </div>
                <h4 className="font-bold text-white mb-1.5">Build Daily</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">Commit code every single day for 60 days.</p>
              </div>
              
              <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-3xl backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3 border border-emerald-500/20">
                  <span className="text-lg">👀</span>
                </div>
                <h4 className="font-bold text-white mb-1.5">Get Discovered</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">Your proof of work sent directly to recruiters.</p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-6">
            <h3 className="text-lg font-bold text-zinc-100 mb-6 tracking-tight">How It Works</h3>
            <div className="relative pl-4">
              {/* Vertical Line */}
              <div className="absolute left-[27px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-orange-500 via-zinc-800 to-transparent"></div>
              
              {/* Step 1 */}
              <div className="relative mb-8 pl-10">
                <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-[#09090b] border-2 border-orange-500 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                  <span className="text-[10px] font-bold text-orange-500">1</span>
                </div>
                <h4 className="font-bold text-white mb-1">Pick a Track</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">Register and choose the domain you want to master.</p>
              </div>
              
              {/* Step 2 */}
              <div className="relative mb-8 pl-10">
                <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-[#09090b] border-2 border-zinc-700 flex items-center justify-center z-10">
                  <span className="text-[10px] font-bold text-zinc-500">2</span>
                </div>
                <h4 className="font-bold text-white mb-1">Build Daily</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">Follow daily tasks, push commits, and maintain your streak.</p>
              </div>
              
              {/* Step 3 */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-[#09090b] border-2 border-zinc-700 flex items-center justify-center z-10">
                  <span className="text-[10px] font-bold text-zinc-500">3</span>
                </div>
                <h4 className="font-bold text-white mb-1">Submit Proof</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">Share your progress on GitHub & LinkedIn to get noticed.</p>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="py-6">
            <h3 className="text-lg font-bold text-zinc-100 mb-4 tracking-tight">Success Stories</h3>
            <div className="flex flex-col gap-3">
              <div className="bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg shadow-inner">
                    👨‍💻
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white">Rahul S.</h5>
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Web Dev Track</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm italic leading-relaxed">"The 60-day streak forced me to be consistent. I built 3 solid projects and got an internship offer in week 5!"</p>
              </div>
              
              <div className="bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-lg shadow-inner">
                    👩‍💻
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white">Priya M.</h5>
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">AI/ML Track</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm italic leading-relaxed">"Being part of a community of 500+ driven students kept me motivated on days I wanted to quit."</p>
              </div>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="mt-auto px-5 py-8 border-t border-zinc-800/50 bg-zinc-950/50 text-center relative z-10">
          <h2 className="text-lg font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 mb-3">
            ABTalks
          </h2>
          <div className="flex justify-center gap-4 mb-4">
            <a href="#" className="text-zinc-500 hover:text-orange-400 text-xs font-medium transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-500 hover:text-orange-400 text-xs font-medium transition-colors">Terms of Service</a>
            <a href="#" className="text-zinc-500 hover:text-orange-400 text-xs font-medium transition-colors">Contact</a>
          </div>
          <p className="text-zinc-600 text-[10px] font-semibold uppercase tracking-widest">© 2026 ABTalks. Elevating Indian Engineers.</p>
        </footer>
      </div>
    </div>
  );
}