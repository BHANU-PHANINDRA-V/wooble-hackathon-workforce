import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken, DEMO_CREDENTIALS } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { role } = await req.json();
    let email = "worker@demo.com";
    if (role === "EMPLOYER") email = "employer@demo.com";
    if (role === "ADMIN") email = "admin@demo.com";

    let user = await prisma.user.findUnique({
      where: { email },
      include: {
        workerProfile: true,
        employerProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Demo user not found. Please run seed." }, { status: 404 });
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
      phone: user.phone,
      avatar: user.avatar,
      isVerified: user.isVerified,
      workerProfileId: user.workerProfile?.id,
      employerProfileId: user.employerProfile?.id,
      companyId: user.employerProfile?.companyId,
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
    return NextResponse.json({ error: error.message || "Demo login failed" }, { status: 500 });
  }
}
