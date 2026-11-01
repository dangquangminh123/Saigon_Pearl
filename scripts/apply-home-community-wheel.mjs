#!/usr/bin/env node
/**
 * Install HomeCommunityWheel at the very END of /vi and /en homepages.
 * Also migrate the earlier adoption flower's three SVGs into their OWN folder.
 * Existing rescue heart assets stay isolated in `rescue-heart/`.
 * Safe to run repeatedly; does not touch the rescue/adoption page layout.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const homeFile = path.join(root, 'src/app/[locale]/page.tsx');
const adoptionCssFile = path.join(root, 'src/components/sections/RescueFlower/RescueFlower.module.css');
const base = path.join(root, 'public/assets/saigon-pearl-purrs');
const target = path.join(base, 'adoption-rescue-flower');
const importLine = "import { HomeCommunityWheel } from '@/components/sections/HomeCommunityWheel/HomeCommunityWheel';";
const componentLine = '<HomeCommunityWheel locale={locale} />';

for (const f of [homeFile, adoptionCssFile]) {
  if (!fs.existsSync(f)) throw new Error(`Missing file: ${f}`);
}
let home = fs.readFileSync(homeFile, 'utf8');
let adoptionCss = fs.readFileSync(adoptionCssFile, 'utf8');
if (!home.includes("import { RescueCareIcon") || !home.includes('      </section>\n    </>\n  );\n}')) {
  if (!home.includes(componentLine)) throw new Error('Home page structure changed. Refusing to modify unrelated code.');
}
if (!home.includes(importLine)) {
  const anchor = "import { RescueCareIcon, FindHomeIcon, CommunityIcon, SupportHandsIcon } from '@/components/PillarIcons';";
  if (!home.includes(anchor)) throw new Error('Cannot find import anchor');
  home = home.replace(anchor, anchor + '\n' + importLine);
}
if (!home.includes(componentLine)) {
  home = home.replace(
    '      </section>\n    </>\n  );\n}',
    '      </section>\n\n      {/* 7. Independent, full-width community wheel at the very end of the homepage */}\n      ' + componentLine + '\n    </>\n  );\n}'
  );
}
if ((home.match(/<HomeCommunityWheel locale=\{locale\} \/>/g) || []).length !== 1) {
  throw new Error('Wheel component count must equal one. Nothing was written.');
}
for (const file of ['flower-petal.svg', 'flower-center-ring.svg', 'flower-step-leaf.svg']) {
  const from = path.join(base, file);
  const to = path.join(target, file);
  adoptionCss = adoptionCss.replaceAll('/assets/saigon-pearl-purrs/' + file, '/assets/saigon-pearl-purrs/adoption-rescue-flower/' + file);
  if (fs.existsSync(from)) {
    fs.mkdirSync(target, { recursive: true });
    if (!fs.existsSync(to)) fs.copyFileSync(from, to);
    // Delete only when the new file is byte-for-byte identical.
    if (fs.existsSync(to) && fs.readFileSync(from).equals(fs.readFileSync(to))) fs.unlinkSync(from);
  }
  if (!fs.existsSync(to)) throw new Error(`Missing adoption SVG: ${to}`);
}
fs.writeFileSync(homeFile, home, 'utf8');
fs.writeFileSync(adoptionCssFile, adoptionCss, 'utf8');
console.log('OK: Homepage wheel placed after all existing sections; adoption SVGs moved to adoption-rescue-flower/.');
