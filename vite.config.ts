import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import type { ServerResponse } from "http";

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
