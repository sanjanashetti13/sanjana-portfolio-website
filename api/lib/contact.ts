import { z } from "zod";
import { Resend } from "resend";
import { profile } from "../../data/content";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function handleContactPost(body: unknown) {
  const contact = contactSchema.parse(body);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email service is not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.CONTACT_FROM_EMAIL || "Sanjana Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL || profile.email;

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: contact.email,
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
  });

  if (error) {
    const message = error.message || "Failed to send email";
    const status = message.toLowerCase().includes("only send testing emails") ? 403 : 502;

    return Response.json({ error: message }, { status });
  }

  if (!data?.id) {
    return Response.json(
      { error: "Email service accepted the request but did not return a delivery id." },
      { status: 502 }
    );
  }

  return Response.json({ success: true, id: data.id });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
