"use client";
import React, { useState } from "react";
import { ShieldCheck, Award, CheckCircle2, XCircle, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminVerificationPage() {
  const [items, setItems] = useState([
    {
      id: "cert-1",
      workerName: "Rahul Kumar",
      trade: "Industrial Electrician",
      city: "Hyderabad",
      certName: "Industrial Electrical Supervisor License",
      issuingOrg: "Telangana State Electrical Licensing Board",
      certNumber: "TS-ELB-SUP-4491",
      submittedDate: "Today",
      docUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
      status: "PENDING",
    },
    {
      id: "cert-2",
      workerName: "Suresh Rao",
      trade: "Certified Welder",
      city: "Hyderabad",
      certName: "National Skill Qualification - MIG/TIG Welder",
      issuingOrg: "National Skill Development Corporation (NSDC)",
      certNumber: "NSDC-WELD-2023-8871",
      submittedDate: "Yesterday",
      docUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
      status: "PENDING",
    },
  ]);

  const handleAction = async (id: string, action: "APPROVE" | "REJECT") => {
    try {
      await fetch("/api/admin/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "CERTIFICATE", id, action }),
      });
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: action === "APPROVE" ? "VERIFIED" : "REJECTED" } : item))
      );
    } catch {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <span>Credential & Identity Verification Queue</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Inspect uploaded government trade certificates and authenticate official badges
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Trade License
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{item.certName}</h3>
                <p className="text-xs text-slate-500 font-semibold">{item.workerName} ({item.trade}) • {item.city}</p>
              </div>

              <div>
                {item.status === "PENDING" ? (
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                    Pending Review
                  </span>
                ) : item.status === "VERIFIED" ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    ✓ Verified
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-800 bg-red-100 px-3 py-1 rounded-full">
                    ✕ Rejected
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl">
              <div>
                <span className="text-slate-400 block font-medium">Issuing Authority</span>
                <span className="font-bold text-slate-800">{item.issuingOrg}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Certificate Identifier</span>
                <span className="font-bold font-mono text-slate-800">{item.certNumber}</span>
              </div>
            </div>

            {item.status === "PENDING" && (
              <div className="flex gap-3 pt-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAction(item.id, "APPROVE")}
                  className="flex-1 text-xs font-bold gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve Credential (+15 Trust Points)
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleAction(item.id, "REJECT")}
                  className="flex-1 text-xs font-bold gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Document
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
