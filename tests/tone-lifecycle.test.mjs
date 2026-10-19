import assert from 'node:assert/strict';
import {createToneTrainer} from '../tone-trainer.js';
const tick=async()=>{for(let i=0;i<12;i++)await new Promise(resolve=>setImmediate(resolve));};
const samples=new Float32Array(16000);let phase=0;
for(let i=0;i<samples.length;i++){phase+=2*Math.PI*180*2**((-3+7*i/16000)/12)/16000;samples[i]=.2*Math.sin(phase);}
const streams=[];
function input(){const value={stops:0,getTracks(){return [{stop:()=>value.stops++}];}};streams.push(value);return value;}
class Context{
 resume(){return Promise.resolve();}close(){return Promise.resolve();}
 createMediaStreamSource(){return {connect(){},disconnect(){}};}
 createAnalyser(){return {fftSize:1024,disconnect(){},getFloatTimeDomainData(a){a.fill(.1);}};}
 decodeAudioData(){return Promise.resolve({duration:1,length:samples.length,numberOfChannels:1,sampleRate:16000,getChannelData(){return samples;}});}
}
const recorders=[];
class Recorder{
 static isTypeSupported(){return true;}
 constructor(){this.state='inactive';this.mimeType='audio/webm';recorders.push(this);}
 start(){this.state='recording';}
 stop(){this.state='inactive';queueMicrotask(()=>{this.ondataavailable?.({data:new Blob(['test capture'])});this.onstop?.();});}
}
globalThis.window={AudioContext:Context,MediaRecorder:Recorder};globalThis.MediaRecorder=Recorder;
globalThis.document={querySelector(){return null;}};
globalThis.requestAnimationFrame=()=>1;globalThis.cancelAnimationFrame=()=>{};
globalThis.fetch=async url=>{assert.ok(url.startsWith('./audio/pinyin/'));return {ok:true,arrayBuffer:async()=>new ArrayBuffer(4)};};
let getMedia;
Object.defineProperty(globalThis,'navigator',{value:{mediaDevices:{getUserMedia:()=>getMedia()}},configurable:true});
const make=()=>createToneTrainer({render(){},toast(){},pauseAudio(){},play(){}});
// Cancelling a still-pending permission must release a late-arriving stream.
let resolvePermission;getMedia=()=>new Promise(resolve=>resolvePermission=resolve);
const cancelled=make();cancelled.activate();cancelled.onClick({id:'tone-record',dataset:{}});
assert.ok(cancelled.html().includes('Esperando permiso'));
cancelled.onClick({id:'tone-cancel',dataset:{}});const late=input();resolvePermission(late);await tick();assert.equal(late.stops,1);assert.equal(recorders.length,0);cancelled.stop();
// Manual finish releases input, processes one take, and has a playable local result.
getMedia=async()=>input();const recorded=make();recorded.activate();recorded.onClick({dataset:{toneTarget:'2'}});recorded.onClick({id:'tone-record',dataset:{}});await tick();assert.ok(recorded.html().includes('Terminar y comparar'));
recorded.onClick({id:'tone-finish',dataset:{}});await tick();assert.equal(streams.at(-1).stops,1);assert.ok(recorded.html().includes('Movimiento compatible con el tono 2'));assert.ok(recorded.html().includes('blob:'));
recorded.stop();assert.ok(!recorded.html().includes('tone-own-audio'));assert.ok(!recorded.html().includes('tone-verdict'));
// Leaving during capture discards the take instead of analysing it after stop.
const leaving=make();leaving.activate();leaving.onClick({id:'tone-record',dataset:{}});await tick();leaving.stop();await tick();assert.equal(streams.at(-1).stops,1);assert.ok(!leaving.html().includes('tone-own-audio'));
// Denied permission returns to an actionable state rather than staying busy.
getMedia=async()=>{const error=Error('permission denied');error.name='NotAllowedError';throw error;};
const denied=make();denied.activate();denied.onClick({id:'tone-record',dataset:{}});await tick();assert.ok(denied.html().includes('No se ha permitido el micrófono'));assert.ok(denied.html().includes('Grabar mi tono'));denied.stop();
console.log('PASS: pending-permission cancellation, late stream cleanup, capture completion, local analysis, navigation cleanup and permission refusal.');
