/** @type {import('next').NextConfig} */
const nextConfig = {
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
