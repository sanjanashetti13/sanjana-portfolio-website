import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { sendContactMessage } from "../lib/server/contact";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await sendContactMessage(req.body);

    if (!result.ok) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(200).json({ success: true, id: result.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.errors[0]?.message || "Invalid input",
      });
    }

    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
