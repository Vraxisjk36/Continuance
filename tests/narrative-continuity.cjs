const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('www/index.html','utf8');
const script=html.match(/<script>\s*\(function\(\)\{([\s\S]*?)<\/script>/);
assert(script,'main game script must exist');
new vm.Script('(function(){'+script[1],{filename:'www/index.html'});
for(const method of ['t8Promise(choice){','t8lastExchange','function t12RenPromise()','t11Followup(i){','t12WitnessPayoff()'])assert(html.includes(method),method+' missing');
const promiseStart=html.indexOf('t8Promise(choice){'),promiseEnd=html.indexOf('finish8(o){',promiseStart);
assert(promiseStart>0&&promiseEnd>promiseStart,'promise handler extraction');
const sandbox={S:{flags:{t8phase:'order',t8msgs:[]}},save(){},render(){}};
vm.runInNewContext('this.promise=({'+html.slice(promiseStart,promiseEnd)+'}).t8Promise',sandbox);
sandbox.promise('TRUTH');
assert.equal(sandbox.S.flags.t8lastExchange,'TRUTH');
assert.equal(sandbox.S.flags.t8msgs.length,1);
sandbox.promise('NONE');
assert.equal(sandbox.S.flags.t8lastExchange,'TRUTH','promise cannot be overwritten');
for(const choice of ['PROTECT','NONE']){const context={S:{flags:{t8phase:'order',t8msgs:[]}},save(){},render(){}};vm.runInNewContext('this.promise=({'+html.slice(promiseStart,promiseEnd)+'}).t8Promise',context);context.promise(choice);assert.equal(context.S.flags.t8lastExchange,choice)}
const witnessStart=html.indexOf('function t12WitnessPayoff()'),witnessEnd=html.indexOf('function t12RenPromise()',witnessStart);
const renStart=witnessEnd,renEnd=html.indexOf('function t12(){',renStart);
assert(witnessStart>0&&renStart>witnessStart&&renEnd>renStart);
for(const focus of ['ACCOUNTABILITY','DOUBT','WITNESS']){const ctx={S:{flags:{t6reflection:focus,t11followupAnswer:'testimony'}},esc:x=>x};vm.runInNewContext(html.slice(witnessStart,witnessEnd)+';this.payoff=t12WitnessPayoff',ctx);assert(ctx.payoff().includes('testimony'))}
for(const promise of ['TRUTH','PROTECT','NONE']){const ctx={S:{flags:{t8lastExchange:promise,t8order:'HELP_FIRST'}},esc:x=>x};vm.runInNewContext(html.slice(renStart,renEnd)+';this.payoff=t12RenPromise',ctx);assert(ctx.payoff().length>60)}
console.log('Narrative continuity: syntax, Ren promises, cross-trial payoffs passed');
