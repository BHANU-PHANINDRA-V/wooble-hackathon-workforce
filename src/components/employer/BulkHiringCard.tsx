"use client";
import React from "react";
import { Users, CheckCircle2, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface BulkHiringCardProps {
  job: {
    id: string;
    title: string;
    targetHires: number;
    companyName: string;
    locationCity: string;
    salary: string;
    totalApplied: number;
    shortlisted: number;
    interviewed: number;
    hired: number;
  };
}

export const BulkHiringCard: React.FC<BulkHiringCardProps> = ({ job }) => {
  const percentageFilled = Math.min(100, Math.round((job.hired / job.targetHires) * 100));

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
            BULK HIRING CAMPAIGN
          </span>
          <h4 className="text-lg font-extrabold text-slate-900 mt-1">{job.title}</h4>
          <p className="text-xs text-slate-500">{job.companyName} • {job.locationCity} • {job.salary}</p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black text-slate-900">{job.hired} <span className="text-sm font-medium text-slate-400">/ {job.targetHires} Hired</span></div>
          <span className="text-xs font-bold text-emerald-600">{job.targetHires - job.hired} Openings Left</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
          <span>Campaign Progress</span>
          <span>{percentageFilled}% Target Reached</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-blue-600 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${percentageFilled}%` }}
          />
        </div>
      </div>

      {/* Funnel Metrics */}
      <div className="grid grid-cols-4 gap-2 text-center py-2.5 px-3 bg-slate-50 rounded-xl mb-4 text-xs">
        <div>
          <div className="font-extrabold text-slate-900 text-sm">{job.totalApplied}</div>
          <div className="text-[10px] text-slate-500 font-medium">Applied</div>
        </div>
        <div>
          <div className="font-extrabold text-purple-700 text-sm">{job.shortlisted}</div>
          <div className="text-[10px] text-slate-500 font-medium">Shortlisted</div>
        </div>
        <div>
          <div className="font-extrabold text-amber-700 text-sm">{job.interviewed}</div>
          <div className="text-[10px] text-slate-500 font-medium">Interviews</div>
        </div>
        <div>
          <div className="font-extrabold text-emerald-700 text-sm">{job.hired}</div>
          <div className="text-[10px] text-slate-500 font-medium">Hired ✓</div>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href={`/employer/pipeline?jobId=${job.id}`} className="flex-1">
          <Button variant="primary" size="sm" className="w-full text-xs py-2 gap-1.5">
            <span>Manage Candidates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
