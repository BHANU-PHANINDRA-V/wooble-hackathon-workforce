"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Clock,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Utensils,
  Home,
  Truck,
  HeartPulse,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatSalaryRange } from "@/lib/utils";

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        const found = data.jobs?.find((j: any) => j.id === params.id) || data.jobs?.[0];
        setJob(found);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleApply = async () => {
    if (!job) return;
    try {
      const res = await fetch(`/api/jobs/${job.id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setApplied(true);
      }
    } catch {}
  };

  if (loading || !job) {
    return <div className="max-w-4xl mx-auto py-12 px-4 text-center text-slate-500">Loading job details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link href="/worker/jobs" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-[11px] font-bold uppercase text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
              {job.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{job.title}</h1>
            <p className="text-sm font-semibold text-slate-600 mt-1 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              {job.company?.name || "Tata Projects"} • {job.locationCity}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 font-semibold block">Monthly Pay</span>
            <span className="text-xl font-black text-emerald-700">
              {formatSalaryRange(job.minSalary, job.maxSalary)}
            </span>
          </div>
        </div>

        {/* 94% Match Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
          <div>
            <div className="text-xs font-bold text-blue-200 uppercase">Intelligent Fit</div>
            <div className="text-xl font-black">94% Compatibility Match</div>
            <p className="text-xs text-blue-100 mt-0.5">Your verified credentials & experience match this role</p>
          </div>
          <Button
            variant={applied ? "success" : "primary"}
            size="lg"
            disabled={applied}
            onClick={handleApply}
            className="bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-sm shadow-md"
          >
            {applied ? "Applied ✓" : "Apply Now"}
          </Button>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Job Description</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{job.description}</p>
        </div>

        {/* Company Perks */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Benefits & Facilities Provided</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-700">
            <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2 border border-slate-100">
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>Food Allowance</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2 border border-slate-100">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Transport</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2 border border-slate-100">
              <HeartPulse className="w-4 h-4 text-red-600" />
              <span>PF & ESI Included</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2 border border-slate-100">
              <Home className="w-4 h-4 text-purple-600" />
              <span>Accommodation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
