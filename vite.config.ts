import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

function devApiPlugin(): Plugin {
  return {
    name: "dev-api",
    configureServer(server) {
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

          res.statusCode = response.status;
          response.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devApiPlugin()],
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
});
