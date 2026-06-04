import type { NextConfig } from "next";

const apiUrl = process.env.API_INTERNAL_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  // Self-contained server output for a small runtime image.
  output: "standalone",
  // The shared package ships TypeScript source; let Next transpile it.
  transpilePackages: ["@donkey/shared"],
  // Reverse-proxy all /api/* calls to the API service so the browser only ever
  // talks to the web origin — keeps BetterAuth cookies first-party, no CORS.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
