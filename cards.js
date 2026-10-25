import {vocabulary,grammar,sessionsForSource} from './data.js';
import {dialogues,s1Examples} from './classes.js';
import {hskVocabulary} from './hsk-data.js';
import {bookVocabulary} from './book-support.js';

export const plainPinyin=value=>String(value).toLowerCase().replace(/u:|ü|ǖ|ǘ|ǚ|ǜ/g,'v').normalize('NFD').replace(/\p{M}/gu,'').replace(/[^a-zv]/g,'');
const wordKey=(h,p)=>h+'|'+plainPinyin(p);
export const cardLibrary=hskVocabulary.map(v=>({...v,decks:['hsk'+v.level],source:'HSK 2026 · nivel '+v.level}));
const byWord=new Map();
for(const c of cardLibrary)if(!byWord.has(wordKey(c.hanzi,c.pinyin)))byWord.set(wordKey(c.hanzi,c.pinyin),c);
const classWords=vocabulary.filter(v=>!v.extra);
classWords.forEach((v,index)=>{
 let c=byWord.get(wordKey(v.hanzi,v.pinyin));
 if(!c){c={id:'class-'+v.id,hanzi:v.hanzi,pinyin:v.pinyin,meaning:v.meaning,decks:[],source:v.source};cardLibrary.push(c);byWord.set(wordKey(v.hanzi,v.pinyin),c);}
 c.meaning=v.meaning;c.classOrder=index;c.classSource=v.source;c.classCategory=v.category;c.decks.push('class',...sessionsForSource(v.source).map(n=>'s'+n));c.decks=[...new Set(c.decks)];
});
for(const example of s1Examples){
 let c=byWord.get(wordKey(example.hanzi,example.pinyin));
 if(!c){c={...example,id:'class-'+example.id,decks:[]};cardLibrary.push(c);byWord.set(wordKey(c.hanzi,c.pinyin),c);}
 c.exampleSource=example.source;c.decks.push('s1-examples');
}
for(const word of bookVocabulary){
 let c=byWord.get(wordKey(word.hanzi,word.pinyin));
 if(!c){c={...word,id:'book-'+word.id,decks:[]};cardLibrary.push(c);byWord.set(wordKey(c.hanzi,c.pinyin),c);}
 const scope='book-s'+word.session;c.decks.push(scope);c.bookEntries={...c.bookEntries,[scope]:word};
}
export const cardIds=new Set(cardLibrary.map(c=>c.id));
export const flashDefaults=()=>({records:{},enabledHSK:[],direction:'hanzi',directionVersion:2,newLimit:10});
export function validateFlashState(raw){
 const out=flashDefaults();if(!raw)return out;
 if(typeof raw!=='object'||Array.isArray(raw))throw Error('Progreso de tarjetas no válido.');
 out.enabledHSK=[1,2,3].filter(n=>raw.enabledHSK?.includes(n));
 out.direction=raw.directionVersion===2&&raw.direction==='pinyin'?'pinyin':'hanzi';out.newLimit=[5,10,20].includes(raw.newLimit)?raw.newLimit:10;
 if(raw.records&&typeof raw.records==='object'&&!Array.isArray(raw.records))for(const [key,r] of Object.entries(raw.records)){
  const [id,direction]=key.split('::');if(!cardIds.has(id)||!['hanzi','pinyin'].includes(direction))continue;
  if(!r||!['reviews','lapses','interval','ease','due','last','introduced'].every(k=>Number.isFinite(r[k])&&r[k]>=0)||r.ease<1.3||r.ease>4||!['again','hard','good','easy'].includes(r.rating))throw Error('Hay datos de tarjetas no válidos.');
  out.records[key]={reviews:r.reviews,lapses:r.lapses,interval:r.interval,ease:r.ease,due:r.due,last:r.last,introduced:r.introduced,rating:r.rating};
 }
 return out;
}
const DAY=86400000;
export function rateCard(previous,rating,now=Date.now()){
 if(!['again','hard','good','easy'].includes(rating))throw Error('Valoración no válida');
 const old=previous||{reviews:0,lapses:0,interval:0,ease:2.5,introduced:now};let interval,ease=old.ease,delay;
 if(rating==='again'){interval=0;delay=60000;ease=Math.max(1.3,ease-.2);}
 if(rating==='hard'){interval=old.interval>=1?Math.max(1,Math.round(old.interval*1.2)):0;delay=interval?interval*DAY:600000;ease=Math.max(1.3,ease-.15);}
 if(rating==='good'){interval=old.interval<1?1:Math.min(365,Math.max(old.interval+1,Math.round(old.interval*ease)));delay=interval*DAY;}
 if(rating==='easy'){interval=old.interval<1?4:Math.min(365,Math.max(old.interval+1,Math.round(old.interval*ease*1.3)));delay=interval*DAY;ease=Math.min(4,ease+.15);}
 return {reviews:old.reviews+1,lapses:old.lapses+(rating==='again'?1:0),interval,ease,due:now+delay,last:now,introduced:old.introduced,rating};
}
export function delayLabel(record,now=Date.now()){const delay=record.due-now;return delay<120000?'1 min':delay<DAY?'10 min':Math.round(delay/DAY)+' d';}
function sessionPage(card,scope){
 const label=/^s[123]$/.test(scope)?scope.toUpperCase():null;
 if(!label)return 10000;
 const source=card.classSource||card.source;
 const part=source.split(';').find(s=>s.includes(label)||(scope==='s1'&&s.includes('U1')));
 return Number(part?.match(/pp?\.\s*(\d+)/)?.[1]||10000);
}
function sessionTopic(card,scope){
 if(scope!=='s3')return 0;
 if(card.classCategory!=='países')return 3;
 return card.hanzi.length===1?2:card.hanzi.endsWith('人')?1:0;
}
export function cardsForScope(scope,enabledHSK=[]){return cardLibrary.filter(c=>scope==='active'?c.decks.includes('class')||enabledHSK.some(n=>c.decks.includes('hsk'+n)):c.decks.includes(scope)).sort((a,b)=>sessionTopic(a,scope)-sessionTopic(b,scope)||sessionPage(a,scope)-sessionPage(b,scope)||(a.classOrder??10000)-(b.classOrder??10000));}
export function reviewQueue(cards,records,direction,newLimit=10,now=Date.now()){
 const key=c=>c.id+'::'+direction;
 const due=cards.filter(c=>records[key(c)]&&records[key(c)].due<=now).sort((a,b)=>records[key(a)].due-records[key(b)].due).slice(0,30);
 const unseen=cards.filter(c=>!records[key(c)]).slice(0,newLimit);
 return [...due,...unseen];
}

