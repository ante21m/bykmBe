// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'standalone',
//   images: {
//     remotePatterns: [
//       { protocol: 'http', hostname: 'localhost' },
//       { protocol: 'https', hostname: 'bykmgroup.com' },
//     ],
//   },
//   env: {
//     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const apiBase = apiUrl.replace(/\/api\/?$/, '');

const nextConfig = {
   ...(process.env.NEXT_OUTPUT_STANDALONE === '1' ? { output: 'standalone' } : {}),
  trailingSlash: false,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'bykmgroup.com' },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' ${apiBase} https://bykmgroup.com data: blob:; font-src 'self' data:; connect-src 'self' ${apiBase} https://bykmgroup.com; frame-src https://www.google.com; frame-ancestors 'none';` },
        ],
      },
      {
        // LiteSpeed on cPanel overrides origin cache directives and stamps
        // `public, max-age=2592000` (30 days) onto responses. Two consequences:
        // admin edits appear not to save, and a 500 gets pinned for a month so
        // the site keeps serving the old error after a correct deploy.
        // `no-store` is honoured by mod_cache, so these responses are never
        // stored and errors are never cached.
        source: '/admin/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // There is no dedicated careers page. The contact form already collects
      // career inquiries (inquiryType: 'careers'), so send visitors there
      // instead of 404-ing. Temporary (307) on purpose: browsers cache
      // permanent redirects aggressively, which would fight a future
      // /careers page. Flip to permanent once that page is unlikely.
      { source: '/careers', destination: '/contact', permanent: false },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${apiBase}/api/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;