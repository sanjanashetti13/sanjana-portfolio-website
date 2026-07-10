import { handleContactPost } from "./lib/contact";
import { z } from "zod";

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    return await handleContactPost(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.errors[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
