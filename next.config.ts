import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // self-contained server bundle for the Docker image
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;
