#!/usr/bin/env node
/**
 * Saigon Pearl Purrs — place the 8-petal RescueFlower at the very END of
 * src/app/[locale]/adopt/page.tsx, not on the homepage.
 *
 * This script is safe to re-run and preserves the existing adoption content.
 * It only changes two Next.js page files and never touches SVG/CSS/data.
 */
import fs from 'node:fs';
import path from 'node:path';

const homeFile = path.resolve('src/app/[locale]/page.tsx');
const adoptFile = path.resolve('src/app/[locale]/adopt/page.tsx');
const componentImport = "import { RescueFlower } from '@/components/sections/RescueFlower/RescueFlower';";
const componentTag = '<RescueFlower locale={locale} />';
const oldHomeSection = `      {/* Community rescue flower: eight ways to help community cats */}
      ${componentTag}

`;
const otherHomeSection = `      {/* Community rescue flower: eight ways to care, rescue and find homes */}
      ${componentTag}

`;
const adoptImportAnchor = "import styles from './adopt.module.css';";
const adoptAnchor = '<AdoptServicesCatalog content={content} locale={locale} />';

for (const file of [homeFile, adoptFile]) {
  if (!fs.existsSync(file)) {
    throw new Error(`Khong tim thay ${path.relative(process.cwd(), file)}. Chay script tai thu muc goc repository.`);
  }
}
let home = fs.readFileSync(homeFile, 'utf8');
let adopt = fs.readFileSync(adoptFile, 'utf8');

// Remove a previous, incorrectly installed home-page instance.
home = home.replace(oldHomeSection, '').replace(otherHomeSection, '');
home = home.replace(/^\s*\{\/\* Community rescue flower[^\n]*\*\/\}\s*\n/gm, '');
home = home.replace(/^\s*<RescueFlower locale=\{locale\} \/>\s*\n/gm, '');
home = home.replace(/^import \{ RescueFlower \} from '@\/components\/sections\/RescueFlower\/RescueFlower';\r?\n/m, '');

if (!adopt.includes(adoptImportAnchor) || !adopt.includes(adoptAnchor)) {
  throw new Error('Cau truc trang Nhan nuoi da thay doi. Khong sua tu dong de tranh mat noi dung.');
}
if (!adopt.includes(componentImport)) {
  adopt = adopt.replace(adoptImportAnchor, `${adoptImportAnchor}\n${componentImport}`);
}
if (!adopt.includes(componentTag)) {
  adopt = adopt.replace(adoptAnchor,
    `${adoptAnchor}\n\n      {/* Entire flower section — single centered full-width row, LAST on /adopt. */}\n      ${componentTag}`);
}
// If the component is present more than once, fail before writing.
if ((adopt.match(/<RescueFlower locale=\{locale\} \/>/g) || []).length !== 1) {
  throw new Error('Co nhieu hon mot RescueFlower tren trang Nhan nuoi. Can kiem tra thu cong.');
}
fs.writeFileSync(homeFile, home);
fs.writeFileSync(adoptFile, adopt);
console.log('OK: RescueFlower la section cuoi cung cua /vi/adopt va /en/adopt; da go khoi trang chu.');

