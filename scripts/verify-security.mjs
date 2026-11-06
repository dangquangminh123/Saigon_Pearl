import assert from 'node:assert/strict';
import { createHash, createPublicKey, generateKeyPairSync, sign, verify } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const liveUrl = process.env.SECURITY_VERIFY_URL?.replace(/\/$/, '') || '';

async function verifyStaticSecurityPosture() {
  const gitignore = await readFile(join(root, '.gitignore'), 'utf8');
  assert.match(gitignore, /^\.env\*$/m, '.gitignore must ignore .env*');
  assert.match(gitignore, /^!\.env\.example$/m, '.gitignore must allow !.env.example');
  assert.match(gitignore, /^\*\.pem$/m, '.gitignore must ignore *.pem private keys');

  const nextConfig = await readFile(join(root, 'next.config.ts'), 'utf8');
  assert.doesNotMatch(
    nextConfig,
    /img-src 'self' data: https:/,
    'CSP must not allow wildcard https: in img-src',
  );
  assert.doesNotMatch(
    nextConfig,
    /fonts\.gstatic\.com/,
    'CSP must not allow unused external fonts.gstatic.com',
  );
  assert.match(nextConfig, /Cross-Origin-Opener-Policy/, 'Missing COOP header');
  assert.match(nextConfig, /Cross-Origin-Resource-Policy/, 'Missing CORP header');

  const proxyTs = await readFile(join(root, 'src/proxy.ts'), 'utf8');
  assert.match(proxyTs, /'strict-dynamic'/, 'Proxy CSP must include strict-dynamic');
  assert.match(proxyTs, /'nonce-\$\{nonce\}'/, 'Proxy CSP must include per-request nonce');
  assert.match(proxyTs, /script-src-attr 'none'/, 'Proxy CSP must block inline event handlers');

  const adoptData = await readFile(join(root, 'src/data/adopt-services.ts'), 'utf8');
  assert.doesNotMatch(adoptData, /đã được gửi/i, 'Adopt copy must not falsely claim server submission');
  assert.doesNotMatch(adoptData, /bảo mật tuyệt đối/i, 'Adopt copy must not make absolute security claims');

  console.log('[PASS] Static security posture & source hygiene checks passed.');
}

async function verifyCryptographicDonationIntegrity() {
  const manifestRaw = await readFile(join(root, 'src/data/donation-manifest.json'), 'utf8');
  const manifest = JSON.parse(manifestRaw);
  const qrBytes = await readFile(join(root, 'private-assets/donation-qr.png'));

  const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  assert.equal(
    qrBytes.subarray(0, 8).equals(pngMagic),
    true,
    'private-assets/donation-qr.png must have valid PNG magic bytes',
  );

  const actualHash = createHash('sha256').update(qrBytes).digest('hex');
  assert.equal(
    actualHash.toLowerCase(),
    String(manifest.qrSha256).toLowerCase(),
    'QR SHA-256 must match donation-manifest.json qrSha256',
  );

  // Ephemeral Ed25519 signing + tamper simulation
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  const pubDerB64 = publicKey.export({ format: 'der', type: 'spki' }).toString('base64');
  const payload = {
    bankCode: 'VCB',
    accountNumber: '0071001234567',
    accountHolder: 'SAIGON PEARL PURRS RESCUE',
    qrSha256: actualHash,
  };
  const signature = sign(null, Buffer.from(JSON.stringify(payload), 'utf8'), privateKey);
  const rehydratedPub = createPublicKey({
    key: Buffer.from(pubDerB64, 'base64'),
    format: 'der',
    type: 'spki',
  });

  assert.equal(
    verify(null, Buffer.from(JSON.stringify(payload), 'utf8'), rehydratedPub, signature),
    true,
    'Valid Ed25519 signature must verify',
  );

  const tamperedAccountPayload = { ...payload, accountNumber: '9999999999999' };
  assert.equal(
    verify(null, Buffer.from(JSON.stringify(tamperedAccountPayload), 'utf8'), rehydratedPub, signature),
    false,
    'Tampered accountNumber must fail Ed25519 verification',
  );

  const tamperedQrPayload = { ...payload, qrSha256: '0'.repeat(64) };
  assert.equal(
    verify(null, Buffer.from(JSON.stringify(tamperedQrPayload), 'utf8'), rehydratedPub, signature),
    false,
    'Tampered qrSha256 must fail Ed25519 verification',
  );

  console.log('[PASS] Ed25519 + SHA-256 cryptographic tamper-resistance checks passed.');
}

