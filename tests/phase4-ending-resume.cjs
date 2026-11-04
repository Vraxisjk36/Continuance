const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const src=fs.readFileSync('www/index.html','utf8');
const start=src.indexOf('const T12_ENDINGS='),end=src.indexOf('const JANUS_CHRONOLOGY=',start);
assert(start>=0&&end>start,'four final outcomes missing');
const ctx={};vm.createContext(ctx);vm.runInContext(src.slice(start,end)+'this.endings=T12_ENDINGS;',ctx);
assert.deepEqual(Object.keys(ctx.endings).sort(),['CONTINUE','ESCAPE','TERMINATE','ZERO']);
for(const [name,lines] of Object.entries(ctx.endings)){assert.equal(lines.length,4,name+' ending structure');assert(lines.every(x=>typeof x==='string'&&x.length>=4),name+' empty ending');}
assert(ctx.endings.ESCAPE[2].includes('cannot prove'),'escape must not imply all subjects rescued');
assert(ctx.endings.ZERO[2].includes('cannot establish'),'seal release must preserve uncertainty');
assert(ctx.endings.TERMINATE[2].includes('not proof of rescue'),'termination must preserve uncertainty');
assert(ctx.endings.CONTINUE[2].includes('risk'),'continuation must acknowledge risk');
const m=src.match(/resume\(\)\{([^}]+)\}/);assert(m,'resume handler missing');
assert(m[1].includes("S.completed?.includes(12)"),'completed game must not resume Trial XIII');
assert(m[1].includes("setScreen('trial12')"),'completed game must show final record');
assert(src.includes('let n=Math.min(12,Math.max(1,Number(S.trial)||1));Game.loadChamber(n)'), 'incomplete save must cap resumed chamber');
assert(src.includes("if(!SCREENSHOT_MODE_UNLOCK_ALL&&n>Math.max(1,Number(S.trial)||1))return;"),'trial progression must stay gated');
console.log('Phase IV endings, outcome uncertainty and completed-game resume checks passed');