const dictionary=[];const candidateKeys=new Set();
function addCandidate(hanzi,pinyin,meaning=''){const key=plainPinyin(pinyin);const unique=hanzi+'|'+key;if(!key||candidateKeys.has(unique))return;candidateKeys.add(unique);dictionary.push({hanzi,pinyin,meaning,key});}
for(const c of [...cardLibrary].sort((a,b)=>(a.classOrder??10000)-(b.classOrder??10000)))addCandidate(c.hanzi,c.pinyin,c.meaning);
for(const g of grammar)for(const [h,p,m] of g.examples)addCandidate(h.replace(/[。！？？，、]/g,''),p,m);
for(const dialogue of Object.values(dialogues))for(const [,h,p,m] of dialogue)addCandidate(h.replace(/[。！？？，、]/g,''),p,m);
for(const [h,p,m] of [['你好','nǐ hǎo','hola'],['你好吗','nǐ hǎo ma','¿Estás bien?'],['认识你很高兴','rènshi nǐ hěn gāoxìng','Encantado/a de conocerte'],['你怎么样','nǐ zěnmeyàng','¿Qué tal estás?']])addCandidate(h,p,m);
export function imeCandidates(value){
 const query=plainPinyin(value);if(!query)return [];
 return dictionary.map((c,index)=>({c,index,rank:c.key===query?0:query.startsWith(c.key)?1:c.key.startsWith(query)?2:9})).filter(x=>x.rank<9).sort((a,b)=>a.rank-b.rank||(a.rank===1?b.c.key.length-a.c.key.length:0)||a.index-b.index).slice(0,24).map(x=>x.c);
}
export function consumePinyin(raw,candidate){
 if(!plainPinyin(raw).startsWith(candidate.key))return '';
 let count=0;for(let i=0;i<raw.length;i++){count+=plainPinyin(raw[i]).length;if(count>=candidate.key.length)return raw.slice(i+1).replace(/^[\d\s'’]+/,'');}return '';
}

export function createStudyTools({getState,save,render,toast,icon,escape}){
 const tag=text=>`<span class="tag">${escape(text)}</span>`;
 let study=null,scope='active',browse='',imeText='',candidates=[],highlight=0;
 const fs=()=>getState().flashcards;
 const decks=[['class','Mi clase','Todo el vocabulario de las sesiones. Se amplía al añadir nuevas palabras.'],['s1','Sesión 1','Primeras palabras, términos de introducción y saludos del complemento U1.'],['s1-examples','S1 · Ejemplos de caracteres','Opcional: caracteres utilizados para explicar la escritura y los tonos. No se añaden al repaso diario.'],['s2','Sesión 2','Presentaciones y qué tal estás.'],['s3','Sesión 3','Países, preguntas y negación.'],...[1,2,3].map(n=>['book-s'+n,'Libro · apoyo de S'+n,'Opcional: palabras para ampliar esta sesión. Se practica por separado.']),['hsk1','HSK 1 · 2026','300 entradas nuevas.'],['hsk2','HSK 2 · 2026','200 entradas nuevas; 500 acumuladas con HSK 1.'],['hsk3','HSK 3 · 2026','500 entradas nuevas; 1.000 acumuladas con HSK 1 y 2.']];
 function counts(cards){const records=fs().records,dir=fs().direction;return {due:cards.filter(c=>records[c.id+'::'+dir]?.due<=Date.now()).length,new:cards.filter(c=>!records[c.id+'::'+dir]).length,seen:cards.filter(c=>records[c.id+'::'+dir]).length};}
 function start(chosenScope=scope,free=false){scope=chosenScope;const cards=cardsForScope(scope,fs().enabledHSK);const queue=free?[...cards].sort(()=>Math.random()-.5).slice(0,10):reviewQueue(cards,fs().records,fs().direction,fs().newLimit);study={queue,index:0,flipped:false,reviewed:0,direction:fs().direction,free};render();}
 function viewCard(c){const entry=c.bookEntries?.[scope];return entry?{...c,meaning:entry.meaning,source:entry.source}:c;}
 function browseHTML(){const query=browse.trim().toLowerCase(),roman=plainPinyin(query);const list=cardsForScope(scope,fs().enabledHSK).map(viewCard).filter(c=>!query||c.hanzi.includes(query)||c.meaning.toLowerCase().includes(query)||(roman&&plainPinyin(c.pinyin).includes(roman)));return `<p class="count-label">${list.length} tarjetas · se muestran hasta 30</p><div class="card-browser">${list.slice(0,30).map(c=>`<div><span class="hanzi" lang="zh-Hans">${c.hanzi}</span><span>${c.pinyin}</span><small>${escape(c.meaning)}</small></div>`).join('')}</div>`;}
 function html(){
  if(study)return studyHTML();const active=cardsForScope('active',fs().enabledHSK),n=counts(active);
  return `<span class="eyebrow">UN POCO HOY. MÁS FÁCIL MAÑANA.</span><h1>Mis tarjetas.</h1><p class="page-description">Recuerda, revela y valora. Tu vocabulario de clase crece con cada sesión; los mazos HSK son opcionales.</p><div class="stats"><div class="stat"><div><strong>${n.due}</strong><small>para repasar ahora</small></div></div><div class="stat"><div><strong>${n.new}</strong><small>nuevas disponibles</small></div></div><div class="stat"><div><strong>${n.seen}</strong><small>tarjetas practicadas en este sentido</small></div></div></div><section class="card flash-settings"><div><label for="card-direction">Qué quiero recordar</label><select class="filter-select" id="card-direction"><option value="hanzi" ${fs().direction==='hanzi'?'selected':''}>Caracteres → pinyin y significado</option><option value="pinyin" ${fs().direction==='pinyin'?'selected':''}>Pinyin → caracteres</option></select></div><div><label for="new-limit">Nuevas por tanda</label><select class="filter-select" id="new-limit">${[5,10,20].map(n=>`<option value="${n}" ${fs().newLimit===n?'selected':''}>${n}</option>`).join('')}</select></div><button class="button primary" data-card-start="active">Repasar mis tarjetas ${icon('arrow')}</button></section><div class="note-box">Mira los caracteres e intenta pronunciarlos y recordar su significado antes de revelar el pinyin. También puedes elegir «Pinyin → caracteres» para practicar el otro sentido. Los dos sentidos guardan progresos independientes. HSK 2026 sigue el programa de noviembre de 2025.</div><div class="deck-grid">${decks.map(([id,title,description])=>{const cards=cardsForScope(id),c=counts(cards);return `<section class="card deck-card"><span class="tag">${id.startsWith('book-s')?'APOYO OPCIONAL DEL LIBRO':id==='s1-examples'?'EJEMPLOS OPCIONALES':id.startsWith('hsk')?'AMPLIACIÓN OPCIONAL':'MI CLASE'}</span><h2>${title}</h2><p>${description}</p><div class="deck-counts"><strong>${cards.length}</strong> tarjetas <span>${c.due} pendientes · ${c.new} nuevas</span></div>${id.startsWith('hsk')?`<label class="switch-label"><input type="checkbox" data-hsk="${id.slice(-1)}" ${fs().enabledHSK.includes(+id.slice(-1))?'checked':''}>Incluir en mi repaso</label>`:(id==='s1-examples'||id.startsWith('book-s'))?'<span class="source-note">Se practica por separado, cuando tú quieras.</span>':'<span class="source-note">El vocabulario se incorpora automáticamente.</span>'}<button class="button ${id.startsWith('hsk')?'ghost':'secondary'}" data-card-start="${id}">Estudiar este mazo ${icon('arrow')}</button></section>`;}).join('')}</div><section class="card spaced"><h2>Explorar vocabulario</h2><div class="controls"><select id="card-scope" class="filter-select" aria-label="Mazo para explorar"><option value="active">Mis mazos activos</option>${decks.map(([id,title])=>`<option value="${id}" ${scope===id?'selected':''}>${title}</option>`).join('')}</select><input id="card-search" class="search" type="search" value="${escape(browse)}" placeholder="Caracteres, pinyin o significado" aria-label="Buscar tarjetas"></div><div id="card-browse">${browseHTML()}</div></section><p class="source-note spaced">Repetición espaciada sencilla inspirada en tarjetas de estudio: «Otra vez» vuelve pronto; «Bien» y «Fácil» espacian el repaso. No requiere cuenta de Anki. Las glosas son ayudas de estudio en español. <a href="./hsk-sources.txt" target="_blank" rel="noopener">Fuentes, edición y licencias HSK</a>.</p>`;
 }
 function studyHTML(){
  if(study.index>=study.queue.length)return `<section class="card flash-finished"><span class="result-mark hanzi">好</span><h1>${study.reviewed?'Un poco más afianzado.':'Tu repaso está al día.'}</h1><p>${study.reviewed?study.reviewed+' valoraciones guardadas.':'No quedan tarjetas pendientes ni nuevas para esta tanda.'}</p><p class="muted">Puedes volver más tarde, ampliar tus mazos o revisar tarjetas antes de que venzan.</p><div class="button-row"><button class="button primary" id="card-decks">Volver a mis mazos</button><button class="button ghost" id="card-free">Revisar anticipadamente</button></div></section>`;
  const c=viewCard(study.queue[study.index]),record=fs().records[c.id+'::'+study.direction],total=cardsForScope(scope,fs().enabledHSK).length;
  return `<div class="session-shell"><div class="session-header"><span>TARJETAS · ${decks.find(([id])=>id===scope)?.[1]||'Mis mazos'} · ${study.direction==='pinyin'?'Pinyin → caracteres':'Caracteres → pinyin'}</span><button class="text-link" id="card-decks">Mis mazos ${icon('close')}</button></div><p class="source-note">Esta tanda: ${study.queue.length} tarjetas · ${total} en el mazo. Hasta ${fs().newLimit} nuevas por tanda; las demás quedan para las siguientes.</p><div class="progress-bar"><span style="width:${study.index/study.queue.length*100}%"></span></div><section class="card flash-card"><div class="question-meta">${tag(scope.startsWith('book-s')?'COMPLEMENTO DEL LIBRO':scope==='s1-examples'?'EJEMPLO ILUSTRATIVO DE S1':c.decks.includes('class')?'DE TU CLASE':'HSK '+c.level+' · 2026')}<small>${record?'Repaso':'Nueva'} · ${study.index+1} de ${study.queue.length}</small></div><span class="eyebrow">${study.flipped?'COMPRUEBA LO QUE RECORDABAS':'INTENTA RECORDAR ANTES DE REVELAR'}</span><div class="flash-front ${study.direction==='hanzi'?'hanzi':''}">${study.direction==='pinyin'?c.pinyin:c.hanzi}</div>${study.direction==='pinyin'?`<p class="flash-meaning">${escape(c.meaning)}</p>`:''}${study.flipped?`<div class="flash-answer"><div class="hanzi" lang="zh-Hans">${c.hanzi}</div><div class="pinyin">${c.pinyin}</div><p>${escape(c.meaning)}</p></div><p class="source-note">${scope.startsWith('book-s')?c.source:scope==='s1-examples'?c.exampleSource:c.classSource||c.source}</p><h3>¿Cuánto te ha costado?</h3><div class="rating-grid">${[['again','Otra vez'],['hard','Difícil'],['good','Bien'],['easy','Fácil']].map(([rating,label])=>`<button data-card-rating="${rating}" class="rating ${rating}"><strong>${label}</strong><small>${delayLabel(rateCard(record,rating))}</small></button>`).join('')}</div><p class="input-help">Tu valoración decide cuándo vuelve. «Otra vez» también la repite en esta tanda.</p>`:`<p class="muted">${study.direction==='pinyin'?'¿Cómo se escribe? Intenta visualizar sus caracteres.':'¿Cómo se pronuncia? ¿Qué significa?'}</p><button class="button primary" id="card-reveal">Mostrar respuesta ${icon('arrow')}</button><p class="source-note spaced">Sin teclado chino. Puedes decirlo en voz alta o intentarlo en papel.</p>`}</section></div>`;
 }
 function imeHTML(){candidates=imeCandidates(imeText);return candidates.length?candidates.map((c,i)=>`<button class="ime-candidate ${i===highlight?'chosen':''}" data-ime-index="${i}"><span class="hanzi" lang="zh-Hans">${c.hanzi}</span><small>${c.pinyin}</small></button>`).join(''):'<p class="input-help">'+(imeText?'No hay sugerencias para ese pinyin en este vocabulario. Prueba por palabras o sílabas.':'Escribe ni, shi, renshi o una frase conocida como nihaoma.')+'</p>';}
 function refreshIME(){$('#ime-candidates').innerHTML=imeHTML();}
 function chooseIME(index){const c=candidates[index];if(!c)return;const output=$('#ime-output');output.value+=c.hanzi;imeText=consumePinyin(imeText,c);$('#ime-input').value=imeText;highlight=0;refreshIME();$('#ime-input').focus();}
 function onClick(t){
  if(t.dataset.cardStart!==undefined){start(t.dataset.cardStart);return true;}
  if(t.dataset.cardRating){if(!study?.flipped)return true;const c=study.queue[study.index],key=c.id+'::'+study.direction;fs().records[key]=rateCard(fs().records[key],t.dataset.cardRating);save();if(t.dataset.cardRating==='again')study.queue.splice(Math.min(study.index+3,study.queue.length),0,c);study.reviewed++;study.index++;study.flipped=false;render();return true;}
  if(t.dataset.imeIndex!==undefined){chooseIME(+t.dataset.imeIndex);return true;}
  switch(t.id){
   case 'card-reveal':study.flipped=true;render();return true;
   case 'card-decks':study=null;render();return true;
   case 'card-free':start(scope,true);return true;
   case 'open-keyboard':$('#chinese-keyboard').showModal();refreshIME();$('#ime-input').focus();return true;
   case 'close-keyboard':$('#chinese-keyboard').close();return true;
   case 'ime-clear':imeText='';$('#ime-input').value='';$('#ime-output').value='';highlight=0;refreshIME();return true;
   case 'ime-copy':if(!$('#ime-output').value){toast('Primero forma una palabra o frase.');return true;}(navigator.clipboard?navigator.clipboard.writeText($('#ime-output').value):Promise.reject()).then(()=>toast('Texto copiado.')).catch(()=>{ $('#ime-output').focus();$('#ime-output').select();toast('Selecciona Copiar o pulsa Ctrl+C.');});return true;
  }
  return false;
 }
 function onChange(t){if(t.dataset.hsk){const n=+t.dataset.hsk;fs().enabledHSK=t.checked?[...new Set([...fs().enabledHSK,n])]:fs().enabledHSK.filter(x=>x!==n);save();render();return true;}if(t.id==='card-direction'){fs().direction=t.value;save();render();return true;}if(t.id==='new-limit'){fs().newLimit=+t.value;save();return true;}if(t.id==='card-scope'){scope=t.value;$('#card-browse').innerHTML=browseHTML();return true;}return false;}
 function onInput(t){if(t.id==='ime-input'){imeText=t.value;highlight=0;refreshIME();return true;}if(t.id==='card-search'){browse=t.value;$('#card-browse').innerHTML=browseHTML();return true;}return false;}
 function onKeydown(e,route){if(e.target.id==='ime-input'&&!e.isComposing){if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();highlight=Math.max(0,Math.min(candidates.length-1,highlight+(e.key==='ArrowDown'?1:-1)));refreshIME();return true;}if((e.key==='Enter'||e.key===' ')&&candidates.length){e.preventDefault();chooseIME(highlight);return true;}}return false;}
 const $=s=>document.querySelector(s);
 return {html,onClick,onChange,onInput,onKeydown};
}
