import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'grutgbujoy4xc00c.public.blob.vercel-storage.com',
      }
    ],
  },
};

export default nextConfig;