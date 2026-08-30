"use client";
import React, { useState } from "react";
import { Bell, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function WorkerAlertsPage() {
  const [alerts, setAlerts] = useState([
    { id: "a-1", title: "Industrial Electrician in Hyderabad (₹25,000+)", radius: 20 },
    { id: "a-2", title: "Solar Rooftop Technician in Vijayawada", radius: 30 },
  ]);
  const [title, setTitle] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setAlerts((prev) => [...prev, { id: `a-${Date.now()}`, title, radius: 25 }]);
    setTitle("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Bell className="w-6 h-6 text-amber-500" />
          <span>Job Alerts</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Receive immediate notifications when matching jobs appear</p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Electrician + Vijayawada + ₹25,000+"
          className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-sm"
        />
        <Button variant="primary" size="md" type="submit" className="gap-1.5 font-bold text-xs">
          <Plus className="w-4 h-4" /> Add Alert
        </Button>
      </form>

      <div className="space-y-3">
        {alerts.map((al) => (
          <div key={al.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">{al.title}</h4>
              <span className="text-[10px] text-slate-500">Radius: {al.radius} km • Status: Active</span>
            </div>
            <button
              onClick={() => setAlerts((prev) => prev.filter((x) => x.id !== al.id))}
              className="text-slate-400 hover:text-red-600 p-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
