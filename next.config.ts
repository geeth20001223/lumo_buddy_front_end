import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev server access from local network IP (for mobile testing)
  allowedDevOrigins: [
    "192.168.1.177",
  ],
};

export default nextConfig;
