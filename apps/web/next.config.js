const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@insight-ai/ui", "@insight-ai/shared"],
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
