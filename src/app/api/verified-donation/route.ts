import { createHash, createPublicKey, verify } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { NextRequest } from 'next/server';
import manifest from '@/data/donation-manifest.json';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 30;
const MAX_QR_BYTES = 512 * 1024;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const DEMO_PATTERNS = [/^9999999999$/, /^0+$/, /^1234567890?$/, /THAY_/i, /PLACEHOLDER/i];
const ipWindowMap = new Map<string, number[]>();

const securityHeaders: Record<string, string> = {
  'Cache-Control': 'no-store, no-cache, max-age=0, must-revalidate',
  Pragma: 'no-cache',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Content-Security-Policy':
    "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
};

function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim().slice(0, 64) || 'unknown';
  return request.headers.get('x-real-ip')?.trim().slice(0, 64) || 'local';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const recent = (ipWindowMap.get(ip) ?? []).filter((ts) => ts > cutoff);
  if (recent.length >= RATE_MAX_REQUESTS) {
    ipWindowMap.set(ip, recent);
    return { allowed: false, remaining: 0 };
  }
  recent.push(now);
  ipWindowMap.set(ip, recent);
  if (ipWindowMap.size > 1000) {
    for (const [k, list] of ipWindowMap.entries()) {
      if (list.every((ts) => ts <= cutoff)) ipWindowMap.delete(k);
    }
  }
  return { allowed: true, remaining: Math.max(0, RATE_MAX_REQUESTS - recent.length) };
}

function isPlaceholder(fields: string[]): boolean {
  return fields.some((val) => DEMO_PATTERNS.some((rx) => rx.test(val.trim())));
}

function unavailable(reason: string, extraHeaders?: Record<string, string>) {
  console.error(`[DONATION_SECURITY] blocked: ${reason}`);
  return Response.json(
    { ok: false, error: 'DONATION_TEMPORARILY_LOCKED', message: 'Donation QR is temporarily unavailable.' },
    { status: 503, headers: { ...securityHeaders, ...extraHeaders } },
  );
}

function methodNotAllowed() {
  return Response.json(
    { ok: false, error: 'METHOD_NOT_ALLOWED', message: 'Only GET and HEAD requests are supported.' },
    { status: 405, headers: { ...securityHeaders, Allow: 'GET, HEAD' } },
  );
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip);
  const rateHeaders = {
    'X-RateLimit-Limit': String(RATE_MAX_REQUESTS),
    'X-RateLimit-Remaining': String(rate.remaining),
  };

  if (!rate.allowed) {
    console.warn(`[DONATION_SECURITY] rate limit exceeded for IP=${ip}`);
    return Response.json(
      { ok: false, error: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests. Please try again later.' },
      { status: 429, headers: { ...securityHeaders, ...rateHeaders, 'Retry-After': '60' } },
    );
  }

  if (request.nextUrl.searchParams.toString().length > 0 || request.url.length > 512) {
    return Response.json(
      { ok: false, error: 'INVALID_REQUEST_PARAMETERS', message: 'Query parameters are not accepted.' },
      { status: 400, headers: { ...securityHeaders, ...rateHeaders } },
    );
  }

  if (process.env.DONATION_ENABLED !== 'true') {
    return unavailable('DONATION_ENABLED is not true', rateHeaders);
  }

  try {
    const publicKeyBase64 = process.env.DONATION_VERIFY_PUBLIC_KEY_B64 ?? '';
    if (!publicKeyBase64) return unavailable('Missing DONATION_VERIFY_PUBLIC_KEY_B64', rateHeaders);

    const { bankCode, accountNumber, accountHolder, qrSha256, signature } = manifest;
    if (
      !bankCode ||
      !accountNumber ||
      !accountHolder ||
      !/^[A-Z0-9]{2,16}$/.test(bankCode) ||
      !/^[0-9A-Z]{6,34}$/.test(accountNumber) ||
      !/^[A-Z0-9 .,'&-]{3,100}$/.test(accountHolder) ||
      !/^[0-9a-f]{64}$/i.test(qrSha256) ||
      !signature
    ) {
      return unavailable('Invalid or incomplete donation-manifest.json', rateHeaders);
    }

    const allowDemo =
      process.env.ALLOW_DEMO_DONATION_MANIFEST === 'true' &&
      process.env.VERCEL_ENV !== 'production';

    if (!allowDemo && isPlaceholder([bankCode, accountNumber, accountHolder])) {
      return unavailable('Demo/placeholder bank account blocked', rateHeaders);
    }

    const sigBytes = Buffer.from(signature, 'base64');
    if (sigBytes.byteLength !== 64) {
      return unavailable('Invalid Ed25519 signature byte length', rateHeaders);
    }

    const payload = { bankCode, accountNumber, accountHolder, qrSha256 };
    const publicKey = createPublicKey({
      key: Buffer.from(publicKeyBase64, 'base64'),
      format: 'der',
      type: 'spki',
    });
    const approved = verify(
      null,
      Buffer.from(JSON.stringify(payload), 'utf8'),
      publicKey,
      sigBytes,
    );

    if (!approved) {
      return unavailable('signature mismatch', rateHeaders);
    }

    const qr = await readFile(join(process.cwd(), 'private-assets/donation-qr.png'));
    if (
      qr.byteLength < PNG_MAGIC.byteLength ||
      qr.byteLength > MAX_QR_BYTES ||
      !qr.subarray(0, PNG_MAGIC.byteLength).equals(PNG_MAGIC)
    ) {
      return unavailable('QR PNG magic-byte or file size check failed', rateHeaders);
    }

    const actualHash = createHash('sha256').update(qr).digest('hex');
    if (actualHash.toLowerCase() !== qrSha256.toLowerCase()) {
      return unavailable('QR file hash mismatch', rateHeaders);
    }

    return Response.json(
      {
        ok: true,
        bankCode,
        accountNumber,
        accountHolder,
        qrDataUrl: `data:image/png;base64,${qr.toString('base64')}`,
      },
      { status: 200, headers: { ...securityHeaders, ...rateHeaders } },
    );
  } catch {
    return unavailable('verification or file read failed', rateHeaders);
  }
}

export async function HEAD(request: NextRequest) {
  const res = await GET(request);
  return new Response(null, { status: res.status, headers: res.headers });
}

export async function POST() {
  return methodNotAllowed();
}
export async function PUT() {
  return methodNotAllowed();
}
export async function DELETE() {
  return methodNotAllowed();
}
export async function PATCH() {
  return methodNotAllowed();
}
export async function OPTIONS() {
  return methodNotAllowed();
}

