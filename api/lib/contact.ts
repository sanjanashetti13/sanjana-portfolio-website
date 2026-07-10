import { z } from "zod";
import { Resend } from "resend";
import { profile } from "../../data/content";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function handleContactPost(body: unknown) {
  const data = contactSchema.parse(body);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email service is not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const to = process.env.CONTACT_TO_EMAIL || profile.email;

  await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `Portfolio contact from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
  });

  return Response.json({ success: true });
}
