import {analyzePitch} from './pitch-analysis.js';
self.onmessage=({data})=>{try{const result=analyzePitch(data.samples,data.sampleRate);self.postMessage({id:data.id,result});}catch{self.postMessage({id:data.id,error:'No se ha podido analizar la señal.'});}};
