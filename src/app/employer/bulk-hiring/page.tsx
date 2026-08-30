"use client";
import React from "react";
import { BulkHiringCard } from "@/components/employer/BulkHiringCard";
import { Users, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function BulkHiringPage() {
  const bulkCampaigns = [
    {
      id: "bulk-1",
      title: "Warehouse Picking & Packing Associates (50 Openings)",
      targetHires: 50,
      companyName: "Swiggy Instamart Logistics",
      locationCity: "Bengaluru",
      salary: "₹19,000 - ₹24,000/mo",
      totalApplied: 37,
      shortlisted: 21,
      interviewed: 12,
      hired: 8,
    },
    {
      id: "bulk-2",
      title: "Heavy Transport & Logistics Fleet Drivers (25 Openings)",
      targetHires: 25,
      companyName: "BlueDart Express Limited",
      locationCity: "Delhi",
      salary: "₹28,000 - ₹36,000/mo",
      totalApplied: 19,
      shortlisted: 11,
      interviewed: 8,
      hired: 5,
    },
    {
      id: "bulk-3",
      title: "Solar Rooftop Electrical Technicians (10 Openings)",
      targetHires: 10,
      companyName: "Tata Projects Limited",
      locationCity: "Vijayawada",
      salary: "₹23,000 - ₹29,000/mo",
      totalApplied: 14,
      shortlisted: 8,
      interviewed: 4,
      hired: 3,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-600" />
            <span>Bulk Hiring Campaign Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Target recruitment quotas, candidate pipeline velocity, and batch status transitions.
          </p>
        </div>

        <Link href="/employer/jobs/new">
          <Button variant="primary" size="sm" className="gap-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-700">
            <Plus className="w-4 h-4" />
            Create Bulk Campaign
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bulkCampaigns.map((job) => (
          <BulkHiringCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
