/* CONTINUANCE / Node smoke tests. Run: node tests/continuity-smoke.cjs */
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'../www/index.html'),'utf8');
const script=html.split('<script>')[1]?.split('</script>')[0];
assert(script,'Main game script missing');
new Function(script);
const vals={},store=new Map(),app={innerHTML:'',scrollTop:0};
const dummy={style:{},classList:{add(){},remove(){}},appendChild(){},remove(){},setAttribute(){},getBoundingClientRect(){return {width:300,height:500}}};
const document={body:{dataset:{},classList:{add(){},remove(){}},style:{},appendChild(){}},getElementById(id){return id==='app'?app:{...dummy,value:vals[id]||''}},querySelector(){return null},querySelectorAll(){return []},addEventListener(){},createElement(){return {...dummy}},createTextNode(){return dummy}};
const window={addEventListener(){},location:{},matchMedia(){return {matches:false}},scrollTo(){}};
const localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)};
const sandbox={document,window,localStorage,navigator:{vibrate(){}},setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},console,confirm:()=>true};
const injected=script.replace(/\brender\(\);\s*\}\)\(\);\s*$/,'window.__qa={getState:()=>S,setState:x=>{S=x},DEFAULT,Game:window.Game,t6,t7,t8,t9,t10,t11,t12};\n})();');
assert.notEqual(injected,script,'Could not install smoke test hook');
vm.runInNewContext(injected,sandbox,{timeout:5000});
const q=window.__qa,g=q.Game;
function reset(){q.setState(JSON.parse(JSON.stringify(q.DEFAULT)));q.getState().started=true;for(const k of Object.keys(vals))delete vals[k]}
function test(name,fn){reset();fn();console.log('PASS',name)}
for(const route of ['LEFT','RIGHT'])test('Trial VII route '+route,()=>{q.getState().flags.t6door=route;assert.match(q.t7(),/RECOVERED FROM CHAMBER VI/);assert.match(q.t7(),route==='LEFT'?/INTERVIEWER 13/:/access logs/)});
for(const phase of ['tune','order','tape','missing','transmit','done'])test('Trial X renders '+phase,()=>{q.getState().flags.t10phase=phase;assert(q.t10().length>100)});
test('Trial X complete path',()=>{g.tune10('108.6');g.auth10();vals.t10six='869431';g.order10();g.playTape10();for(let i=0;i<4;i++)g.t10ReadWitness(i);g.t10Interpret('HUMAN');vals.t10final='8694315';g.finish10();assert(q.getState().completed.includes(10))});
test('Trial X optional tape bypass',()=>{q.getState().flags.t10phase='tape';g.skipTape10();for(let i=0;i<4;i++)g.t10ReadWitness(i);g.t10Interpret('HUMAN');assert.equal(q.getState().flags.t10phase,'transmit')});
test('Trial XI evidence confrontation',()=>{for(let i=0;i<6;i++)g.t11ReadRecord(i);for(const x of ['A','B','C'])g.pick11(x);g.prove11();assert.equal(q.getState().flags.t11phase,'reckoning');g.t11Reckon('EVIDENCE');vals.intent11='Save Subject 18';g.intent11();assert(q.getState().completed.includes(11))});
test('Trial XI unproven accusation rejected',()=>{for(let i=0;i<6;i++)g.t11ReadRecord(i);for(const x of ['A','B','D'])g.pick11(x);g.prove11();assert.equal(q.getState().flags.t11phase||'claims','claims')});
for(const ending of ['ESCAPE','ZERO','TERMINATE','CONTINUE'])test('Trial XII ending '+ending,()=>{g.fakeExit12();g.door12('FALSE');vals.id12='OPERATOR 13';g.identity12();g.event12('B');g.end12(ending);assert.equal(q.getState().flags.t12phase,'aftermath');assert.match(q.t12(),/FINAL TRANSMISSION/);g.t12ViewReport();assert(q.getState().completed.includes(12))});
test('Trial XIII eligibility gate',()=>{q.getState().flags.memoryAwareness=4;q.getState().flags.t10tape=true;g.end12('CONTINUE');assert.equal(q.getState().flags.trial13,true)});
console.log('CONTINUANCE smoke suite complete.');
