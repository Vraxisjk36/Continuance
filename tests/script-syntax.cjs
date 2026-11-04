const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('www/index.html','utf8');
const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(s=>s.trim());
assert(scripts.length>0,'No inline game script found');
for(let i=0;i<scripts.length;i++)new vm.Script(scripts[i],{filename:'www/index.html:inline-script-'+(i+1)});
console.log('All '+scripts.length+' inline scripts parse successfully');
