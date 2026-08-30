import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getFullSessionUser } from "@/lib/auth";
import { parseNaturalLanguageQuery } from "@/lib/nlp-parser";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const city = searchParams.get("city") || "";
    const shift = searchParams.get("shift") || "";
    const minSalary = searchParams.get("minSalary") ? parseInt(searchParams.get("minSalary")!, 10) : 0;
    const isBulk = searchParams.get("isBulk") === "true";

    // Natural Language Query check
    let parsedSkill = category;
    let parsedLocation = city;
    let parsedMinSalary = minSalary;

    if (query && query.length > 5) {
      const parsed = parseNaturalLanguageQuery(query);
      if (parsed.skill) parsedSkill = parsed.skill;
      if (parsed.location) parsedLocation = parsed.location;
      if (parsed.minSalary && parsed.minSalary > parsedMinSalary) parsedMinSalary = parsed.minSalary;
    }

    const where: any = {
      status: "ACTIVE",
    };

    if (parsedSkill) {
      where.OR = [
        { category: { contains: parsedSkill } },
        { title: { contains: parsedSkill } },
      ];
    }

    if (parsedLocation) {
      where.locationCity = { contains: parsedLocation };
    }

    if (shift) {
      where.shiftType = shift;
    }

    if (parsedMinSalary > 0) {
      where.maxSalary = { gte: parsedMinSalary };
    }

    if (isBulk) {
      where.isBulkHiring = true;
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        company: true,
        skills: { include: { skill: true } },
        applications: { select: { id: true, status: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ jobs, parsedFilters: { parsedSkill, parsedLocation, parsedMinSalary } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getFullSessionUser();
    if (!user || user.role !== "EMPLOYER" || !user.employerProfileId || !user.companyId) {
      return NextResponse.json({ error: "Unauthorized: Employer access required" }, { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      category,
      description,
      numberOfOpenings,
      minExperience,
      minSalary,
      maxSalary,
      salaryType,
      locationCity,
      shiftType,
      workingHours,
      employmentType,
      immediateJoining,
      foodProvided,
      accommodationProvided,
      transportProvided,
      isBulkHiring,
      targetHires,
      skills,
    } = body;

    const job = await prisma.job.create({
      data: {
        employerId: user.employerProfileId,
        companyId: user.companyId,
        title,
        category: category || "Technician",
        description,
        numberOfOpenings: numberOfOpenings || 1,
        minExperience: minExperience || 0,
        minSalary: minSalary || 20000,
        maxSalary: maxSalary || 30000,
        salaryType: salaryType || "MONTHLY",
        locationCity: locationCity || "Hyderabad",
        shiftType: shiftType || "DAY",
        workingHours: workingHours || "9 AM - 6 PM",
        employmentType: employmentType || "Full-Time",
        immediateJoining: immediateJoining ?? true,
        foodProvided: foodProvided ?? false,
        accommodationProvided: accommodationProvided ?? false,
        transportProvided: transportProvided ?? false,
        isBulkHiring: isBulkHiring ?? false,
        targetHires: isBulkHiring ? (targetHires || numberOfOpenings || 20) : 1,
      },
    });

    if (skills && Array.isArray(skills)) {
      for (const s of skills) {
        let skillRecord = await prisma.skill.findUnique({ where: { name: s.name } });
        if (!skillRecord) {
          skillRecord = await prisma.skill.create({ data: { name: s.name, category: category || "General" } });
        }
        await prisma.jobSkill.create({
          data: {
            jobId: job.id,
            skillId: skillRecord.id,
            isRequired: s.isRequired ?? true,
            minLevel: s.minLevel || "SKILLED",
          },
        });
      }
    }

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
