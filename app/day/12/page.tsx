"use client";

import { useState } from 'react';
import Link from 'next/link';
import tasks from '@/data/tasks.json';

export default function Day12Page() {
  const task = tasks.day12;
  
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim() || !linkedinUrl.trim()) {
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  return (
    <div className="bg-[#09090b] min-h-screen text-zinc-100 font-sans selection:bg-orange-500/30">
      <div className="max-w-[390px] mx-auto w-full min-h-screen pb-8 relative overflow-hidden flex flex-col">
        
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-orange-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Top Bar */}
        <header className="flex items-center justify-between px-5 pt-8 pb-4 relative z-10">
          <Link href="/dashboard" className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-zinc-100 font-bold tracking-wide">Day {task.day}</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </header>

        <div className="px-5 flex-1 relative z-10 flex flex-col space-y-6">
          
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
              {task.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
              {task.difficulty === 'Easy' && (
                <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                  Easy
                </span>
              )}
              {task.difficulty === 'Medium' && (
                <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                  Medium
                </span>
              )}
              {task.difficulty === 'Hard' && (
                <span className="bg-rose-500/10 text-rose-500 border border-rose-500/20 text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                  Hard
                </span>
              )}
              
              <div className="flex items-center gap-1.5 text-zinc-400 text-sm font-medium">
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {task.estimatedTime}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-1">
              {task.tags.map((tag: string) => (
                <span key={tag} className="bg-zinc-800/80 text-zinc-300 text-[11px] px-3 py-1 rounded-full font-medium border border-zinc-700/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="text-zinc-400 text-[15px] leading-relaxed">
            {task.description}
          </p>

          {/* What to Build */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-3xl mt-4">
            <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <span className="text-orange-500">🛠️</span> What to Build
            </h2>
            <ul className="space-y-3">
              {task.whatToBuild.map((item: string, index: number) => (
                <li key={index} className="flex gap-3 text-zinc-300 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400">
                    {index + 1}
                  </span>
                  <span className="leading-snug pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submission Section */}
          <div className="mt-auto pt-8">
            <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 p-5 rounded-3xl relative overflow-hidden shadow-xl shadow-black/50">
              <h2 className="text-lg font-bold text-zinc-100 mb-4">Submit Your Work</h2>
              
              {status === 'success' ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-5 rounded-2xl flex flex-col items-center text-center gap-2">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center text-3xl mb-2">
                    ✅
                  </div>
                  <h3 className="font-bold text-emerald-500 text-lg">Day {task.day} Complete!</h3>
                  <p className="text-sm opacity-90 text-emerald-400/80">Your streak continues! Keep up the great work.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-3 rounded-xl text-sm font-medium flex items-center gap-2">
                      ⚠️ Please fill all fields
                    </div>
                  )}
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider ml-1">GitHub Repo URL</label>
                    <input 
                      type="url" 
                      placeholder="https://github.com/..."
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider ml-1">LinkedIn Post URL</label>
                    <input 
                      type="url" 
                      placeholder="https://linkedin.com/posts/..."
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all active:scale-[0.98] mt-2"
                  >
                    Submit Task
                  </button>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
