"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Wand2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AIJobGeneratorModal } from "@/components/employer/AIJobGeneratorModal";

export default function NewJobPage() {
  const router = useRouter();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [title, setTitle] = useState("Senior Industrial Electrician");
  const [category, setCategory] = useState("Electrician");
  const [description, setDescription] = useState("We are hiring skilled and certified Electricians for industrial wiring, panel installation, motor maintenance, and electrical diagnostics.");
  const [numberOfOpenings, setNumberOfOpenings] = useState(8);
  const [minSalary, setMinSalary] = useState(25000);
  const [maxSalary, setMaxSalary] = useState(32000);
  const [locationCity, setLocationCity] = useState("Hyderabad");
  const [shiftType, setShiftType] = useState("DAY");
  const [isBulkHiring, setIsBulkHiring] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApplyAiData = (data: any) => {
    setTitle(data.title);
    setCategory(data.category);
    setDescription(data.description);
    setMinSalary(data.suggestedSalaryMin);
    setMaxSalary(data.suggestedSalaryMax);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          description,
          numberOfOpenings,
          minSalary,
          maxSalary,
          locationCity,
          shiftType,
          isBulkHiring,
          targetHires: numberOfOpenings,
          skills: [{ name: "Industrial Electrical Wiring", isRequired: true }],
        }),
      });

      if (res.ok) {
        router.push("/employer/pipeline");
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Post a Skilled Trade Opening</h1>
          <p className="text-xs text-slate-500 mt-0.5">Reach verified trade workers across your preferred radius</p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => setIsAiModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 gap-1.5 text-xs font-bold shadow-md shadow-indigo-500/20"
        >
          <Sparkles className="w-4 h-4" />
          AI Description Assistant
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Job Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category / Trade</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm bg-white"
            >
              <option value="Electrician">Electrician</option>
              <option value="Welder">Welder</option>
              <option value="Plumber">Plumber</option>
              <option value="Warehouse Executive">Warehouse Executive</option>
              <option value="Driver">Driver</option>
              <option value="Technician">Technician</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City Location</label>
            <select
              value={locationCity}
              onChange={(e) => setLocationCity(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm bg-white"
            >
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Min Salary (₹/mo)</label>
            <input
              type="number"
              value={minSalary}
              onChange={(e) => setMinSalary(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Max Salary (₹/mo)</label>
            <input
              type="number"
              value={maxSalary}
              onChange={(e) => setMaxSalary(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Openings</label>
            <input
              type="number"
              value={numberOfOpenings}
              onChange={(e) => setNumberOfOpenings(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Job Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
          <input
            type="checkbox"
            id="bulkCheck"
            checked={isBulkHiring}
            onChange={(e) => setIsBulkHiring(e.target.checked)}
            className="w-4 h-4 text-amber-600 rounded"
          />
          <label htmlFor="bulkCheck" className="text-xs font-bold text-amber-900 cursor-pointer">
            Mark as Bulk Hiring Campaign (Enable target tracking and bulk candidate processing)
          </label>
        </div>

        <Button variant="primary" size="lg" type="submit" isLoading={loading} className="w-full font-bold">
          <span>Publish Verified Job Opening</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </form>

      <AIJobGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyGeneratedData={handleApplyAiData}
      />
    </div>
  );
}
