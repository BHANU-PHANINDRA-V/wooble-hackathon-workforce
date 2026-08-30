import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getFullSessionUser } from "@/lib/auth";
import { calculateTrustScore } from "@/lib/trust-score";

export async function GET() {
  try {
    const user = await getFullSessionUser();
    if (!user || user.role !== "WORKER" || !user.workerProfileId) {
      return NextResponse.json({ error: "Unauthorized: Worker profile required" }, { status: 401 });
    }

    const worker = await prisma.workerProfile.findUnique({
      where: { id: user.workerProfileId },
      include: {
        user: true,
        skills: { include: { skill: true } },
        certifications: true,
        experiences: { orderBy: { startDate: "desc" } },
        workSamples: { orderBy: { createdAt: "desc" } },
        applications: {
          include: {
            job: { include: { company: true } },
            interviews: true,
            reviews: true,
          },
          orderBy: { appliedAt: "desc" },
        },
      },
    });

    if (!worker) {
      return NextResponse.json({ error: "Worker profile not found" }, { status: 404 });
    }

    const reviewsReceived = await prisma.review.findMany({
      where: { revieweeId: worker.userId },
    });

    const trustBreakdown = calculateTrustScore(
      {
        isIdentityVerified: worker.isIdentityVerified,
        profileCompleteness: worker.profileCompleteness,
        experienceYears: worker.experienceYears,
        skills: worker.skills.map((s) => ({ isVerified: s.isVerified })),
        certifications: worker.certifications.map((c) => ({
          verificationStatus: c.verificationStatus,
          expiryDate: c.expiryDate,
        })),
        applications: worker.applications.map((a) => ({
          status: a.status,
          reviews: a.reviews,
        })),
      },
      reviewsReceived
    );

    if (worker.trustScore !== trustBreakdown.overallScore) {
      await prisma.workerProfile.update({
        where: { id: worker.id },
        data: { trustScore: trustBreakdown.overallScore },
      });
      worker.trustScore = trustBreakdown.overallScore;
    }

    return NextResponse.json({ worker, trustBreakdown, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getFullSessionUser();
    if (!user || user.role !== "WORKER" || !user.workerProfileId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      primaryOccupation,
      bio,
      experienceYears,
      expectedSalary,
      locationCity,
      locationState,
      preferredShift,
      availabilityStatus,
      newSkillName,
      newSkillLevel,
      newCertName,
      newCertOrg,
      newCertNum,
    } = body;

    if (name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name },
      });
    }

    if (newSkillName) {
      let skillRecord = await prisma.skill.findUnique({ where: { name: newSkillName } });
      if (!skillRecord) {
        skillRecord = await prisma.skill.create({
          data: { name: newSkillName, category: primaryOccupation || "General" },
        });
      }
      const existingWS = await prisma.workerSkill.findUnique({
        where: {
          workerProfileId_skillId: {
            workerProfileId: user.workerProfileId,
            skillId: skillRecord.id,
          },
        },
      });
      if (!existingWS) {
        await prisma.workerSkill.create({
          data: {
            workerProfileId: user.workerProfileId,
            skillId: skillRecord.id,
            experienceLevel: newSkillLevel || "SKILLED",
            yearsOfExperience: experienceYears || 2,
            isVerified: true,
          },
        });
      }
    }

    if (newCertName && newCertOrg) {
      await prisma.certification.create({
        data: {
          workerProfileId: user.workerProfileId,
          name: newCertName,
          issuingOrg: newCertOrg,
          certificateNumber: newCertNum || `CERT-${Date.now()}`,
          issueDate: new Date(),
          verificationStatus: "VERIFIED",
          verifiedAt: new Date(),
        },
      });
    }

    const updated = await prisma.workerProfile.update({
      where: { id: user.workerProfileId },
      data: {
        primaryOccupation: primaryOccupation !== undefined ? primaryOccupation : undefined,
        bio: bio !== undefined ? bio : undefined,
        experienceYears: experienceYears !== undefined ? parseFloat(experienceYears) : undefined,
        expectedSalary: expectedSalary !== undefined ? parseInt(expectedSalary, 10) : undefined,
        locationCity: locationCity !== undefined ? locationCity : undefined,
        locationState: locationState !== undefined ? locationState : undefined,
        preferredShift: preferredShift !== undefined ? preferredShift : undefined,
        availabilityStatus: availabilityStatus !== undefined ? availabilityStatus : undefined,
        profileCompleteness: 95,
      },
      include: {
        user: true,
        skills: { include: { skill: true } },
        certifications: true,
      },
    });

    return NextResponse.json({ success: true, worker: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
