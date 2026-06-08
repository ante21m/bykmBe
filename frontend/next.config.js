// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'standalone',
//   images: {
//     remotePatterns: [
//       { protocol: 'http', hostname: 'localhost' },
//       { protocol: 'https', hostname: 'bykmtrading.com' },
//     ],
//   },
//   env: {
//     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'bykmtrading.com' },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  },
};

module.exports = nextConfig;