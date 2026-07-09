import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old WordPress blog index lived under /about/blog; keep it working.
      { source: "/about/blog", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
