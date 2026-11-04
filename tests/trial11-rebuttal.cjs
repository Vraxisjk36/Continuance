const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync('www/index.html','utf8');
const start=src.indexOf('t11Rebut(i){'),end=src.indexOf('t11Reckon(x){',start);
assert(start>=0&&end>start,'Trial XI rebuttal method missing');
const ctx=vm.createContext({S:{flags:{t11phase:'rebuttal',t11rebuttalStep:0}},toast(){},save(){},render(){}});
vm.runInContext('this.rebut=({'+src.slice(start,end)+'}).t11Rebut',ctx);
ctx.rebut(0);assert.equal(ctx.S.flags.t11rebuttalStep,0,'wrong evidence must not advance');
for(const [step,index] of [[1,1],[2,3],[3,4]]){
 ctx.rebut(index);assert.equal(ctx.S.flags.t11rebuttalStep,step);
}
assert.equal(ctx.S.flags.t11phase,'reckoning','all three correct records unlock reckoning');
console.log('Trial XI evidence rebuttal checks passed');
