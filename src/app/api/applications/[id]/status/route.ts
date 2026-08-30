import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getFullSessionUser } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getFullSessionUser();
    if (!user || (user.role !== "EMPLOYER" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized: Employer/Admin access required" }, { status: 403 });
    }

    const { status, changeReason, employerNotes } = await req.json();
    const applicationId = params.id;

    const current = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        workerProfile: { include: { user: true } },
        job: true,
      },
    });

    if (!current) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        employerNotes: employerNotes || current.employerNotes,
      },
    });

    // Log status history
    await prisma.applicationStatusHistory.create({
      data: {
        applicationId,
        previousStatus: current.status,
        newStatus: status,
        changedById: user.id,
        changeReason: changeReason || `Status updated to ${status} by employer`,
      },
    });

    // Notify worker
    await prisma.notification.create({
      data: {
        userId: current.workerProfile.userId,
        title: `Application Status Updated: ${status}`,
        message: `Your application for "${current.job.title}" has been moved to ${status}.`,
        type: "APPLICATION_STATUS",
        link: "/worker/applications",
      },
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
