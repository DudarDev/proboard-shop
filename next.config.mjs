/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: ['story-dam-examination-applies.trycloudflare.com', '*.trycloudflare.com'],
  },
};

export default nextConfig;
