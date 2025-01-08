import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "localhost"
      }, {
        hostname: "jubahospitality.com"
      }
    ]
  },
  output: "standalone"
};

export default nextConfig;
