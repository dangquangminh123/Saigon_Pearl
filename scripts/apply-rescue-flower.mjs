#!/usr/bin/env node
/**
 * Apply once from the root of the existing Saigon_Pearl Next.js repository.
 * Copy src/components/... and public/assets/... from this package FIRST.
 * This script changes only src/app/[locale]/page.tsx; idempotent by design.
 */
import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('src/app/[locale]/page.tsx');
if (!fs.existsSync(file)) {
  console.error('Khong tim thay src/app/[locale]/page.tsx. Hay chay script tai thu muc goc repository.');
  process.exit(1);
}
let source = fs.readFileSync(file, 'utf8');
const importLine = "import { RescueFlower } from '@/components/sections/RescueFlower/RescueFlower';";
if (!source.includes(importLine)) {
  const marker = "import { RescueCareIcon, FindHomeIcon, CommunityIcon, SupportHandsIcon } from '@/components/PillarIcons';";
  if (!source.includes(marker)) {
    console.error('Import anchor khong con giong main. Khong sua tu dong; xem README de them thu cong.');
    process.exit(1);
  }
  source = source.replace(marker, `${marker}\n${importLine}`);
}
if (!source.includes('<RescueFlower locale={locale} />')) {
  const marker = '{/* 5. Impact Counter Bar */}';
  if (!source.includes(marker)) {
    console.error('Vi tri chen section khong duoc tim thay; khong sua tu dong.');
    process.exit(1);
  }
  source = source.replace(marker,
    `{/* Community rescue flower: eight ways to care, rescue and find homes */}\n      <RescueFlower locale={locale} />\n\n      ${marker}`);
}
fs.writeFileSync(file, source, 'utf8');
console.log('OK: Da tich hop RescueFlower vao trang chu VI/EN.');
