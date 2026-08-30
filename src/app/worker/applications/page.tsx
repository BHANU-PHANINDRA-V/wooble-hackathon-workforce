"use client";
import React, { useEffect, useState } from "react";
import { ShieldCheck, Clock, MapPin, IndianRupee, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function WorkerApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data.applications || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stages = ["APPLIED", "SCREENING", "SHORTLISTED", "INTERVIEW", "HIRED"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Application Status & Timeline</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time status updates and stage progression from hiring employers</p>
        </div>
        <Link href="/worker/jobs">
          <Button variant="primary" size="sm" className="text-xs font-bold">
            Explore More Jobs
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-36 bg-white rounded-3xl border border-slate-200 animate-pulse" />
          <div className="h-36 bg-white rounded-3xl border border-slate-200 animate-pulse" />
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No applications submitted yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Discover verified jobs matching your skills and apply in one click.
          </p>
          <Link href="/worker/jobs">
            <Button variant="primary" size="sm" className="text-xs font-bold mt-2">
              Browse Matching Jobs
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const currentStageIndex = stages.indexOf(app.status);
            const activeStageIdx = currentStageIndex >= 0 ? currentStageIndex : 0;
            const interview = app.interviews?.[0];

            return (
              <div key={app.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{app.job?.title}</h3>
                    <p className="text-xs text-slate-500 font-semibold">
                      {app.job?.company?.name || "Verified Employer"} • {app.job?.locationCity} • Applied {new Date(app.appliedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl">
                      {app.matchScore || 92}% Match
                    </span>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold uppercase mb-2">
                    {stages.map((st, idx) => {
                      const isPassed = idx <= activeStageIdx;
                      const isCurrent = idx === activeStageIdx;
                      return (
                        <span
                          key={st}
                          className={isCurrent ? "text-blue-700 font-black" : isPassed ? "text-emerald-600" : "text-slate-400"}
                        >
                          {st}
                        </span>
                      );
                    })}
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((activeStageIdx + 1) / stages.length) * 100}%` }}
                    />
                  </div>
                </div>

                {interview && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 font-medium flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Scheduled Interview:</strong> {new Date(interview.scheduledAt).toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })} at {interview.locationOrLink}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
