import assert from 'node:assert/strict';
import {analyzePitch,assessTone,pitchFrame,contourShape} from '../pitch-analysis.js';
import {contourChart,toneFeedback} from '../tone-trainer.js';
function fixture(tone,base=180,duration=.8,noise=0){
 const rate=16000,lead=.25,samples=new Float32Array(Math.round((duration+lead+.25)*rate));let phase=0,seed=25;
 for(let i=0;i<Math.round(duration*rate);i++){
  const x=i/(duration*rate),st=tone===1?.15*Math.sin(x*3):tone===2?-3+7*x:tone===3?(x<.55?2-10*x: -3.5+12*(x-.55)):4-9*x;
  phase+=2*Math.PI*base*2**(st/12)/rate;
  seed=(Math.imul(seed,1664525)+1013904223)|0;
  const envelope=Math.min(1,x*30,(1-x)*30);
  samples[Math.round(lead*rate)+i]=envelope*(.25*Math.sin(phase)+.08*Math.sin(2*phase)+.03*Math.sin(3*phase))+noise*(seed/2147483648);
 }
 return {samples,sampleRate:rate};
}
const results=[];
for(const base of [90,180,300])for(const tone of [1,2,3,4]){
 const f=fixture(tone,base),a=analyzePitch(f.samples,f.sampleRate),result=assessTone(a,tone);
 results.push({base,tone,ok:a.ok,reason:a.reason,shape:contourShape(a.points),status:result.status});
 assert.ok(a.ok,JSON.stringify(results.at(-1)));assert.equal(result.status,'compatible',JSON.stringify(results.at(-1)));
 assert.ok(a.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));
}
const falling=fixture(4),a=analyzePitch(falling.samples,16000);assert.equal(assessTone(a,2).status,'different');
const flat=fixture(1),fa=analyzePitch(flat.samples,16000);assert.equal(assessTone(fa,3).status,'uncertain');
assert.equal(assessTone(analyzePitch(new Float32Array(48000),16000),1).status,'insufficient');
const quiet=fixture(2);quiet.samples=quiet.samples.map(v=>v*.001);assert.equal(analyzePitch(quiet.samples,16000).reason,'quiet');
let seed=1;const noise=Float32Array.from({length:24000},()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return .1*seed/2147483648;});assert.equal(assessTone(analyzePitch(noise,16000),1).status,'insufficient');
const clipped=fixture(1);clipped.samples=clipped.samples.map(v=>Math.max(-1,Math.min(1,v*20)));assert.equal(analyzePitch(clipped.samples,16000).reason,'clipping');
const first=fixture(2).samples,multiple=new Float32Array(first.length*2+8000);multiple.set(first);multiple.set(first,first.length+8000);assert.equal(analyzePitch(multiple,16000).reason,'multiple');
assert.equal(analyzePitch(new Float32Array([NaN]),16000).reason,'format');
assert.ok(contourChart(fa,a).includes('tone-chart-learner'));assert.ok(toneFeedback({status:'uncertain'},3).includes('tercer tono'));

assert.equal(assessTone(analyzePitch(fixture(1,180,.2).samples,16000),1).status,'uncertain');
// A falling syllable is often brief and surrounded by most of the capture's silence.
for(const base of [90,180,300])for(const duration of [.14,.18,.23]){
 const short=fixture(4,base,duration),capture=new Float32Array(48000);capture.set(short.samples,16000);
 const result=assessTone(analyzePitch(capture,16000),4);
 assert.equal(result.status,'compatible',JSON.stringify({base,duration,result}));
}
// Harmonics must not hide the falling fundamental; nor should filtered noise count as voice.
const rich=fixture(4,260,.18);let phase=0;
for(let i=4000;i<4000+.18*16000;i++){const x=(i-4000)/(.18*16000);phase+=2*Math.PI*260*2**((4-9*x)/12)/16000;rich.samples[i]+=Math.min(1,x*30,(1-x)*30)*.15*Math.sin(5*phase);}
assert.equal(assessTone(analyzePitch(rich.samples,16000),4).status,'compatible');
assert.equal(assessTone(analyzePitch(fixture(4,180,.06).samples,16000),4).status,'insufficient');
assert.ok(toneFeedback({status:'insufficient',reason:'brief'},4).includes('Se ha detectado voz'));
assert.ok(!toneFeedback({status:'uncertain'},4).includes('sostener'));
console.log('PASS: contour extraction across voice ranges, quality gates, third-tone ambiguity, brief contours and plotting.');
