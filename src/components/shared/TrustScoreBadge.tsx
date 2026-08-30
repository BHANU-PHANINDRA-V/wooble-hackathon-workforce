"use client";
import React, { useState } from "react";
import { ShieldCheck, Info } from "lucide-react";
import { TrustScoreModal } from "./TrustScoreModal";
import { TrustScoreBreakdown } from "@/types";

interface TrustScoreBadgeProps {
  score: number;
  breakdown?: TrustScoreBreakdown;
  size?: "sm" | "md" | "lg";
  showExplainerButton?: boolean;
}

export const TrustScoreBadge: React.FC<TrustScoreBadgeProps> = ({
  score,
  breakdown,
  size = "md",
  showExplainerButton = true
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getScoreColor = (val: number) => {
    if (val >= 85) return { bg: "bg-emerald-50 text-emerald-800 border-emerald-300", badge: "bg-emerald-600", text: "text-emerald-700" };
    if (val >= 70) return { bg: "bg-blue-50 text-blue-800 border-blue-300", badge: "bg-blue-600", text: "text-blue-700" };
    return { bg: "bg-amber-50 text-amber-800 border-amber-300", badge: "bg-amber-600", text: "text-amber-700" };
  };

  const colors = getScoreColor(score);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm font-semibold",
    lg: "px-4 py-2 text-base font-bold",
  }[size];

  return (
    <>
      <div className="inline-flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm transition hover:scale-105 ${colors.bg} ${sizeClasses}`}
          title="Click to view verified trust score breakdown"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
          <span>Trust Score:</span>
          <span className="font-extrabold">{score}/100</span>
          {showExplainerButton && <Info className="w-3.5 h-3.5 opacity-60 ml-0.5" />}
        </button>
      </div>

      <TrustScoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        score={score}
        breakdown={breakdown}
      />
    </>
  );
};
