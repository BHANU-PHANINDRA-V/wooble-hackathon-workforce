"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Building2,
  Users,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  Clock,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs || []))
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Open Jobs", value: 8, color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
    { label: "Applications", value: 68, color: "text-slate-800", bg: "bg-slate-50 border-slate-200" },
    { label: "Shortlisted", value: 18, color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
    { label: "Interviews", value: 12, color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
    { label: "Hired ✓", value: 7, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-blue-300 uppercase tracking-wider bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            Verified Enterprise Employer
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">Tata Projects Limited</h1>
          <p className="text-xs text-slate-300 mt-1">Infrastructure & Industrial Construction • Cherlapally & Gachibowli Operations</p>
        </div>

        <div className="flex gap-3">
          <Link href="/employer/jobs/new">
            <Button variant="primary" size="md" className="gap-1.5 font-bold shadow-lg shadow-blue-500/20">
              <Plus className="w-4 h-4" />
              Post New Job
            </Button>
          </Link>
          <Link href="/employer/pipeline">
            <Button variant="outline" size="md" className="bg-white/10 text-white border-white/20 hover:bg-white/20 gap-1.5 font-bold">
              <Layers className="w-4 h-4" />
              Kanban Pipeline
            </Button>
          </Link>
        </div>
      </div>

      {/* Recruitment Overview KPI Cards */}
      <div>
        <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-4">Recruitment Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {stats.map((st, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${st.bg} shadow-sm`}>
              <span className="text-xs font-bold text-slate-500 block">{st.label}</span>
              <div className={`text-3xl font-black mt-1 ${st.color}`}>{st.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Hiring Funnel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900">Live Hiring Funnel Conversion</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>Applied (68 candidates)</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: "100%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>Shortlisted (18 candidates)</span>
              <span>26.4%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-purple-600 h-3 rounded-full" style={{ width: "26.4%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>Interviews Scheduled (12 candidates)</span>
              <span>17.6%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-amber-600 h-3 rounded-full" style={{ width: "17.6%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>Hired ✓ (7 workers)</span>
              <span>10.2%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-emerald-600 h-3 rounded-full" style={{ width: "10.2%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Active Jobs & Candidate Discovery Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Interactive Recruitment Pipeline</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Manage candidate stages across Applied, Screening, Shortlisted, Interview, and Hired with automatic timestamped history logs.
            </p>
          </div>
          <Link href="/employer/pipeline" className="mt-4">
            <Button variant="primary" size="sm" className="w-full text-xs font-bold">
              Open Recruitment Kanban
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Bulk Hiring Campaigns</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Accelerate mass workforce recruitment for warehouses, logistics hubs, and construction projects with target quotas and batch processing.
            </p>
          </div>
          <Link href="/employer/bulk-hiring" className="mt-4">
            <Button variant="outline" size="sm" className="w-full text-xs font-bold text-amber-800 border-amber-300 hover:bg-amber-50">
              Manage Bulk Campaigns (50 Slots)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
