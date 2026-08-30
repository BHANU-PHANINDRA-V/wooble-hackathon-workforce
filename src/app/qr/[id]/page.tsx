"use client";
import React from "react";
import { DigitalIDCard } from "@/components/worker/DigitalIDCard";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PublicQRProfilePage() {
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
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold mb-2">
          <ShieldCheck className="w-4 h-4" />
          Verified Worker Public Profile
        </div>
        <h1 className="text-2xl font-black text-slate-900">Blue Workforce Verified Identity</h1>
      </div>

      <DigitalIDCard worker={workerData} showShare={true} />

      <Link href="/employer/pipeline">
        <Button variant="primary" size="md" className="font-bold text-xs">
          Hire Rahul Kumar on Blue Workforce
        </Button>
      </Link>
    </div>
  );
}
