import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_HOST_USER || "hmsapplication1@gmail.com",
    pass: (process.env.EMAIL_HOST_PASSWORD || "lkvs usxb evkg lrhu").replace(/\s+/g, ""),
  },
});

export async function sendPasswordResetEmail(toEmail: string, userName: string, otp: string, resetUrl: string) {
  const mailOptions = {
    from: `"Blue Workforce Connect '26" <${process.env.EMAIL_HOST_USER || "hmsapplication1@gmail.com"}>`,
    to: toEmail,
    subject: "Password Reset Request — Blue Workforce Connect '26",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; rounded-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #1e3a8a; margin: 0; font-size: 24px; font-weight: 800;">Blue Workforce Connect '26</h2>
          <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Skills that speak. Opportunities that connect.</p>
        </div>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="color: #1e293b; font-size: 14px; margin: 0 0 12px 0;">Hello <strong>${userName}</strong>,</p>
          <p style="color: #475569; font-size: 13px; line-height: 1.5; margin: 0 0 16px 0;">
            We received a request to reset the password for your Blue Workforce account. Use the 6-digit verification code below to complete the reset:
          </p>

          <div style="text-align: center; margin: 20px 0;">
            <div style="display: inline-block; background-color: #1e40af; color: #ffffff; font-size: 32px; font-weight: 900; letter-spacing: 8px; padding: 12px 28px; border-radius: 10px; font-family: monospace;">
              ${otp}
            </div>
            <p style="color: #dc2626; font-size: 12px; margin-top: 8px; font-weight: bold;">Code expires in 15 minutes.</p>
          </div>

          <p style="color: #475569; font-size: 13px; line-height: 1.5; margin: 16px 0 0 0;">
            Or you can click the button below to reset your password directly:
          </p>

          <div style="text-align: center; margin: 20px 0 8px 0;">
            <a href="${resetUrl}" style="background-color: #059669; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: bold; padding: 12px 24px; border-radius: 8px; display: inline-block;">
              Reset Password Directly
            </a>
          </div>
        </div>

        <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 0;">
          If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
