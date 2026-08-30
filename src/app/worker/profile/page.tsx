"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  HardHat,
  ShieldCheck,
  Award,
  Briefcase,
  CheckCircle2,
  Share2,
  Plus,
  Edit2,
  Save,
  Clock,
  MapPin,
  IndianRupee
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TrustScoreBadge } from "@/components/shared/TrustScoreBadge";
import { DigitalIDCard } from "@/components/worker/DigitalIDCard";

export default function WorkerProfilePage() {
  const { user } = useAuth();
  const [workerData, setWorkerData] = useState<any | null>(null);
  const [trustBreakdown, setTrustBreakdown] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "certs" | "experience" | "samples">("overview");

  // Edit modal / inputs
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editOccupation, setEditOccupation] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editExp, setEditExp] = useState(6);
  const [editSalary, setEditSalary] = useState(28000);
  const [editCity, setEditCity] = useState("Hyderabad");

  // Add Skill Form
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("SKILLED");

  // Add Cert Form
  const [newCertName, setNewCertName] = useState("");
  const [newCertOrg, setNewCertOrg] = useState("");
  const [newCertNum, setNewCertNum] = useState("");

  const fetchProfile = () => {
    fetch("/api/workers/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.worker) {
          setWorkerData(data.worker);
          setTrustBreakdown(data.trustBreakdown);
          setEditName(data.worker.user?.name || "");
          setEditOccupation(data.worker.primaryOccupation || "");
          setEditBio(data.worker.bio || "");
          setEditExp(data.worker.experienceYears || 5);
          setEditSalary(data.worker.expectedSalary || 25000);
          setEditCity(data.worker.locationCity || "Hyderabad");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/workers/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          primaryOccupation: editOccupation,
          bio: editBio,
          experienceYears: editExp,
          expectedSalary: editSalary,
          locationCity: editCity,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        fetchProfile();
      }
    } catch {}
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    try {
      const res = await fetch("/api/workers/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newSkillName,
          newSkillLevel,
        }),
      });
      if (res.ok) {
        setNewSkillName("");
        fetchProfile();
      }
    } catch {}
  };

  const handleAddCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim() || !newCertOrg.trim()) return;
    try {
      const res = await fetch("/api/workers/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newCertName,
          newCertOrg,
          newCertNum,
        }),
      });
      if (res.ok) {
        setNewCertName("");
        setNewCertOrg("");
        setNewCertNum("");
        fetchProfile();
      }
    } catch {}
  };

  const workerCardData = {
    id: workerData?.id || "worker-demo",
    name: workerData?.user?.name || user?.name || "Rahul Kumar",
    primaryOccupation: workerData?.primaryOccupation || "Industrial Electrician",
    experienceYears: workerData?.experienceYears || 6,
    expectedSalary: workerData?.expectedSalary || 28000,
    locationCity: workerData?.locationCity || "Hyderabad",
    locationState: workerData?.locationState || "Telangana",
    trustScore: workerData?.trustScore || 92,
    isIdentityVerified: workerData?.isIdentityVerified ?? true,
    rating: 4.8,
    avatar: workerData?.user?.avatar || user?.avatar || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    phone: workerData?.user?.phone || user?.phone || "+91 91234 56789",
    skills: workerData?.skills || [],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Verified Digital Professional Identity</h1>
          <p className="text-xs text-slate-500 mt-0.5">Government authenticated profile with verifiable trade credentials</p>
        </div>
        <div className="flex items-center gap-3">
          <TrustScoreBadge score={workerCardData.trustScore} breakdown={trustBreakdown} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-bold gap-1.5"
          >
            <Edit2 className="w-3.5 h-3.5" />
            {isEditing ? "Close Editor" : "Edit Profile"}
          </Button>
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 border-2 border-blue-500/40 shadow-lg space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase">Update Professional Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Primary Trade</label>
              <input
                type="text"
                value={editOccupation}
                onChange={(e) => setEditOccupation(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">City Location</label>
              <input
                type="text"
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Years of Experience</label>
              <input
                type="number"
                value={editExp}
                onChange={(e) => setEditExp(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Expected Salary (₹/mo)</label>
              <input
                type="number"
                value={editSalary}
                onChange={(e) => setEditSalary(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Bio / Trade Summary</label>
            <textarea
              rows={2}
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
            />
          </div>

          <Button variant="primary" size="sm" type="submit" className="gap-1.5 text-xs font-bold">
            <Save className="w-3.5 h-3.5" /> Save Changes
          </Button>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <DigitalIDCard worker={workerCardData} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {(["overview", "skills", "certs", "experience", "samples"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[90px] py-2 rounded-xl text-xs font-bold capitalize transition ${
                  activeTab === tab ? "bg-white text-blue-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Professional Summary</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {workerData?.bio || "Certified trade professional with demonstrated industrial on-field experience, safety credentials, and verified competency records."}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] text-slate-500 block">Total Experience</span>
                  <span className="text-sm font-bold text-slate-900">{workerCardData.experienceYears} Years</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] text-slate-500 block">Expected Pay</span>
                  <span className="text-sm font-bold text-emerald-700">₹{workerCardData.expectedSalary.toLocaleString()}/mo</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] text-slate-500 block">Availability</span>
                  <span className="text-sm font-bold text-blue-700">Available Now</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Verified Trade Competencies</h3>
              </div>

              <form onSubmit={handleAddSkill} className="flex gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Add skill (e.g. PLC Automation, TIG Welding)"
                  className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                />
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                  className="px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="SKILLED">Skilled</option>
                  <option value="ADVANCED">Advanced</option>
                  <option value="EXPERT">Expert</option>
                </select>
                <Button variant="primary" size="sm" type="submit" className="text-xs py-1">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add
                </Button>
              </form>

              <div className="space-y-3">
                {workerData?.skills && workerData.skills.length > 0 ? (
                  workerData.skills.map((s: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{s.skill?.name || s.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="text-[11px] text-slate-500">{s.yearsOfExperience || workerCardData.experienceYears} Years • Level: {s.experienceLevel || "SKILLED"}</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Verified ✓
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400 italic">No skills added yet.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "certs" && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Licenses & Certifications</h3>

              <form onSubmit={handleAddCert} className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newCertName}
                    onChange={(e) => setNewCertName(e.target.value)}
                    placeholder="Certificate Name (e.g. NCVT Wireman)"
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                  <input
                    type="text"
                    value={newCertOrg}
                    onChange={(e) => setNewCertOrg(e.target.value)}
                    placeholder="Issuing Authority (e.g. State Board)"
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCertNum}
                    onChange={(e) => setNewCertNum(e.target.value)}
                    placeholder="Certificate Number / Identifier"
                    className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                  <Button variant="primary" size="sm" type="submit" className="text-xs py-1">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Certificate
                  </Button>
                </div>
              </form>

              <div className="space-y-3">
                {workerData?.certifications && workerData.certifications.length > 0 ? (
                  workerData.certifications.map((c: any, i: number) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span>{c.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{c.issuingOrg}</p>
                        <p className="text-[10px] font-mono text-slate-400 mt-1">License No: {c.certificateNumber}</p>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                        ✓ {c.verificationStatus || "VERIFIED"}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400 italic">No certifications added yet.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Employment History</h3>
              <div className="space-y-4">
                {workerData?.experiences && workerData.experiences.length > 0 ? (
                  workerData.experiences.map((exp: any, i: number) => (
                    <div key={i} className="border-l-2 border-blue-500 pl-4 space-y-1">
                      <h4 className="text-xs font-bold text-slate-900">{exp.jobTitle}</h4>
                      <p className="text-[11px] text-blue-600 font-semibold">{exp.companyName} • {exp.location}</p>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{exp.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="border-l-2 border-blue-500 pl-4 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900">{workerCardData.primaryOccupation}</h4>
                    <p className="text-[11px] text-blue-600 font-semibold">{workerCardData.locationCity} Industrial Operations • {workerCardData.experienceYears} Years</p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{workerData?.bio || "Demonstrated trade work on commercial and industrial projects."}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "samples" && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Practical Work Proofs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workerData?.workSamples && workerData.workSamples.length > 0 ? (
                  workerData.workSamples.map((sample: any, i: number) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img src={sample.imageUrl} alt={sample.title} className="w-full h-36 object-cover" />
                      <div className="p-3">
                        <span className="text-[10px] font-bold text-blue-600 uppercase">{sample.category}</span>
                        <h4 className="text-xs font-bold text-slate-900 mt-0.5">{sample.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1">{sample.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 col-span-2 p-6 text-center text-xs text-slate-400">
                    Add photos of your on-site trade work to showcase real workmanship.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
