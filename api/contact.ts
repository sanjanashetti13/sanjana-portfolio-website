import { z } from "zod";

export const config = {
  runtime: "edge",
};

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const payload = contactSchema.parse(await request.json());

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return jsonResponse({ error: "Email service is not configured on the server" }, 503);
    }

    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) {
      return jsonResponse({ error: "CONTACT_TO_EMAIL is not configured on the server" }, 503);
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
        reply_to: payload.email,
        subject: `Portfolio message from ${payload.name}`,
        text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
        html: `
          <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111;">
            <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
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
      return jsonResponse({ error: message }, status);
    }

    if (!resendData.id) {
      return jsonResponse(
        { error: "Email service accepted the request but did not return a delivery id." },
        502
      );
    }

    return jsonResponse({ success: true, id: resendData.id }, 200);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ error: error.errors[0]?.message || "Invalid input" }, 400);
    }

    console.error("Contact API error:", error);
    return jsonResponse({ error: "Failed to send message" }, 500);
  }
}
