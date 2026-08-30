"use client";
import React from "react";
import { AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminModerationPage() {
  const reports = [
    {
      id: "rep-1",
      targetType: "EMPLOYER",
      targetName: "Unregistered Construction Broker",
      reason: "Payment terms not matching job post",
      reporter: "Ramesh K.",
      status: "RESOLVED",
      resolution: "Employer profile verified with GSTIN and contract terms updated.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <span>Safety, Reports & Platform Moderation</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Ensure wage safety, verified employers, and dispute resolution</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        {reports.map((r) => (
          <div key={r.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                {r.targetType} REPORT
              </span>
              <h4 className="text-sm font-extrabold text-slate-900 mt-1">{r.targetName}</h4>
              <p className="text-xs text-slate-600">{r.reason} (Reported by {r.reporter})</p>
              <p className="text-xs text-emerald-800 font-semibold mt-1">Resolution: {r.resolution}</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Resolved ✓
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
