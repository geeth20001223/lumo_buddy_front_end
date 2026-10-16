import { NextResponse } from "next/server";
import { Resend } from "resend";

/** Resend API key loaded from environment variables for sending transactional emails */
const resendApiKey = process.env.RESEND_API_KEY;

/** Base site URL used to construct login redirect links in the email template */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Next.js App Router API Route Handler for POST `/api/send-password-changed-email`.
 * 
 * Purpose:
 * Sends a security confirmation email to a parent user when their account password
 * is updated. Uses the Resend API if an API key is configured, or logs to console in development.
 * 
 * Request Body:
 * - `email`: string (required) - Parent's account email address
 * 
 * Response:
 * - `{ success: true, email, loginUrl }` on success
 * - `{ error: "Email is required" }` (HTTP 400) if email missing
 */
export async function POST(request: Request) {
  try {
    // 1. Parse JSON body from the incoming request
    const { email } = await request.json();

    // 2. Validate email presence
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 3. Construct login redirect URL pre-filled with user's email
    const loginUrl = `${siteUrl}/login?email=${encodeURIComponent(email)}`;

    // 4. Send confirmation email if Resend API key is provided
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      // Send HTML password change confirmation email using Resend SDK
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
      // Development fallback: Log email triggering details to server console if no API key set
      console.log(`[Lumo Buddy Notification] Password changed email triggered for: ${email}. Login link: ${loginUrl}`);
    }

    // 5. Return success JSON response
    return NextResponse.json({ success: true, email, loginUrl });
  } catch (error: unknown) {
    // 6. Handle errors safely (log error but return success with warning so user UI is not blocked)
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Lumo Buddy Notification Error] Error sending email:", message);
    return NextResponse.json({ success: true, warning: message });
  }
}

