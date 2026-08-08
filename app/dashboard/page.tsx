import student from '@/data/student.json';
import tasks from '@/data/tasks.json';
import Link from 'next/link';

export default function DashboardPage() {
  const { today } = tasks;
  
  const progressPercentage = Math.round((student.completedDays / student.totalDays) * 100);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-orange-500/30">
      <div className="max-w-[390px] mx-auto w-full min-h-screen pb-12 relative overflow-hidden bg-[#09090b]">
        
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-orange-600/20 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Navbar */}
        <header className="flex items-center justify-between px-5 pt-10 pb-4 relative z-10">
          <div className="flex flex-col">
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-0.5">Welcome back</p>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100">{student.name}</h1>
          </div>
          <div className="w-11 h-11 rounded-full overflow-hidden border border-orange-500/50 bg-zinc-900 ring-2 ring-black p-0.5">
            <img 
              src={student.avatar} 
              alt={student.name} 
              className="w-full h-full rounded-full object-cover bg-zinc-800"
            />
          </div>
        </header>

        <div className="px-5 space-y-6 relative z-10">
          
          {/* Conditional Banners */}
          {student.missedDays > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-3.5 rounded-2xl text-sm font-medium flex items-start gap-3 shadow-lg shadow-amber-500/5">
              <span className="text-amber-500 text-lg leading-none">⚠️</span>
              <p className="leading-tight pt-0.5">
                You missed {student.missedDays} {student.missedDays === 1 ? 'day' : 'days'} — don't break your streak!
              </p>
            </div>
          )}

          {student.currentStreak === 0 && (
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-3.5 rounded-2xl text-sm font-medium flex items-start gap-3 shadow-lg shadow-blue-500/5">
              <span className="text-blue-400 text-lg leading-none">👋</span>
              <p className="leading-tight pt-0.5">
                Complete today's task to start your streak!
              </p>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex gap-3">
            {/* Streak Card */}
            <div className="flex-1 bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-3xl relative overflow-hidden flex flex-col backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                </div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Streak</p>
              </div>
              
              <div className="flex items-baseline gap-2 mt-auto">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-600 tracking-tighter">
                  {student.currentStreak}
                </span>
                <span className="text-2xl">🔥</span>
              </div>
              <p className="text-zinc-500 text-xs mt-1 font-medium">Longest: {student.longestStreak} days</p>
            </div>

            {/* Standing Card */}
            <div className="w-[110px] bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-3xl flex flex-col items-center justify-center text-center backdrop-blur-xl relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 to-zinc-700"></div>
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center mb-3">
                <span className="text-lg">👑</span>
              </div>
              <div className="text-lg font-bold text-zinc-100 leading-none">{student.standing}</div>
              <div className="text-[9px] text-zinc-500 mt-1.5 uppercase tracking-widest font-bold">Global</div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-5 rounded-3xl backdrop-blur-sm">
            <div className="flex justify-between items-end mb-3.5">
              <div>
                <h2 className="text-zinc-100 font-semibold text-sm">Challenge Progress</h2>
                <p className="text-zinc-500 text-xs mt-1">Day {student.completedDays} of {student.totalDays}</p>
              </div>
              <span className="text-orange-500 font-bold text-sm bg-orange-500/10 px-2 py-1 rounded-lg">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden shadow-inner border border-zinc-800">
              <div 
                className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 h-full rounded-full relative" 
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-[2px]"></div>
              </div>
            </div>
          </div>

          {/* Today's Task */}
          <div>
            <div className="flex items-center justify-between mb-4 mt-8">
              <h2 className="text-lg font-bold text-zinc-100 tracking-tight">Today's Task</h2>
              <span className="bg-zinc-800 text-zinc-300 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest">
                Day {today.day}
              </span>
            </div>
            
            <Link href="/day/12" className="block bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-orange-500/50 p-5 rounded-3xl relative overflow-hidden shadow-xl shadow-black/50 transition-colors group cursor-pointer">
              <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/10 group-hover:bg-orange-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-colors"></div>
              
              <div className="flex justify-between items-start mb-3 relative z-10">
                <h3 className="text-zinc-100 group-hover:text-orange-400 font-bold text-lg leading-tight pr-4 transition-colors">{today.title}</h3>
                
                {today.difficulty === 'Easy' && (
                  <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider whitespace-nowrap">
                    Easy
                  </span>
                )}
                {today.difficulty === 'Medium' && (
                  <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider whitespace-nowrap">
                    Medium
                  </span>
                )}
                {today.difficulty === 'Hard' && (
                  <span className="bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider whitespace-nowrap">
                    Hard
                  </span>
                )}
              </div>
              
              <p className="text-zinc-400 text-sm mb-5 leading-relaxed relative z-10">{today.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {today.tags.map((tag: string) => (
                  <span key={tag} className="bg-zinc-800/80 text-zinc-300 text-xs px-3 py-1 rounded-full font-medium border border-zinc-700/50">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-5 border-t border-zinc-800/80 relative z-10">
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold">
                  <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {today.estimatedTime}
                </div>
                <div className="bg-orange-500 group-hover:bg-orange-400 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors shadow-lg shadow-orange-500/25 flex items-center justify-center">
                  Start Task
                </div>
              </div>
            </Link>
          </div>

          {/* Achievements */}
          <div className="mt-8 pb-4">
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-3">
              {student.achievements.map((achievement: any) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-3xl border flex flex-col items-center text-center gap-3 transition-all ${
                    achievement.earned 
                      ? 'bg-gradient-to-b from-orange-500/10 to-transparent border-orange-500/20 shadow-lg shadow-orange-500/5' 
                      : 'bg-zinc-900/30 border-zinc-800/50 opacity-70'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${
                    achievement.earned 
                      ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-orange-500/50' 
                      : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50'
                  }`}>
                    {achievement.earned ? '🏆' : '🔒'}
                  </div>
                  <span className={`text-xs font-bold leading-tight px-2 ${
                    achievement.earned ? 'text-zinc-200' : 'text-zinc-500'
                  }`}>
                    {achievement.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
