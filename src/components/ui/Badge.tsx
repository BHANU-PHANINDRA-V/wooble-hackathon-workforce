import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "emerald" | "amber" | "red" | "purple" | "slate";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "blue", size = "sm", className }) => {
  const variants = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    red: "bg-red-50 text-red-700 border-red-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-0.5 rounded-full border",
    md: "text-sm px-3 py-1 rounded-full border",
  };

  return (
    <span className={cn("inline-flex items-center gap-1 font-medium", variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
};
