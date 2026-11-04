const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync('www/index.html','utf8');
const start=src.indexOf('function t12MemoryDoors(){'),end=src.indexOf('function t12(){',start);
assert(start>=0&&end>start,'Trial XII memory-door helper missing');
const ctx=vm.createContext({S:{flags:{}}});
vm.runInContext(src.slice(start,end)+'\nthis.memoryDoors=t12MemoryDoors;',ctx);
const variants=[
 {t6door:'LEFT',t8order:'SELF_FIRST',t9choice:'READ',t3remember:false,t10tape:true,t7decision:'HID'},
 {t6door:'RIGHT',t8order:'HELP_FIRST',t9choice:'CONFRONT',t3remember:true,t10tape:true,t7decision:'SHARE'},
 {t6door:'LEFT',t8order:'HELP_FIRST',t9choice:'READ',t3remember:true,t10tape:false,t7decision:'SHARE'},
 {t6door:'RIGHT',t8order:'SELF_FIRST',t9choice:'CLOSE',t3remember:false,t10tape:false,t7decision:'HID'}
];
const answers=new Set();
for(const flags of variants){
 ctx.S.flags=flags;const {doors,answer}=ctx.memoryDoors();answers.add(answer);
 assert.equal(doors.length,7);assert.equal(new Set(doors.map(x=>x[0])).size,7);
 assert(doors.some(x=>x[0]===answer));
 assert.deepEqual(Array.from(ctx.memoryDoors().doors).map(x=>x.join(':')),Array.from(doors).map(x=>x.join(':')),'memory puzzle should persist for a save');
}
assert(answers.size>1,'different histories should change the correct door');
assert(src.includes('if(x===t12MemoryDoors().answer)'),'door validation must use personalized answer');
console.log('Trial XII personalized memory-door checks passed');
