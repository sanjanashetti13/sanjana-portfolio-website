import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleContactPost } from "./lib/contact";
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await handleContactPost(req.body);
    const body = await response.json();
    return res.status(response.status).json(body);
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
