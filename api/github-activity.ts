import { handleGitHubActivityGet } from "./lib/github";

export default async function handler(request: Request) {
  if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { searchParams } = new URL(request.url);
  return handleGitHubActivityGet(searchParams.get("username"));
}
