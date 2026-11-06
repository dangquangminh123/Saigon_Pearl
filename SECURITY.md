# Security Architecture & Hardening Guide — Saigon Pearl Purrs

## 1. Defense-in-Depth Overview

Saigon Pearl Purrs is hardened across 6 layers:

1. **Secrets & Repository Hygiene (`.gitignore`, `.env.example`)**
   - All `.env*` files except `!.env.example`, private keys (`*.pem`, `*.key`, `*.p8`, `*.p12`, `*.pfx`), and local scan artifacts are ignored by Git.
   - Zero private keys or runtime credentials are stored in repository history or client bundles.

2. **Stage A + Stage B Nonce-Based Content Security Policy (`src/proxy.ts`, `next.config.ts`)**
   - Dynamic page requests pass through `src/proxy.ts` (Next.js 16 Proxy convention), which generates a 128-bit cryptographic nonce per request and sets:
     - `script-src 'self' 'nonce-<base64>' 'strict-dynamic'` (no `'unsafe-inline'` or `'unsafe-eval'` in production)
     - `script-src-attr 'none'`
     - `img-src 'self' data:` (wildcard `https:` removed)
     - `font-src 'self'` (unused `https://fonts.gstatic.com` removed)
     - `object-src 'none'`, `base-uri 'none'`, `form-action 'self'`, `frame-src 'none'`, `frame-ancestors 'none'`, `worker-src 'self'`, `manifest-src 'self'`
   - JSON-LD `<script type="application/ld+json">` tags in `src/app/[locale]/layout.tsx` and `src/app/[locale]/news/[slug]/page.tsx` receive the per-request `nonce` and escape `<` as `\u003c`.
   - Emergency fallback switches:
     - `CSP_MODE=stage-a` falls back to Stage A CSP without requiring code edits.
     - `CSP_REPORT_ONLY=true` emits `Content-Security-Policy-Report-Only` for dry-run testing.

3. **Fail-Closed Cryptographic Donation QR (`src/app/api/verified-donation/route.ts`, `scripts/sign-donation.mjs`)**
   - Default-disabled unless `DONATION_ENABLED=true` and `DONATION_VERIFY_PUBLIC_KEY_B64` is configured.
   - Blocks demo/placeholder values (`9999999999`, `THAY_*`, `PLACEHOLDER`) in production even if accidentally signed.
   - Verifies Ed25519 signature (64-byte raw signature over `{ bankCode, accountNumber, accountHolder, qrSha256 }`) and verifies PNG magic bytes (`89 50 4E 47 0D 0A 1A 0A`), file size cap (`<= 512 KB`), and SHA-256 digest before returning `data:image/png;base64,...`.
   - Enforces IP rate limiting (`30 req / 60s`), rejects unexpected query parameters (`400`), and blocks non-`GET`/`HEAD` methods (`405`).

4. **Honest Local Adoption Message Preparation (`AdoptServicesCatalog.tsx`, `adopt-services.ts`)**
   - The adoption form prepares a structured message locally in the user's browser with one-click Copy and optional `mailto:` handoff (`NEXT_PUBLIC_CONTACT_EMAIL`), eliminating false server-submission claims and overbroad privacy promises.

## 2. Automated Security Verification Suite

| Tool / Suite | Purpose | Command |
|---|---|---|
| **Static + Crypto + AuthMatrix Verifier** | Verifies `.gitignore`, CSP headers, per-request nonces, JSON-LD nonces, Ed25519/SHA-256 tamper resistance, and Burp Suite + AuthMatrix role/method matrix | `npm run verify:security` (or `SECURITY_VERIFY_URL=http://localhost:3000 npm run verify:security`) |
| **Schemathesis** | Property-based OpenAPI fuzzing against `/api/verified-donation` (`security/openapi.json`) | `npm run security:schemathesis` |
| **StackHawk** | Dynamic Application Security Testing (DAST) configured via `stackhawk.yml` + `security/openapi.json` | `hawk scan stackhawk.yml` |
| **Burp Suite + AuthMatrix** | Role/header spoofing, cross-origin, and method-tampering matrix (`security/burp-authmatrix-profile.json`) | Executed automatically by `npm run verify:security` when `SECURITY_VERIFY_URL` is set, or imported into Burp Suite |

## 3. Incident Response Playbook (Suspected QR or Key Compromise)

1. **Immediate Lock (< 1 minute):** Set `DONATION_ENABLED=false` in Vercel Environment Variables and redeploy. The UI immediately displays the bilingual security lock notice and refuses to render any bank account or QR image.
2. **Key Rotation:** Generate a fresh Ed25519 keypair outside the repository (`openssl genpkey -algorithm Ed25519 -out ~/.secrets/donation-ed25519-private.pem`), re-sign the verified manifest (`node scripts/sign-donation.mjs ~/.secrets/donation-ed25519-private.pem`), update `DONATION_VERIFY_PUBLIC_KEY_B64`, and re-run `npm run verify:security`.
