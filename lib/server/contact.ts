import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactResult =
  | { ok: true; id: string }
  | { ok: false; status: number; error: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactMessage(body: unknown): Promise<ContactResult> {
  const contact = contactSchema.parse(body);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error: "Email service is not configured on the server",
    };
  }

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    return {
      ok: false,
      status: 503,
      error: "CONTACT_TO_EMAIL is not configured on the server",
    };
  }

  const from =
    process.env.CONTACT_FROM_EMAIL || "Sanjana Portfolio <onboarding@resend.dev>";

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: contact.email,
      subject: `Portfolio message from ${contact.name}`,
      text: `Name: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`,
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111;">
          <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(contact.message)}</p>
        </div>
      `.trim(),
    }),
  });

  const resendData = (await resendResponse.json().catch(() => ({}))) as {
    id?: string;
    message?: string;
  };

  if (!resendResponse.ok) {
    const message = resendData.message || "Failed to send email";
    const status = message.toLowerCase().includes("only send testing emails") ? 403 : 502;
    return { ok: false, status, error: message };
  }

  if (!resendData.id) {
    return {
      ok: false,
      status: 502,
      error: "Email service accepted the request but did not return a delivery id.",
    };
  }

  return { ok: true, id: resendData.id };
}
