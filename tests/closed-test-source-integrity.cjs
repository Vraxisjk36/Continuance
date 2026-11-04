const fs=require('node:fs'),assert=require('node:assert/strict');
const app=fs.readFileSync('www/index.html','utf8');
const pages=fs.readFileSync('.github/workflows/pages.yml','utf8');
const android=JSON.parse(fs.readFileSync('capacitor.config.json','utf8'));
assert.equal(android.webDir,'www','Android must package the tested game');
assert.match(pages,/path:\s*www\b/,'GitHub Pages must deploy the tested game, not the legacy root index');
for(let n=1;n<=12;n++)assert(app.includes('function t'+n+'(){'),'Missing Trial '+n+' from deployed game');
const checks=[
 ['Trial 5 evidence connections',app.includes('four connections unlock the confrontation')],
 ['Trial 6 permanent route warning',app.includes('IRREVERSIBLE ROUTE CHOICE')],
 ['Trial 7 legacy save compatibility',app.includes('S.flags.t7verified||(!S.flags.t7inspect&&!S.flags.t7packets)')],
 ['Trial 8 live peer authentication',app.includes('authenticate the live peer using the wall taps')],
 ['Trial 9 memory verification gate',app.includes('VERIFY SELECTED MEMORY')],
 ['Trial 10 missing witness channel',app.includes('reconstruct its meaning from independent witness records')],
 ['Trial 11 three evidence claims',app.includes('picks.length!==3')],
 ['Trial 12 irreversible final choice',app.includes('This is your final, irreversible decision')],
 ['Screenshot-only unlock disabled',app.includes('const SCREENSHOT_MODE_UNLOCK_ALL=false;')]
];
for(const [label,ok]of checks){assert(ok,label+' missing in deployed app');console.log('PASS '+label)}
console.log('PASS GitHub Pages and Android both use the same tested www source');
