import { MatchScoreResult } from "@/types";
import { calculateDistanceKm } from "./utils";

export interface WorkerMatchInput {
  experienceYears: number;
  expectedSalary: number;
  salaryType: string;
  latitude: number;
  longitude: number;
  preferredWorkRadiusKm: number;
  availabilityStatus: string;
  preferredShift: string;
  skills: { name: string; experienceLevel: string; yearsOfExperience: number; isVerified: boolean }[];
  certifications?: { name: string; verificationStatus: string }[];
}

export interface JobMatchInput {
  minExperience: number;
  maxExperience?: number | null;
  minSalary: number;
  maxSalary: number;
  salaryType: string;
  latitude: number;
  longitude: number;
  shiftType: string;
  immediateJoining: boolean;
  skills: { name: string; isRequired: boolean; minLevel: string }[];
}

export function calculateExplainableMatch(worker: WorkerMatchInput, job: JobMatchInput): MatchScoreResult {
  const reasons: string[] = [];

  // 1. Skill Match (Max: 40 pts)
  let skillPoints = 0;
  const jobSkills = job.skills || [];
  const workerSkillsMap = new Map(worker.skills.map(s => [s.name.toLowerCase().trim(), s]));
  
  if (jobSkills.length === 0) {
    skillPoints = 35;
    reasons.push("General skill set aligns with job category");
  } else {
    let matchedCount = 0;
    let requiredMatched = 0;

    for (const js of jobSkills) {
      const match = workerSkillsMap.get(js.name.toLowerCase().trim());
      if (match) {
        matchedCount++;
        if (js.isRequired) requiredMatched++;
        if (match.isVerified) skillPoints += 2;
      }
    }

    const ratio = matchedCount / jobSkills.length;
    skillPoints += Math.round(ratio * 35);
    skillPoints = Math.min(40, skillPoints);

    if (matchedCount === jobSkills.length) {
      reasons.push(`✓ All ${jobSkills.length}/${jobSkills.length} required skills matched`);
    } else if (matchedCount > 0) {
      reasons.push(`✓ ${matchedCount}/${jobSkills.length} relevant trade skills matched`);
    }
  }

  // 2. Experience Match (Max: 20 pts)
  let expPoints = 0;
  const wExp = worker.experienceYears || 0;
  const reqExp = job.minExperience || 0;

  if (wExp >= reqExp) {
    expPoints = 20;
    reasons.push(`✓ ${wExp} yrs experience meets the ${reqExp}+ yrs requirement`);
  } else if (wExp >= reqExp * 0.7) {
    expPoints = 14;
    reasons.push(`~ ${wExp} yrs experience is close to required ${reqExp} yrs`);
  } else {
    expPoints = Math.max(5, Math.round((wExp / (reqExp || 1)) * 15));
  }

  // 3. Location & Radius Match (Max: 15 pts)
  let locPoints = 0;
  const distanceKm = calculateDistanceKm(worker.latitude, worker.longitude, job.latitude, job.longitude);
  const maxRadius = worker.preferredWorkRadiusKm || 20;

  if (distanceKm <= maxRadius) {
    locPoints = 15;
    reasons.push(`✓ Located ${distanceKm} km away (within your ${maxRadius} km radius)`);
  } else if (distanceKm <= maxRadius * 1.5) {
    locPoints = 9;
    reasons.push(`~ Located ${distanceKm} km away (slightly beyond ${maxRadius} km radius)`);
  } else {
    locPoints = 4;
  }

  // 4. Availability & Shift Match (Max: 10 pts)
  let availPoints = 0;
  const isAvailNow = worker.availabilityStatus === "AVAILABLE_NOW";
  const shiftMatch = worker.preferredShift === "FLEXIBLE" || worker.preferredShift === job.shiftType;

  if (isAvailNow && shiftMatch) {
    availPoints = 10;
    reasons.push(`✓ Available immediately for ${job.shiftType.toLowerCase()} shift`);
  } else if (isAvailNow || shiftMatch) {
    availPoints = 7;
    if (isAvailNow) reasons.push("✓ Ready for immediate joining");
    if (shiftMatch) reasons.push(`✓ Matches preferred ${job.shiftType.toLowerCase()} shift`);
  } else {
    availPoints = 4;
  }

  // 5. Salary Compatibility (Max: 10 pts)
  let salPoints = 0;
  const expSal = worker.expectedSalary || 0;
  if (expSal === 0 || (expSal >= job.minSalary * 0.8 && expSal <= job.maxSalary * 1.2)) {
    salPoints = 10;
    reasons.push(`✓ Salary (₹${job.minSalary.toLocaleString("en-IN")}–₹${job.maxSalary.toLocaleString("en-IN")}) matches your expectation`);
  } else if (expSal < job.minSalary) {
    salPoints = 10;
    reasons.push(`✓ Job compensation exceeds your minimum expected salary`);
  } else {
    salPoints = 5;
  }

  // 6. Certification Fit (Max: 5 pts)
  let certPoints = 5;
  const verifiedCerts = worker.certifications?.filter(c => c.verificationStatus === "VERIFIED") || [];
  if (verifiedCerts.length > 0) {
    reasons.push(`✓ ${verifiedCerts.length} verified trade certification(s) on profile`);
  }

  const matchPercentage = Math.min(99, Math.max(45, skillPoints + expPoints + locPoints + availPoints + salPoints + certPoints));

  return {
    matchPercentage,
    breakdown: {
      skillMatch: { score: skillPoints, max: 40, label: "Skill Match" },
      experience: { score: expPoints, max: 20, label: "Experience" },
      location: { score: locPoints, max: 15, label: "Location & Radius" },
      availability: { score: availPoints, max: 10, label: "Availability & Shift" },
      salary: { score: salPoints, max: 10, label: "Salary Compatibility" },
      certification: { score: certPoints, max: 5, label: "Certification" }
    },
    reasons
  };
}
