import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/opcode",
        destination: "/machine-intelligence",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
