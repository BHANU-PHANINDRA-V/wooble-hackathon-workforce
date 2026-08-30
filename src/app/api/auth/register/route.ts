import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password, name, phone, role, primaryOccupation, locationCity, companyName, industry } = data;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        name,
        phone,
        role: role || "WORKER",
      },
    });

    let workerProfileId: string | undefined;
    let employerProfileId: string | undefined;
    let companyId: string | undefined;

    if (role === "WORKER") {
      const wp = await prisma.workerProfile.create({
        data: {
          userId: user.id,
          primaryOccupation: primaryOccupation || "Electrician",
          locationCity: locationCity || "Hyderabad",
          trustScore: 72,
          profileCompleteness: 75,
        },
      });
      workerProfileId = wp.id;
    } else if (role === "EMPLOYER") {
      const company = await prisma.company.create({
        data: {
          name: companyName || `${name}'s Enterprise`,
          industry: industry || "Construction & Engineering",
          description: "Leading employer committed to skilled trade excellence.",
          locationCity: locationCity || "Hyderabad",
          contactEmail: email,
          contactPhone: phone || "9876543210",
        },
      });
      const ep = await prisma.employerProfile.create({
        data: {
          userId: user.id,
          companyId: company.id,
          designation: "Recruiter / Hiring Manager",
        },
      });
      employerProfileId = ep.id;
      companyId = company.id;
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
      phone: user.phone,
      avatar: user.avatar,
      isVerified: user.isVerified,
      workerProfileId,
      employerProfileId,
      companyId,
    };

    const token = signToken(sessionUser);

    cookies().set("bwc_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ success: true, user: sessionUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 500 });
  }
}
