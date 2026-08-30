"use client";
import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { ShieldCheck, Award, Star, Share2, Phone, MapPin, CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DigitalIDCardProps {
  worker: {
    id: string;
    name: string;
    primaryOccupation: string;
    experienceYears: number;
    expectedSalary: number;
    locationCity: string;
    locationState: string;
    trustScore: number;
    isIdentityVerified: boolean;
    rating: number;
    avatar?: string;
    phone?: string;
    skills: Array<{ skill?: { name: string }; name?: string; isVerified?: boolean }>;
  };
  showShare?: boolean;
}

export function DigitalIDCard({ worker, showShare = true }: DigitalIDCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/qr/${worker.id}`
    : `https://wooble-hackathon-workforce.vercel.app/qr/${worker.id}`;

  useEffect(() => {
    QRCode.toDataURL(publicUrl, {
      width: 160,
      margin: 1,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => {});
  }, [publicUrl]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${worker.name} - Verified ${worker.primaryOccupation}`,
          text: `View ${worker.name}'s verified professional credentials on Blue Workforce Connect (Trust Score: ${worker.trustScore}/100)`,
          url: publicUrl,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello, check out my verified Blue Workforce Digital ID card (Trust Score: ${worker.trustScore}/100): ${publicUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="w-full max-w-[340px] sm:max-w-sm mx-auto space-y-3">
      {/* The Physical-Style Digital ID Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-blue-500/40 relative overflow-hidden">
        {/* Holographic accent glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-blue-800/60 pb-3 relative z-10">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center font-black text-[11px] text-white">
              B
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-blue-300 block uppercase">
                Blue Workforce
              </span>
              <span className="text-[8px] text-slate-400 block font-medium">Digital Identity Card</span>
            </div>
          </div>

          <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
            Verified
          </span>
        </div>

        {/* Worker Main Profile */}
        <div className="flex items-center gap-3 mt-3 relative z-10">
          <img
            src={worker.avatar || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop&q=80"}
            alt={worker.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-blue-400/50 shadow-md shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-extrabold text-white truncate">{worker.name}</h3>
            <p className="text-[11px] font-semibold text-amber-400 truncate">{worker.primaryOccupation}</p>
            <div className="flex items-center gap-2 text-[10px] text-slate-300 mt-0.5">
              <span className="flex items-center gap-0.5 truncate">
                <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                {worker.locationCity}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">{worker.experienceYears} Yrs Exp</span>
            </div>
          </div>
        </div>

        {/* Trust Score & QR Code Box */}
        <div className="bg-slate-900/80 border border-blue-900/60 rounded-2xl p-3 my-3 flex items-center justify-between gap-2 relative z-10">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Trust Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">{worker.trustScore}</span>
              <span className="text-[10px] text-slate-400 font-semibold">/ 100</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold">
              <Star className="w-3 h-3 fill-amber-300" />
              <span>{worker.rating} / 5.0 Rating</span>
            </div>
          </div>

          <div className="p-1 bg-white rounded-xl shadow-inner shrink-0">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR Verification" className="w-16 h-16 sm:w-18 sm:h-18 object-contain" />
            ) : (
              <div className="w-16 h-16 bg-slate-100 animate-pulse rounded" />
            )}
          </div>
        </div>

        {/* Verified Skills Badges */}
        <div className="space-y-1 relative z-10">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
            Verified Competencies
          </span>
          <div className="flex flex-wrap gap-1">
            {worker.skills?.slice(0, 3).map((s, i) => (
              <span
                key={i}
                className="bg-blue-950/80 text-blue-200 border border-blue-800/80 text-[9px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-0.5"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                {s.skill?.name || s.name || "Trade Skill"}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="border-t border-blue-900/60 mt-3 pt-2 text-center relative z-10">
          <span className="text-[8px] text-slate-400 font-mono tracking-wider">
            UID: BW-{worker.id.slice(0, 8).toUpperCase()} • SCAN TO VERIFY
          </span>
        </div>
      </div>

      {/* Share Action Buttons */}
      {showShare && (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl shadow transition"
          >
            <span>💬 WhatsApp</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2 rounded-xl shadow transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Copied!" : "Share Link"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
