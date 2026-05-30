import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['@lancedb/lancedb'],
  output: 'standalone',
};

export default nextConfig;
