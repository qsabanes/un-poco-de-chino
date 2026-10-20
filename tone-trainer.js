import {syllables} from './pronunciation-data.js';
import {analyzePitch,assessTone} from './pitch-analysis.js';
const choices=['ni','ma','la','wo','lv'].map(id=>syllables.find(s=>s.id===id)).filter(Boolean);
const names={1:'alto y sostenido',2:'ascendente',3:'bajo; puede bajar y subir',4:'descendente'};
const reasons={quiet:'La voz llega demasiado baja. Acerca un poco el micrófono y repite con voz cómoda.',brief:'Se ha detectado voz, pero el fragmento medible es demasiado corto para trazar una curva. Repite una sola sílaba con voz cómoda.',unvoiced:'Hay sonido, pero no se distingue una altura de voz estable. Busca un lugar silencioso y repite con voz cómoda.',clipping:'El sonido está saturado. Separa un poco el micrófono y habla sin gritar.',multiple:'Se detectan varios fragmentos de voz. Graba una sola sílaba, una vez.',duration:'Se necesita una sola sílaba, con un fragmento de voz medible y sin mantenerla varios segundos.',unstable:'La altura de voz no se ha podido seguir con suficiente estabilidad. Repite sin forzar la voz.',format:'No se puede analizar este audio. Prueba una grabación breve en WAV, MP3, M4A o WebM.'};
export function toneFeedback(result,expected){
 if(result.status==='insufficient')return reasons[result.reason]||reasons.unvoiced;
 if(result.status==='compatible')return expected===1?'Se aprecia una curva sostenida. Un tercer tono bajo también puede verse plano: escucha y compara.':expected===2?'Se aprecia una subida mantenida. Escucha ambas voces y compara el recorrido.':expected===3?'Se aprecia una bajada seguida de subida en esta sílaba aislada. No fuerces una «V» al hablar en frases.':'Se aprecia una bajada mantenida. Escucha ambas voces y compara el recorrido.';
 if(expected===3)return 'El tercer tono también puede realizarse bajo, sin una subida final clara. Esta herramienta no siempre lo distingue de una curva plana o de una subida. Compara y repite sin forzar la voz.';
 if(result.status==='uncertain')return expected===4?'No se distingue toda la bajada. Repite con una caída clara y natural, sin forzar la voz ni alargarla para imitar otro tono.':'No hay un movimiento suficientemente claro para orientarte. Prueba a sostener un poco más la vocal y compara con el modelo.';
 return `El objetivo es un tono ${names[expected]}. Escucha el modelo y repite fijándote en cómo cambia la altura de tu voz. No es una corrección definitiva.`;
}
export function contourChart(model,learner){
 const all=[...(model?.points||[]),...(learner?.points||[])],limit=Math.max(5,Math.min(14,Math.ceil(Math.max(0,...all.map(p=>Math.abs(p.y)))+1)));
 const x=p=>48+p.x*520,y=p=>145-p.y/limit*110;
 const path=points=>points.map((p,i)=>`${!i||p.time-points[i-1].time>.12?'M':'L'}${x(p).toFixed(1)},${y(p).toFixed(1)}`).join(' ');
 return `<figure class="tone-chart"><svg viewBox="0 0 610 300" role="img" aria-label="Comparación de la altura relativa de voz: modelo y tu grabación. Eje horizontal: principio a final de la sílaba."><path class="tone-chart-grid" d="M48 35V255H570 M48 145H570 M48 90H570 M48 200H570"/><text x="8" y="30">Agudo</text><text x="8" y="272">Grave</text><text x="48" y="291">Inicio</text><text x="550" y="291">Final</text>${model?.points?.length?`<path class="tone-chart-model" d="${path(model.points)}"/>`:''}${learner?.points?.length?`<path class="tone-chart-learner" d="${path(learner.points)}"/>`:''}${!all.length?'<text x="150" y="145">Escucha el modelo y graba tu sílaba</text>':''}</svg><figcaption><span class="model-key">— Modelo</span><span class="learner-key">— Tu voz</span><p>Se centra la altura y se ajusta la duración para comparar voces graves y agudas. No necesitas imitar la altura exacta del modelo. Los huecos indican partes sin altura detectable.</p></figcaption></figure>`;
}
export function createToneTrainer({render,toast,pauseAudio,play}){
 let word=choices[0],tone=1,active=false,phase='idle',notice='',reference=null,referenceBusy=false,learner=null,result=null,voiceURL=null,voiceName='',op=0,recording=null,stream=null,context=null,source=null,analyser=null,raf=null,timer=null,started=0,worker=null,job=0,refAbort=null;
 const jobs=new Map(),referenceCache=new Map(),$=s=>document.querySelector(s);
 const busy=()=>['requesting','recording','analysing'].includes(phase);
 const releaseURL=()=>{if(voiceURL)URL.revokeObjectURL(voiceURL);voiceURL=null;};
 function closeInput(){clearTimeout(timer);timer=null;cancelAnimationFrame(raf);raf=null;stream?.getTracks().forEach(t=>t.stop());stream=null;source?.disconnect();source=null;analyser?.disconnect();analyser=null;if(context){context.close().catch(()=>{});context=null;}}
 function stop(){op++;active=false;refAbort?.abort();refAbort=null;closeInput();if(recording?.state==='recording')recording.stop();recording=null;worker?.terminate();worker=null;for(const item of jobs.values()){clearTimeout(item.timeout);item.reject(Error('cancelled'));}jobs.clear();releaseURL();learner=null;result=null;phase='idle';notice='';referenceBusy=false;}
 function analyze(samples,sampleRate){
  if(!window.Worker)return Promise.resolve(analyzePitch(samples,sampleRate));
  if(!worker){
   try{worker=new Worker(new URL('./pitch-worker.js',import.meta.url),{type:'module'});}catch{return Promise.resolve(analyzePitch(samples,sampleRate));}
   worker.onmessage=({data})=>{const item=jobs.get(data.id);if(!item)return;jobs.delete(data.id);clearTimeout(item.timeout);data.error?item.reject(Error(data.error)):item.resolve(data.result);};
   worker.onerror=()=>{worker?.terminate();worker=null;for(const item of jobs.values()){clearTimeout(item.timeout);item.reject(Error('No se ha podido iniciar el análisis local. Recarga la página y prueba de nuevo.'));}jobs.clear();};
  }
  return new Promise((resolve,reject)=>{const id=++job,timeout=setTimeout(()=>{jobs.delete(id);reject(Error('El análisis ha tardado demasiado. Prueba una grabación más breve.'));},12000);jobs.set(id,{resolve,reject,timeout});worker.postMessage({id,samples,sampleRate},[samples.buffer]);});
 }
 async function decode(buffer){
  const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('Este navegador no permite analizar audio. Prueba una versión reciente de Chrome, Edge, Firefox o Safari.');
  const decoder=new Audio();try{let decoded;try{decoded=await decoder.decodeAudioData(buffer);}catch{throw Error('El navegador no ha podido leer este audio. Prueba una grabación WAV, MP3, M4A o WebM.');}if(decoded.duration>6)throw Error('El audio debe durar como máximo 6 segundos y contener una sola sílaba.');const samples=new Float32Array(decoded.length);for(let c=0;c<decoded.numberOfChannels;c++){const data=decoded.getChannelData(c);for(let i=0;i<data.length;i++)samples[i]+=data[i]/decoded.numberOfChannels;}return {samples,sampleRate:decoded.sampleRate};}finally{await decoder.close().catch(()=>{});}
 }
 async function loadReference(){
  const key=word.id+':'+tone;reference=referenceCache.get(key)||null;if(reference){referenceBusy=false;return;}
  refAbort?.abort();const controller=new AbortController();refAbort=controller;referenceBusy=true;
  try{const response=await fetch(word.audio[tone],{signal:controller.signal});if(!response.ok)throw Error('Modelo no disponible');const pcm=await decode(await response.arrayBuffer());if(!active||controller.signal.aborted)return;const data=await analyze(pcm.samples,pcm.sampleRate);referenceCache.set(key,data);if(active&&key===word.id+':'+tone){reference=data;referenceBusy=false;render();}}
  catch{if(active&&!controller.signal.aborted&&key===word.id+':'+tone){referenceBusy=false;reference=null;render();}}
 }
 function activate(){active=true;loadReference();}
 function setTarget(nextWord,nextTone){pauseAudio();stop();word=nextWord;tone=nextTone;active=true;loadReference();render();}
 async function processBlob(blob,label,operation){
  try{if(blob.size>5*1024*1024)throw Error('El archivo supera 5 MB. Usa una grabación breve de una sola sílaba.');const pcm=await decode(await blob.arrayBuffer());if(!active||operation!==op)return;const data=await analyze(pcm.samples,pcm.sampleRate);if(!active||operation!==op)return;learner=data;result=assessTone(data,tone);voiceURL=URL.createObjectURL(blob);voiceName=label;phase='ready';notice='';render();}
  catch(e){if(active&&operation===op){phase='idle';notice=e.message||'No se ha podido analizar la grabación. Prueba de nuevo.';render();}}
 }
 function meter(){
  if(phase!=='recording'||!analyser)return;const data=new Float32Array(analyser.fftSize);analyser.getFloatTimeDomainData(data);let power=0;for(const v of data)power+=v*v;const rms=Math.sqrt(power/data.length),bar=$('#tone-level');if(bar){bar.value=Math.min(1,rms*6);bar.setAttribute('aria-valuetext',rms<.005?'Voz muy baja':'Recibiendo sonido');}const remaining=$('#tone-countdown');if(remaining)remaining.textContent=Math.max(0,3-(performance.now()-started)/1000).toFixed(1)+' s';raf=requestAnimationFrame(meter);
 }
 async function startRecording(){
  if(busy())return;
  pauseAudio();releaseURL();learner=null;result=null;notice='';phase='requesting';const operation=++op;render();
  try{
   if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw Error('La grabación necesita HTTPS y un navegador compatible. Puedes cargar un audio desde tu dispositivo.');
   const input=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:true,noiseSuppression:false,autoGainControl:false}});
   if(!active||operation!==op){input.getTracks().forEach(t=>t.stop());return;}
   stream=input;const preferred=['audio/webm;codecs=opus','audio/mp4','audio/webm','audio/ogg;codecs=opus'].find(t=>MediaRecorder.isTypeSupported(t));
   const recorder=new MediaRecorder(stream,preferred?{mimeType:preferred}:undefined),chunks=[];recording=recorder;
   recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
   recorder.onerror=()=>{if(operation!==op)return;op++;closeInput();recording=null;phase='idle';notice='Se ha interrumpido la grabación. Comprueba el micrófono y vuelve a intentarlo.';render();};
   recorder.onstop=()=>{if(recording===recorder){closeInput();recording=null;}if(!active||operation!==op)return;phase='analysing';render();const blob=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});processBlob(blob,'Tu grabación',operation);};
   try{const Audio=window.AudioContext||window.webkitAudioContext;context=new Audio();context.resume().catch(()=>{});source=context.createMediaStreamSource(stream);analyser=context.createAnalyser();analyser.fftSize=1024;source.connect(analyser);}catch{/* The optional meter must not prevent recording. */}
   recorder.start();phase='recording';started=performance.now();render();meter();timer=setTimeout(()=>{if(recording===recorder&&recorder.state==='recording')recorder.stop();},3000);
  }catch(e){if(operation!==op)return;closeInput();phase='idle';notice=e.name==='NotAllowedError'?'No se ha permitido el micrófono. Puedes habilitarlo en los permisos del navegador o cargar una grabación.':e.name==='NotFoundError'?'No se encuentra un micrófono. Puedes conectar uno o cargar una grabación.':e.message||'No se ha podido iniciar el micrófono.';render();}
 }
 function html(){
  return `<section class="card tone-trainer"><span class="eyebrow">EXPERIMENTAL · SÍLABAS AISLADAS</span><h2>Escucha. Grábate. Compara.</h2><div class="note-box"><strong>Práctica de tonos: no evalúa consonantes ni vocales.</strong><br>Orientación experimental a partir de la curva de tu voz, sin nota automática.</div><div class="tone-target-controls"><label for="tone-word">Sílaba</label><select id="tone-word" class="filter-select" ${busy()?'disabled':''}>${choices.map(s=>`<option value="${s.id}" ${word.id===s.id?'selected':''}>${s.base}</option>`).join('')}</select><span>Elige el tono</span><div class="tone-targets">${[1,2,3,4].map(t=>`<button data-tone-target="${t}" class="${t===tone?'selected':''}" aria-pressed="${t===tone}" ${busy()?'disabled':''}>${word.labels[t]}<small>${t}</small></button>`).join('')}</div></div><div class="tone-practice-target"><strong lang="zh-Latn-pinyin">${word.labels[tone]}</strong><span>Tono ${tone} · ${names[tone]}</span></div><div class="tone-reference"><button class="button secondary" id="tone-model-play" ${busy()?'disabled':''}>${'▶'} Escuchar modelo</button><audio id="tone-model-audio" class="pronunciation-audio" ${busy()?'hidden':'controls'} preload="metadata" src="${word.audio[tone]}" aria-label="Modelo de ${word.labels[tone]}"></audio></div>${referenceBusy?'<p class="audio-status" role="status">Preparando la curva del modelo…</p>':!reference?'<p class="audio-status">No se ha podido preparar la curva del modelo. Puedes escuchar el audio y volver a cargar esta práctica.</p>':(!reference.ok)?'<p class="source-note">La parte medible del modelo es breve o irregular. Esta curva puede ser poco representativa; escucha el audio y compárala con cautela.</p>':''}${contourChart(reference,learner)}<div class="tone-record-controls">${phase==='requesting'?'<p role="status">Esperando permiso del micrófono…</p><button class="button secondary" id="tone-cancel">Cancelar</button>':phase==='recording'?'<p role="status"><span class="recording-dot"></span> Grabando una sílaba · <span id="tone-countdown">3,0 s</span></p><meter id="tone-level" min="0" max="1" value="0" aria-label="Nivel del micrófono"></meter><button class="button primary" id="tone-finish">Terminar y comparar</button><button class="button ghost" id="tone-cancel">Cancelar</button>':phase==='analysing'?'<p role="status">Analizando la curva en tu dispositivo…</p><button class="button secondary" id="tone-cancel">Cancelar</button>':`<button class="button primary" id="tone-record">${result?'Grabar de nuevo':'Grabar mi tono · 3 segundos'}</button><p class="source-note">Pulsa, pronuncia una vez ${word.labels[tone]} y espera. Habla con voz cómoda; no fuerces el tono ni acerques demasiado el micrófono.</p>`}</div>${notice?`<div class="inline-notice" role="status">${escapeText(notice)}</div>`:''}${result?`<section class="tone-verdict ${result.status}" role="status"><span class="tag">ORIENTACIÓN EXPERIMENTAL</span><h3>${result.title}</h3><p>${toneFeedback(result,tone)}</p><p class="source-note">${learner.ok?'La curva se distingue, pero esta orientación puede fallar.':'No se asigna un tono a esta grabación.'}</p></section>`:''}${voiceURL?`<div class="tone-replay"><label for="tone-own-audio">${voiceName}</label><audio id="tone-own-audio" class="pronunciation-audio" controls src="${voiceURL}" aria-label="Escuchar tu grabación"></audio></div>`:''}<details class="tone-file"><summary>¿Ya tienes una grabación?</summary><p>Elige un audio breve, de una sola sílaba (máximo 6 segundos y 5 MB). Se analiza en este dispositivo.</p><label for="tone-file-input">Cargar grabación</label><input id="tone-file-input" type="file" accept="audio/*,.wav,.mp3,.m4a,.webm,.ogg" ${busy()?'disabled':''}></details><p class="source-note spaced">Audio local: no se envía tu voz a un servidor. La grabación es temporal y se borra al salir de esta práctica. No se evalúan frases, trabalenguas ni tono neutro. Un tercer tono bajo puede parecer plano o descendente; si hay duda, repetimos sin puntuar.</p></section>`;
 }
 function onClick(t){
  if(t.dataset.toneTarget){if(!busy())setTarget(word,Number(t.dataset.toneTarget));return true;}
  if(t.id==='tone-model-play'){play(word.audio[tone],`Modelo: ${word.labels[tone]}`,'tone-model-audio');return true;}
  if(t.id==='tone-record'){startRecording();return true;}
  if(t.id==='tone-finish'){if(recording?.state==='recording')recording.stop();return true;}
  if(t.id==='tone-cancel'){stop();activate();render();return true;}
  return false;
 }
 function onChange(t){
  if(t.id==='tone-word'){if(!busy())setTarget(choices.find(s=>s.id===t.value)||choices[0],tone);return true;}
  if(t.id==='tone-file-input'){const file=t.files?.[0];if(file&&!busy()){pauseAudio();releaseURL();learner=null;result=null;phase='analysing';notice='';const operation=++op;render();processBlob(file,'Tu audio cargado',operation);}return true;}
  return false;
 }
 function escapeText(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 return {html,onClick,onChange,activate,stop};
}
