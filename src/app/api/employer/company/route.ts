import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getFullSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getFullSessionUser();
    if (!user || user.role !== "EMPLOYER" || !user.companyId) {
      return NextResponse.json({ error: "Unauthorized: Employer access required" }, { status: 401 });
    }

    const company = await prisma.company.findUnique({
      where: { id: user.companyId },
      include: {
        jobs: {
          include: {
            applications: {
              include: {
                workerProfile: { include: { user: true } },
                interviews: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!company) {
      return NextResponse.json({ error: "Company profile not found" }, { status: 404 });
    }

    let totalApplications = 0;
    let shortlisted = 0;
    let interviews = 0;
    let hired = 0;

    for (const job of company.jobs) {
      for (const app of job.applications) {
        totalApplications++;
        if (app.status === "SHORTLISTED") shortlisted++;
        if (app.status === "INTERVIEW") interviews++;
        if (app.status === "HIRED") hired++;
      }
    }

    return NextResponse.json({
      company,
      user,
      metrics: {
        openJobs: company.jobs.filter((j) => j.status === "ACTIVE").length,
        totalApplications,
        shortlisted,
        interviews,
        hired,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getFullSessionUser();
    if (!user || user.role !== "EMPLOYER" || !user.companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, industry, description, locationCity, locationState, gstinNumber, website } = body;

    const updated = await prisma.company.update({
      where: { id: user.companyId },
      data: {
        name: name !== undefined ? name : undefined,
        industry: industry !== undefined ? industry : undefined,
        description: description !== undefined ? description : undefined,
        locationCity: locationCity !== undefined ? locationCity : undefined,
        locationState: locationState !== undefined ? locationState : undefined,
        gstinNumber: gstinNumber !== undefined ? gstinNumber : undefined,
        website: website !== undefined ? website : undefined,
      },
    });

    return NextResponse.json({ success: true, company: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
