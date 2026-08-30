"use client";
import React, { useState } from "react";
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function WorkerInterviewsPage() {
  const [interviews, setInterviews] = useState([
    {
      id: "int-1",
      jobTitle: "Senior Industrial Electrician",
      company: "Tata Projects Limited",
      time: "Tomorrow at 10:30 AM",
      type: "OFFLINE",
      location: "Tata Projects Site Office, Cherlapally Industrial Area, Gate 2",
      instructions: "Please bring your original NCVT trade license and Aadhaar card.",
      status: "SCHEDULED",
    },
  ]);

  const handleAction = (id: string, status: string) => {
    setInterviews((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          <span>Scheduled Interviews</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage employer interview invitations and site visit schedules</p>
      </div>

      <div className="space-y-4">
        {interviews.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{item.jobTitle}</h3>
                <p className="text-xs text-slate-500 font-semibold">{item.company}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                item.status === "ACCEPTED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
              }`}>
                {item.status === "ACCEPTED" ? "Confirmed ✓" : "Invitation Pending"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{item.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{item.location}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 italic">{item.instructions}</p>

            {item.status === "SCHEDULED" && (
              <div className="flex gap-3 pt-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAction(item.id, "ACCEPTED")}
                  className="flex-1 text-xs font-bold gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Accept & Confirm Attendance
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction(item.id, "REJECTED")}
                  className="flex-1 text-xs font-bold text-red-600 border-red-200 hover:bg-red-50 gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  Request Another Time
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
