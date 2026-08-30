import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getFullSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getFullSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const { type, id, action, reason } = await req.json();

    if (type === "CERTIFICATE") {
      const updated = await prisma.certification.update({
        where: { id },
        data: {
          verificationStatus: action === "APPROVE" ? "VERIFIED" : "REJECTED",
          verifiedAt: action === "APPROVE" ? new Date() : null,
          rejectReason: action === "REJECT" ? (reason || "Document illegible or invalid") : null,
        },
      });
      return NextResponse.json({ success: true, updated });
    }

    if (type === "WORKER_IDENTITY") {
      const updated = await prisma.workerProfile.update({
        where: { id },
        data: {
          isIdentityVerified: action === "APPROVE",
          trustScore: action === "APPROVE" ? { increment: 20 } : undefined,
        },
      });
      return NextResponse.json({ success: true, updated });
    }

    if (type === "COMPANY") {
      const updated = await prisma.company.update({
        where: { id },
        data: {
          isVerified: action === "APPROVE",
          verificationStatus: action === "APPROVE" ? "VERIFIED" : "REJECTED",
        },
      });
      return NextResponse.json({ success: true, updated });
    }

    return NextResponse.json({ error: "Invalid verification type" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
