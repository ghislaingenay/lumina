import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  /* config options here */
  experimental: {
    // If @components resolves to an index.ts barrel, the "use client" directive on landscape_overlay.tsx
    // Can cause it to be registered in both the server and client module graphs, making the name appear twice to the SWC compiler.
    optimizePackageImports: ["@components"],
  },
};

export default nextConfig;
