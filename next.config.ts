import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/examples/nadia-wiki",
        destination: "/examples/nadia-wiki/index.html",
      },
    ];
  },
};

export default nextConfig;
