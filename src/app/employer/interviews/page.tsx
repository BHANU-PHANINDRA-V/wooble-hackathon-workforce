"use client";
import React from "react";
import { Calendar, Clock, MapPin, User, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function EmployerInterviewsPage() {
  const interviews = [
    {
      id: "int-1",
      candidateName: "Rahul Kumar",
      trade: "Industrial Electrician",
      jobTitle: "Senior Industrial Electrician",
      time: "Tomorrow at 10:30 AM",
      location: "Cherlapally Site Office",
      status: "CONFIRMED",
    },
    {
      id: "int-2",
      candidateName: "Suresh Rao",
      trade: "Certified Welder",
      jobTitle: "Certified TIG & Structural Welders",
      time: "Friday at 2:00 PM",
      location: "Cherlapally Fabrication Bay",
      status: "INVITED",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <span>Interview Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Track and coordinate candidate interviews</p>
        </div>
        <Link href="/employer/pipeline">
          <Button variant="outline" size="sm" className="text-xs font-bold">
            Back to Pipeline
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interviews.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{item.candidateName}</h3>
                <p className="text-xs text-amber-700 font-semibold">{item.trade} • {item.jobTitle}</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {item.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{item.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
