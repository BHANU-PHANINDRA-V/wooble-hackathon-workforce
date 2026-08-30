"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Sparkles, Wand2, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { generateJobDescription } from "@/lib/ai-job-generator";

interface AIJobGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGeneratedData: (data: {
    title: string;
    category: string;
    description: string;
    responsibilities: string[];
    requiredSkills: string[];
    suggestedSalaryMin: number;
    suggestedSalaryMax: number;
  }) => void;
}

export const AIJobGeneratorModal: React.FC<AIJobGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApplyGeneratedData
}) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<any | null>(null);

  const samplePrompts = [
    "Need 10 certified industrial electricians for a factory in Hyderabad",
    "Urgent requirement for 50 warehouse pickers and packers in Bengaluru",
    "Need 5 high-pressure MIG welders for structural fabrication",
    "Hiring commercial plumbers for a new hospital construction project"
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const result = generateJobDescription(prompt);
      setGenerated(result);
      setLoading(false);
    }, 600);
  };

  const handleApply = () => {
    if (generated) {
      onApplyGeneratedData(generated);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-slate-900">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>AI Job Description Assistant</span>
        </div>
      }
      maxWidth="xl"
    >
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Describe your hiring need in plain words:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Need 10 electricians for solar plant installation in Vijayawada"
              className="flex-1 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
            <Button
              variant="primary"
              size="sm"
              isLoading={loading}
              onClick={handleGenerate}
              className="bg-indigo-600 hover:bg-indigo-700 gap-1.5 px-4"
            >
              <Wand2 className="w-4 h-4" />
              Generate
            </Button>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Quick Examples:</span>
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => { setPrompt(sp); }}
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition text-left"
              >
                {sp.slice(0, 35)}...
              </button>
            ))}
          </div>
        </div>

        {generated && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {generated.category}
                </span>
                <h4 className="text-base font-extrabold text-slate-900 mt-1">{generated.title}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Suggested Pay</span>
                <span className="text-sm font-extrabold text-emerald-700">
                  ₹{generated.suggestedSalaryMin.toLocaleString()} - ₹{generated.suggestedSalaryMax.toLocaleString()}/mo
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{generated.description}</p>

            <div>
              <h5 className="text-xs font-bold text-slate-800 mb-1.5">Key Responsibilities:</h5>
              <ul className="space-y-1">
                {generated.responsibilities.map((r: string, i: number) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-800 mb-1.5">Required Trade Skills:</h5>
              <div className="flex flex-wrap gap-1.5">
                {generated.requiredSkills.map((s: string, i: number) => (
                  <span key={i} className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-lg font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <Button
              variant="success"
              onClick={handleApply}
              className="w-full text-sm py-2.5 gap-2 mt-2"
            >
              <span>Use This Structured Description in Job Post</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
