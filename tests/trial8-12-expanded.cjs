const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('www/index.html','utf8');
function action(name,next,flags={}){const signature=name+'(choice){';const a=html.indexOf(signature),b=html.indexOf(next+'(',a);assert(a>=0&&b>a,name+' method missing or misplaced');const ctx={S:{flags,evidence:[]},save(){},render(){},toast(){},fail(){},profileAdd(){},complete(){},document:{getElementById(){return {value:'869431'}}}};vm.runInNewContext('this.actions=({'+html.slice(a,b)+'})',ctx);return ctx;}
{
 const c=action('t8Confess','t8Personal',{t8phase:'chat',t8msgs:[]});
 c.actions.t8Confess('CAR');assert.equal(c.S.flags.t8confession,'CAR');assert(c.S.flags.t8confessionReply.includes('brother'));
 c.actions.t8Confess('FOCUS');assert.equal(c.S.flags.t8confession,'CAR','choice is persistent');
}
{
 const a=html.indexOf('t8Balance(choice){'),b=html.indexOf('t8ReleaseAudit(choice){',a);
 assert(a>=0&&b>a,'cooperative regulator method missing');
 const ctx={S:{flags:{t8phase:'order',t8msgs:[]}},toast(){},save(){},render(){}};
 vm.runInNewContext('this.balance=({'+html.slice(a,b)+'}).t8Balance',ctx);
 ctx.balance('B');assert.equal(ctx.S.flags.t8relayBalanced,undefined);
 ctx.balance('A');assert.equal(ctx.S.flags.t8relayBalanced,true);
 assert(ctx.S.flags.t8msgs.some(m=>m.includes('72')));
}
{
 const c=action('t8ReleaseAudit','t8Promise',{t8phase:'order',t8msgs:[]});
 c.actions.t8ReleaseAudit('SAFE');assert.equal(c.S.flags.t8releaseVerified,undefined);
 c.actions.t8ReleaseAudit('TWO');assert.equal(c.S.flags.t8releaseVerified,true);
}
{
 const c=action('t9Authenticate','finish9',{t9phase:'truth'});
 c.actions.t9Authenticate('A');assert.equal(c.S.flags.t9authenticity,undefined);
 c.actions.t9Authenticate('B');assert.equal(c.S.flags.t9authenticity,'B');
}
{
 const c=action('t10Source','finish10',{t10phase:'transmit'});
 c.actions.t10Source('ARCHITECT');assert.equal(c.S.flags.t10sourceVerified,undefined);
 c.actions.t10Source('UNKNOWN');assert.equal(c.S.flags.t10sourceVerified,true);
}
{
 const c=action('t11CounterEvidence','t11Followup',{t11phase:'reckoning',t11personalDone:true});
 c.actions.t11CounterEvidence('ORIGINAL');assert.equal(c.S.flags.t11counterEvidence,undefined);
 c.actions.t11CounterEvidence('RENEWAL');assert.equal(c.S.flags.t11counterEvidence,'RENEWAL');
 assert(c.S.evidence.some(e=>e.id==='t11-consent'));
}
{
 const c=action('audit12','t12ViewReport',{t12phase:'audit'});
 c.actions.audit12('ZERO');assert.equal(c.S.flags.t12phase,'audit');
 c.actions.audit12('BREACH');assert.equal(c.S.flags.t12phase,'final');
}
{
 const src=html.indexOf('t11Ledger(choice){'),end=html.indexOf('t11Followup(i){',src);
 assert(src>=0&&end>src,'Architect ledger and hold methods missing');
 const c={S:{flags:{t11phase:'reckoning',t11counterEvidence:'RENEWAL'},evidence:[]},toast(){},save(){},render(){}};
 vm.runInNewContext('this.actions=({'+html.slice(src,end)+'})',c);
 c.actions.t11Ledger('ARCHITECT');assert.equal(c.S.flags.t11ledgerResolved,undefined,'unknown authorship cannot be assigned to Architect');
 c.actions.t11Ledger('UNKNOWN');assert.equal(c.S.flags.t11ledgerResolved,true);
 c.actions.t11Witness('INNOCENT');assert.equal(c.S.flags.t11witnessResolved,undefined,'hold request is not exoneration');
 c.actions.t11Witness('HOLD');assert.equal(c.S.flags.t11witnessResolved,true);
 assert(c.S.evidence.some(e=>e.id==='t11-ledger')&&c.S.evidence.some(e=>e.id==='t11-hold'));
}
{
 const a=html.indexOf('t11Silence(choice){'),b=html.indexOf('t11Followup(i){',a);
 assert(a>=0&&b>a,'Trial XI dramatic response method missing');
 const c={S:{flags:{t11phase:'reckoning',t11witnessResolved:true},evidence:[]},save(){},render(){}};
 vm.runInNewContext('this.answer=({'+html.slice(a,b)+'}).t11Silence',c);
 c.answer('ASK');assert.equal(c.S.flags.t11silenceAnswered,'ASK');
 c.answer('STOP');assert.equal(c.S.flags.t11silenceAnswered,'ASK','answer cannot be overwritten');
 assert(c.S.evidence.some(e=>e.id==='t11-silence'));
}
console.log('Trial VIII-XII extended mechanics regression passed');