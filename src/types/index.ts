export type UserRole = "WORKER" | "EMPLOYER" | "ADMIN";
export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";
export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "SKILLED" | "ADVANCED" | "EXPERT";
export type SalaryType = "MONTHLY" | "DAILY" | "HOURLY";
export type AvailabilityStatus = "AVAILABLE_NOW" | "AVAILABLE_FROM_DATE" | "EMPLOYED" | "NOT_LOOKING";
export type ShiftType = "DAY" | "NIGHT" | "ROTATIONAL" | "FLEXIBLE";
export type JobStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "CLOSED";
export type ApplicationStatus = "APPLIED" | "SCREENING" | "SHORTLISTED" | "INTERVIEW" | "SELECTED" | "OFFER" | "HIRED" | "REJECTED";
export type InterviewType = "OFFLINE" | "ONLINE";
export type InterviewStatus = "SCHEDULED" | "ACCEPTED" | "REJECTED" | "RESCHEDULE_REQUESTED" | "COMPLETED" | "CANCELLED";
export type ReviewType = "EMPLOYER_TO_WORKER" | "WORKER_TO_EMPLOYER";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string | null;
  avatar?: string | null;
  isVerified: boolean;
  workerProfileId?: string;
  employerProfileId?: string;
  companyId?: string;
}

export interface TrustScoreBreakdown {
  overallScore: number;
  identityScore: number;
  skillScore: number;
  certScore: number;
  experienceScore: number;
  ratingScore: number;
  jobCompletionScore: number;
  profileCompletenessScore: number;
  items: {
    label: string;
    score: number;
    maxScore: number;
    achieved: boolean;
    description: string;
  }[];
}

export interface MatchScoreResult {
  matchPercentage: number;
  breakdown: {
    skillMatch: { score: number; max: number; label: string };
    experience: { score: number; max: number; label: string };
    location: { score: number; max: number; label: string };
    availability: { score: number; max: number; label: string };
    salary: { score: number; max: number; label: string };
    certification: { score: number; max: number; label: string };
  };
  reasons: string[];
}

export interface ParsedJobQuery {
  skill?: string;
  location?: string;
  minSalary?: number;
  shift?: ShiftType;
  experienceYears?: number;
  rawQuery: string;
}
