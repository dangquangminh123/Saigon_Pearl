import { generateKeyPairSync } from 'node:crypto';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

if (!process.argv[2]) {
  throw new Error('Usage: node scripts/generate-donation-key.mjs <target-directory>');
}

const dir = resolve(process.argv[2]);
mkdirSync(dir, { recursive: true });
const privateFile = join(dir, 'donation-private.pem');
const publicFile = join(dir, 'donation-public.b64');

if (existsSync(privateFile) || existsSync(publicFile)) {
  throw new Error('Keys already exist. Refusing to overwrite keys.');
}

const { privateKey, publicKey } = generateKeyPairSync('ed25519');
writeFileSync(privateFile, privateKey.export({ format: 'pem', type: 'pkcs8' }), {
  flag: 'wx',
  mode: 0o600,
});
writeFileSync(
  publicFile,
  publicKey.export({ format: 'der', type: 'spki' }).toString('base64'),
  { flag: 'wx', mode: 0o600 },
);
console.log(`Private key saved: ${privateFile}`);
console.log(`Public key for Vercel/Environment: ${publicFile}`);
