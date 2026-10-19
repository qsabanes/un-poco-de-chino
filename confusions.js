export const confusionGroups=[
 {id:'bp',label:'b / p',initials:['b','p'],note:'La p se pronuncia con más salida de aire que la b.'},
 {id:'dt',label:'d / t',initials:['d','t'],note:'La t se pronuncia con más salida de aire que la d.'},
 {id:'gk',label:'g / k',initials:['g','k'],note:'La k se pronuncia con más salida de aire que la g.'},
 {id:'jqx',label:'j / q / x',initials:['j','q','x'],note:'Compara la salida de aire de j y q con la fricción continua de x.'},
 {id:'z-zh',label:'z / zh',initials:['z','zh'],note:'Escucha el cambio de posición de la lengua entre z y zh.'},
 {id:'c-ch',label:'c / ch',initials:['c','ch'],note:'Ambas llevan aspiración; cambia la posición de la lengua.'},
 {id:'s-sh',label:'s / sh',initials:['s','sh'],note:'Escucha la diferencia de fricción entre s y sh.'},
 {id:'nl',label:'n / l',initials:['n','l'],note:'En n el aire pasa por la nariz; en l sale por los lados de la lengua.'},
 {id:'an-ang',label:'an / ang',finals:['an','ang'],note:'La final -n y la final -ng cierran el sonido en lugares distintos.'},
 {id:'en-eng',label:'en / eng',finals:['en','eng'],note:'Mantén la atención en el final nasal de la sílaba.'},
 {id:'in-ing',label:'in / ing',finals:['in','ing'],note:'Compara -n y -ng sin cambiar el tono.'}
];
export function confusionFamilies(pool,filter='mixed'){
 const byId=new Map(pool.map(s=>[s.id,s])),result=[];
 for(const group of confusionGroups.filter(g=>filter==='mixed'||filter===g.id)){
  const seen=new Set();
  for(const s of pool){
   let ids;
   if(group.initials){if(s.initial!==group.initials[0])continue;const rest=s.id.slice(group.initials[0].length);ids=group.initials.map(initial=>initial+rest);}
   else {const [from,to]=group.finals;if(!s.id.endsWith(from))continue;ids=[s.id,s.id.slice(0,-from.length)+to];}
   const options=ids.map(id=>byId.get(id)).filter(Boolean);
   if(options.length<2)continue;
   const shared=[1,2,3,4].filter(t=>options.every(o=>o.audio[t]));if(!shared.length)continue;
   const key=options.map(s=>s.id).join(':');if(seen.has(key))continue;seen.add(key);
   result.push({group,options,tones:shared});
  }
 }
 return result;
}
export function makeConfusionQuestion(pool,random=Math.random,previous='',filter='mixed'){
 const pick=a=>a[Math.floor(random()*a.length)%a.length],families=confusionFamilies(pool,filter);
 if(!families.length)return null;
 const family=pick(families),alternatives=family.options.filter(s=>s.id!==previous),word=pick(alternatives.length?alternatives:family.options),tone=pick(family.tones),options=[...family.options];
 for(let i=options.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[options[i],options[j]]=[options[j],options[i]];}
 return {word,tone,answer:word.id,contrast:family.group,options:options.map(s=>({value:s.id,label:s.labels[tone]}))};
}
