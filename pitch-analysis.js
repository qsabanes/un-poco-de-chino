// Local YIN-style periodicity analysis. This is a contour aid, not an ASR model.
const quantile=(values,q)=>{const s=[...values].sort((a,b)=>a-b);return s.length?s[Math.min(s.length-1,Math.floor(q*(s.length-1)))]:0;};
const mean=a=>a.length?a.reduce((s,v)=>s+v,0)/a.length:0;
export function downsample(samples,rate,target=16000){
 if(rate===target)return samples;
 const output=new Float32Array(Math.floor(samples.length*target/rate)),ratio=rate/target;
 for(let i=0;i<output.length;i++){const from=Math.floor(i*ratio),to=Math.max(from+1,Math.floor((i+1)*ratio));let sum=0;for(let j=from;j<to&&j<samples.length;j++)sum+=samples[j];output[i]=sum/(to-from);}
 return output;
}
export function pitchFrame(x,rate=16000){
 const maxTau=Math.min(Math.floor(rate/60),Math.floor(x.length/2)),minTau=Math.floor(rate/600),window=x.length-maxTau;
 if(window<200)return null;
 const d=new Float32Array(maxTau+1),norm=new Float32Array(maxTau+1);let total=0;
 for(let lag=1;lag<=maxTau;lag++){let sum=0;for(let j=0;j<window;j++){const delta=x[j]-x[j+lag];sum+=delta*delta;}d[lag]=sum;total+=sum;norm[lag]=total?sum*lag/total:1;}
 let tau=-1;
 for(let lag=Math.max(2,minTau);lag<maxTau-1;lag++)if(norm[lag]<.16){while(lag+1<maxTau&&norm[lag+1]<norm[lag])lag++;tau=lag;break;}
 if(tau<0){tau=minTau;for(let lag=minTau+1;lag<maxTau;lag++)if(norm[lag]<norm[tau])tau=lag;if(norm[tau]>.26)return null;}
 const confidence=1-norm[tau],left=norm[tau-1],right=norm[tau+1],denom=left-2*norm[tau]+right;
 const refined=tau+(Number.isFinite(denom)&&Math.abs(denom)>1e-8?(left-right)/(2*denom):0),hz=rate/refined;
 return hz>=60&&hz<=600&&confidence>=.75?{hz,confidence}:null;
}
export function analyzePitch(input,sampleRate){
 if(!Number.isFinite(sampleRate)||sampleRate<8000||sampleRate>192000||!input?.length||input.length/sampleRate>8)return {ok:false,reason:'format',points:[]};
 const samples=downsample(input,sampleRate),rate=16000,size=512,hop=160,frames=[];
 let clipped=0;for(const x of samples)if(!Number.isFinite(x))return {ok:false,reason:'format',points:[]};else if(Math.abs(x)>.995)clipped++;
 // Keep the raw signal for level/clipping checks. For periodicity, suppress DC
 // and upper harmonics that obscure the rapidly changing fundamental of tone 4.
 const filtered=new Float32Array(samples.length),lp=1-Math.exp(-2*Math.PI*800/rate),hp=1-Math.exp(-2*Math.PI*50/rate);
 let dc=0,low=0,low2=0;
 for(let i=0;i<samples.length;i++){dc+=hp*(samples[i]-dc);low+=lp*(samples[i]-dc-low);low2+=lp*(low-low2);filtered[i]=low2;}
 for(let offset=0;offset+size<=samples.length;offset+=hop){const frame=samples.subarray(offset,offset+size);let power=0;for(const x of frame)power+=x*x;frames.push({t:(offset+size/2)/rate,rms:Math.sqrt(power/size),hz:null,confidence:0,offset});}
 // A short syllable may occupy less than 5% of the three-second recording.
 const peak=frames.reduce((max,f)=>Math.max(max,f.rms),0),threshold=Math.max(.004,peak*.10);
 for(const f of frames)if(f.rms>=threshold){const pitch=pitchFrame(filtered.subarray(f.offset,f.offset+size));if(pitch)Object.assign(f,pitch);}
 const voiced=frames.filter(f=>f.hz),groups=[];
 for(const f of voiced){let group=groups.at(-1);if(!group||f.t-group.at(-1).t>.16){group=[];groups.push(group);}group.push(f);}
 groups.sort((a,b)=>b.length-a.length);const main=groups[0]||[];
 if(main.length<10)return {ok:false,reason:peak<.006?'quiet':main.length?'brief':'unvoiced',points:[],voicedSeconds:main.length*.01};
 const first=main[0].t,last=main.at(-1).t,duration=last-first;
 const active=frames.filter(f=>f.rms>=threshold),coverage=main.length/Math.max(1,active.length);
 let jumps=0;
 for(let i=1;i<main.length;i++)if(main[i].t-main[i-1].t<.035&&Math.abs(12*Math.log2(main[i].hz/main[i-1].hz))>5)jumps++;
 const center=quantile(main.map(f=>12*Math.log2(f.hz)),.5);
 const points=main.map((f,i)=>{const nearby=main.slice(Math.max(0,i-1),i+2).map(x=>12*Math.log2(x.hz)-center);return {x:(f.t-first)/duration,y:quantile(nearby,.5),time:f.t,hz:f.hz};});
 const confidence=mean(main.map(f=>f.confidence)),span=quantile(points.map(p=>p.y),.95)-quantile(points.map(p=>p.y),.05);
 let reason=null;
 if(clipped/samples.length>.015)reason='clipping';
 else if(groups[1]?.length>16&&groups[1].length/main.length>.4)reason='multiple';
 else if(duration<.09||duration>2.2)reason='duration';
 else if(coverage<.55||confidence<.81||jumps/Math.max(1,main.length-1)>.09||span>16)reason='unstable';
 return {ok:!reason,reason,points,duration,voicedSeconds:main.length*.01,coverage,confidence,span};
}
export function contourShape(points){
 if(points.length<10)return {tone:null,kind:'unclear'};
 const bins=Array.from({length:20},(_,i)=>{const near=points.filter(p=>Math.abs(p.x-(i+.5)/20)<.065);return near.length?mean(near.map(p=>p.y)):null;});
 const available=bins.map((y,i)=>({x:(i+.5)/20,y})).filter(p=>p.y!==null);
 if(available.length<15)return {tone:null,kind:'unclear'};
 const start=mean(available.slice(0,4).map(p=>p.y)),end=mean(available.slice(-4).map(p=>p.y)),delta=end-start;
 const valley=available.reduce((a,b)=>b.y<a.y?b:a),drop=start-valley.y,rise=end-valley.y;
 const span=quantile(available.map(p=>p.y),.95)-quantile(available.map(p=>p.y),.05);
 if(valley.x>.17&&valley.x<.8&&drop>1.7&&rise>1.7&&span>3.6)return {tone:3,kind:'dip',delta,span};
 if(span<2.8&&Math.abs(delta)<1.9)return {tone:1,kind:'level',delta,span};
 const changes=available.slice(1).map((p,i)=>p.y-available[i].y),up=changes.filter(v=>v>-.2).length/changes.length,down=changes.filter(v=>v<.2).length/changes.length;
 if(delta>2.2&&up>.7)return {tone:2,kind:'rise',delta,span};
 if(delta< -2.2&&down>.7)return {tone:4,kind:'fall',delta,span};
 return {tone:null,kind:'unclear',delta,span};
}
export function assessTone(analysis,expected){
 if(!analysis.ok)return {status:'insufficient',detected:null,title:'Necesitamos otra grabación',reason:analysis.reason};
 const shape=contourShape(analysis.points);
 if(analysis.duration<.25&&shape.kind==='level')return {status:'uncertain',detected:null,title:'El fragmento con altura detectable es muy breve',shape:shape.kind};
 if(shape.tone===expected)return {status:'compatible',detected:shape.tone,title:`Movimiento compatible con el tono ${expected}`,shape:shape.kind};
 if(expected===3)return {status:'uncertain',detected:shape.tone,title:'El tercer tono no es concluyente',shape:shape.kind};
 if(!shape.tone)return {status:'uncertain',detected:null,title:'La curva no es concluyente',shape:shape.kind};
 return {status:'different',detected:shape.tone,title:`Se aprecia un movimiento ${shape.kind==='rise'?'ascendente':shape.kind==='fall'?'descendente':shape.kind==='level'?'sostenido':'de bajada y subida'}`,shape:shape.kind};
}
