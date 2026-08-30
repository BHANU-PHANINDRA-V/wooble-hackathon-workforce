import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getFullSessionUser } from "@/lib/auth";
import { calculateExplainableMatch } from "@/lib/matching-engine";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getFullSessionUser();
    if (!user || user.role !== "WORKER" || !user.workerProfileId) {
      return NextResponse.json({ error: "Unauthorized: Worker profile required" }, { status: 403 });
    }

    const jobId = params.id;
    const { coverNote } = await req.json().catch(() => ({}));

    // Check existing application
    const existing = await prisma.application.findUnique({
      where: {
        jobId_workerProfileId: {
          jobId,
          workerProfileId: user.workerProfileId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "You have already applied for this job" }, { status: 400 });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        skills: { include: { skill: true } },
      },
    });

    const worker = await prisma.workerProfile.findUnique({
      where: { id: user.workerProfileId },
      include: {
        skills: { include: { skill: true } },
        certifications: true,
      },
    });

    if (!job || !worker) {
      return NextResponse.json({ error: "Job or worker profile not found" }, { status: 404 });
    }

    // Calculate match score
    const match = calculateExplainableMatch(
      {
        experienceYears: worker.experienceYears,
        expectedSalary: worker.expectedSalary,
        salaryType: worker.salaryType,
        latitude: worker.latitude,
        longitude: worker.longitude,
        preferredWorkRadiusKm: worker.preferredWorkRadiusKm,
        availabilityStatus: worker.availabilityStatus,
        preferredShift: worker.preferredShift,
        skills: worker.skills.map((s) => ({
          name: s.skill.name,
          experienceLevel: s.experienceLevel,
          yearsOfExperience: s.yearsOfExperience,
          isVerified: s.isVerified,
        })),
        certifications: worker.certifications.map((c) => ({
          name: c.name,
          verificationStatus: c.verificationStatus,
        })),
      },
      {
        minExperience: job.minExperience,
        maxExperience: job.maxExperience,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        salaryType: job.salaryType,
        latitude: job.latitude,
        longitude: job.longitude,
        shiftType: job.shiftType,
        immediateJoining: job.immediateJoining,
        skills: job.skills.map((s) => ({
          name: s.skill.name,
          isRequired: s.isRequired,
          minLevel: s.minLevel,
        })),
      }
    );

    const application = await prisma.application.create({
      data: {
        jobId,
        workerProfileId: user.workerProfileId,
        status: "APPLIED",
        matchScore: match.matchPercentage,
        matchBreakdownJson: JSON.stringify(match),
        coverNote,
      },
    });

    await prisma.applicationStatusHistory.create({
      data: {
        applicationId: application.id,
        newStatus: "APPLIED",
        changedById: user.id,
        changeReason: "Initial worker application submitted",
      },
    });

    return NextResponse.json({ success: true, application, match });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
