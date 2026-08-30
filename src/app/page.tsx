"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  HardHat,
  Building2,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Search,
  Zap,
  Star,
  MapPin,
  Clock,
  Layers,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";

export default function LandingPage() {
  const { user, demoLogin } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-16 pb-24 overflow-hidden">
        {/* Background glow elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Wooble Blue Workforce Connect '26</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-6">
              Skills that speak. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-amber-300">
                Opportunities that connect.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              India's first verification-first recruitment ecosystem for electricians, welders, plumbers, technicians, drivers, and logistics specialists. Digital verified identities with transparent Trust Scores.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-3.5 mb-6">
              <Link href="/worker/jobs">
                <Button variant="primary" size="lg" className="gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30">
                  <HardHat className="w-5 h-5 text-amber-300" />
                  <span>Find Verified Jobs</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/employer/pipeline">
                <Button variant="outline" size="lg" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold backdrop-blur-sm">
                  <Building2 className="w-5 h-5 text-blue-300" />
                  <span>Hire Skilled Workers</span>
                </Button>
              </Link>
            </div>

            {/* Quick Auth Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 mb-8 font-medium">
              <span className="text-slate-400">Account:</span>
              <Link href="/login" className="text-amber-300 hover:text-amber-200 font-bold underline-offset-4 hover:underline flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                <span>Sign In</span> →
              </Link>
              <Link href="/register" className="text-teal-300 hover:text-teal-200 font-bold underline-offset-4 hover:underline flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                <span>Register Free</span> →
              </Link>
            </div>

            {/* 1-Click Demo Evaluation Pills */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 max-w-xl mx-auto flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-300 font-bold flex items-center gap-1">
                <Zap className="w-4 h-4 text-amber-400" /> Quick Judge Demo:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => demoLogin("WORKER")}
                  className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1"
                >
                  <HardHat className="w-3.5 h-3.5" /> Worker Mode
                </button>
                <button
                  onClick={() => demoLogin("EMPLOYER")}
                  className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1"
                >
                  <Building2 className="w-3.5 h-3.5" /> Employer Mode
                </button>
                <button
                  onClick={() => demoLogin("ADMIN")}
                  className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Mode
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="text-3xl font-black text-blue-400">16+</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Verified Trade Specialists</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="text-3xl font-black text-emerald-400">92/100</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Average Trust Index</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="text-3xl font-black text-amber-400">68+</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Active Pipeline Apps</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="text-3xl font-black text-teal-400">94%</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">AI Match Explainability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Innovation & WOW Features Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase text-blue-600 tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Why Blue Workforce Connect
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Built Specifically for India's Skilled Trades
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Not another generic white-collar LinkedIn clone. Every component is engineered for blue-collar empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Digital Worker ID */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Digital Identity</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  No more paper resumes. Workers carry a verifiable digital badge with government ID checks, trade skill tests, and scannable QR cards.
                </p>
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Aadhaar & Voter ID Authenticated
                  </div>
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ITI & NSDC Trade Certifications
                  </div>
                </div>
              </div>
              <Link href="/worker/card" className="mt-6">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold text-blue-600 border-blue-200 hover:bg-blue-50">
                  View Sample Digital ID Card
                </Button>
              </Link>
            </div>

            {/* Feature 2: Explainable Match */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5 font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Explainable 94% Match</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Transparent 6-factor job recommendation engine explains exactly why a candidate fits: Skill, Experience, Radius, Shift, Salary, and Certifications.
                </p>
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transparent "Why this matches you"
                  </div>
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Natural language search fallback
                  </div>
                </div>
              </div>
              <Link href="/worker/jobs" className="mt-6">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold text-amber-700 border-amber-200 hover:bg-amber-50">
                  Try Job Search & Explainer
                </Button>
              </Link>
            </div>

            {/* Feature 3: Recruitment Kanban & Bulk Hiring */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5 font-bold">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Recruitment Pipeline & Bulk Hiring</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Drag-and-drop Kanban pipeline for hiring managers with bulk recruitment campaigns (e.g. 50 warehouse workers) and status history audit logs.
                </p>
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Applied → Shortlist → Interview → Hire
                  </div>
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Job Description Assistant
                  </div>
                </div>
              </div>
              <Link href="/employer/pipeline" className="mt-6">
                <Button variant="outline" size="sm" className="w-full text-xs font-bold text-purple-700 border-purple-200 hover:bg-purple-50">
                  Open Recruitment Kanban
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 text-white font-bold flex items-center justify-center text-xs">BW</div>
            <span className="font-bold text-slate-200">Blue Workforce Connect '26</span>
          </div>
          <div>
            Built with Next.js, Prisma, TypeScript, Tailwind CSS & AI for Wooble Hackathon.
          </div>
        </div>
      </footer>
    </div>
  );
}
