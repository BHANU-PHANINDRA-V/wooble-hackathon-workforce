"use client";
import React from "react";
import Link from "next/link";
import { ShieldCheck, Users, Briefcase, FileText, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminDashboard() {
  const kpis = [
    { label: "Total Workers", value: "16", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
    { label: "Verified Workers", value: "16", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
    { label: "Active Employers", value: "6", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
    { label: "Live Jobs", value: "8", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
    { label: "Pipeline Applications", value: "68", color: "text-slate-800", bg: "bg-slate-50 border-slate-200" },
    { label: "Verification Queue", value: "2", color: "text-red-700", bg: "bg-red-50 border-red-200" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
            Platform Trust & Moderation Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">Admin Trust Management</h1>
          <p className="text-xs text-slate-300 mt-1">Verify worker trade credentials, authenticate companies, and review reports</p>
        </div>

        <Link href="/admin/verification">
          <Button variant="primary" size="md" className="bg-emerald-600 hover:bg-emerald-700 font-bold gap-1.5 shadow-lg shadow-emerald-600/30">
            <ShieldCheck className="w-4 h-4" />
            Review 2 Pending Verifications
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className={`p-4 rounded-2xl border ${kpi.bg} shadow-sm`}>
            <span className="text-[11px] font-bold text-slate-500 block uppercase">{kpi.label}</span>
            <div className={`text-3xl font-black mt-1 ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Nav Col */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Worker & Certificate Verification Queue</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Authenticate NCVT licenses, state electrician wireman cards, welder certificates, and GSTIN business registrations.
            </p>
          </div>
          <Link href="/admin/verification" className="mt-4">
            <Button variant="primary" size="sm" className="w-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700">
              Open Verification Queue
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Safety & Fraud Moderation</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Review platform dispute reports, block fraudulent employers, and ensure safe working environments.
            </p>
          </div>
          <Link href="/admin/moderation" className="mt-4">
            <Button variant="outline" size="sm" className="w-full text-xs font-bold text-red-700 border-red-200 hover:bg-red-50">
              Manage Safety & Reports
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
