// Curriculum anchor: U2.4 (S5).pdf. Notes and practice are original.
export const session5Class={id:5,title:'Gracias, perdón y no lo sé',subtitle:'Cortesía, nombres y apellidos; decir que no sabes algo y contrastar con 但是.',sources:['U2.4 (S5).pdf'],topics:['Disculparse y responder','Dar las gracias','不知道, 但是 y 爱'],book:'Camino al chino I · apoyo de U2, pp. 30–31 y 36'};
const words=[
 ['buhaoyisi','不好意思','bù hǎoyìsi','disculpa / perdón','expresiones','3–4'],
 ['duibuqi','对不起','duìbuqǐ','lo siento / perdón','expresiones','3, 5'],
 ['mei-guanxi','没关系','méi guānxi','no pasa nada','expresiones','3–5'],
 ['zhidao','知道','zhīdào','saber','estructuras','2, 7'],
 ['bu-zhidao','不知道','bù zhīdào','no saber','expresiones','2–3, 7'],
 ['wo-bu-zhidao','我不知道','Wǒ bù zhīdào','no lo sé','expresiones','3, 7'],
 ['ni-zhidao-ma','你知道吗','Nǐ zhīdào ma','¿lo sabes?','expresiones','2'],
 ['danshi','但是','dànshì','pero','estructuras','12, 14'],
 ['ai','爱','ài','amar','estructuras','9'],
 ['wo-ai-ni','我爱你','Wǒ ài nǐ','te quiero / te amo','expresiones','9'],
 ['bu-dui','不对','bú duì','no es correcto','expresiones','11, 13']
];
export const session5Vocabulary=words.map(([id,hanzi,pinyin,meaning,category,pages])=>({id,hanzi,pinyin,meaning,category,source:`S5 · pp. ${pages}`,extra:false}));
export const session5Shared={xing:'pp. 1, 14, 18',mingzi:'pp. 14, 18',jiao:'pp. 1, 14, 18',renshi:'pp. 11, 17–18',laoshi:'pp. 1–2',xuesheng:'p. 1',shei:'pp. 2, 10',dui:'pp. 11, 13',bushi:'p. 1','ni-zenmeyang':'p. 18',henhao:'p. 18',bucuo:'p. 18',haikeyi:'p. 18',butaihao:'p. 18'};
export function session5Priority(word){const n=['不好意思','对不起','没关系','谢谢','不客气','我不知道','知道','不知道','你知道吗','但是','爱','我爱你','不对'].indexOf(word.hanzi);return n<0?20:n;}
const g=(id,title,tag,body,pattern,examples,note,pages)=>({id,title,tag,body,pattern,examples,note,source:`S5 · pp. ${pages} · resumen y ejemplos creados`});
export const session5Grammar=[
 g('apologies','Disculparse y responder','不好意思 · 对不起 · 没关系','不好意思 sirve para disculparse por un error cotidiano. 对不起 también pide disculpas y puede expresar un pesar mayor. La elección depende de la situación y del trato.','Disculpa → 没关系',[['不好意思。','Bù hǎoyìsi.','Disculpa.'],['对不起。','Duìbuqǐ.','Lo siento.'],['没关系。','Méi guānxi.','No pasa nada.']],'No es una frontera rígida entre faltas pequeñas y graves. 没关系 tranquiliza a quien se disculpa. 意思 y 关系 llevan aquí una segunda sílaba neutra.','1–5, 14'),
 g('thanks','Dar las gracias','谢谢 · 不客气','Para agradecer, usa 谢谢. Una respuesta habitual es 不客气, «de nada».','谢谢 → 不客气',[['谢谢！','Xièxie!','¡Gracias!'],['不客气。','Bú kèqi.','De nada.']],'No confundas las parejas: a unas gracias responde 不客气; a una disculpa, 没关系. 不 se pronuncia bú delante del cuarto tono de 客.','2–3, 6, 16'),
 g('knowing','Saber o conocer a alguien','知道 · 不知道','知道 expresa saber un dato. 认识 se utiliza para conocer o reconocer a una persona. Para negar 知道, coloca 不 delante.','Sujeto + 不 + 知道',[['你知道吗？','Nǐ zhīdào ma?','¿Lo sabes?'],['我不知道。','Wǒ bù zhīdào.','No lo sé.'],['我认识她。','Wǒ rènshi tā.','La conozco.']],'La sílaba 道 de 知道 conserva aquí su cuarto tono. En 认识, 识 es neutra. El contexto indica qué dato no sabes.','2–3, 7'),
 g('contrast','Corregir una presentación','但是 · 姓 · 叫','但是 introduce un contraste: «pero». 姓 presenta el apellido; 叫 presenta cómo se llama alguien. No confundas apellido y nombre personal.','Frase + 但是 + frase',[['她是学生，但是我不是。','Tā shì xuésheng, dànshì wǒ bú shì.','Ella es estudiante, pero yo no.'],['我姓王，叫王明。','Wǒ xìng Wáng, jiào Wáng Míng.','Me apellido Wang y me llamo Wang Ming.']],'En este ejemplo, 王 es el apellido y 明 el nombre personal. La lectura del libro de la p. 30 trabaja esta confusión.','12–15'),
 g('love','Una frase con 爱','爱','爱 significa amar. Puedes reconocerlo dentro de la frase 我爱你, presentada en clase.','Persona + 爱 + persona',[['我爱你。','Wǒ ài nǐ.','Te quiero / te amo.']],'爱 tiene cuarto tono: ài. Esta frase aparece en S5, p. 9.','9')
];
export const session5Dialogue=[['A','她是谁？','Tā shì shéi?','¿Quién es ella?'],['B','她是王老师。','Tā shì Wáng lǎoshī.','Es la profesora Wang.'],['A','她是哪里人？你知道吗？','Tā shì nǎlǐ rén? Nǐ zhīdào ma?','¿De dónde es? ¿Lo sabes?'],['B','不好意思，我不知道。','Bù hǎoyìsi, wǒ bù zhīdào.','Disculpa, no lo sé.'],['A','没关系。','Méi guānxi.','No pasa nada.']];
const q=(id,type,skill,prompt,fields,pages)=>({id:'s5-'+id,type,skill,prompt,...fields,source:`S5 · pp. ${pages} · práctica creada`});
export const session5Questions=[
 q('thanks-reply','choice','Cortesía','Te dicen 谢谢. ¿Cómo respondes?',{options:['不客气。','对不起。','我不知道。'],answer:'不客气。',explanation:'谢谢 = gracias; 不客气 = de nada.'},'3, 6'),
 q('sorry-reply','choice','Cortesía','Te piden disculpas: 对不起. ¿Qué respuesta tranquiliza a la otra persona?',{options:['没关系。','谢谢。','你姓什么？'],answer:'没关系。',explanation:'没关系 significa «no pasa nada».'},'3–5'),
 q('small-mistake','choice','Cortesía','Te has equivocado al llamar a alguien por su nombre. ¿Qué expresión permite disculparte?',{options:['不好意思。','不客气。','我是学生。'],answer:'不好意思。',explanation:'不好意思 es habitual al disculparse por un error cotidiano, como confundir un nombre.'},'1, 4'),
 q('dont-know','order','Construir frases','Ordena «No lo sé».',{tokens:['知道','我','不'],answer:'我不知道',explanation:'Sujeto 我 + negación 不 + verbo 知道.'},'7'),
 q('know-question','order','Construir frases','Ordena «¿Lo sabes?».',{tokens:['吗','知道','你'],answer:'你知道吗',explanation:'你 + 知道 + 吗 convierte la afirmación en una pregunta de sí/no.'},'2'),
 q('love','order','Construir frases','Ordena «Te quiero».',{tokens:['你','我','爱'],answer:'我爱你',explanation:'我 («yo») + 爱 («amar») + 你 («tú»).'},'9'),
 q('but','choice','Vocabulario','Completa «Ella es estudiante, pero yo no».',{hanzi:'她是学生，___ 我不是。',options:['但是','谢谢','哪里'],answer:'但是',explanation:'但是 (dànshì) introduce el contraste: «pero».'},'12, 14'),
 q('know-person','choice','Estructuras','¿Qué verbo encaja para «conozco a la profesora Wang»?',{hanzi:'我 ___ 王老师。',options:['认识','知道','姓'],answer:'认识',explanation:'认识 expresa conocer a alguien; 知道 se usa aquí para saber un dato.'},'2, 7, 17'),
 q('surname','choice','Lectura','Lee este ejemplo creado: 我姓王，叫王明。 ¿Cuál es el apellido?',{options:['王','明','王明'],answer:'王',explanation:'姓 introduce el apellido 王. 王明 es el nombre completo en este ejemplo.'},'14–15'),
 q('reading-dialogue','choice','Lectura','Lee: A: 她是哪里人？ B: 不好意思，我不知道。 ¿B indica de dónde es ella?',{options:['No, dice que no lo sabe.','Sí, dice que es china.','Sí, dice que es española.'],answer:'No, dice que no lo sabe.',explanation:'我不知道 significa «no lo sé». Es comprensión de lectura creada, no un ejercicio sobre la grabación.'},'2, 7'),
 q('thanks-pinyin','pinyin','Pinyin','Escribe el pinyin de 谢谢.',{hanzi:'谢谢',answer:'xièxie',explanation:'Xièxie: cuarto tono + tono neutro. Puedes escribir xie4xie5.'},'3, 6'),
 q('sorry-pinyin','pinyin','Pinyin','Escribe el pinyin de 对不起.',{hanzi:'对不起',answer:'duìbuqǐ',explanation:'Duìbuqǐ: cuarto tono, neutro y tercer tono. Puedes escribir dui4bu5qi3.'},'3, 5'),
 q('but-pinyin','pinyin','Pinyin','Escribe el pinyin de 但是.',{hanzi:'但是',answer:'dànshì',explanation:'Dànshì: dos cuartos tonos. Puedes escribir dan4shi4.'},'12, 14'),
 q('recognize-sorry','choice','Reconocer caracteres','Reconoce la expresión de disculpa.',{kind:'recognition',phrase:true,cue:'Bù hǎoyìsi',options:['不好意思','不客气','不知道','没关系'],answer:'不好意思',explanation:'不好意思 = disculpa / perdón.'},'3–4'),
 q('recognize-unknown','choice','Reconocer caracteres','Reconoce «no lo sé».',{kind:'recognition',phrase:true,cue:'Wǒ bù zhīdào',options:['我不知道','我不认识','我不是','我爱你'],answer:'我不知道',explanation:'我 + 不 + 知道 = no lo sé.'},'7'),
 q('recognize-reassure','choice','Reconocer caracteres','Reconoce la respuesta a una disculpa.',{kind:'recognition',phrase:true,cue:'Méi guānxi',options:['没关系','不客气','对不起','谢谢'],answer:'没关系',explanation:'没关系 = no pasa nada.'},'3–5')
];
