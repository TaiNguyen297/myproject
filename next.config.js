/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: "export",  // <=== enables static exports

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
    unoptimized: true // <=== enables static exports
  },
};

module.exports = nextConfig;

