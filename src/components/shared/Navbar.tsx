"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useEasyMode } from "@/context/EasyModeContext";
import {
  HardHat,
  Building2,
  ShieldCheck,
  Search,
  Briefcase,
  Layers,
  User,
  LogOut,
  Globe,
  Eye,
  Menu,
  X,
  MessageSquare,
  Users
} from "lucide-react";
import { Language } from "@/lib/i18n";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { easyMode, toggleEasyMode } = useEasyMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const getRoleBadge = () => {
    if (user?.role === "WORKER") return <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Worker</span>;
    if (user?.role === "EMPLOYER") return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Employer</span>;
    if (user?.role === "ADMIN") return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Admin</span>;
    return null;
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-8 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition">
                BW
              </div>
              <div>
                <span className="font-extrabold text-lg text-slate-900 tracking-tight block leading-none">
                  Blue Workforce
                </span>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider block mt-0.5">
                  Connect '26
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {user?.role === "WORKER" && (
                <>
                  <Link href="/worker/dashboard" className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                    Dashboard
                  </Link>
                  <Link href="/worker/jobs" className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                    Find Jobs
                  </Link>
                  <Link href="/worker/applications" className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                    Applications
                  </Link>
                  <Link href="/worker/card" className="px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 transition flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Digital ID
                  </Link>
                </>
              )}

              {user?.role === "EMPLOYER" && (
                <>
                  <Link href="/employer/dashboard" className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                    Dashboard
                  </Link>
                  <Link href="/employer/pipeline" className="px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 transition flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Pipeline
                  </Link>
                  <Link href="/employer/candidates" className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                    Find Workers
                  </Link>
                  <Link href="/employer/bulk-hiring" className="px-3 py-2 rounded-lg text-sm font-semibold text-amber-700 hover:bg-amber-50 transition flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Bulk Hiring
                  </Link>
                  <Link href="/employer/jobs/new" className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                    + Post Job
                  </Link>
                </>
              )}

              {user?.role === "ADMIN" && (
                <>
                  <Link href="/admin/dashboard" className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                    KPI Overview
                  </Link>
                  <Link href="/admin/verification" className="px-3 py-2 rounded-lg text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Verification Queue
                  </Link>
                  <Link href="/admin/moderation" className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                    Safety & Reports
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Action Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Easy Mode Toggle */}
            <button
              onClick={toggleEasyMode}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                easyMode
                  ? "bg-amber-400 text-slate-950 border-amber-500 shadow-sm"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
              title="Toggle Large Touch Targets & Simplified High-Contrast View"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Easy Mode</span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === "en" ? "English" : language === "te" ? "తెలుగు" : "हिंदी"}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => { setLanguage("en"); setLangDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage("te"); setLangDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    తెలుగు (Telugu)
                  </button>
                  <button
                    onClick={() => { setLanguage("hi"); setLangDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    हिंदी (Hindi)
                  </button>
                </div>
              )}
            </div>

            {/* Messages link */}
            {user && (
              <Link
                href="/messages"
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition relative"
                title="Messages"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
              </Link>
            )}

            {/* Auth / Profile Area */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                {getRoleBadge()}
                <Link
                  href={user.role === "WORKER" ? "/worker/profile" : user.role === "EMPLOYER" ? "/employer/company" : "/admin/dashboard"}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-slate-800 hidden sm:inline truncate max-w-[100px]">
                    {user.name}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="text-xs font-bold text-slate-700 hover:text-blue-600 px-3 py-2">
                  Login
                </Link>
                <Link href="/register" className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl shadow-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
