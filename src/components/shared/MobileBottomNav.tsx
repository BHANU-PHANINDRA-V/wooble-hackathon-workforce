"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { HardHat, Search, FileText, ShieldCheck, User, Layers, Users, PlusCircle } from "lucide-react";

export const MobileBottomNav: React.FC = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  if (user.role === "WORKER") {
    const navItems = [
      { label: "Dashboard", href: "/worker/dashboard", icon: HardHat },
      { label: "Find Jobs", href: "/worker/jobs", icon: Search },
      { label: "Applications", href: "/worker/applications", icon: FileText },
      { label: "Digital ID", href: "/worker/card", icon: ShieldCheck },
      { label: "Profile", href: "/worker/profile", icon: User },
    ];

    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-3 z-40 shadow-2xl flex items-center justify-around">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
                isActive ? "text-blue-600 scale-105" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  if (user.role === "EMPLOYER") {
    const navItems = [
      { label: "Dashboard", href: "/employer/dashboard", icon: HardHat },
      { label: "Pipeline", href: "/employer/pipeline", icon: Layers },
      { label: "Workers", href: "/employer/candidates", icon: Search },
      { label: "Bulk Hire", href: "/employer/bulk-hiring", icon: Users },
      { label: "+ Post", href: "/employer/jobs/new", icon: PlusCircle },
    ];

    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-3 z-40 shadow-2xl flex items-center justify-around">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
                isActive ? "text-blue-600 scale-105" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  return null;
};
