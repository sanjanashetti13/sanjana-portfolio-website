import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";

async function readRequestBody(req: IncomingMessage): Promise<string | undefined> {
  if (req.method === "GET" || req.method === "HEAD") return undefined;

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return chunks.length > 0 ? Buffer.concat(chunks).toString("utf8") : undefined;
}

async function writeResponse(res: ServerResponse, response: Response) {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "transfer-encoding") return;
    res.setHeader(key, value);
  });
  res.end(Buffer.from(await response.arrayBuffer()));
}

function devApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: "dev-api",
    configureServer(server) {
      Object.assign(process.env, env);

      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? "";
        if (!url.startsWith("/api/")) return next();

        try {
          const requestUrl = new URL(url, "http://localhost");
          let response: Response;

          if (url.startsWith("/api/github-activity")) {
            const { handleGitHubActivityGet } = await import("./api/lib/github");
            response = await handleGitHubActivityGet(requestUrl.searchParams.get("username"));
          } else if (url.startsWith("/api/github")) {
            const { handleGitHubGet } = await import("./api/lib/github");
            response = await handleGitHubGet(requestUrl.searchParams.get("url"));
          } else if (url.startsWith("/api/contact")) {
            const body = await readRequestBody(req);
            const { sendContactMessage } = await import("./lib/server/contact");
            const parsedBody = body ? JSON.parse(body) : undefined;

            try {
              const result = await sendContactMessage(parsedBody);
              response = Response.json(
                result.ok ? { success: true, id: result.id } : { error: result.error },
                { status: result.ok ? 200 : result.status }
              );
            } catch (error) {
              if (error instanceof SyntaxError) {
                response = Response.json({ error: "Invalid JSON body" }, { status: 400 });
              } else {
                throw error;
              }
            }
          } else {
            return next();
          }

          await writeResponse(res, response);
        } catch {
          next();
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), devApiPlugin(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    optimizeDeps: {
      include: ["three", "@react-three/fiber", "@react-three/drei"],
    },
    server: {
      port: 3000,
      strictPort: false,
    },
    build: {
      outDir: "dist",
    },
  };
});
