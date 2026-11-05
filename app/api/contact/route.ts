import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml, isValidEmail, checkRateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please wait ${rateLimit.resetSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetSeconds.toString(),
          },
        }
      );
    }

    // 2. Parse payload safely
    let body: { name?: unknown; email?: unknown; message?: unknown; honeypot?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot } = body;

    // 3. Honeypot check (hidden field to silently deflect bots)
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message sent." });
    }

    // 4. Type & emptiness validation
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // 5. Length limits
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Name must be less than 100 characters." },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 3000) {
      return NextResponse.json(
        { success: false, error: "Message must be less than 3,000 characters." },
        { status: 400 }
      );
    }

    // 6. Email format validation
    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 7. Check RESEND_API_KEY
    const apiKey = (process.env.RESEND_API_KEY || "").trim();
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        {
          success: false,
          error:
            "Server configuration error: RESEND_API_KEY is missing. Please check .env.local or production environment variables.",
        },
        { status: 500 }
      );
    }

    // 8. Sanitize HTML for email template
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage);

    const resend = new Resend(apiKey);
    const recipientEmail = (
      process.env.CONTACT_EMAIL || "supunyasantha.official@gmail.com"
    ).trim();

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: safeEmail,
      subject: `New Message from ${safeName} (Portfolio)`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #2563eb; margin-top: 0; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            📬 New Portfolio Message
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px; color: #4b5563;">Name:</td>
              <td style="padding: 8px 0; color: #111827;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px; color: #4b5563;">Email:</td>
              <td style="padding: 8px 0; color: #111827;">
                <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="font-weight: bold; margin-bottom: 8px; color: #4b5563;">Project Details / Message:</p>
            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 15px; color: #1f2937;">
              ${safeMessage}
            </div>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 16px;">
            Sent securely from your portfolio contact form
          </p>
        </div>
      `,
    });

    if (data.error) {
      console.error("Resend error:", data.error);
      return NextResponse.json(
        { success: false, error: data.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
