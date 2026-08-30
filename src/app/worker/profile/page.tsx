"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  HardHat,
  ShieldCheck,
  Award,
  Briefcase,
  CheckCircle2,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";
import { DigitalIDCard } from "@/components/worker/DigitalIDCard";

export default function WorkerProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "certs" | "experience" | "samples">("overview");

  const workerData = {
    id: "worker-demo",
    name: "Rahul Kumar",
    primaryOccupation: "Industrial & Commercial Electrician",
    experienceYears: 6,
    expectedSalary: 28000,
    locationCity: "Hyderabad",
    locationState: "Telangana",
    trustScore: 92,
    isIdentityVerified: true,
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    phone: "+91 91234 56789",
    skills: [
      { skill: { name: "Industrial Electrical Wiring" }, isVerified: true, level: "EXPERT", yrs: 6 },
      { skill: { name: "Panel Board Assembly" }, isVerified: true, level: "ADVANCED", yrs: 5 },
      { skill: { name: "Motor Rewinding & Repair" }, isVerified: true, level: "SKILLED", yrs: 4 },
      { skill: { name: "Solar Panel Installation" }, isVerified: true, level: "ADVANCED", yrs: 3 },
    ],
    certs: [
      {
        name: "National Trade Certificate (NTC) - Electrician",
        org: "Directorate General of Training (NCVT)",
        num: "NTC-EL-2018-HYD-9982",
        status: "VERIFIED",
        date: "2018 - Lifetime",
      },
      {
        name: "Industrial Electrical Supervisor License",
        org: "Telangana State Electrical Licensing Board",
        num: "TS-ELB-SUP-4491",
        status: "VERIFIED",
        date: "2021 - 2027",
      },
    ],
    experiences: [
      {
        role: "Senior Plant Electrician",
        company: "Schneider Electric Manufacturing Facility",
        period: "2021 – 2024",
        location: "Cherlapally, Hyderabad",
        desc: "Supervised 3-phase power distribution, LT/HT switchgear maintenance, and routine insulation testing.",
      },
      {
        role: "Substation Electrical Technician",
        company: "L&T Metro Rail Power Division",
        period: "2018 – 2021",
        location: "Uppal, Hyderabad",
        desc: "Carried out transformer checks, battery bank tests, and feeder cable terminations.",
      },
    ],
    samples: [
      {
        title: "33kV HT Panel Busbar & Breaker Assembly",
        category: "Electrical",
        url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80",
        desc: "Precision busbar torqueing and insulation sleeve fitting for industrial distribution panel.",
      },
      {
        title: "Solar Inverter Array & DC Combiner Box Wiring",
        category: "Solar",
        url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=500&auto=format&fit=crop&q=80",
        desc: "50kW commercial rooftop solar string inverter DC cabling with MC4 connections.",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Verified Digital Professional Identity</h1>
          <p className="text-xs text-slate-500 mt-0.5">Government authenticated profile with verifiable trade credentials</p>
        </div>
        <div className="flex items-center gap-3">
          <TrustScoreBadge score={workerData.trustScore} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <DigitalIDCard worker={workerData} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {(["overview", "skills", "certs", "experience", "samples"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold capitalize transition ${
                  activeTab === tab ? "bg-white text-blue-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Professional Summary</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  NCVT certified Industrial Electrician with 6 years experience in HT/LT panel installations, motor rewinding, factory automation wiring, and solar power substations. Safety certified with zero workplace incident record.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] text-slate-500 block">Total Experience</span>
                  <span className="text-sm font-bold text-slate-900">6 Years</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] text-slate-500 block">Expected Pay</span>
                  <span className="text-sm font-bold text-emerald-700">₹28,000/mo</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] text-slate-500 block">Availability</span>
                  <span className="text-sm font-bold text-blue-700">Available Now</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Verified Trade Competencies</h3>
              <div className="space-y-3">
                {workerData.skills.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{s.skill.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-[11px] text-slate-500">{s.yrs} Years On-Field • Level: {s.level}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Verified ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "certs" && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Accredited Licenses & Certifications</h3>
              <div className="space-y-3">
                {workerData.certs.map((c, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span>{c.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{c.org}</p>
                      <p className="text-[10px] font-mono text-slate-400 mt-1">License No: {c.num}</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                      ✓ Active Credential
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Employment History</h3>
              <div className="space-y-4">
                {workerData.experiences.map((exp, i) => (
                  <div key={i} className="border-l-2 border-blue-500 pl-4 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900">{exp.role}</h4>
                    <p className="text-[11px] text-blue-600 font-semibold">{exp.company} • {exp.period}</p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "samples" && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Practical Work Proofs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workerData.samples.map((sample, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={sample.url} alt={sample.title} className="w-full h-36 object-cover" />
                    <div className="p-3">
                      <span className="text-[10px] font-bold text-blue-600 uppercase">{sample.category}</span>
                      <h4 className="text-xs font-bold text-slate-900 mt-0.5">{sample.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{sample.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
