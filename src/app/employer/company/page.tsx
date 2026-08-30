"use client";
import React, { useState } from "react";
import { Building2, ShieldCheck, CheckCircle2, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function EmployerCompanyPage() {
  const [name, setName] = useState("Tata Projects Limited");
  const [industry, setIndustry] = useState("Infrastructure & Industrial Engineering");
  const [gstin, setGstin] = useState("36AAACT2807M1ZY");
  const [city, setCity] = useState("Hyderabad");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            <span>Company Profile & Verification</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage enterprise details and business accreditation</p>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Employer
        </span>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">GSTIN Number</label>
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Headquarters City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm"
          />
        </div>

        <Button variant="primary" size="lg" type="submit" className="w-full font-bold">
          {saved ? "Profile Updated ✓" : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
