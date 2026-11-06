import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Stage A compatible CSP used for static assets not intercepted by src/proxy.ts
 * (e.g. /favicon.ico, /_next/static/*, /_next/image*).
 * HTML page routes receive a per-request nonce-based CSP (Stage B) from src/proxy.ts,
 * and /api/* routes set their own strict API CSP to avoid duplicate/conflicting headers.
 */
export const stageAContentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "worker-src 'self'",
  "manifest-src 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const commonSecurityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    key: 'X-Permitted-Cross-Domain-Policies',
    value: 'none',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  outputFileTracingIncludes: {
    '/api/verified-donation': ['./private-assets/donation-qr.png'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: commonSecurityHeaders,
      },
      {
        source: '/(favicon.ico|_next/static/.*|_next/image.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: stageAContentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

