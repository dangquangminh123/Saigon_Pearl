import { createHash, createPublicKey, verify } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import manifest from '@/data/donation-manifest.json';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const securityHeaders = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Content-Type-Options': 'nosniff',
};

function unavailable() {
  return Response.json(
    { ok: false, message: 'Donation QR is temporarily unavailable.' },
    { status: 503, headers: securityHeaders },
  );
}

export async function GET() {
  if (process.env.DONATION_ENABLED !== 'true') return unavailable();

  try {
    const publicKeyBase64 = process.env.DONATION_VERIFY_PUBLIC_KEY_B64 ?? '';
    if (!publicKeyBase64) return unavailable();

    const { bankCode, accountNumber, accountHolder, qrSha256, signature } = manifest;
    if (
      !bankCode || !accountNumber || !accountHolder ||
      !/^[0-9a-f]{64}$/i.test(qrSha256) || !signature
    ) return unavailable();

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
      Buffer.from(signature, 'base64'),
    );

    if (!approved) {
      console.error('[DONATION_SECURITY] signature mismatch');
      return unavailable();
    }

    const qr = await readFile(join(process.cwd(), 'private-assets/donation-qr.png'));
    const actualHash = createHash('sha256').update(qr).digest('hex');
    if (actualHash.toLowerCase() !== qrSha256.toLowerCase()) {
      console.error('[DONATION_SECURITY] QR file hash mismatch');
      return unavailable();
    }

    return Response.json(
      {
        ok: true,
        bankCode,
        accountNumber,
        accountHolder,
        qrDataUrl: `data:image/png;base64,${qr.toString('base64')}`,
      },
      { status: 200, headers: securityHeaders },
    );
  } catch {
    console.error('[DONATION_SECURITY] verification or file read failed');
    return unavailable();
  }
}
