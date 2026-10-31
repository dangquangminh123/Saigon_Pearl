#!/usr/bin/env node
/**
 * Saigon Pearl Purrs: place the 8-petal SVG infographic at the END of
 * src/app/[locale]/adopt/page.tsx, NEVER on the homepage.
 * Works for both /vi/adopt and /en/adopt.
 * Run from the repository root. Safe to rerun.
 */
import fs from 'node:fs';
import path from 'node:path';

const homeFile = path.resolve('src/app/[locale]/page.tsx');
const adoptFile = path.resolve('src/app/[locale]/adopt/page.tsx');
const importLine = "import { RescueFlower } from '@/components/sections/RescueFlower/RescueFlower';";
const component = '<RescueFlower locale={locale} />';
const adoptImportAnchor = "import styles from './adopt.module.css';";
const catalogAnchor = '<AdoptServicesCatalog content={content} locale={locale} />';

for (const file of [homeFile, adoptFile]) {
  if (!fs.existsSync(file)) throw new Error('Missing page file: ' + file);
}
let home = fs.readFileSync(homeFile, 'utf8');
let adopt = fs.readFileSync(adoptFile, 'utf8');
if (!adopt.includes(adoptImportAnchor) || !adopt.includes(catalogAnchor)) {
  throw new Error('Adoption page structure changed. Nothing was written.');
}
home = home.replace(/^[ \t]*\{\/\* Community rescue flower[^\n]*\*\/\}[ \t]*\r?\n/gm, '');
home = home.replace(/^[ \t]*<RescueFlower locale=\{locale\} \/>[ \t]*\r?\n/gm, '');
home = home.replace(/^import \{ RescueFlower \} from '@\/components\/sections\/RescueFlower\/RescueFlower';\r?\n/m, '');
if (!adopt.includes(importLine)) adopt = adopt.replace(adoptImportAnchor, adoptImportAnchor + '\n' + importLine);
if (!adopt.includes(component)) {
  adopt = adopt.replace(catalogAnchor,
    catalogAnchor + '\n\n      {/* SVG flower: separate full-width row centered at the very end of Adoption. */}\n      ' + component);
}
if (adopt.split(component).length !== 2) {
  throw new Error('Duplicate RescueFlower components; nothing was written.');
}
fs.writeFileSync(homeFile, home, 'utf8');
fs.writeFileSync(adoptFile, adopt, 'utf8');
console.log('OK: RescueFlower moved to the bottom of /vi/adopt and /en/adopt.');
