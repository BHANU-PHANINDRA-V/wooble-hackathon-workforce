"use client";
import React, { useEffect, useState } from "react";
import { DigitalIDCard } from "@/components/worker/DigitalIDCard";
import { useAuth } from "@/context/AuthContext";
import { Info } from "lucide-react";

export default function WorkerCardPage() {
  const { user } = useAuth();
  const [workerData, setWorkerData] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/workers/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.worker) setWorkerData(data.worker);
      })
      .catch(() => {});
  }, []);

  const workerCardData = {
    id: workerData?.id || "worker-demo",
    name: workerData?.user?.name || user?.name || "Rahul Kumar",
    primaryOccupation: workerData?.primaryOccupation || "Industrial & Commercial Electrician",
    experienceYears: workerData?.experienceYears || 6,
    expectedSalary: workerData?.expectedSalary || 28000,
    locationCity: workerData?.locationCity || "Hyderabad",
    locationState: workerData?.locationState || "Telangana",
    trustScore: workerData?.trustScore || 92,
    isIdentityVerified: workerData?.isIdentityVerified ?? true,
    rating: 4.8,
    avatar: workerData?.user?.avatar || user?.avatar || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    phone: workerData?.user?.phone || user?.phone || "+91 91234 56789",
    skills: workerData?.skills || [],
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
        <DigitalIDCard worker={workerCardData} showShare={true} />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 max-w-md mx-auto flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <strong>QR Verification:</strong> Scanning this QR code opens your public verified bio page (<code className="bg-blue-100 px-1 py-0.5 rounded">/qr/{workerCardData.id}</code>) without exposing private personal phone numbers.
        </div>
      </div>
    </div>
  );
}
