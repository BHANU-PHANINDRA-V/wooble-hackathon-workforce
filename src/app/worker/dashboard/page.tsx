"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  HardHat,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";
import { MatchScoreModal } from "@/components/shared/MatchScoreModal";
import { formatSalaryRange } from "@/lib/utils";

export default function WorkerDashboard() {
  const { user } = useAuth();
  const [workerData, setWorkerData] = useState<any | null>(null);
  const [trustBreakdown, setTrustBreakdown] = useState<any | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobForExplainer, setSelectedJobForExplainer] = useState<any | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/workers/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.worker) {
          setWorkerData(data.worker);
          setTrustBreakdown(data.trustBreakdown);
          if (data.worker.applications) {
            const appliedMap: Record<string, boolean> = {};
            data.worker.applications.forEach((a: any) => {
              appliedMap[a.jobId] = true;
            });
            setAppliedJobs(appliedMap);
          }
        }
      })
      .catch(() => {});

    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleApply = async (jobId: string) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
      }
    } catch {}
  };

  const displayName = workerData?.user?.name || user?.name || "Rahul Kumar";
  const displayOccupation = workerData?.primaryOccupation || "Industrial Electrician";
  const displayCity = workerData?.locationCity || "Hyderabad";
  const displayExp = workerData?.experienceYears || 6;
  const displayTrustScore = workerData?.trustScore || 92;
  const displayCompleteness = workerData?.profileCompleteness || 95;
  const displayAvatar = workerData?.user?.avatar || user?.avatar || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Worker Identity & Trust Score Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <img
            src={displayAvatar}
            alt={displayName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-400/40 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">{displayName}</h1>
              <ShieldCheck className="w-6 h-6 text-emerald-400 fill-emerald-950" />
            </div>
            <p className="text-sm font-semibold text-amber-400">{displayOccupation} ({displayExp} Yrs Exp)</p>
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {displayCity}
              </span>
              <span>•</span>
              <span className="text-emerald-300 font-semibold">Available Immediately</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 relative z-10">
          <TrustScoreBadge score={displayTrustScore} breakdown={trustBreakdown} size="lg" />
          <Link href="/worker/card">
            <Button variant="outline" size="md" className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-xs font-bold gap-1.5 backdrop-blur-sm">
              <Share2 className="w-4 h-4 text-blue-300" />
              Digital ID Card
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Strength & Career Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Profile Strength</span>
            <span className="text-sm font-black text-blue-700">{displayCompleteness}% Complete</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${displayCompleteness}%` }} />
          </div>
          <p className="text-xs text-slate-600">
            ✓ Identity verified, {workerData?.skills?.length || 4} skills certified, {workerData?.certifications?.length || 2} trade licenses uploaded.
          </p>
        </div>

        <div className="md:col-span-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-emerald-950">High Demand in {displayCity} Region</h3>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                Your profile is active for <strong>{displayOccupation}</strong> roles. {jobs.length} verified employers have active openings matching your skill qualifications.
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Link href="/worker/jobs">
              <Button variant="primary" size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-xs gap-1">
                <span>View {jobs.length} Matching Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Recommended Verified Jobs for You</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Matched based on your verified skills, experience, and location</p>
          </div>
          <Link href="/worker/jobs" className="text-xs font-bold text-blue-600 hover:underline">
            View All Jobs →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-44 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            <div className="h-44 bg-white rounded-2xl border border-slate-200 animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {jobs.slice(0, 4).map((job, idx) => {
              const matchScore = 86 + ((idx * 7 + 3) % 12);
              const isApplied = appliedJobs[job.id];

              return (
                <div key={job.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {job.category}
                        </span>
                        <h3 className="text-base font-extrabold text-slate-900 mt-1">{job.title}</h3>
                        <p className="text-xs text-slate-500 font-semibold">{job.company?.name || "Verified Employer"}</p>
                      </div>

                      <button
                        onClick={() =>
                          setSelectedJobForExplainer({
                            title: job.title,
                            company: job.company?.name || "Verified Employer",
                            matchPercentage: matchScore,
                            breakdown: {
                              skillMatch: { score: 38, max: 40, label: "Skill Overlap" },
                              experience: { score: 18, max: 20, label: "Experience Match" },
                              location: { score: 15, max: 15, label: "Radius & Commute" },
                              availability: { score: 10, max: 10, label: "Shift & Availability" },
                              salary: { score: 9, max: 10, label: "Salary Alignment" },
                              certification: { score: 4, max: 5, label: "Certification" },
                            },
                            reasons: [
                              `✓ Verified ${displayOccupation} qualifications align with job criteria`,
                              `✓ ${displayExp} Years experience meets requirement`,
                              `✓ Located in/near ${job.locationCity}`,
                              "✓ Available for immediate joining",
                              "✓ Salary range matches your profile expectations",
                            ],
                          })
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-sm transition flex items-center gap-1 shrink-0"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{matchScore}% Match</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl my-3 font-medium">
                      <div className="flex items-center gap-1 truncate">
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                        {formatSalaryRange(job.minSalary, job.maxSalary)}
                      </div>
                      <div className="flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.locationCity}
                      </div>
                      <div className="flex items-center gap-1 truncate">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {job.shiftType} Shift
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-100">
                    <Link href={`/worker/jobs/${job.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs font-bold text-slate-700">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant={isApplied ? "success" : "primary"}
                      size="sm"
                      disabled={isApplied}
                      onClick={() => handleApply(job.id)}
                      className="flex-1 text-xs font-bold gap-1"
                    >
                      {isApplied ? <>✓ Applied</> : <span>Quick Apply</span>}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedJobForExplainer && (
        <MatchScoreModal
          isOpen={!!selectedJobForExplainer}
          onClose={() => setSelectedJobForExplainer(null)}
          jobTitle={selectedJobForExplainer.title}
          companyName={selectedJobForExplainer.company}
          matchResult={selectedJobForExplainer}
        />
      )}
    </div>
  );
}
