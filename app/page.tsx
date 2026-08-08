"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

// CountUp Component
const CountUp = ({ end, duration }: { end: number, duration: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration]);
  
  return <>{count}</>;
};

// TypedText Component
const TypedText = () => {
  const words = ["Web Developer", "App Developer", "AI Engineer"];
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex];
    if (subIndex === currentWord.length && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeout);
    }
    
    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }
    
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, wordIndex, words]);

  return (
    <div className="h-6 mt-4 text-orange-400 font-bold text-lg tracking-wider">
      <span>{words[wordIndex].substring(0, subIndex)}</span>
      <span className={blink ? "opacity-100" : "opacity-0"}>|</span>
    </div>
  );
};

// Particles Component
const Particles = () => {
  const [particles, setParticles] = useState<{ id: number; left: number; top: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -15, // Negative delay so they start already on screen
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-orange-500/50 rounded-full animate-float shadow-[0_0_10px_rgba(249,115,22,0.8)]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// Animated Headline Component
const AnimatedHeadline = () => {
  const text1 = "Build your";
  const text2 = "coding habit.";
  const text3 = "Get discovered.";

  const renderText = (text: string, delayOffset: number) => (
    <span className="whitespace-nowrap">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={`inline-block animate-letter-reveal opacity-0 text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-100 to-orange-400 ${char === ' ' ? 'w-3' : ''}`}
          style={{ animationDelay: `${delayOffset + i * 0.04}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );

  return (
    <h2 className="relative text-5xl sm:text-5xl font-black tracking-tighter leading-[1.05]">
      {renderText(text1, 0)}<br />
      {renderText(text2, text1.length * 0.04)}<br />
      {renderText(text3, (text1.length + text2.length) * 0.04)}
    </h2>
  );
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    
    const targetDate = new Date('2026-08-15T00:00:00Z');

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div className="bg-[#030303] min-h-screen text-zinc-100 font-sans selection:bg-orange-500/30 flex flex-col items-center">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px 0px rgba(249,115,22,0.4); }
          50% { box-shadow: 0 0 40px 5px rgba(249,115,22,0.7); }
        }
        .btn-pulse-glow {
          animation: pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2.5s infinite;
        }
        @keyframes ringGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(249,115,22,0.3); border-color: rgba(249,115,22,0.3); }
          50% { box-shadow: 0 0 15px rgba(249,115,22,0.8); border-color: rgba(249,115,22,0.8); }
        }
        .animate-ring-glow {
          animation: ringGlow 2s infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes letterReveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-letter-reveal {
          animation: letterReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes float {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.is-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
      `}} />

      <div className="w-full max-w-[430px] min-h-screen relative flex flex-col bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-x-hidden border-x border-zinc-900/50">
        
        {/* Floating Particles Background */}
        <Particles />

        {/* Ambient background glows */}
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[150%] h-[300px] bg-orange-600/10 blur-[100px] pointer-events-none rounded-full z-0"></div>
        <div className="absolute top-[40%] right-[-50%] w-[100%] h-[300px] bg-amber-600/5 blur-[120px] pointer-events-none rounded-full z-0"></div>

        {/* Sticky Header Group */}
        <div className="sticky top-0 z-50 w-full flex flex-col">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-orange-950/80 via-orange-900/80 to-orange-950/80 border-b border-orange-500/30 text-orange-200 text-xs py-2.5 px-4 text-center font-medium backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <span className="animate-pulse inline-block mr-1">🌙</span> Late night grind? You're exactly who we're looking for.
          </div>

          {/* Navbar */}
          <nav className="flex items-center justify-between px-5 py-3 bg-[#050505]/80 backdrop-blur-md border-b border-zinc-800/50">
            <div className="text-xl font-black tracking-tighter text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
              ABTalks
            </div>
            <Link href="/dashboard" className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] text-xs font-bold rounded-full transition-colors relative overflow-hidden btn-shimmer group">
              Join Now
            </Link>
          </nav>

          {/* Social Proof Marquee */}
          <div className="w-full bg-[#050505]/90 backdrop-blur-md border-b border-zinc-800/50 py-2 overflow-hidden flex whitespace-nowrap">
            <div className="animate-marquee inline-block text-[11px] font-bold text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
              <span className="mx-4">🔥 Rahul just completed Day 23</span> • 
              <span className="mx-4">💪 Priya submitted her GitHub</span> • 
              <span className="mx-4">🚀 Arjun got an internship offer</span> • 
              <span className="mx-4">⭐ Sneha maintained 30-day streak</span> •
            </div>
            <div className="animate-marquee inline-block text-[11px] font-bold text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" aria-hidden="true">
              <span className="mx-4">🔥 Rahul just completed Day 23</span> • 
              <span className="mx-4">💪 Priya submitted her GitHub</span> • 
              <span className="mx-4">🚀 Arjun got an internship offer</span> • 
              <span className="mx-4">⭐ Sneha maintained 30-day streak</span> •
            </div>
          </div>
        </div>

        <main className="flex-1 px-5 relative z-10 pb-24 mt-4">

          {/* Hero Section */}
          <section className="text-center pt-8 pb-10 flex flex-col items-center scroll-reveal">
            
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full"></div>
              <AnimatedHeadline />
            </div>

            <TypedText />

            <p className="text-zinc-400 text-[16px] leading-relaxed mb-6 mt-6 max-w-[300px] font-medium">
              Join 500+ top students in a 60-day challenge. Build daily, submit proof, get hired.
            </p>

            {/* Avatars Row */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex -space-x-3">
                <img className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 relative z-50" src="https://api.dicebear.com/7.x/notionists/svg?seed=A" alt="Avatar" />
                <img className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 relative z-40" src="https://api.dicebear.com/7.x/notionists/svg?seed=B" alt="Avatar" />
                <img className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 relative z-30" src="https://api.dicebear.com/7.x/notionists/svg?seed=C" alt="Avatar" />
                <img className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 relative z-20" src="https://api.dicebear.com/7.x/notionists/svg?seed=D" alt="Avatar" />
                <img className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 relative z-10" src="https://api.dicebear.com/7.x/notionists/svg?seed=E" alt="Avatar" />
              </div>
              <p className="text-xs font-semibold text-zinc-400 text-left">Join <span className="text-orange-400"><CountUp end={500} duration={2000} />+</span> students<br/>already building</p>
            </div>

            <Link
              href="/dashboard"
              className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-lg py-4.5 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 btn-pulse-glow relative overflow-hidden btn-shimmer group"
            >
              Start Your 60-Day Journey
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            {/* Live Countdown Timer */}
            <div className="mt-10 flex flex-col items-center w-full max-w-[340px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <p className="text-zinc-300 text-xs font-bold uppercase tracking-widest">Next cohort begins in</p>
              </div>
              
              <div className="grid grid-cols-4 gap-3 w-full">
                {/* Days */}
                <div className="flex flex-col items-center bg-gradient-to-b from-zinc-800/80 to-[#050505] border border-zinc-700/50 rounded-2xl py-3 backdrop-blur-md shadow-inner shadow-zinc-600/20 animate-ring-glow">
                  <span className="text-2xl font-black text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">{mounted ? String(timeLeft.days).padStart(2, '0') : '00'}</span>
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Days</span>
                </div>
                {/* Hours */}
                <div className="flex flex-col items-center bg-gradient-to-b from-zinc-800/80 to-[#050505] border border-zinc-700/50 rounded-2xl py-3 backdrop-blur-md shadow-inner shadow-zinc-600/20 animate-ring-glow">
                  <span className="text-2xl font-black text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">{mounted ? String(timeLeft.hours).padStart(2, '0') : '00'}</span>
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Hours</span>
                </div>
                {/* Minutes */}
                <div className="flex flex-col items-center bg-gradient-to-b from-zinc-800/80 to-[#050505] border border-zinc-700/50 rounded-2xl py-3 backdrop-blur-md shadow-inner shadow-zinc-600/20 animate-ring-glow">
                  <span className="text-2xl font-black text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">{mounted ? String(timeLeft.minutes).padStart(2, '0') : '00'}</span>
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Mins</span>
                </div>
                {/* Seconds */}
                <div className="flex flex-col items-center bg-gradient-to-b from-zinc-800/80 to-[#050505] border border-zinc-700/50 rounded-2xl py-3 backdrop-blur-md shadow-inner shadow-zinc-600/20 animate-ring-glow">
                  <span className="text-2xl font-black text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">{mounted ? String(timeLeft.seconds).padStart(2, '0') : '00'}</span>
                  <span className="text-[9px] text-orange-400 font-bold uppercase tracking-wider mt-1">Secs</span>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Row */}
          <section className="flex justify-between items-center py-8 border-y border-zinc-800/50 my-6 scroll-reveal stagger-1">
            <div className="flex flex-col items-center text-center px-2">
              <span className="text-2xl font-black text-white mb-1">{mounted ? <CountUp end={500} duration={2000} /> : "0"}<span className="text-orange-500">+</span></span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Students</span>
            </div>
            <div className="w-px h-10 bg-zinc-800/80"></div>
            <div className="flex flex-col items-center text-center px-2">
              <span className="text-2xl font-black text-white mb-1">{mounted ? <CountUp end={60} duration={2000} /> : "0"}</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Days</span>
            </div>
            <div className="w-px h-10 bg-zinc-800/80"></div>
            <div className="flex flex-col items-center text-center px-2">
              <span className="text-2xl font-black text-white mb-1">Top</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Companies</span>
            </div>
          </section>

          {/* Tracks Available */}
          <section className="py-8 scroll-reveal">
            <h3 className="text-xl font-black text-white mb-6 tracking-tight text-center">Tracks Available</h3>
            <div className="flex flex-col gap-3">
              <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 transition-colors hover:bg-zinc-800/50 hover:border-orange-500/30">
                <div className="text-3xl bg-zinc-800 rounded-xl p-2 w-14 h-14 flex items-center justify-center border border-zinc-700">💻</div>
                <div>
                  <h4 className="font-bold text-white text-sm">Web Development</h4>
                  <p className="text-xs text-zinc-400 mt-1">Build full-stack web apps with Next.js, React, and Node.js.</p>
                </div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 transition-colors hover:bg-zinc-800/50 hover:border-orange-500/30">
                <div className="text-3xl bg-zinc-800 rounded-xl p-2 w-14 h-14 flex items-center justify-center border border-zinc-700">📱</div>
                <div>
                  <h4 className="font-bold text-white text-sm">App Development</h4>
                  <p className="text-xs text-zinc-400 mt-1">Create cross-platform mobile applications using React Native or Flutter.</p>
                </div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 transition-colors hover:bg-zinc-800/50 hover:border-orange-500/30">
                <div className="text-3xl bg-zinc-800 rounded-xl p-2 w-14 h-14 flex items-center justify-center border border-zinc-700">🤖</div>
                <div>
                  <h4 className="font-bold text-white text-sm">AI/ML</h4>
                  <p className="text-xs text-zinc-400 mt-1">Master machine learning, data science, and build intelligent models.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Cards */}
          <section className="py-8 scroll-reveal">
            <h3 className="text-xl font-black text-white mb-6 tracking-tight text-center">Why join ABTalks?</h3>
            <div className="space-y-4">
              
              {/* Card 1 Wrapper */}
              <div className="p-[1px] rounded-[1.6rem] bg-gradient-to-br from-orange-500/30 via-zinc-800/20 to-orange-500/10 hover:from-orange-500/50 hover:to-orange-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.05)] hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:scale-[1.02]">
                <div className="bg-[#0a0a0a] border border-transparent p-6 rounded-[1.55rem] backdrop-blur-md group relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all duration-500"></div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-4 border border-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-white mb-2 text-lg">Daily Coding Habit</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">Stop procrastinating. Commit code every single day for 60 days and build unstoppable momentum.</p>
                </div>
              </div>

              {/* Card 2 Wrapper */}
              <div className="p-[1px] rounded-[1.6rem] bg-gradient-to-br from-amber-500/30 via-zinc-800/20 to-amber-500/10 hover:from-amber-500/50 hover:to-amber-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-[1.02]">
                <div className="bg-[#0a0a0a] border border-transparent p-6 rounded-[1.55rem] backdrop-blur-md group relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-500"></div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-white mb-2 text-lg">Real-World Projects</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">Choose Web Dev, App Dev, or AI/ML. Build projects that actually stand out on your resume.</p>
                </div>
              </div>

              {/* Card 3 Wrapper */}
              <div className="p-[1px] rounded-[1.6rem] bg-gradient-to-br from-orange-500/30 via-zinc-800/20 to-orange-500/10 hover:from-orange-500/50 hover:to-orange-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.05)] hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:scale-[1.02]">
                <div className="bg-[#0a0a0a] border border-transparent p-6 rounded-[1.55rem] backdrop-blur-md group relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all duration-500"></div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-4 border border-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-white mb-2 text-lg">Get Discovered</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">Your verified proof of work is sent directly to recruiters. Skip the line and get interviews.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Timeline */}
          <section className="py-10 scroll-reveal">
            <h3 className="text-xl font-black text-white mb-10 tracking-tight text-center">How It Works</h3>
            <div className="relative pl-6 pr-2">
              {/* Connecting Line */}
              <div className="absolute left-[39px] top-6 bottom-10 w-1 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent rounded-full"></div>

              {/* Step 1 */}
              <div className="relative mb-12 pl-12 group cursor-default scroll-reveal">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#050505] border-4 border-orange-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(249,115,22,0.6)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.8)] transition-all duration-300">
                  <span className="text-sm font-black text-orange-500">1</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2 group-hover:text-orange-400 transition-colors">Pick a Track</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">Register and choose the domain you want to master. We provide the curriculum.</p>
              </div>

              {/* Step 2 */}
              <div className="relative mb-12 pl-12 group cursor-default scroll-reveal stagger-1">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#050505] border-4 border-orange-500/50 flex items-center justify-center z-10 group-hover:border-orange-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-300">
                  <span className="text-sm font-black text-zinc-300 group-hover:text-orange-500 transition-colors">2</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2 group-hover:text-orange-400 transition-colors">Build Daily</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">Follow daily tasks, push commits to GitHub, and maintain your 60-day streak.</p>
              </div>

              {/* Step 3 */}
              <div className="relative pl-12 group cursor-default scroll-reveal stagger-2">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#050505] border-4 border-orange-500/20 flex items-center justify-center z-10 group-hover:border-orange-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-300">
                  <span className="text-sm font-black text-zinc-400 group-hover:text-orange-500 transition-colors">3</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2 group-hover:text-orange-400 transition-colors">Get Hired</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">Share your progress on LinkedIn. We share your portfolio with our hiring partners.</p>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-8 scroll-reveal">
            <h3 className="text-xl font-black text-white mb-6 tracking-tight text-center">Student Success</h3>
            <div className="flex flex-col gap-4">
              
              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/30 border border-zinc-800/80 p-5 rounded-3xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-orange-500/20 text-4xl font-serif">"</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Rahul&backgroundColor=f97316" alt="Rahul" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-[15px]">Rahul S.</h5>
                    <div className="inline-flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Web Dev Track</span>
                    </div>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">"The 60-day streak forced me to be consistent. I built 3 solid projects and got an internship offer in week 5!"</p>
              </div>

              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/30 border border-zinc-800/80 p-5 rounded-3xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-orange-500/20 text-4xl font-serif">"</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Priya&backgroundColor=10b981" alt="Priya" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-[15px]">Priya M.</h5>
                    <div className="inline-flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">AI/ML Track</span>
                    </div>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">"Being part of a community of 500+ driven students kept me motivated on days I wanted to quit. Highly recommend."</p>
              </div>

            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="mt-auto px-6 py-10 border-t border-zinc-900 bg-[#020202] text-center relative z-10 scroll-reveal">
          <h2 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 mb-4">
            ABTalks
          </h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-zinc-500 hover:text-orange-400 text-sm font-medium transition-colors">Privacy</a>
            <a href="#" className="text-zinc-500 hover:text-orange-400 text-sm font-medium transition-colors">Terms</a>
            <a href="#" className="text-zinc-500 hover:text-orange-400 text-sm font-medium transition-colors">Contact</a>
          </div>
          <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">© 2026 ABTalks. Elevating Indian Engineers.</p>
        </footer>
      </div>
    </div>
  );
}