"use client";
import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Sparkles, CheckCircle2, TrendingUp, Compass, Award, IndianRupee } from "lucide-react";
import { MatchScoreResult } from "@/types";

interface MatchScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchResult: MatchScoreResult;
  jobTitle: string;
  companyName: string;
}

export const MatchScoreModal: React.FC<MatchScoreModalProps> = ({
  isOpen,
  onClose,
  matchResult,
  jobTitle,
  companyName
}) => {
  const { matchPercentage, breakdown, reasons } = matchResult;

  const factors = [
    { key: "skillMatch", icon: Award, label: "Skill Overlap", data: breakdown.skillMatch },
    { key: "experience", icon: TrendingUp, label: "Experience Match", data: breakdown.experience },
    { key: "location", icon: Compass, label: "Radius & Commute", data: breakdown.location },
    { key: "availability", icon: CheckCircle2, label: "Shift & Availability", data: breakdown.availability },
    { key: "salary", icon: IndianRupee, label: "Compensation Alignment", data: breakdown.salary },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-slate-900">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span>Explainable AI Job Match Breakdown</span>
        </div>
      }
      maxWidth="lg"
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 rounded-2xl flex items-center justify-between shadow-lg shadow-blue-500/20">
          <div>
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Calculated Match Compatibility</span>
            <div className="text-4xl font-extrabold tracking-tight mt-1">{matchPercentage}% Match</div>
            <p className="text-xs text-blue-100 mt-1 font-medium">{jobTitle} • {companyName}</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full backdrop-blur-sm">
              High Fit Recommendation
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Why this job matches you:</span>
          </h4>
          <div className="space-y-2 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
            {reasons.map((reason, i) => (
              <div key={i} className="text-xs text-emerald-950 font-medium flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>{reason.replace(/^✓s*/, "")}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3">6-Factor Weighted Scoring Model:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {factors.map((f, idx) => {
              const Icon = f.icon;
              const pct = Math.round((f.data.score / f.data.max) * 100);
              return (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                      {f.label}
                    </span>
                    <span className="text-blue-700 font-extrabold">{f.data.score}/{f.data.max} pts</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
