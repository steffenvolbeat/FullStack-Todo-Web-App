/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig