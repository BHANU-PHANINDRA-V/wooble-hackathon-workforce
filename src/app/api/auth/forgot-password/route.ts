import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      // Return 200 for security so attackers cannot probe for registered emails
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, a 6-digit reset code has been sent.",
      });
    }

    // Generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: otp,
        resetPasswordExpiry: expiry,
      },
    });

    // Build reset link
    const origin = req.headers.get("origin") || "https://wooble-hackathon-workforce.vercel.app";
    const resetUrl = `${origin}/forgot-password?email=${encodeURIComponent(user.email)}&token=${otp}`;

    // Send email via Gmail SMTP
    await sendPasswordResetEmail(user.email, user.name, otp, resetUrl);

    return NextResponse.json({
      success: true,
      message: "A 6-digit verification code has been sent to your email address.",
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: error.message || "Failed to send reset email" }, { status: 500 });
  }
}
