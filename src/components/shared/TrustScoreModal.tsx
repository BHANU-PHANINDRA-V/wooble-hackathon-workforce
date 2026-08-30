"use client";
import React from "react";
import { Modal } from "@/components/ui/Modal";
import { ShieldCheck, Award, Info, Check } from "lucide-react";
import { TrustScoreBreakdown } from "@/types";

interface TrustScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  breakdown?: TrustScoreBreakdown;
}

export const TrustScoreModal: React.FC<TrustScoreModalProps> = ({ isOpen, onClose, score, breakdown }) => {
  const defaultItems = [
    { label: "Government Identity Verified", score: 20, maxScore: 20, achieved: true, description: "Aadhaar / Voter ID authenticated by platform moderator" },
    { label: "Verified Technical Skills", score: 20, maxScore: 20, achieved: true, description: "4 skills tested & certified on-site" },
    { label: "Accredited Certifications", score: 15, maxScore: 15, achieved: true, description: "ITI Electrical Wireman License active" },
    { label: "Documented Work Experience", score: 15, maxScore: 15, achieved: true, description: "6+ years documented industrial track record" },
    { label: "Employer Ratings & Reputation", score: 14, maxScore: 15, achieved: true, description: "4.8/5 average rating across 12 completed jobs" },
    { label: "Platform Hires & Reliability", score: 8, maxScore: 10, achieved: true, description: "4 on-platform jobs completed without disputes" },
    { label: "Profile Completeness", score: 5, maxScore: 5, achieved: true, description: "100% profile information & work samples verified" }
  ];

  const items = breakdown?.items || defaultItems;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-slate-900">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <span>Transparent Trust Score Engine</span>
        </div>
      }
      maxWidth="lg"
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-5 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-100">Overall Trust Rating</span>
            <div className="text-4xl font-extrabold tracking-tight mt-1">{score} <span className="text-2xl font-medium text-emerald-200">/ 100</span></div>
            <p className="text-xs text-emerald-100 mt-1">✓ High Trust Tier: Prioritized in employer search & recommendations</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
            <Award className="w-9 h-9 text-white" />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
            <span>Why is this score {score}?</span>
            <span className="text-xs text-slate-500 font-normal">(Transparent breakdown)</span>
          </h4>

          <div className="space-y-2.5">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition"
              >
                <div className="flex items-start gap-2.5">
                  <div className={`mt-0.5 p-1 rounded-full ${item.achieved ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900">+{item.score}</span>
                  <span className="text-xs text-slate-400">/{item.maxScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-800 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <strong>How to improve this score:</strong> Upload trade certifications, complete verification with an admin, and receive positive ratings from employers.
          </div>
        </div>
      </div>
    </Modal>
  );
};
