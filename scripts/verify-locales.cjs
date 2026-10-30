/* Verify Vietnamese/English dictionary completeness; run with npm run verify:i18n. */
const fs = require('fs');
const ts = require('typescript');
const source = ts.createSourceFile('dictionaries.ts', fs.readFileSync('src/lib/dictionaries.ts', 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const initializer = source.statements
  .filter(ts.isVariableStatement)
  .flatMap((s) => s.declarationList.declarations)
  .find((d) => d.name.getText(source) === 'dictionaries')?.initializer;
const root = initializer && ts.isAsExpression(initializer) ? initializer.expression : initializer;
if (!root || !ts.isObjectLiteralExpression(root)) throw new Error('Cannot find dictionaries');
function property(obj, name) { return obj.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText(source).replace(/["']/g, '') === name)?.initializer; }
const vi = property(root, 'vi');
const en = property(root, 'en');
if (!vi || !en) throw new Error('Missing vi or en dictionary');
const issues = [];
function recurse(a, b, path) {
  if (ts.isObjectLiteralExpression(a) && ts.isObjectLiteralExpression(b)) {
    const names = (obj) => obj.properties.filter(ts.isPropertyAssignment).map((p) => p.name.getText(source).replace(/["']/g, ''));
    for (const key of new Set([...names(a), ...names(b)])) {
      const left = property(a, key), right = property(b, key);
      if (!left || !right) issues.push(`${path}.${key} missing from ${left ? 'en' : 'vi'}`);
      else recurse(left, right, `${path}.${key}`);
    }
  } else if (ts.isArrayLiteralExpression(a) && ts.isArrayLiteralExpression(b)) {
    if (a.elements.length !== b.elements.length) issues.push(`${path} has different array lengths: ${a.elements.length} vs ${b.elements.length}`);
    for (let i = 0; i < Math.min(a.elements.length, b.elements.length); i++) recurse(a.elements[i], b.elements[i], `${path}[${i}]`);
  }
}
recurse(vi,en,'dictionaries');
if (issues.length) { console.error(issues.join('\n')); process.exit(1); }
console.log('PASS: All Vietnamese/English dictionary keys and array structures match.');
