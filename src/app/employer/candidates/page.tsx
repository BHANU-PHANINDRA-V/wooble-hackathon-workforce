"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, ShieldCheck, Star, MapPin, Briefcase, Sparkles, Filter, CheckCircle2, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";

export default function CandidateDiscoveryPage() {
  const [tradeFilter, setTradeFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [shortlisted, setShortlisted] = useState<Record<string, boolean>>({});

  const candidates = [
    {
      id: "c-1",
      name: "Rahul Kumar",
      trade: "Industrial Electrician",
      exp: 6,
      trustScore: 92,
      rating: 4.8,
      city: "Hyderabad",
      expectedSalary: 28000,
      skills: ["Industrial Electrical Wiring", "Panel Board Assembly", "Motor Rewinding", "Solar Installation"],
      avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
      reasons: ["5/5 required skills certified", "6 years experience", "Aadhaar verified", "Available immediately"],
    },
    {
      id: "c-2",
      name: "Suresh Rao",
      trade: "Certified TIG/MIG Welder",
      exp: 7,
      trustScore: 94,
      rating: 4.9,
      city: "Hyderabad",
      expectedSalary: 32000,
      skills: ["MIG Welding", "TIG Welding", "Arc Welding (SMAW)", "Structural Cutting"],
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      reasons: ["NSDC Level 4 Certified", "X-Ray Quality Welding", "7 years industrial experience"],
    },
    {
      id: "c-3",
      name: "Santosh Yadav",
      trade: "Warehouse Logistics Associate",
      exp: 3,
      trustScore: 86,
      rating: 4.6,
      city: "Bengaluru",
      expectedSalary: 22000,
      skills: ["Warehouse Inventory Sorting", "Barcode Scanning", "Forklift Operation"],
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
      reasons: ["Certified Forklift Driver", "Immediate Joiner", "Rotational Shift Ready"],
    },
    {
      id: "c-4",
      name: "Vikram Naik",
      trade: "Commercial Plumber",
      exp: 5,
      trustScore: 88,
      rating: 4.7,
      city: "Vijayawada",
      expectedSalary: 24000,
      skills: ["CPVC & GI Pipe Fitting", "Sanitary Installation", "Drainage Maintenance"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      reasons: ["5 years high-rise plumbing experience", "Trade License Verified"],
    },
  ];

  const filtered = candidates.filter((c) => {
    if (tradeFilter && !c.trade.toLowerCase().includes(tradeFilter.toLowerCase())) return false;
    if (cityFilter && c.city !== cityFilter) return false;
    return true;
  });

  const toggleShortlist = (id: string) => {
    setShortlisted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Candidate Discovery & AI Recommendations</h1>
        <p className="text-xs text-slate-500 mt-0.5">Filter by verified trade skills, Trust Scores, and hiring radius</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter by:
        </span>
        <select
          value={tradeFilter}
          onChange={(e) => setTradeFilter(e.target.value)}
          className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2"
        >
          <option value="">All Trades</option>
          <option value="Electrician">Electrician</option>
          <option value="Welder">Welder</option>
          <option value="Plumber">Plumber</option>
          <option value="Warehouse">Warehouse Executive</option>
        </select>

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2"
        >
          <option value="">All Locations</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Vijayawada">Vijayawada</option>
        </select>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((c) => {
          const isShort = shortlisted[c.id];
          return (
            <div key={c.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
              <div>
                <div className="flex gap-4 items-start">
                  <img src={c.avatar} alt={c.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-slate-900 truncate">{c.name}</h3>
                      <TrustScoreBadge score={c.trustScore} size="sm" />
                    </div>
                    <p className="text-xs font-semibold text-amber-700 mt-0.5">{c.trade}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" /> {c.rating}
                      </span>
                      <span>â€¢</span>
                      <span>{c.exp} Yrs Exp</span>
                      <span>â€¢</span>
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" /> {c.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Match Reasons */}
                <div className="mt-4 bg-emerald-50/80 border border-emerald-200/60 rounded-2xl p-3 text-xs space-y-1">
                  <div className="font-extrabold text-emerald-950 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Why this candidate?</span>
                  </div>
                  {c.reasons.map((r, i) => (
                    <div key={i} className="text-emerald-900 flex items-center gap-1.5 text-[11px] font-medium">
                      <span className="text-emerald-700 font-bold">âœ“</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.skills.map((s, i) => (
                    <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <Button
                  variant={isShort ? "success" : "outline"}
                  size="sm"
                  onClick={() => toggleShortlist(c.id)}
                  className="flex-1 text-xs font-bold"
                >
                  {isShort ? "Shortlisted âœ“" : "Shortlist Candidate"}
                </Button>
                <Link href={`/messages?worker=${c.id}`} className="flex-1">
                  <Button variant="primary" size="sm" className="w-full text-xs font-bold">
                    Contact Worker
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
