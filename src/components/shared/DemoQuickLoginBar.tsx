"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, HardHat, Building2, Zap } from "lucide-react";

export const DemoQuickLoginBar: React.FC = () => {
  const { user, demoLogin, logout } = useAuth();

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-xs py-2 px-4 shadow-md sticky top-0 z-50 border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">
            <Zap className="w-3.5 h-3.5" /> 1-CLICK DEMO ACCESS
          </span>
          <span className="hidden sm:inline text-slate-300">
            Instant evaluation roles with pre-seeded Indian trade & recruitment data
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => demoLogin("WORKER")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
              user?.role === "WORKER"
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            }`}
          >
            <HardHat className="w-3.5 h-3.5 text-amber-400" />
            Worker (Rahul K. - 92 Trust)
          </button>

          <button
            onClick={() => demoLogin("EMPLOYER")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
              user?.role === "EMPLOYER"
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            Employer (Tata Projects)
          </button>

          <button
            onClick={() => demoLogin("ADMIN")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
              user?.role === "ADMIN"
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Admin (Verification Queue)
          </button>

          {user && (
            <button
              onClick={logout}
              className="text-slate-400 hover:text-white px-2 py-1 underline transition ml-1"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