async function verifyLiveServerAndAuthMatrix(baseUrl) {
  const profileRaw = await readFile(join(root, 'security/burp-authmatrix-profile.json'), 'utf8');
  const profile = JSON.parse(profileRaw);

  // 1. Verify per-request nonce uniqueness and JSON-LD nonce binding
  const res1 = await fetch(`${baseUrl}/vi`, { redirect: 'manual' });
  const res2 = await fetch(`${baseUrl}/vi`, { redirect: 'manual' });
  const csp1 = res1.headers.get('content-security-policy') || '';
  const csp2 = res2.headers.get('content-security-policy') || '';
  const nonceMatch1 = csp1.match(/'nonce-([^']+)'/);
  const nonceMatch2 = csp2.match(/'nonce-([^']+)'/);
  assert.ok(nonceMatch1?.[1], 'First response CSP must contain a cryptographic nonce');
  assert.ok(nonceMatch2?.[1], 'Second response CSP must contain a cryptographic nonce');
  assert.notEqual(
    nonceMatch1[1],
    nonceMatch2[1],
    'CSP nonce must rotate on every request (no static cached nonce)',
  );

  const html1 = await res1.text();
  assert.equal(
    html1.includes(`nonce="${nonceMatch1[1]}"`),
    true,
    'Rendered HTML scripts/JSON-LD must carry the exact per-request nonce from CSP header',
  );

  // 2. Execute Burp Suite + AuthMatrix role x endpoint matrix
  let matrixCount = 0;
  for (const role of profile.roles) {
    for (const testCase of profile.matrix) {
      const response = await fetch(`${baseUrl}${testCase.path}`, {
        method: testCase.method,
        headers: role.headers,
        redirect: 'manual',
      });
      assert.equal(
        testCase.expectedStatus.includes(response.status),
        true,
        `[AuthMatrix:${role.id}] ${testCase.method} ${testCase.path} expected ${testCase.expectedStatus.join('/')} but got ${response.status}`,
      );

      if (testCase.requiredHeaders) {
        for (const [hdr, expectedSub] of Object.entries(testCase.requiredHeaders)) {
          const actualHdr = response.headers.get(hdr) || '';
          assert.equal(
            actualHdr.toLowerCase().includes(String(expectedSub).toLowerCase()),
            true,
            `[AuthMatrix:${role.id}] ${testCase.path} header "${hdr}" missing "${expectedSub}" (got "${actualHdr}")`,
          );
        }
      }

      if (testCase.forbiddenCspSubstrings) {
        const csp = response.headers.get('content-security-policy') || '';
        for (const forbidden of testCase.forbiddenCspSubstrings) {
          assert.equal(
            csp.includes(forbidden),
            false,
            `[AuthMatrix:${role.id}] ${testCase.path} CSP must not include "${forbidden}"`,
          );
        }
      }

      if (testCase.expectedJson) {
        const body = await response.json();
        for (const [k, v] of Object.entries(testCase.expectedJson)) {
          assert.equal(
            body[k],
            v,
            `[AuthMatrix:${role.id}] ${testCase.path} JSON field "${k}" expected "${v}" got "${body[k]}"`,
          );
        }
      }
      matrixCount += 1;
    }
  }
  console.log(
    `[PASS] Live CSP nonce rotation + Burp Suite AuthMatrix (${matrixCount} role/endpoint checks) passed against ${baseUrl}.`,
  );
}

await verifyStaticSecurityPosture();
await verifyCryptographicDonationIntegrity();
if (liveUrl) {
  await verifyLiveServerAndAuthMatrix(liveUrl);
}

