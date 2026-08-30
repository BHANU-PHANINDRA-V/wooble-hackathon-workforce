import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getFullSessionUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const user = await getFullSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role === "WORKER" && user.workerProfileId) {
      const applications = await prisma.application.findMany({
        where: { workerProfileId: user.workerProfileId },
        include: {
          job: { include: { company: true } },
          interviews: true,
          statusHistory: { orderBy: { createdAt: "desc" } },
        },
        orderBy: { appliedAt: "desc" },
      });
      return NextResponse.json({ applications });
    }

    if (user.role === "EMPLOYER" && user.companyId) {
      const { searchParams } = new URL(req.url);
      const jobId = searchParams.get("jobId");

      const where: any = {
        job: { companyId: user.companyId },
      };
      if (jobId) where.jobId = jobId;

      const applications = await prisma.application.findMany({
        where,
        include: {
          workerProfile: {
            include: {
              user: true,
              skills: { include: { skill: true } },
              certifications: true,
            },
          },
          job: true,
          interviews: true,
          statusHistory: { orderBy: { createdAt: "desc" } },
        },
        orderBy: { appliedAt: "desc" },
      });
      return NextResponse.json({ applications });
    }

    return NextResponse.json({ applications: [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
