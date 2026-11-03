// Continuance AI-resistance baseline: deterministic checks, not an LLM benchmark.
// Run: node tests/ai-resistance-audit.cjs
const fs=require('node:fs'),assert=require('node:assert/strict');
const s=fs.readFileSync('www/index.html','utf8');
const checks=[
  ['Trial 1 exposes a fixed cipher alphabet',/const T1_GLYPHS=\[/.test(s)&&/const T1_VERSES=\[/.test(s)],
  ['Trial 2 has extractable numbered components',s.includes('INTAKE MANIFOLD')&&s.includes('PRESSURE REGULATOR')],
  ['Trial 3 contains a case investigation',s.includes('function t3()')&&s.includes('DR. MARA VOSS')],
  ['Trial 7 includes timestamped records',s.includes('function t7()')&&s.includes('21:12:51')],
  ['Trial 10 includes frequency signal data',s.includes('function t10()')&&s.includes('94.7')],
  ['Trial-only screenshot protection hook exists',s.includes('AndroidScreenGuard?.setSecure')&&s.includes('^trial(?:[1-9]|1[0-2])$')],
  ['A completion receipt is generated',s.includes('crypto.getRandomValues(bytes)')&&s.includes('completionReceipt')],
  ['Screenshot-only unlock remains disabled',s.includes('const SCREENSHOT_MODE_UNLOCK_ALL=false;')]
];
let failed=0;for(const [name,ok] of checks){console.log((ok?'PASS':'FAIL')+' '+name);if(!ok)failed++;}
console.log('\nAI vulnerability priorities: T1, T2, T7, T10, T3. These are source-exposure indicators, NOT measured AI solve rates.');
console.log('To measure AI solve rates: present only in-game clues to several models, repeat each trial, and score correctness and hints.');
if(failed)process.exitCode=1;
