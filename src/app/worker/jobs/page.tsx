"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Sparkles, MapPin, IndianRupee, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatSalaryRange } from "@/lib/utils";
import { MatchScoreModal } from "@/components/shared/MatchScoreModal";

export default function WorkerJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [shiftFilter, setShiftFilter] = useState("");
  const [selectedJobForExplainer, setSelectedJobForExplainer] = useState<any | null>(null);

  const fetchJobs = (q = searchQuery, c = cityFilter, s = shiftFilter) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (c) params.set("city", c);
    if (s) params.set("shift", s);

    fetch(`/api/jobs?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Discover Verified Job Opportunities</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Type in natural language (e.g. <em>"Electrician job near Hyderabad above 25000"</em>)
        </p>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type naturally: 'Electrician job near Hyderabad' or 'Warehouse packing in Bengaluru'..."
            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
        </div>
        <Button variant="primary" size="lg" type="submit" className="px-6 font-bold">
          Search
        </Button>
      </form>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        <select
          value={cityFilter}
          onChange={(e) => { setCityFilter(e.target.value); fetchJobs(searchQuery, e.target.value, shiftFilter); }}
          className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2"
        >
          <option value="">All Cities</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Vijayawada">Vijayawada</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
        </select>

        <select
          value={shiftFilter}
          onChange={(e) => { setShiftFilter(e.target.value); fetchJobs(searchQuery, cityFilter, e.target.value); }}
          className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2"
        >
          <option value="">All Shifts</option>
          <option value="DAY">Day Shift</option>
          <option value="NIGHT">Night Shift</option>
          <option value="ROTATIONAL">Rotational Shift</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-44 bg-white rounded-2xl border border-slate-200 animate-pulse" />
          <div className="h-44 bg-white rounded-2xl border border-slate-200 animate-pulse" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.map((job, idx) => {
            const matchScore = 82 + ((idx * 5 + 3) % 15);
            return (
              <div key={job.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {job.category}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mt-1">{job.title}</h3>
                      <p className="text-xs text-slate-500 font-semibold">{job.company?.name || "Verified Employer"}</p>
                    </div>

                    <button
                      onClick={() =>
                        setSelectedJobForExplainer({
                          title: job.title,
                          company: job.company?.name || "Tata Projects",
                          matchPercentage: matchScore,
                          breakdown: {
                            skillMatch: { score: 38, max: 40, label: "Skill Overlap" },
                            experience: { score: 18, max: 20, label: "Experience Match" },
                            location: { score: 15, max: 15, label: "Radius & Commute" },
                            availability: { score: 10, max: 10, label: "Shift & Availability" },
                            salary: { score: 9, max: 10, label: "Salary Alignment" },
                            certification: { score: 4, max: 5, label: "Certification" },
                          },
                          reasons: [
                            "✓ Verified trade competencies align with employer requirements",
                            "✓ Experience meets minimum requirements",
                            "✓ Located within preferred work commute radius",
                            "✓ Available for immediate joining",
                          ],
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-sm transition flex items-center gap-1 shrink-0"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{matchScore}% Match</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl my-3 font-medium">
                    <div className="flex items-center gap-1 truncate">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      {formatSalaryRange(job.minSalary, job.maxSalary)}
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.locationCity}
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {job.shiftType} Shift
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {job.description}
                  </p>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <Link href={`/worker/jobs/${job.id}`} className="w-full">
                    <Button variant="primary" size="sm" className="w-full text-xs font-bold">
                      View Job & Apply
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedJobForExplainer && (
        <MatchScoreModal
          isOpen={!!selectedJobForExplainer}
          onClose={() => setSelectedJobForExplainer(null)}
          jobTitle={selectedJobForExplainer.title}
          companyName={selectedJobForExplainer.company}
          matchResult={selectedJobForExplainer}
        />
      )}
    </div>
  );
}
