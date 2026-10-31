#!/usr/bin/env node
/**
 * Integrate the community rescue heart ONLY at the bottom of the VI/EN rescue page.
 * Execute from the root of the existing Saigon_Pearl Next.js repository.
 * This script is safe to run repeatedly. It avoids editing other routes.
 */
import fs from 'node:fs';
import path from 'node:path';

const pagePath = path.resolve('src/app/[locale]/rescue/page.tsx');
const componentPath = path.resolve('src/app/[locale]/rescue/_components/RescueHeartDiagram.tsx');
const svgPath = path.resolve('public/assets/saigon-pearl-purrs/rescue-heart/heart-center.svg');
const importLine = "import { RescueHeartDiagram } from './_components/RescueHeartDiagram';";
const insertComponent = '<RescueHeartDiagram locale={locale} />';
const importAnchor = "import { RescueCatalog } from './_components/RescueCatalog';";
const sectionAnchor = '      </main>\n    </div>';

for (const required of [pagePath, componentPath, svgPath]) {
  if (!fs.existsSync(required)) throw new Error(`File not found: ${required}`);
}
let page = fs.readFileSync(pagePath, 'utf8');
if (!page.includes(importAnchor) || (!page.includes(insertComponent) && !page.includes(sectionAnchor))) {
  throw new Error('The rescue page structure changed. No file was modified.');
}
if (!page.includes(importLine)) page = page.replace(importAnchor, `${importAnchor}\n${importLine}`);
if (!page.includes(insertComponent)) {
  page = page.replace(sectionAnchor,
    '      </main>\n\n      {/* 06. Standalone SVG heart at the end of /vi/rescue & /en/rescue */}\n' +
    `      ${insertComponent}\n    </div>`);
}
if (page.split(insertComponent).length !== 2) {
  throw new Error('RescueHeartDiagram must occur exactly once. No file was modified.');
}
fs.writeFileSync(pagePath, page, 'utf8');
console.log('OK: 4-segment rescue heart integrated once at the end of /vi/rescue and /en/rescue.');
