import { TrustScoreBreakdown } from "@/types";

export interface WorkerForTrustScore {
  isIdentityVerified: boolean;
  profileCompleteness: number;
  experienceYears: number;
  skills?: { isVerified: boolean }[];
  certifications?: { verificationStatus: string; expiryDate?: Date | null }[];
  applications?: { status: string; reviews?: { overallRating: number }[] }[];
}

export function calculateTrustScore(worker: WorkerForTrustScore, reviewsReceived: { overallRating: number }[] = []): TrustScoreBreakdown {
  let identityScore = 0;
  let skillScore = 0;
  let certScore = 0;
  let experienceScore = 0;
  let ratingScore = 0;
  let jobCompletionScore = 0;
  let profileCompletenessScore = 0;

  // 1. Identity Verification (Max: 20 pts)
  if (worker.isIdentityVerified) {
    identityScore = 20;
  }

  // 2. Skills Verification (Max: 20 pts, 5 pts per verified skill)
  const verifiedSkillsCount = worker.skills ? worker.skills.filter(s => s.isVerified).length : 0;
  skillScore = Math.min(20, verifiedSkillsCount * 5);

  // 3. Certifications (Max: 15 pts, 7.5 pts per verified non-expired cert)
  const now = new Date();
  const validCerts = worker.certifications
    ? worker.certifications.filter(c => c.verificationStatus === "VERIFIED" && (!c.expiryDate || new Date(c.expiryDate) > now))
    : [];
  certScore = Math.min(15, validCerts.length * 7.5);

  // 4. Documented Experience (Max: 15 pts, 3 pts per year of experience)
  experienceScore = Math.min(15, Math.round((worker.experienceYears || 0) * 3));

  // 5. Employer Ratings (Max: 15 pts)
  const allRatings = reviewsReceived.map(r => r.overallRating);
  let avgRating = 5.0;
  if (allRatings.length > 0) {
    avgRating = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
    ratingScore = Math.round((avgRating / 5) * 15);
  } else {
    ratingScore = 12; // Baseline 4.0 equivalent for fresh profiles with good standing
  }

  // 6. Completed Jobs / Hires on platform (Max: 10 pts, 2 pts per completed hire)
  const completedJobsCount = worker.applications
    ? worker.applications.filter(a => a.status === "HIRED").length
    : 0;
  jobCompletionScore = Math.min(10, completedJobsCount * 2 + (completedJobsCount > 0 ? 4 : 0));

  // 7. Profile Completeness (Max: 5 pts)
  profileCompletenessScore = Math.round(((worker.profileCompleteness || 50) / 100) * 5);

  const overallScore = Math.min(100, Math.round(
    identityScore + skillScore + certScore + experienceScore + ratingScore + jobCompletionScore + profileCompletenessScore
  ));

  const items = [
    {
      label: "Government Identity Verified",
      score: identityScore,
      maxScore: 20,
      achieved: identityScore >= 20,
      description: identityScore >= 20 ? "Aadhaar / Voter ID authenticated by platform moderator" : "Identity verification pending review"
    },
    {
      label: "Verified Technical Skills",
      score: skillScore,
      maxScore: 20,
      achieved: skillScore > 0,
      description: verifiedSkillsCount > 0 ? `${verifiedSkillsCount} skills tested & verified` : "No verified skills yet"
    },
    {
      label: "Accredited Certifications",
      score: Math.round(certScore),
      maxScore: 15,
      achieved: certScore > 0,
      description: validCerts.length > 0 ? `${validCerts.length} active trade credentials` : "Add ITI/NSDC trade certificate"
    },
    {
      label: "Documented Work Experience",
      score: experienceScore,
      maxScore: 15,
      achieved: experienceScore >= 9,
      description: `${worker.experienceYears || 0} years verified on-field experience`
    },
    {
      label: "Employer Ratings & Reputation",
      score: ratingScore,
      maxScore: 15,
      achieved: ratingScore >= 12,
      description: `${avgRating.toFixed(1)} / 5.0 average employer rating`
    },
    {
      label: "Platform Hires & Reliability",
      score: jobCompletionScore,
      maxScore: 10,
      achieved: jobCompletionScore > 0,
      description: completedJobsCount > 0 ? `${completedJobsCount} successful contracts completed` : "Complete your first job to gain points"
    },
    {
      label: "Profile Completeness",
      score: profileCompletenessScore,
      maxScore: 5,
      achieved: profileCompletenessScore >= 4,
      description: `${worker.profileCompleteness || 70}% profile details filled`
    }
  ];

  return {
    overallScore,
    identityScore,
    skillScore,
    certScore: Math.round(certScore),
    experienceScore,
    ratingScore,
    jobCompletionScore,
    profileCompletenessScore,
    items
  };
}
