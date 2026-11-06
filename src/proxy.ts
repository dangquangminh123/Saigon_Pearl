import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';
  const isStageA = process.env.CSP_MODE === 'stage-a';
  const isReportOnly = process.env.CSP_REPORT_ONLY === 'true';

  const scriptSrc = isStageA
    ? `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`
    : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`;

  const csp = [
    "default-src 'self'",
    scriptSrc,
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

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (isReportOnly) {
    response.headers.set('Content-Security-Policy-Report-Only', csp);
  } else {
    response.headers.set('Content-Security-Policy', csp);
  }

  if (!isStageA) {
    // Prevent caching of dynamically rendered HTML responses containing a per-request nonce
    response.headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
  }

  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
