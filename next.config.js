/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/social',
        destination: 'https://api.supermomos-dev.com/interview/social'
      },
    ]
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'supermomos-app-resources-us.s3.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
