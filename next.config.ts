import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  compiler: {styledComponents:true},
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
