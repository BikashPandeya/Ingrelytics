import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    // Allow these remote hosts for next/image remote loading
    domains: [
      'tse4.mm.bing.net',
      'th.bing.com'
    ],
  },
};

export default nextConfig;
