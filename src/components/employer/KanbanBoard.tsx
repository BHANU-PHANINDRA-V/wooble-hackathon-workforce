"use client";
import React, { useState } from "react";
import { ApplicationStatus } from "@/types";
import { ShieldCheck, Star, MapPin, Calendar, Phone, ArrowRight, UserCheck, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface CandidateCardData {
  id: string; // Application ID
  workerProfileId: string;
  status: ApplicationStatus;
  appliedAt: string;
  matchScore: number;
  workerName: string;
  workerAvatar?: string | null;
  workerTrade: string;
  workerExperience: number;
  workerTrustScore: number;
  workerCity: string;
  workerRating: number;
  jobTitle: string;
  jobId: string;
}

interface KanbanBoardProps {
  initialApplications: CandidateCardData[];
  onStatusChange: (applicationId: string, newStatus: ApplicationStatus) => Promise<void>;
  onScheduleInterview?: (candidate: CandidateCardData) => void;
}

const COLUMNS: { status: ApplicationStatus; label: string; color: string; badgeVariant: "blue" | "slate" | "amber" | "purple" | "emerald" }[] = [
  { status: "APPLIED", label: "Applied", color: "border-slate-300 bg-slate-50/70", badgeVariant: "slate" },
  { status: "SCREENING", label: "Screening", color: "border-blue-300 bg-blue-50/40", badgeVariant: "blue" },
  { status: "SHORTLISTED", label: "Shortlisted", color: "border-purple-300 bg-purple-50/40", badgeVariant: "purple" },
  { status: "INTERVIEW", label: "Interview", color: "border-amber-300 bg-amber-50/40", badgeVariant: "amber" },
  { status: "HIRED", label: "Hired ✓", color: "border-emerald-400 bg-emerald-50/50", badgeVariant: "emerald" },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialApplications,
  onStatusChange,
  onScheduleInterview
}) => {
  const [applications, setApplications] = useState<CandidateCardData[]>(initialApplications);
  const [movingId, setMovingId] = useState<string | null>(null);

  const moveCandidate = async (appId: string, nextStatus: ApplicationStatus) => {
    setMovingId(appId);
    try {
      await onStatusChange(appId, nextStatus);
      setApplications(prev =>
        prev.map(app => (app.id === appId ? { ...app, status: nextStatus } : app))
      );
    } finally {
      setMovingId(null);
    }
  };

  const getNextStatus = (current: ApplicationStatus): ApplicationStatus | null => {
    if (current === "APPLIED") return "SCREENING";
    if (current === "SCREENING") return "SHORTLISTED";
    if (current === "SHORTLISTED") return "INTERVIEW";
    if (current === "INTERVIEW") return "HIRED";
    return null;
  };

  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="flex gap-4 min-w-[1100px]">
        {COLUMNS.map((col) => {
          const colApps = applications.filter(a => a.status === col.status);
          return (
            <div
              key={col.status}
              className={`flex-1 rounded-2xl border-2 p-3 flex flex-col min-h-[520px] max-h-[750px] ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-800">{col.label}</h4>
                  <span className="w-5 h-5 rounded-full bg-white font-bold text-xs flex items-center justify-center text-slate-700 shadow-sm border border-slate-200">
                    {colApps.length}
                  </span>
                </div>
              </div>

              {/* Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {colApps.length === 0 ? (
                  <div className="h-32 flex items-center justify-center text-xs text-slate-400 font-medium italic border-2 border-dashed border-slate-200 rounded-xl">
                    No candidates
                  </div>
                ) : (
                  colApps.map((app) => {
                    const nextSt = getNextStatus(app.status);
                    return (
                      <div
                        key={app.id}
                        className="bg-white rounded-xl p-3.5 shadow-sm hover:shadow-md border border-slate-200 transition relative group"
                      >
                        {/* Match & Trust header */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                            {app.matchScore}% Match
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            Trust {app.workerTrustScore}
                          </span>
                        </div>

                        {/* Candidate Basic */}
                        <div className="flex gap-2.5 items-center mb-2.5">
                          <img
                            src={app.workerAvatar || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&auto=format&fit=crop&q=80"}
                            alt={app.workerName}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 truncate">{app.workerName}</div>
                            <div className="text-[11px] text-amber-700 font-semibold truncate">{app.workerTrade}</div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-500 mb-3 bg-slate-50 p-2 rounded-lg">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {app.workerExperience} Yrs Exp
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {app.workerCity}
                          </div>
                        </div>

                        <div className="text-[10px] text-slate-400 mb-3 truncate">
                          Job: <strong>{app.jobTitle}</strong>
                        </div>

                        {/* Stage progression action button */}
                        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                          {app.status === "SHORTLISTED" && onScheduleInterview && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onScheduleInterview(app)}
                              className="text-[10px] px-2 py-1 flex-1 text-amber-800 border-amber-300 bg-amber-50"
                            >
                              <Calendar className="w-3 h-3 mr-1" /> Interview
                            </Button>
                          )}

                          {nextSt && (
                            <Button
                              variant="primary"
                              size="sm"
                              disabled={movingId === app.id}
                              onClick={() => moveCandidate(app.id, nextSt)}
                              className="text-[10px] px-2.5 py-1 flex-1 gap-1"
                            >
                              <span>Move to {nextSt.toLowerCase()}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          )}

                          {app.status === "HIRED" && (
                            <div className="w-full text-center text-xs font-bold text-emerald-700 bg-emerald-100/70 py-1 rounded-lg">
                              ✓ Successfully Hired
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
