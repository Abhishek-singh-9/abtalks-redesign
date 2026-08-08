"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

function CountUpStat({ end, prefix = "", suffix = "", duration = 2000, label }: { end: number, prefix?: string, suffix?: string, duration?: number, label: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="flex-1">
      <div className="text-2xl font-bold text-[#f97316]">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[9px] text-gray-500 font-bold mt-1 tracking-wider uppercase">{label}</div>
    </div>
  );
}

export default function ABTalksLanding() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  const roles = ["Web Developer", "App Developer", "AI Engineer", "Data Scientist", "Backend Dev", "CP Champion"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2026-09-01T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();
    
    return () => clearInterval(timer);
  }, []);

  const marqueeItems = [
    "🔥 Rahul just completed Day 23",
    "💪 Priya submitted her GitHub",
    "🚀 Arjun got an internship offer",
    "⭐ Sneha maintained 30-day streak",
    "🎯 Vikram from VIT cracked Google",
    "🏆 Ankit hit Day 60",
    "💻 Deepika deployed her first app",
    "🌟 Rohan got shortlisted at Flipkart",
    "🔥 Meera completed AI/ML track",
    "🚀 Karan built 3 projects this week"
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#f97316] selection:text-white flex justify-center">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes fadeInSlide {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide {
          animation: fadeInSlide 0.5s ease-out forwards;
        }
      `}} />

      <div className="w-full max-w-[390px] bg-[#0a0a0a] min-h-screen relative overflow-hidden shadow-2xl shadow-[#f97316]/5 sm:border-x sm:border-white/5">
        
        {/* SECTION 1 - TOP BANNER */}
        <div className="w-full bg-[#f97316] py-2 px-4 text-center z-50 relative">
          <p className="text-white text-xs font-medium tracking-wide">
            🌙 Late night grind? You're exactly who we're looking for.
          </p>
        </div>

        {/* SECTION 2 - STICKY NAVBAR */}
        <nav className="sticky top-0 w-full z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 px-5 py-3 flex justify-between items-center">
          <div className="text-[#f97316] font-bold text-xl tracking-tighter">ABTalks</div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-gray-300 text-sm font-semibold hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard" className="bg-[#f97316] text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-[#ea580c] transition-colors">
              Join Now
            </Link>
          </div>
        </nav>

        {/* SECTION 3 - SCROLLING TICKER */}
        <div className="w-full bg-black border-b border-white/5 py-2.5 overflow-hidden flex relative">
          <div className="flex whitespace-nowrap animate-marquee w-max">
            {marqueeItems.map((item, i) => (
              <span key={i} className="text-gray-400 text-xs mx-4 font-medium">{item} •</span>
            ))}
            {/* Duplicate list for seamless looping */}
            {marqueeItems.map((item, i) => (
              <span key={`dup-${i}`} className="text-gray-400 text-xs mx-4 font-medium">{item} •</span>
            ))}
          </div>
        </div>

        {/* SECTION 4 - HERO */}
        <section className="px-5 pt-16 pb-10 flex flex-col relative text-center">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#f97316]/20 rounded-full blur-[100px] pointer-events-none"></div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] relative z-10 mb-4"
              style={{
                background: 'linear-gradient(to bottom, #ffffff, #f97316)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 60px rgba(249,115,22,0.5)'
              }}>
            Build your coding habit.<br />Get discovered.
          </h1>

          <div className="h-8 md:h-10 mb-6 relative z-10">
            <span key={roleIndex} className="text-xl md:text-2xl font-bold text-orange-500 block animate-fade-slide">
              {roles[roleIndex]}
            </span>
          </div>

          <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto leading-relaxed relative z-10">
            Join 500+ top students in a 60-day challenge. Build daily, submit proof, get hired.
          </p>

          <div className="flex justify-center items-center gap-3 mt-8 relative z-10">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-gray-800 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 15}`} alt="Student avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-300 font-medium">
              <strong className="text-white">500+</strong> students already building
            </span>
          </div>

          <Link href="/dashboard" className="mt-10 w-full block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-xl text-lg shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] hover:scale-[1.02] transition-all relative z-10">
            Start Your 60-Day Journey →
          </Link>

          <div className="mt-10 bg-black/50 border border-white/10 rounded-2xl p-5 relative z-10">
            <p className="text-center text-[#f97316] text-xs font-bold tracking-widest mb-3">NEXT COHORT BEGINS IN</p>
            <div className="flex justify-between gap-2 flex-nowrap">
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HOURS', value: timeLeft.hours },
                { label: 'MINS', value: timeLeft.minutes },
                { label: 'SECS', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 bg-[#0a0a0a] border border-[#f97316]/30 shadow-[0_0_10px_rgba(249,115,22,0.1)] rounded-lg py-2">
                  <span className="text-[#f97316] font-mono text-2xl font-bold">
                    {mounted ? item.value.toString().padStart(2, '0') : '00'}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 - STATS ROW */}
        <section className="px-5 py-8 border-y border-white/5 bg-black/30">
          <div className="flex justify-between items-center text-center">
            <CountUpStat end={500} suffix="+" label="Students Enrolled" />
            <div className="w-px h-10 bg-white/10"></div>
            <CountUpStat end={60} label="Days of Building" />
            <div className="w-px h-10 bg-white/10"></div>
            <CountUpStat end={50} prefix="Top " label="Companies Hiring" />
          </div>
        </section>

        {/* SECTION 6 - PROOF OF WORK PIPELINE */}
        <section className="px-5 py-12">
          <h2 className="text-2xl font-bold text-white text-center">How Proof of Work <br/><span className="text-[#f97316]">Gets You Hired</span></h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-3 mb-8" />
          
          <div className="relative pl-6 space-y-8">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#f97316] via-[#f97316]/50 to-transparent"></div>
            
            {[
              { num: 1, icon: "🏗️", title: "Build Daily", desc: "Complete your daily coding challenge" },
              { num: 2, icon: "💻", title: "Push to GitHub", desc: "Every commit is public proof" },
              { num: 3, icon: "📢", title: "Post on LinkedIn", desc: "Build your personal brand daily" },
              { num: 4, icon: "🎯", title: "Get Discovered", desc: "Recruiters find YOU, not the other way" },
            ].map((step, idx) => (
              <div key={idx} className="relative pl-6">
                <div className="absolute left-[-25px] top-0 w-8 h-8 rounded-full bg-[#0a0a0a] border-2 border-[#f97316] flex items-center justify-center text-[#f97316] font-bold text-sm shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                  {step.num}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#f97316]/50 transition-colors">
                  <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                    <span>{step.icon}</span> {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7 - JOURNEY TIMELINE */}
        <section className="px-5 py-12 bg-black/40">
          <h2 className="text-2xl font-bold text-white text-center">Your 60-Day <span className="text-[#f97316]">Transformation</span></h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-3 mb-8" />
          
          <div className="relative pl-8 space-y-6">
            <div className="absolute left-4 top-8 bottom-8 w-px bg-white/20 border-l border-dashed border-[#f97316]/50"></div>
            
            {[
              { day: "Day 1", text: "You write your first commit. Scary but exciting." },
              { day: "Day 15", text: "You've built 3 projects. Your GitHub is turning green." },
              { day: "Day 30", text: "Halfway there. Recruiters start noticing your streak." },
              { day: "Day 60", text: "You did it. 60 projects. 60 LinkedIn posts. Job offers incoming." },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute left-[-20px] top-6 w-2 h-2 rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                <div className="bg-white/5 border border-white/5 p-6 rounded-xl hover:shadow-[0_0_25px_rgba(249,115,22,0.25)] transition-all">
                  <div className="mb-3">
                    <span className="inline-block bg-[#f97316]/20 text-[#f97316] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{item.day}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8 - TRACKS */}
        <section className="px-5 py-12">
          <h2 className="text-2xl font-bold text-white text-center">Choose Your <span className="text-[#f97316]">Track</span></h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-3 mb-8" />
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🌐", title: "Web Development", desc: "Next.js, React, Node.js, full-stack projects" },
              { icon: "📱", title: "App Development", desc: "React Native, Flutter, mobile-first projects" },
              { icon: "🤖", title: "AI/ML", desc: "Python, TensorFlow, build intelligent models" },
              { icon: "📊", title: "Data Science", desc: "SQL, Pandas, real-world data analysis" },
              { icon: "⚙️", title: "Backend", desc: "APIs, databases, system design" },
              { icon: "🏆", title: "CP / DSA", desc: "DSA, algorithms, problem solving" },
            ].map((track, idx) => (
              <div key={idx} className="bg-[#111] border border-white/5 rounded-xl p-4 transition-all duration-300 group cursor-pointer hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-105">
                <div className="text-2xl mb-2 grayscale group-hover:grayscale-0 transition-all">{track.icon}</div>
                <h3 className="text-white font-bold text-[11px] mb-1.5 leading-tight">{track.title}</h3>
                <p className="text-gray-500 text-[9px] leading-snug">{track.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 9 - WHY JOIN */}
        <section className="px-5 py-12 bg-black/40">
          <h2 className="text-2xl font-bold text-white text-center">What You'll Gain <br/>in <span className="text-[#f97316]">60 Days</span></h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-3 mb-8" />
          
          <div className="space-y-4">
            {[
              { icon: "🚀", title: "A Green GitHub", desc: "60 consecutive days of commits. Recruiters check this first." },
              { icon: "📱", title: "A LinkedIn Brand", desc: "60 posts showing your growth. Your profile becomes a magnet." },
              { icon: "💼", title: "Job-Ready Portfolio", desc: "Real projects, real proof, real opportunities." },
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 flex items-center justify-center text-xl shrink-0 h-12 w-12">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{benefit.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10 - TESTIMONIALS */}
        <section className="px-5 py-12">
          <h2 className="text-2xl font-bold text-white text-center">Students Who <span className="text-[#f97316]">Made It</span></h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-3 mb-8" />
          
          <div className="space-y-5">
            {[
              { 
                seed: "rahul", 
                name: "Rahul S.", 
                badge: "WEB DEV", 
                college: "3rd year, NIT Trichy", 
                quote: "The 60-day streak forced me to be consistent. Built 3 projects, got internship at Razorpay in week 5." 
              },
              { 
                seed: "priya", 
                name: "Priya M.", 
                badge: "AI/ML", 
                college: "2nd year, BITS Pilani", 
                quote: "Community of 500+ students kept me going. Cracked my Groww interview after Day 45." 
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-[#111] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#f97316]/5 rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-gray-800 overflow-hidden shrink-0">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.seed}`} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm leading-tight">{testimonial.name}</h4>
                    <p className="text-gray-500 text-[10px]">{testimonial.college}</p>
                  </div>
                  <div>
                    <span className="bg-[#f97316]/10 text-[#f97316] text-[8px] font-bold px-2 py-1 rounded border border-[#f97316]/20 whitespace-nowrap">
                      {testimonial.badge}
                    </span>
                  </div>
                </div>
                <div className="text-yellow-500 text-xs mb-2 tracking-widest drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 text-sm italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10.5 - FAQ */}
        <section className="px-5 py-12 bg-black/30">
          <h2 className="text-2xl font-bold text-white text-center">Frequently Asked <span className="text-[#f97316]">Questions</span></h2>
          <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-3 mb-8" />
          
          <div className="space-y-3">
            {[
              { q: "Is ABTalks free?", a: "Yes, completely free. No credit card required." },
              { q: "What if I miss a day?", a: "Life happens. You can pause once. Consistency is the whole point." },
              { q: "How do recruiters see my work?", a: "Your GitHub and LinkedIn are public. We also share top profiles with hiring partners." },
              { q: "Which track should I pick?", a: "Pick what excites you most. All tracks lead to a job-ready portfolio." }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white/5 border border-white/10 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-white/20 transition-colors">
                <summary className="flex justify-between items-center font-bold text-sm text-white list-none">
                  {faq.q}
                  <span className="transition duration-300 group-open:rotate-180 text-[#f97316]">
                    <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* SECTION 11 - FINAL CTA */}
        <section className="px-5 py-16 text-center relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.15) 0%, transparent 70%)' }}>
          <div className="absolute inset-0 bg-[#f97316]/10 blur-[100px] pointer-events-none rounded-full scale-150"></div>
          <h2 className="text-3xl font-extrabold text-white mb-3 relative z-10">Ready to start building?</h2>
          <p className="text-gray-400 text-sm mb-8 relative z-10 px-4">
            Join 500+ students. 60 days. Real commits. Real opportunities.
          </p>
          <Link href="/dashboard" className="w-full bg-[#f97316] text-white font-bold py-4 rounded-xl text-lg shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] hover:bg-[#ea580c] transition-all relative z-10 block text-center">
            Start Your 60-Day Journey →
          </Link>
          <p className="text-gray-500 text-xs mt-4 relative z-10">Free to join. No credit card. Just commitment.</p>
        </section>

        {/* SECTION 12 - FOOTER */}
        <footer className="px-5 py-8 border-t border-white/5 bg-[#050505] text-center">
          <div className="text-[#f97316] font-bold text-xl tracking-tighter mb-4">ABTalks</div>
          <div className="flex justify-center gap-4 mb-6">
            <a href="mailto:hello@abtalks.in" className="text-gray-400 hover:text-[#f97316] text-xs transition-colors">Contact</a>
            <span className="text-white/20">•</span>
            <a href="https://github.com/Abhishek-singh-9/abtalks-redesign" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f97316] text-xs transition-colors">GitHub</a>
          </div>
          <p className="text-gray-600 text-[10px]">© 2026 ABTalks. Elevating Indian Engineers. One commit at a time.</p>
        </footer>

      </div>
    </div>
  );
}