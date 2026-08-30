"use client";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { ShieldCheck, Star, MapPin, Briefcase, Share2, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DigitalIDCardProps {
  worker: {
    id: string;
    name: string;
    primaryOccupation: string;
    experienceYears: number;
    locationCity: string;
    locationState: string;
    trustScore: number;
    isIdentityVerified: boolean;
    rating?: number;
    skills?: { skill: { name: string }; isVerified: boolean }[];
    avatar?: string | null;
    phone?: string | null;
  };
  showShare?: boolean;
}

export const DigitalIDCard: React.FC<DigitalIDCardProps> = ({ worker, showShare = true }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const profileUrl = typeof window !== "undefined"
    ? `${window.location.origin}/qr/${worker.id}`
    : `https://blueworkforce.in/qr/${worker.id}`;

  useEffect(() => {
    QRCode.toDataURL(profileUrl, {
      width: 180,
      margin: 1,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR Gen error", err));
  }, [profileUrl]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${worker.name} - Verified ${worker.primaryOccupation}`,
          text: `Check out ${worker.name}'s verified professional digital profile with Trust Score ${worker.trustScore}/100 on Blue Workforce Connect.`,
          url: profileUrl,
        });
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello, check my verified digital worker profile on Blue Workforce Connect: ${worker.name} (${worker.primaryOccupation}) - Trust Score: ${worker.trustScore}/100. View profile & credentials: ${profileUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 shadow-2xl border-2 border-blue-500/30 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm">
            BW
          </div>
          <div>
            <div className="text-xs font-extrabold tracking-wider text-blue-400 uppercase">BLUE WORKFORCE</div>
            <div className="text-[10px] text-slate-400">Government & Skill Verified ID</div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full border border-emerald-500/40 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          VERIFIED IDENTITY
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex gap-4 items-center mb-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shrink-0 shadow-lg relative">
          <img
            src={worker.avatar || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80"}
            alt={worker.name}
            className="w-full h-full object-cover rounded-2xl"
          />
          {worker.isIdentityVerified && (
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-md">
              <CheckCircle className="w-4 h-4 fill-white text-emerald-600" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-white truncate">{worker.name}</h3>
          <p className="text-sm font-semibold text-amber-400">{worker.primaryOccupation}</p>

          <div className="flex items-center gap-2 text-xs text-slate-300 mt-1.5">
            <span className="flex items-center gap-0.5 text-amber-300 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              {worker.rating || 4.8}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-slate-400" />
              {worker.experienceYears} Yrs
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {worker.locationCity}
            </span>
          </div>
        </div>
      </div>

      {/* Trust & QR */}
      <div className="grid grid-cols-2 gap-3 bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/60 mb-5 backdrop-blur-sm">
        <div className="flex flex-col justify-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Trust Index</span>
          <div className="text-3xl font-black text-emerald-400 mt-0.5">{worker.trustScore}<span className="text-base text-slate-400 font-normal">/100</span></div>
          <div className="text-[10px] text-slate-300 mt-1 leading-tight">
            ✓ Skills Tested<br />✓ ID Authenticated
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-2 rounded-xl shadow-inner">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Digital Profile" className="w-24 h-24 object-contain" />
          ) : (
            <div className="w-24 h-24 bg-slate-200 animate-pulse rounded-lg" />
          )}
          <span className="text-[9px] font-bold text-slate-700 mt-1 uppercase tracking-tight">Scan for Verified Bio</span>
        </div>
      </div>

      {/* Skills */}
      {worker.skills && worker.skills.length > 0 && (
        <div className="mb-5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase mb-2">Verified Competencies</div>
          <div className="flex flex-wrap gap-1.5">
            {worker.skills.slice(0, 4).map((s, idx) => (
              <span
                key={idx}
                className="text-xs bg-blue-900/40 text-blue-200 border border-blue-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1 font-medium"
              >
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                {s.skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {showShare && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={openWhatsApp}
            className="flex-1 bg-emerald-600/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 text-xs py-2"
          >
            WhatsApp Share
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleShare}
            className="flex-1 text-xs py-2 gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? "Copied!" : "Share Profile"}
          </Button>
        </div>
      )}
    </div>
  );
};
