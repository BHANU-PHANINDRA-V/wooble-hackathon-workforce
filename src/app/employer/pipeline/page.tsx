"use client";
import React, { useEffect, useState } from "react";
import { KanbanBoard } from "@/components/employer/KanbanBoard";
import { Layers, Sparkles, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ApplicationStatus } from "@/types";

export default function EmployerPipelinePage() {
  const initialData = [
    {
      id: "app-1",
      workerProfileId: "wp-1",
      status: "APPLIED" as ApplicationStatus,
      appliedAt: "2026-08-29",
      matchScore: 94,
      workerName: "Rahul Kumar",
      workerTrade: "Industrial Electrician",
      workerExperience: 6,
      workerTrustScore: 92,
      workerCity: "Hyderabad",
      workerRating: 4.8,
      jobTitle: "Senior Industrial Electrician",
      jobId: "job-1",
      workerAvatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "app-2",
      workerProfileId: "wp-2",
      status: "SCREENING" as ApplicationStatus,
      appliedAt: "2026-08-28",
      matchScore: 91,
      workerName: "Suresh Rao",
      workerTrade: "Certified TIG/MIG Welder",
      workerExperience: 7,
      workerTrustScore: 94,
      workerCity: "Hyderabad",
      workerRating: 4.9,
      jobTitle: "Certified TIG & Structural Welders",
      jobId: "job-3",
      workerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "app-3",
      workerProfileId: "wp-3",
      status: "SHORTLISTED" as ApplicationStatus,
      appliedAt: "2026-08-27",
      matchScore: 88,
      workerName: "Vikram Naik",
      workerTrade: "Commercial Plumber",
      workerExperience: 5,
      workerTrustScore: 88,
      workerCity: "Vijayawada",
      workerRating: 4.7,
      jobTitle: "Commercial Plumbers",
      jobId: "job-4",
      workerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "app-4",
      workerProfileId: "wp-4",
      status: "INTERVIEW" as ApplicationStatus,
      appliedAt: "2026-08-26",
      matchScore: 86,
      workerName: "Santosh Yadav",
      workerTrade: "Warehouse Associate",
      workerExperience: 3,
      workerTrustScore: 86,
      workerCity: "Bengaluru",
      workerRating: 4.6,
      jobTitle: "Warehouse Picking & Packing",
      jobId: "job-2",
      workerAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "app-5",
      workerProfileId: "wp-5",
      status: "HIRED" as ApplicationStatus,
      appliedAt: "2026-08-25",
      matchScore: 95,
      workerName: "Gopal Krishna",
      workerTrade: "Substation Cable Jointer",
      workerExperience: 8,
      workerTrustScore: 96,
      workerCity: "Visakhapatnam",
      workerRating: 5.0,
      jobTitle: "Senior Industrial Electrician",
      jobId: "job-1",
      workerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    },
  ];

  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    try {
      await fetch(`/api/applications/${appId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-600" />
            <span>Interactive Recruitment Kanban Pipeline</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Progress candidates seamlessly across stages with persistent audit logs and instant worker notifications.
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/employer/jobs/new">
            <Button variant="primary" size="sm" className="gap-1.5 text-xs font-bold">
              <Plus className="w-4 h-4" /> Post Job
            </Button>
          </Link>
        </div>
      </div>

      <KanbanBoard
        initialApplications={initialData}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
