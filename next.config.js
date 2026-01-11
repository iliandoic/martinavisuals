/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-1600d09c709b4e389d3bb0a876a3906d.r2.dev',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
}

module.exports = nextConfig
