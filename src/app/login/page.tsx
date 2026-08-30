"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { HardHat, Building2, ShieldCheck, ArrowRight, Lock, Mail, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Demo@1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password. You can also use 1-Click Demo Login below.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-black text-2xl mx-auto mb-3 shadow-md">
            BW
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Sign in to Blue Workforce</h2>
          <p className="text-xs text-slate-500 mt-1">Access your verified identity or employer recruitment dashboard</p>
        </div>

        {/* 1-Click Demo Logins */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" /> 1-Click Demo Access
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => demoLogin("WORKER")}
              className="bg-white hover:bg-amber-50 text-slate-800 border border-slate-200 hover:border-amber-300 p-2 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 shadow-sm"
            >
              <HardHat className="w-4 h-4 text-amber-500" />
              <span>Worker</span>
            </button>
            <button
              type="button"
              onClick={() => demoLogin("EMPLOYER")}
              className="bg-white hover:bg-blue-50 text-slate-800 border border-slate-200 hover:border-blue-300 p-2 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 shadow-sm"
            >
              <Building2 className="w-4 h-4 text-blue-500" />
              <span>Employer</span>
            </button>
            <button
              type="button"
              onClick={() => demoLogin("ADMIN")}
              className="bg-white hover:bg-emerald-50 text-slate-800 border border-slate-200 hover:border-emerald-300 p-2 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200" />
          <span className="flex-shrink mx-4 text-xs text-slate-400 font-semibold uppercase">Or Sign In with Email</span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. worker@demo.com"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
  <label className="block text-xs font-bold text-slate-700 uppercase">Password</label>
  <Link href="/forgot-password" className="text-[11px] font-bold text-blue-600 hover:underline">
    Forgot password?
  </Link>
</div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Demo@1234"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Button variant="primary" size="lg" type="submit" isLoading={loading} className="w-full font-bold">
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-blue-600 hover:underline">
            Register for Free
          </Link>
        </div>
      </div>
    </div>
  );
}
