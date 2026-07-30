import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const loginUrl = `${siteUrl}/login?email=${encodeURIComponent(email)}`;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Lumo Buddy <noreply@resend.dev>",
        to: email,
        subject: "Your Lumo Buddy Password Has Been Updated 🔑",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <h2 style="color: #4f46e5; margin-top: 0;">Password Update Confirmation 🔑</h2>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">Hello,</p>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              Your password for your <strong>Lumo Buddy</strong> account (<strong>${email}</strong>) has been successfully updated.
            </p>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              You can now log in to the application using your email address and your new password.
            </p>
            <div style="margin: 32px 0; text-align: center;">
              <a href="${loginUrl}" style="background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);">
                Log In to Lumo Buddy →
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">
              If you did not perform this request, please reset your password immediately.
            </p>
          </div>
        `,
      });
    } else {
      console.log(`[Lumo Buddy Notification] Password changed email triggered for: ${email}. Login link: ${loginUrl}`);
    }

    return NextResponse.json({ success: true, email, loginUrl });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Lumo Buddy Notification Error] Error sending email:", message);
    return NextResponse.json({ success: true, warning: message });
  }
}
