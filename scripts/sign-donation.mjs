import { createHash, sign } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

if (!process.argv[2]) {
  throw new Error('Usage: node scripts/sign-donation.mjs <path-to-private-key.pem>');
}

const root = process.cwd();
const manifestPath = join(root, 'src/data/donation-manifest.json');
const qrPath = join(root, 'private-assets/donation-qr.png');
const original = JSON.parse(await readFile(manifestPath, 'utf8'));
const qrBytes = await readFile(qrPath);

const payload = {
  bankCode: String(original.bankCode ?? '').trim(),
  accountNumber: String(original.accountNumber ?? '').trim(),
  accountHolder: String(original.accountHolder ?? '').trim(),
  qrSha256: createHash('sha256').update(qrBytes).digest('hex'),
};

if (!payload.bankCode || !payload.accountNumber || !payload.accountHolder) {
  throw new Error('Bank/account/holder must not be blank');
}

// Check bank info and QR before signing
const privatePem = await readFile(resolve(process.argv[2]), 'utf8');
const signature = sign(
  null,
  Buffer.from(JSON.stringify(payload), 'utf8'),
  privatePem,
).toString('base64');

await writeFile(
  manifestPath,
  `${JSON.stringify({ ...payload, signature }, null, 2)}\n`,
  'utf8',
);
console.log('Manifest signed. Review its details before commit.');
