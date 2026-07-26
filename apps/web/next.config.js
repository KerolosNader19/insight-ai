const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@insight-ai/ui", "@insight-ai/shared"],
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Enable any experimental features if needed
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
