import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "127.0.0.1:3000",
        "localhost:3000",
        "cellulesicc.be",
        "*.cellulesicc.be",
      ],
    },
  },
};

export default withNextVideo(nextConfig);