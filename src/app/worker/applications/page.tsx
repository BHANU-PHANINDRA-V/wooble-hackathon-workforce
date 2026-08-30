"use client";
import React from "react";
import { ShieldCheck, Clock, MapPin, IndianRupee } from "lucide-react";

export default function WorkerApplicationsPage() {
  const applications = [
    {
      id: "app-1",
      jobTitle: "Senior Industrial Electrician (Panel & Substation)",
      company: "Tata Projects Limited",
      location: "Cherlapally, Hyderabad",
      appliedDate: "2 days ago",
      currentStage: "INTERVIEW",
      matchScore: 94,
      interviewInfo: "Scheduled for Tomorrow at 10:30 AM (Tata Projects Site Office, Cherlapally Gate 2)",
    },
    {
      id: "app-2",
      jobTitle: "Solar Rooftop Electrical Technician",
      company: "Tata Projects Limited",
      location: "Vijayawada",
      appliedDate: "4 days ago",
      currentStage: "SHORTLISTED",
      matchScore: 91,
    },
    {
      id: "app-3",
      jobTitle: "Motor Rewinding & Testing Technician",
      company: "Havells India Electric",
      location: "Pune",
      appliedDate: "1 week ago",
      currentStage: "SCREENING",
      matchScore: 88,
    },
  ];

  const stages = ["APPLIED", "SCREENING", "SHORTLISTED", "INTERVIEW", "HIRED"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Application Status & Timeline</h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time status updates and stage history</p>
      </div>

      <div className="space-y-6">
        {applications.map((app) => {
          const currentStageIndex = stages.indexOf(app.currentStage);

          return (
            <div key={app.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{app.jobTitle}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{app.company} • {app.location} • Applied {app.appliedDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl">
                    {app.matchScore}% Match
                  </span>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold uppercase mb-2">
                  {stages.map((st, idx) => {
                    const isPassed = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;
                    return (
                      <span
                        key={st}
                        className={isCurrent ? "text-blue-700 font-black" : isPassed ? "text-emerald-600" : "text-slate-400"}
                      >
                        {st}
                      </span>
                    );
                  })}
                </div>

                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
                  />
                </div>
              </div>

              {app.interviewInfo && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 font-medium flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>Upcoming Interview:</strong> {app.interviewInfo}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
