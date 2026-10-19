import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/machine-intelligence",
        destination: "/tron",
        permanent: true,
      },
      {
        source: "/opcode",
        destination: "/tron",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
