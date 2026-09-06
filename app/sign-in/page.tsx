"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    window.setTimeout(() => router.push("/dashboard"), 450);
  }
  return <main className="relative grid min-h-screen overflow-hidden bg-[#090b12] px-5 py-6 text-white lg:grid-cols-[1.05fr_.95fr] lg:p-8">
    <div className="pointer-events-none absolute left-[-10rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-orange-500/15 blur-[120px]" />
    <div className="pointer-events-none absolute bottom-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-orange-900/20 blur-[120px]" />
    <section className="relative hidden flex-col justify-between rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,.2),transparent_55%),#10141f] p-10 lg:flex">
      <Link href="/" className="flex items-center gap-2.5 self-start font-semibold tracking-tight"><span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-500 text-sm font-black text-[#090b12]">A</span>ABTalks</Link>
      <div className="max-w-lg"><p className="text-xs font-semibold uppercase tracking-[.18em] text-orange-300">Your work, in context</p><h1 className="mt-5 text-5xl font-semibold leading-[1.04] tracking-[-.055em]">Keep building. <span className="text-orange-400">Keep moving.</span></h1><p className="mt-5 max-w-md text-base leading-7 text-slate-300">Your dashboard keeps every challenge, streak, and piece of proof in one focused place.</p></div>
      <div className="grid grid-cols-3 gap-3"><div className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-2xl font-semibold">23</p><p className="mt-1 text-xs text-slate-500">day streak</p></div><div className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-2xl font-semibold">06</p><p className="mt-1 text-xs text-slate-500">projects shipped</p></div><div className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-2xl font-semibold text-orange-300">12%</p><p className="mt-1 text-xs text-slate-500">top cohort</p></div></div>
    </section>
    <section className="relative flex items-center justify-center py-10 lg:py-0"><div className="w-full max-w-md">
      <Link href="/" className="mb-14 flex items-center gap-2.5 font-semibold tracking-tight lg:hidden"><span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-500 text-sm font-black text-[#090b12]">A</span>ABTalks</Link>
      <div className="rounded-2xl border border-white/10 bg-[#111520]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8"><p className="text-xs font-semibold uppercase tracking-[.18em] text-orange-300">Welcome back</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Sign in to your sprint.</h2><p className="mt-3 text-sm leading-6 text-slate-400">Continue your 60-day challenge and pick up exactly where you left off.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}><label className="block"><span className="mb-2 block text-sm font-medium text-slate-200">Email address</span><input required type="email" autoComplete="email" placeholder="you@college.edu" className="w-full rounded-lg border border-white/10 bg-[#090b12] px-3.5 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-orange-400/70 focus:ring-4 focus:ring-orange-400/10" /></label><label className="block"><span className="mb-2 flex justify-between text-sm font-medium text-slate-200">Password <button type="button" className="text-xs font-medium text-orange-300 hover:text-orange-200">Forgot password?</button></span><input required type="password" autoComplete="current-password" placeholder="Enter your password" className="w-full rounded-lg border border-white/10 bg-[#090b12] px-3.5 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-orange-400/70 focus:ring-4 focus:ring-orange-400/10" /></label><button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-3.5 text-sm font-semibold text-[#160b03] shadow-[0_12px_30px_rgba(249,115,22,.2)] transition hover:bg-orange-400 disabled:cursor-wait disabled:opacity-70">{isSubmitting ? "Signing you in..." : "Sign in to dashboard"}<svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none"><path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></button></form>
        <div className="my-6 flex items-center gap-3 text-xs text-slate-600"><span className="h-px flex-1 bg-white/10" />or<span className="h-px flex-1 bg-white/10" /></div><button type="button" onClick={() => router.push("/dashboard")} className="w-full rounded-lg border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]">Continue with Google</button><p className="mt-6 text-center text-xs text-slate-500">New to ABTalks? <Link href="/" className="font-medium text-orange-300 hover:text-orange-200">Explore the next cohort</Link></p>
      </div><p className="mt-5 text-center text-xs text-slate-600">Demo mode: any valid email and password opens the sample dashboard.</p>
    </div></section>
  </main>;
}
