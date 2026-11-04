const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('www/index.html','utf8');
function action(name,next,flags={}){const a=html.indexOf(name+'('),b=html.indexOf(next+'(',a);assert(a>=0&&b>a,name+' method missing or misplaced');const ctx={S:{flags,evidence:[]},save(){},render(){},toast(){},fail(){},profileAdd(){},complete(){},document:{getElementById(){return {value:'869431'}}}};vm.runInNewContext('this.actions=({'+html.slice(a,b)+'})',ctx);return ctx;}
{
 const c=action('t8Confess','t8Personal',{t8phase:'chat',t8msgs:[]});
 c.actions.t8Confess('CAR');assert.equal(c.S.flags.t8confession,'CAR');assert(c.S.flags.t8confessionReply.includes('brother'));
 c.actions.t8Confess('FOCUS');assert.equal(c.S.flags.t8confession,'CAR','choice is persistent');
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
console.log('Trial VIII-XII extended mechanics regression passed');