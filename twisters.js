import {syllables} from './pronunciation-data.js';
const words=new Map(syllables.map(s=>[s.id,s]));
export const twisters=[
 {id:'four-ten',title:'Cuatro y diez',focus:'s / sh · tonos 2 y 4',level:'Para empezar',meaning:'Cuatro es cuatro; diez es diez; catorce es catorce; cuarenta es cuarenta.',source:'Trabalenguas tradicional · fragmento',url:'https://syb.jzci.edu.cn/info/1041/90231.htm',tokens:[['四','si',4],['是','shi',4],['四','si',4],'，',['十','shi',2],['是','shi',4],['十','shi',2],'，',['十','shi',2],['四','si',4],['是','shi',4],['十','shi',2],['四','si',4],'，',['四','si',4],['十','shi',2],['是','shi',4],['四','si',4],['十','shi',2],'。']},
 {id:'north-slope',title:'Cuesta arriba',focus:'b / p · tonos 1 y 3',level:'Ampliación',meaning:'Ochocientos soldados de vanguardia corren hacia la ladera norte.',source:'Trabalenguas tradicional · primer verso',url:'https://gjxy.kust.edu.cn/info/1323/1677.htm',tokens:[['八','ba',1],['百','bai',3],['标','biao',1],['兵','bing',1],['奔','ben',1],['北','bei',3],['坡','po',1],'。'],skip:[4]},
 {id:'mother-horse',title:'Mamá y el caballo',focus:'ma · tonos 1, 3, 4 y neutro',level:'Juego creado',meaning:'Mamá monta a caballo. El caballo va despacio y mamá lo regaña.',source:'Juego de dicción creado para esta app',tokens:[['妈','ma',1],['妈','ma',5],['骑','qi',2],['马','ma',3],'，',['马','ma',3],['慢','man',4],'，',['妈','ma',1],['妈','ma',5],['骂','ma',4],['马','ma',3],'。']}
];
export const readingOf=token=>token[2]===5?token[1].replace(/v/g,'ü'):words.get(token[1])?.labels[token[2]];
export function twisterTargets(twister,random=Math.random){
 const indices=twister.tokens.flatMap((t,i)=>Array.isArray(t)&&!twister.skip?.includes(i)?[i]:[]);
 for(let i=indices.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[indices[i],indices[j]]=[indices[j],indices[i]];}
 return indices;
}
export function createTwisters({getState,save,render,play,escape,curve}){
 let chosen=twisters[0],targets=twisterTargets(chosen),index=0,response=null,correct=0,showReading=false;
 const toneLabels={1:'alto',2:'ascendente',3:'bajo',4:'descendente',5:'neutro'};
 function reset(id){chosen=twisters.find(t=>t.id===id)||twisters[0];targets=twisterTargets(chosen);index=0;response=null;correct=0;showReading=false;}
 function html(){
  const finished=index>=targets.length,pos=targets[index],token=chosen.tokens[pos],done=response!==null;
  return `<div class="twister-decks">${twisters.map(t=>`<button class="twister-deck ${chosen.id===t.id?'selected':''}" data-twister="${t.id}" aria-pressed="${chosen.id===t.id}"><small>${t.level}</small><strong>${t.title}</strong><span>${t.focus}</span></button>`).join('')}</div><section class="card twister-card"><div class="question-meta"><span class="tag">${escape(chosen.focus)}</span><span>${finished?'Terminado':`${index+1} de ${targets.length}`}</span></div><h2>${chosen.title}</h2><p>Lee el trabalenguas en voz alta. Elige el tono de la sílaba destacada.</p><div class="twister-text" lang="zh-Hans">${chosen.tokens.map((t,i)=>Array.isArray(t)?`<span class="twister-token ${i===pos?'target':''}"><span>${t[0]}</span>${showReading?`<small lang="zh-Latn-pinyin">${readingOf(t)}</small>`:''}</span>`:`<span class="twister-punctuation">${t}</span>`).join('')}</div><p class="twister-meaning">${chosen.meaning}</p>${finished?`<div class="note-box"><h3>${correct} de ${targets.length} tonos al primer intento</h3><p>Vuelve a leerlo despacio y aumenta el ritmo cuando te resulte cómodo.</p><button class="button primary" data-twister="${chosen.id}">Volver a practicar</button></div>`:`<div class="twister-target"><span>¿Qué tono lleva <strong lang="zh-Hans">${token[0]}</strong> en esta frase?</span><strong class="twister-base" lang="zh-Latn-pinyin">${token[1].replace(/v/g,'ü')}</strong></div><div class="twister-tones">${[1,2,3,4,5].map(t=>`<button class="sound-option ${done&&t===token[2]?'correct':done&&t===response?'incorrect':''}" data-twister-tone="${t}" ${done?'disabled':''}>${t<5?curve(t):'<span class="neutral-mark">·</span>'}<strong>${t===5?'Neutro':t}</strong><small>${toneLabels[t]}</small></button>`).join('')}</div>${done?`<div class="note-box" role="status"><strong>${response===token[2]?'Bien recordado.':'Fíjate en este tono.'}</strong> ${token[0]} se lee <strong>${readingOf(token)}</strong>: ${token[2]===5?'tono neutro':'tono '+token[2]+' ('+toneLabels[token[2]]+')'}.<div class="button-row">${token[2]!==5?'<button class="button secondary" id="twister-audio">Escuchar esta sílaba</button>':''}<button class="button primary" id="twister-next">${index+1===targets.length?'Ver resultado':'Siguiente sílaba'}</button></div>${token[2]===5?'<p>En 妈妈, la segunda sílaba es neutra. Se pronuncia breve y ligera; su altura depende de la sílaba anterior.</p>':''}</div>`:'<p class="source-note">Primero elige el tono; después podrás escuchar el modelo aislado de esa sílaba.</p>'}`}<div class="button-row"><button class="button ghost" id="twister-reading">${showReading?'Ocultar':'Mostrar'} lectura completa</button></div><p class="source-note">Se practican los tonos de diccionario y los neutros indicados. En el habla encadenada pueden cambiar. Los audios son modelos de sílabas aisladas; no hay una grabación completa del trabalenguas.</p><p class="source-note">${chosen.url?`<a href="${chosen.url}" target="_blank" rel="noopener">${chosen.source}</a>`:chosen.source}${chosen.id==='north-slope'?' · Se omite 奔 en las preguntas por sus posibles lecturas.':''}</p></section>`;
 }
 function onClick(t){
  if(t.dataset.twister){reset(t.dataset.twister);render();return true;}
  if(t.dataset.twisterTone&&index<targets.length&&response===null){
   response=Number(t.dataset.twisterTone);const token=chosen.tokens[targets[index]],ok=response===token[2];if(ok)correct++;
   const p=getState().pronunciation;p.attempts++;if(ok)p.correct++;p.history.push({date:Date.now(),mode:'twister',syllable:token[1],tone:token[2],correct:ok,twister:chosen.id});p.history=p.history.slice(-200);save();render();return true;
  }
  if(t.id==='twister-next'&&response!==null){index++;response=null;showReading=false;render();return true;}
  if(t.id==='twister-reading'){showReading=!showReading;render();return true;}
  if(t.id==='twister-audio'&&response!==null&&index<targets.length){const token=chosen.tokens[targets[index]],s=words.get(token[1]);if(s?.audio[token[2]])play(s.audio[token[2]],`Modelo aislado: ${readingOf(token)}`);return true;}
  return false;
 }
 return {html,onClick};
}
