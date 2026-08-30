"use client";
import React, { useState } from "react";
import { ApplicationStatus } from "@/types";
import { ShieldCheck, Star, Clock, MapPin, CheckCircle2, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface KanbanCandidate {
  id: string;
  workerProfileId: string;
  status: ApplicationStatus;
  appliedAt: string;
  matchScore: number;
  workerName: string;
  workerTrade: string;
  workerExperience: number;
  workerTrustScore: number;
  workerCity: string;
  workerRating: number;
  jobTitle: string;
  jobId: string;
  workerAvatar?: string;
}

interface KanbanBoardProps {
  initialApplications: KanbanCandidate[];
  onStatusChange?: (appId: string, newStatus: ApplicationStatus) => void;
}

export function KanbanBoard({ initialApplications, onStatusChange }: KanbanBoardProps) {
  const [candidates, setCandidates] = useState<KanbanCandidate[]>(initialApplications);

  const columns: { status: ApplicationStatus; title: string; color: string; badgeBg: string }[] = [
    { status: "APPLIED", title: "Applied", color: "border-blue-500", badgeBg: "bg-blue-50 text-blue-700" },
    { status: "SCREENING", title: "Screening", color: "border-purple-500", badgeBg: "bg-purple-50 text-purple-700" },
    { status: "SHORTLISTED", title: "Shortlisted", color: "border-amber-500", badgeBg: "bg-amber-50 text-amber-700" },
    { status: "INTERVIEW", title: "Interview", color: "border-cyan-500", badgeBg: "bg-cyan-50 text-cyan-700" },
    { status: "HIRED", title: "Hired ✓", color: "border-emerald-500", badgeBg: "bg-emerald-50 text-emerald-700" },
  ];

  const moveCandidate = (appId: string, newStatus: ApplicationStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === appId ? { ...c, status: newStatus } : c))
    );
    if (onStatusChange) {
      onStatusChange(appId, newStatus);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
      {columns.map((col) => {
        const colCandidates = candidates.filter((c) => c.status === col.status);

        return (
          <div
            key={col.status}
            className={`w-72 sm:w-80 shrink-0 bg-slate-100/90 rounded-3xl p-4 border-t-4 ${col.color} border-x border-b border-slate-200 shadow-sm flex flex-col`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                {col.title}
              </span>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${col.badgeBg}`}>
                {colCandidates.length}
              </span>
            </div>

            {/* Candidate Cards List */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[620px] pr-0.5">
              {colCandidates.length === 0 ? (
                <div className="bg-white/60 border border-dashed border-slate-300 rounded-2xl p-6 text-center text-xs text-slate-400">
                  No candidates in this stage
                </div>
              ) : (
                colCandidates.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3"
                  >
                    {/* Candidate Top Row: Avatar, Name, Match Score */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={c.workerAvatar || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&auto=format&fit=crop&q=80"}
                          alt={c.workerName}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0 shadow-sm"
                        />
                        <div>
                          <h4 className="text-xs font-black text-slate-900 leading-tight">{c.workerName}</h4>
                          <p className="text-[10px] font-bold text-amber-700">{c.workerTrade}</p>
                        </div>
                      </div>

                      <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg shrink-0">
                        {c.matchScore}% Match
                      </span>
                    </div>

                    {/* Applied Job & Experience */}
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl space-y-1">
                      <div className="font-bold text-slate-800 truncate">{c.jobTitle}</div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>{c.workerExperience} Yrs Exp • {c.workerCity}</span>
                        <span className="text-emerald-700 font-extrabold flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Trust: {c.workerTrustScore}
                        </span>
                      </div>
                    </div>

                    {/* Stage Transition Selector */}
                    <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Move:</span>
                      <select
                        value={c.status}
                        onChange={(e) => moveCandidate(c.id, e.target.value as ApplicationStatus)}
                        className="flex-1 text-[10px] font-bold bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {columns.map((o) => (
                          <option key={o.status} value={o.status}>
                            {o.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}