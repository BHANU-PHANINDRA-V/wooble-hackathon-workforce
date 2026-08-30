"use client";
import React from "react";
import { DigitalIDCard } from "@/components/worker/DigitalIDCard";
import { Info } from "lucide-react";

export default function WorkerCardPage() {
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
      { skill: { name: "Industrial Electrical Wiring" }, isVerified: true },
      { skill: { name: "Panel Board Assembly" }, isVerified: true },
      { skill: { name: "Motor Rewinding & Repair" }, isVerified: true },
      { skill: { name: "Solar Panel Installation" }, isVerified: true },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-lg mx-auto">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
          Digital Credential
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Verified Worker Digital Card</h1>
        <p className="text-xs text-slate-500 mt-1">
          Share this card with contractors, factories, and recruitment managers via WhatsApp or QR Code.
        </p>
      </div>

      <div className="flex justify-center">
        <DigitalIDCard worker={workerData} showShare={true} />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 max-w-md mx-auto flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <strong>QR Verification:</strong> Scanning this QR code opens your public verified bio page (<code className="bg-blue-100 px-1 py-0.5 rounded">/qr/{workerData.id}</code>) without exposing sensitive private contact details without permission.
        </div>
      </div>
    </div>
  );
}
