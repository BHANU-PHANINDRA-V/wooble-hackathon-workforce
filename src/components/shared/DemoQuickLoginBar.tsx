"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, HardHat, Building2, UserCog, Zap, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export function DemoQuickLoginBar() {
  const { demoLogin, user } = useAuth();
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const roles = [
    {
      role: "WORKER" as const,
      label: "Worker (Rahul K. - 92 Trust)",
      shortLabel: "Worker (92)",
      icon: HardHat,
      color: "bg-blue-600 hover:bg-blue-700 text-white",
      badgeColor: "bg-blue-500/30 text-blue-200",
      target: "/worker/dashboard",
    },
    {
      role: "EMPLOYER" as const,
      label: "Employer (Tata Projects)",
      shortLabel: "Employer (Tata)",
      icon: Building2,
      color: "bg-purple-600 hover:bg-purple-700 text-white",
      badgeColor: "bg-purple-500/30 text-purple-200",
      target: "/employer/dashboard",
    },
    {
      role: "ADMIN" as const,
      label: "Admin (Verification Queue)",
      shortLabel: "Admin (Verify)",
      icon: UserCog,
      color: "bg-emerald-600 hover:bg-emerald-700 text-white",
      badgeColor: "bg-emerald-500/30 text-emerald-200",
      target: "/admin/dashboard",
    },
  ];

  const handleRoleSwitch = async (role: "WORKER" | "EMPLOYER" | "ADMIN", target: string) => {
    setLoadingRole(role);
    try {
      await demoLogin(role);
      router.push(target);
    } catch {} finally {
      setLoadingRole(null);
    }
  };

  return (
    <div className="bg-slate-950 text-white border-b border-slate-800 text-[11px] py-1.5 px-3 shadow-inner w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold tracking-wide uppercase text-amber-400 flex items-center gap-1">
            <Zap className="w-3 h-3 fill-amber-400" />
            <span className="hidden sm:inline">1-Click Demo Evaluation Hub:</span>
            <span className="sm:hidden">1-Click:</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto no-scrollbar">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = user?.role === r.role;
            const isLoading = loadingRole === r.role;

            return (
              <button
                key={r.role}
                onClick={() => handleRoleSwitch(r.role, r.target)}
                disabled={isLoading}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition shadow-sm shrink-0 active:scale-95 ${
                  isActive
                    ? "ring-2 ring-amber-400 ring-offset-1 ring-offset-slate-900 " + r.color
                    : r.color + " opacity-90 hover:opacity-100"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden md:inline">{r.label}</span>
                <span className="md:hidden">{r.shortLabel}</span>
                {isActive && <Check className="w-2.5 h-2.5 text-amber-300 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
