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

const allowDemo = process.argv.includes('--allow-demo');
const demoPattern = /^(9999999999|0+|1234567890?)$|THAY_|PLACEHOLDER|EXAMPLE/i;
if (
  !allowDemo &&
  (demoPattern.test(payload.bankCode) ||
    demoPattern.test(payload.accountNumber) ||
    demoPattern.test(payload.accountHolder))
) {
  throw new Error(
    'Refusing to sign demo/placeholder bank details (e.g. 9999999999). Replace src/data/donation-manifest.json with verified bank details first, or pass --allow-demo for local testing only.',
  );
}

const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (qrBytes.byteLength < 8 || !qrBytes.subarray(0, 8).equals(pngMagic)) {
  throw new Error('private-assets/donation-qr.png is not a valid PNG image.');
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
