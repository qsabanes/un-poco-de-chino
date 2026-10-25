import {session4Vocabulary,session4Shared,session4Grammar,session4Questions,session4Priority} from './session4.js';
// Contenido organizado por S1–S4, con referencias a los materiales de cada sesión. Los ejercicios son originales.
export const vocabulary = [
  ['wo','我','wǒ','yo','personas','S1 · El idioma chino, pp. 25–27; S2 · p. 30'],
  ['ni','你','nǐ','tú','personas','S1 · El idioma chino, pp. 25–27; S2 · p. 30'],
  ['nin','您','nín','usted','personas','S2 · pp. 4–5'],
  ['ta','他','tā','él','personas','S2 · pp. 30–34'],
  ['ta-f','她','tā','ella','personas','S2 · pp. 30–34'],
  ['women','我们','wǒmen','nosotros / nosotras','personas','S3 · pp. 24–25'],
  ['nimen','你们','nǐmen','vosotros / vosotras','personas','S2 · pp. 3, 12, 36; S3 · pp. 24–25'],
  ['tamen','他们','tāmen','ellos / grupo mixto','personas','S3 · pp. 24–25'],
  ['tamen-f','她们','tāmen','ellas','personas','S3 · pp. 24–25'],
  ['jiao','叫','jiào','llamarse','estructuras','S1 · El idioma chino, pp. 25–27; S2 · p. 8'],
  ['xing','姓','xìng','apellidarse','estructuras','S2 · pp. 16–17'],
  ['shi','是','shì','ser','estructuras','S2 · p. 14; S3 · p. 21'],
  ['bu','不','bù','no (negación)','estructuras','S2 · p. 37; S3 · pp. 39–41'],
  ['ma','吗','ma','partícula de pregunta sí/no','estructuras','S3 · pp. 37–38'],
  ['ye','也','yě','también','estructuras','S2 · p. 11; S3 · p. 22'],
  ['shenme','什么','shénme','qué','estructuras','S2 · pp. 16–17'],
  ['mingzi','名字','míngzi','nombre','estructuras','S2 · pp. 16, 27–28'],
  ['na','哪','nǎ','cuál / qué (selección)','estructuras','S3 · pp. 28–31'],
  ['ren','人','rén','persona','países','S3 · pp. 8–10'],
  ['zhongguo','中国','Zhōngguó','China','países','S3 · pp. 2–5'],
  ['xibanya','西班牙','Xībānyá','España','países','S3 · pp. 2–5'],
  ['meiguo','美国','Měiguó','Estados Unidos','países','S3 · pp. 2, 16'],
  ['yingguo','英国','Yīngguó','Reino Unido','países','S3 · pp. 2, 12'],
  ['faguo','法国','Fǎguó','Francia','países','S3 · pp. 2, 13'],
  ['deguo','德国','Déguó','Alemania','países','S3 · pp. 2, 14'],
  ['yidali','意大利','Yìdàlì','Italia','países','S3 · pp. 2, 15'],
  ['riben','日本','Rìběn','Japón','países','S3 · p. 2'],
  ['jiatailuoniya','加泰罗尼亚','Jiātàiluóníyà','Cataluña','países','S3 · pp. 6, 19'],
  ['bilu','秘鲁','Bìlǔ','Perú','países','S3 · p. 17'],
  ['guo','国','guó','país','países','S3 · pp. 3, 28–31'],
  ['zhongguoren','中国人','Zhōngguórén','chino / china (persona)','países','S3 · pp. 2, 9'],
  ['xibanyaren','西班牙人','Xībānyárén','español / española (persona)','países','S2 · p. 14; S3 · pp. 2, 9–10'],
  ['meiguoren','美国人','Měiguórén','estadounidense','países','S3 · pp. 2, 16'],
  ['yingguoren','英国人','Yīngguórén','británico / británica','países','S3 · pp. 2, 12'],
  ['faguoren','法国人','Fǎguórén','francés / francesa','países','S3 · pp. 2, 13'],
  ['deguoren','德国人','Déguórén','alemán / alemana','países','S3 · pp. 2, 14'],
  ['yidaliren','意大利人','Yìdàlìrén','italiano / italiana','países','S3 · pp. 2, 15'],
  ['ribenren','日本人','Rìběnrén','japonés / japonesa','países','S3 · p. 2'],
  ['jiatailuoniyaren','加泰罗尼亚人','Jiātàiluóníyàrén','catalán / catalana','países','S3 · pp. 11, 23'],
  ['biluren','秘鲁人','Bìlǔrén','peruano / peruana','países','S3 · p. 17'],
  ['nihao','你好','nǐ hǎo','hola','expresiones','S1 · El idioma chino, pp. 25–27; U1 · p. 8; S2 · p. 2'],
  ['zaijian','再见','zàijiàn','adiós','expresiones','S1 · El idioma chino, p. 85; U1 · pp. 10–11'],
  ['renshi','认识','rènshi','conocer (a alguien)','expresiones','S2 · pp. 9–11'],
  ['gaoxing','高兴','gāoxìng','contento / contenta','expresiones','S2 · pp. 9–11'],
  ['zenmeyang','怎么样','zěnmeyàng','qué tal / cómo','expresiones','S2 · pp. 36–43'],
  ['henhao','很好','hěn hǎo','muy bien','expresiones','S2 · pp. 37–39'],
  ['bucuo','不错','bú cuò','bastante bien / no está mal','expresiones','S2 · pp. 37–39'],
  ['haikeyi','还可以','hái kěyǐ','aceptable / voy tirando','expresiones','S2 · pp. 37–40'],
  ['butaihao','不太好','bú tài hǎo','no muy bien','expresiones','S2 · pp. 37–41'],
  ['hao', '好', 'hǎo', 'bien / bueno', 'expresiones', 'S1 · El idioma chino, pp. 25–27; S2 · pp. 2, 37'],
  ['hen', '很', 'hěn', 'muy', 'estructuras', 'S2 · pp. 9–12, 37'],
  ['men', '们', 'men', 'sufijo de plural para personas', 'estructuras', 'S2 · p. 12'],
  ['laoshi', '老师', 'lǎoshī', 'profesor / profesora', 'personas', 'S2 · pp. 12, 14'],
  ['qingwen', '请问', 'qǐngwèn', 'disculpe, una pregunta', 'expresiones', 'S2 · p. 18'],
  ['shei', '谁', 'shéi', 'quién (también se lee shuí)', 'estructuras', 'S2 · p. 1 · título de la unidad'],
  ['beijing', '北京', 'Běijīng', 'Pekín', 'países', 'S1 · El idioma chino, p. 7'],
  ['hanyu', '汉语', 'Hànyǔ', 'lengua china', 'expresiones', 'S1 · El idioma chino, p. 16'],
  ['zhongwen', '中文', 'Zhōngwén', 'chino (lengua y escritura)', 'expresiones', 'S1 · El idioma chino, pp. 16, 18'],
  ['putonghua', '普通话', 'pǔtōnghuà', 'mandarín estándar', 'expresiones', 'S1 · El idioma chino, p. 16'],
  ['pinyin', '拼音', 'pīnyīn', 'pinyin (transcripción de la pronunciación)', 'expresiones', 'S1 · El idioma chino, pp. 27, 68–70; S2 · p. 30'],
  ['hanzi', '汉字', 'hànzì', 'carácter / caracteres chinos', 'expresiones', 'S1 · El idioma chino, p. 39; S2 · p. 30'],
  ['renshi-ni', '认识你很高兴', 'Rènshi nǐ hěn gāoxìng', 'encantado/a de conocerte', 'expresiones', 'S2 · pp. 10–11, 18, 28'],
  ['hen-gaoxing-renshi', '很高兴认识你', 'Hěn gāoxìng rènshi nǐ', 'encantado/a de conocerte (otra forma)', 'expresiones', 'S2 · pp. 7, 10–11'],
  ['renshi-ni-ye', '认识你我也很高兴', 'Rènshi nǐ wǒ yě hěn gāoxìng', 'yo también me alegro de conocerte', 'expresiones', 'S2 · pp. 7, 11, 18, 28'],
  ['ni-zenmeyang', '你怎么样', 'Nǐ zěnmeyàng', '¿qué tal estás?', 'expresiones', 'S2 · pp. 38–39, 41–43'],
  ['nimen-zenmeyang', '你们怎么样', 'Nǐmen zěnmeyàng', '¿qué tal estáis?', 'expresiones', 'S2 · pp. 36, 40'],
  ['ni-jiao-shenme', '你叫什么名字', 'Nǐ jiào shénme míngzi', '¿cómo te llamas?', 'expresiones', 'S2 · pp. 7–8, 16, 27–28'],
  ['ni-xing-shenme', '你姓什么', 'Nǐ xìng shénme', '¿cuál es tu apellido?', 'expresiones', 'S2 · pp. 7, 16–17, 27–28'],
  ['ni-chifan-le-ma', '你吃饭了吗', 'Nǐ chīfàn le ma', '¿has comido? (también saludo informal)', 'expresiones', 'S2 · p. 45 · nota cultural'],
  ['chi-le-ma', '吃了吗', 'Chī le ma', '¿has comido? (saludo abreviado)', 'expresiones', 'S2 · p. 46 · nota cultural'],
  ['baibai', '拜拜', 'báibái', 'chao / adiós (informal)', 'expresiones', 'U1 · p. 16 · complemento'],
  ['nimenhao','你们好','nǐmen hǎo','hola, a un grupo','expresiones','U1 · p. 13; S2 · p. 3'],
  ['ninhao','您好','nín hǎo','hola, de cortesía','expresiones','U1 · p. 15; S2 · p. 5'],
  ['xiexie','谢谢','xièxie','gracias','expresiones','Ampliación propuesta',true],
  ['bu-keqi','不客气','bú kèqi','de nada','expresiones','Ampliación propuesta',true],
  ['pengyou','朋友','péngyou','amigo / amiga','personas','Ampliación propuesta',true],
].map(([id,hanzi,pinyin,meaning,category,source,extra=false])=>({id,hanzi,pinyin,meaning,category,source,extra}));

for(const v of vocabulary){if(v.id==='beijing')v.category='ciudades';if(session4Shared[v.id])v.source+='; S4 · '+session4Shared[v.id];}
vocabulary.push(...session4Vocabulary);

export const grammar = [
 {id:'how-are-you',title:'Preguntar qué tal estás',tag:'怎么样',body:'En este saludo, 怎么样 pregunta «qué tal». Cambia el pronombre según a quién te diriges: 你, 您 o 你们.',pattern:'Persona + 怎么样？',examples:[['你怎么样？','Nǐ zěnmeyàng?','¿Qué tal estás?'],['你们怎么样？','Nǐmen zěnmeyàng?','¿Qué tal estáis?'],['很好。','Hěn hǎo.','Muy bien.'],['不错。','Bú cuò.','Bastante bien / no está mal.'],['还可以。','Hái kěyǐ.','Aceptable / voy tirando.'],['不太好。','Bú tài hǎo.','No muy bien.']],note:'En estas respuestas no necesitas 是. 不 se pronuncia bú delante de cuò o tài, que llevan cuarto tono. 很好 y 还可以 se muestran con sus tonos de diccionario; al hablar, los terceros tonos consecutivos cambian.',source:'S2 · pp. 36–43. Resumen de las expresiones y la práctica de clase.'},
 {id:'names',title:'Un nombre, dos preguntas',tag:'叫 · 姓',body:'叫 presenta tu nombre. 姓 introduce tu apellido. El apellido suele ir antes del nombre en los nombres chinos.',pattern:'Sujeto + 叫 + nombre / Sujeto + 姓 + apellido',examples:[['你叫什么名字？','Nǐ jiào shénme míngzi?','¿Cómo te llamas?'],['我叫安娜。','Wǒ jiào Ānnà.','Me llamo Anna.'],['你姓什么？','Nǐ xìng shénme?','¿Cuál es tu apellido?']],note:'Las preguntas con 什么 conservan la posición de la información que falta. No añadas 吗.',source:'S2 · pp. 8, 16–17, 27–28. Ejemplo de Anna creado para practicar.'},
 {id:'nationality',title:'De dónde eres',tag:'是 · 哪 · 人',body:'Para expresar nacionalidad, usamos 是. Añadir 人 al nombre del país forma el gentilicio en estos ejemplos.',pattern:'Sujeto + 是 + país + 人',examples:[['我是西班牙人。','Wǒ shì Xībānyárén.','Soy español / española.'],['你是哪国人？','Nǐ shì nǎ guó rén?','¿De qué nacionalidad eres?'],['她是中国人。','Tā shì Zhōngguórén.','Ella es china.']],note:'哪 pregunta cuál: aquí, qué país. No se necesita 吗 en esta pregunta.',source:'S3 · pp. 9–23, 28–31. Adaptación de estudio.'},
 {id:'questions',title:'Una pregunta de sí o no',tag:'吗',body:'Añade 吗 al final de una afirmación para preguntar si es cierta. El orden de las otras palabras se mantiene.',pattern:'Afirmación + 吗？',examples:[['你是中国人吗？','Nǐ shì Zhōngguórén ma?','¿Eres chino / china?'],['是，我是中国人。','Shì, wǒ shì Zhōngguórén.','Sí, soy chino / china.'],['不是，我是西班牙人。','Bú shì, wǒ shì Xībānyárén.','No, soy español / española.']],note:'吗 tiene tono neutro. Para responder, repite o niega el verbo de la pregunta.',source:'S3 · pp. 34–38, 42–43. Ejemplos adaptados.'},
 {id:'negative',title:'Una pequeña palabra que cambia de tono',tag:'不 → bú / bù',body:'Coloca 不 antes del verbo para negar. Se escribe siempre 不; delante de una sílaba de cuarto tono se pronuncia bú (segundo tono).',pattern:'Sujeto + 不 + verbo + complemento',examples:[['我不是中国人。','Wǒ bú shì Zhōngguórén.','No soy chino / china.'],['我不叫安娜。','Wǒ bú jiào Ānnà.','No me llamo Anna.'],['不好','bù hǎo','no está bien']],note:'En el vocabulario verás bù, su forma de diccionario. En los ejemplos mostramos el tono que se pronuncia. 你好 también cambia al hablar: el primer tercer tono se realiza como segundo; su pinyin suele escribirse nǐ hǎo.',source:'S3 · pp. 39–41; pinyin y tonos de S1. Ejemplos adaptados.'},
 {id:'plural',title:'Hablar de más de una persona',tag:'们 · 也',body:'们 forma el plural de los pronombres personales. 也 significa «también» y se coloca antes del verbo.',pattern:'Pronombre + 们 / Sujeto + 也 + verbo',examples:[['我们是西班牙人。','Wǒmen shì Xībānyárén.','Somos españoles / españolas.'],['我也是中国人。','Wǒ yě shì Zhōngguórén.','Yo también soy chino / china.'],['认识你，我也很高兴。','Rènshi nǐ, wǒ yě hěn gāoxìng.','Yo también me alegro de conocerte.']],note:'他 y 她 se pronuncian igual (tā), pero se escriben de forma distinta.',source:'S2 · p. 11; S3 · pp. 22, 24–25. Primer ejemplo creado para practicar.'},
];

grammar.push(...session4Grammar);
export function grammarForSession(session){
 const ids={2:['names','how-are-you'],3:['nationality','questions','negative','plural'],4:['where-from','return-question','who','choose-question']};
 return grammar.filter(g=>(ids[session]||[]).includes(g.id));
}

export const questions = [
 {id:'q1',type:'choice',skill:'Vocabulario',prompt:'¿Qué significa 姓?',hanzi:'姓',options:['Llamarse','Apellidarse','Conocer','Ser'],answer:'Apellidarse',explanation:'姓 (xìng) se utiliza para el apellido. 叫 (jiào) se utiliza para el nombre.',source:'S2 · pp. 16–17'},
 {id:'q2',type:'choice',skill:'Lectura',prompt:'Selecciona la traducción.',hanzi:'她是中国人。',options:['Ella es china.','Él es español.','¿Ella es china?','Ella no es china.'],answer:'Ella es china.',explanation:'她 = ella, 是 = ser, 中国人 = persona china. No hay 吗 ni 不.',source:'S3 · pp. 21–23'},
 {id:'q3',type:'order',skill:'Construir frases',prompt:'Ordena: «Soy español / española».',tokens:['西班牙人','我','是'],answer:'我是西班牙人',explanation:'El orden es sujeto (我) + verbo (是) + nacionalidad (西班牙人).',source:'S3 · pp. 20–21'},
 {id:'q4',type:'choice',skill:'Gramática',prompt:'Completa la presentación.',hanzi:'我 ___ 安娜。',options:['姓','吗','叫','哪'],answer:'叫',explanation:'Para decir «Me llamo Anna», usamos 我叫安娜。安娜 es un nombre en este ejemplo.',source:'S2 · p. 8 · ejemplo creado'},
 {id:'q5',type:'pinyin',skill:'Pinyin',prompt:'Escribe el pinyin de «tú», con su tono.',hanzi:'你',answer:'nǐ',explanation:'你 es nǐ, con tercer tono. También puedes introducir ni3.',source:'S2 · p. 30'},
 {id:'q6',type:'choice',skill:'Tonos',prompt:'¿Cómo se pronuncia 不 delante de 是?',hanzi:'不是',options:['bū shì','bú shì','bǔ shì','bù shì'],answer:'bú shì',explanation:'是 (shì) tiene cuarto tono. Antes de un cuarto tono, 不 se pronuncia bú, con segundo tono.',source:'S3 · p. 41'},
 {id:'q7',type:'order',skill:'Preguntas',prompt:'Ordena: «¿Eres chino / china?».',tokens:['吗','中国人','你','是'],answer:'你是中国人吗',explanation:'Mantén el orden de la afirmación y añade 吗 al final.',source:'S3 · pp. 37–38 · adaptación'},
 {id:'q8',type:'order',skill:'Negación',prompt:'Construye la frase en negativo con los bloques.',hanzi:'我是中国人。',tokens:['中国人','不','我','是'],answer:'我不是中国人',explanation:'不 se coloca delante del verbo 是: 我不是中国人。',source:'S3 · pp. 39–40'},
 {id:'q9',type:'choice',skill:'Diálogo',prompt:'¿Qué respuesta encaja?',hanzi:'你是哪国人？',options:['我姓王。','我是西班牙人。','我叫安娜。','你好！'],answer:'我是西班牙人。',explanation:'哪国人 pregunta por la nacionalidad. «Soy español / española» responde a esa pregunta.',source:'S3 · pp. 29–30 · adaptación'},
 {id:'q10',type:'pinyin',skill:'Pinyin',prompt:'Escribe el pinyin de «ser».',hanzi:'是',answer:'shì',explanation:'是 se pronuncia shì, con cuarto tono. Puedes escribir shi4.',source:'S2 · p. 14; S3 · p. 21'},
 {id:'q11',type:'choice',skill:'Pronombres',prompt:'¿Cómo se escribe «nosotros / nosotras»?',options:['你们','他们','我们','她们'],answer:'我们',explanation:'我 significa «yo»; con 们 forma 我们, «nosotros / nosotras».',source:'S3 · pp. 24–25'},
 {id:'q12',type:'order',skill:'Construir frases',prompt:'Ordena: «Yo también soy chino / china».',tokens:['中国人','也','是','我'],answer:'我也是中国人',explanation:'也 se coloca antes del verbo: 我 + 也 + 是 + 中国人。',source:'S3 · p. 22'},
 {id:'q13',type:'choice',skill:'Preguntas',prompt:'¿Cuál pregunta «Cómo te llamas»?',options:['你是哪国人？','你叫什么名字？','你是中国人吗？','你姓什么？'],answer:'你叫什么名字？',explanation:'叫 significa «llamarse» y 什么名字 pregunta «qué nombre». 姓 pregunta por el apellido.',source:'S2 · pp. 16, 27–28'},
 {id:'q14',type:'choice',skill:'Tonos',prompt:'¿Cómo se pronuncia 不 en 不好?',hanzi:'不好',options:['bú hǎo','bū hǎo','bù hǎo','bǔ hǎo'],answer:'bù hǎo',explanation:'好 tiene tercer tono. 不 conserva su cuarto tono (bù) delante de primer, segundo y tercer tono.',source:'S3 · p. 41 · ejemplo creado'},
 {id:'q15',type:'pinyin',skill:'Pinyin',prompt:'Escribe el pinyin de «persona».',hanzi:'人',answer:'rén',explanation:'人 es rén, con segundo tono. Puedes escribir ren2.',source:'S3 · p. 8'},
 {id:'q16',type:'order',skill:'Preguntas',prompt:'Construye una pregunta de sí/no con los bloques.',hanzi:'她是中国人。',tokens:['吗','中国人','她','是'],answer:'她是中国人吗',explanation:'Añade 吗 al final sin cambiar el orden: 她是中国人吗？',source:'S3 · pp. 37–38 · adaptación'},
 {id:'q17',type:'choice',skill:'Vocabulario',prompt:'¿Cuál de estos países es Alemania?',options:['法国','英国','德国','美国'],answer:'德国',explanation:'德国 (Déguó) = Alemania; 法国 = Francia; 英国 = Reino Unido; 美国 = Estados Unidos.',source:'S3 · pp. 12–16'},
 {id:'q18',type:'order',skill:'Diálogo',prompt:'Ordena: «¿Cuál es tu apellido?».',tokens:['什么','你','姓'],answer:'你姓什么',explanation:'什么 ocupa el lugar del apellido que quieres conocer: 你 + 姓 + 什么？',source:'S2 · pp. 16–17'},
 {id:'q19',type:'choice',skill:'Preguntas',prompt:'¿Necesita 吗 esta pregunta?',hanzi:'你是哪国人？',options:['Sí, al final.','No, 哪 ya pregunta qué país.'],answer:'No, 哪 ya pregunta qué país.',explanation:'Aquí se pregunta qué nacionalidad, no si una afirmación es verdadera. No añadas 吗.',source:'S3 · pp. 29–31'},
 {id:'q20',type:'pinyin',skill:'Pinyin',prompt:'Escribe el pinyin de la partícula de pregunta.',hanzi:'吗',answer:'ma',explanation:'吗 se pronuncia ma, con tono neutro. Aceptamos ma y ma5 (también ma0).',source:'S3 · pp. 37–38'},
 {id:'q21',type:'choice',skill:'Pronombres',prompt:'他 y 她…',options:['Se escriben igual.','Se pronuncian igual: tā.','Significan «nosotros».'],answer:'Se pronuncian igual: tā.',explanation:'他 («él») y 她 («ella») comparten pronunciación, pero no escritura.',source:'S2 · pp. 30–34'},
 {id:'q22',type:'order',skill:'Negación',prompt:'Ordena: «No me llamo Anna».',tokens:['叫','我','安娜','不'],answer:'我不叫安娜',explanation:'不 va delante del verbo 叫. Se pronuncia bú porque jiào tiene cuarto tono.',source:'S3 · pp. 39–41 · ejemplo creado'},
 {id:'q23',type:'choice',skill:'Diálogo',prompt:'Alguien dice 认识你很高兴. ¿Qué respuesta encaja?',options:['认识你，我也很高兴。','你姓什么？','不是。'],answer:'认识你，我也很高兴。',explanation:'«Yo también me alegro de conocerte». 也 aporta «también».',source:'S2 · pp. 9–11'},
 {id:'q24',type:'choice',skill:'Nacionalidades',prompt:'Completa «una persona francesa».',hanzi:'法国 ___',options:['们','吗','人','不'],answer:'人',explanation:'En estos gentilicios, añadimos 人 al país: 法国 + 人 = 法国人。',source:'S3 · p. 13'},
 {id:'q25',type:'choice',skill:'Diálogo',prompt:'Te preguntan qué tal estás. ¿Qué respuesta encaja?',hanzi:'你怎么样？',options:['我姓王。','我是中国人。','很好。','再见。'],answer:'很好。',explanation:'你怎么样？ (Nǐ zěnmeyàng?) pregunta «¿Qué tal estás?». 很好 (hěn hǎo) responde «Muy bien». También has trabajado 不错, 还可以 y 不太好.',source:'S2 · pp. 36–43'},
 {id:'x1',type:'choice',skill:'Ampliación',prompt:'¿Qué significa 谢谢?',hanzi:'谢谢',options:['Gracias','Adiós','Hola'],answer:'Gracias',explanation:'谢谢 (xièxie) significa «gracias». Es vocabulario extra propuesto, fuera del núcleo de U2.',source:'Ampliación · práctica creada',extra:true},
 {id:'x2',type:'pinyin',skill:'Ampliación',prompt:'Escribe el pinyin de «amigo / amiga».',hanzi:'朋友',answer:'péngyou',explanation:'朋友 es péngyou: segundo tono y tono neutro. Puedes escribir peng2you5.',source:'Ampliación · práctica creada',extra:true},
];

questions.push(...session4Questions);

export function sessionsForSource(source){
 const ids=[...String(source).matchAll(/\bS([1-9]\d*)\b/g)].map(m=>+m[1]);
 if(String(source).includes('U1'))ids.push(1);
 return [...new Set(ids)];
}
export function vocabularyForSession(session){
 const list=vocabulary.filter(v=>v.extra||sessionsForSource(v.source).includes(Number(session)));
 return Number(session)===4?list.sort((a,b)=>session4Priority(a)-session4Priority(b)):list;
}

// Recognition links a known sound to its written form; no Chinese keyboard is required.
const coreWords=vocabulary.filter(v=>!v.extra);
for(const [index,v] of coreWords.entries()){
 const distractors=coreWords.filter(other=>other.hanzi!==v.hanzi).sort((a,b)=>Math.abs(a.hanzi.length-v.hanzi.length)-Math.abs(b.hanzi.length-v.hanzi.length)).slice(0,3).map(other=>other.hanzi);
 distractors.splice(index%4,0,v.hanzi);
 const homophone=coreWords.some(other=>other.id!==v.id&&other.pinyin.toLowerCase()===v.pinyin.toLowerCase());
 questions.push({id:'rec-'+v.id,type:'choice',kind:'recognition',skill:'Reconocer caracteres',prompt:'Reconoce la palabra escrita.',cue:v.pinyin,cueMeaning:homophone?v.meaning:'',options:distractors,answer:v.hanzi,explanation:`${v.hanzi} se lee ${v.pinyin} y significa «${v.meaning}». Fíjate en su forma e intenta reconocerla sin la ayuda del pinyin.`,source:v.source});
}
questions.push(
 {id:'rec-renshi-phrase',type:'choice',kind:'recognition',skill:'Reconocer caracteres',prompt:'Ya sabes decirlo. ¿Cómo se escribe?',cue:'Rènshi nǐ hěn gāoxìng',options:['你叫什么名字？','认识你很高兴。','我是中国人。','你是哪国人？'],answer:'认识你很高兴。',explanation:'认识 = rènshi (conocer); 你 = nǐ (tú); 很 = hěn; 高兴 = gāoxìng (contento). La expresión significa «Encantado/a de conocerte».',source:'S2 · pp. 9–11'},
 {id:'rec-renshi-build',type:'order',kind:'recognition',skill:'Reconocer caracteres',prompt:'Construye en caracteres la frase que conoces.',cue:'Rènshi nǐ hěn gāoxìng',tokens:['高兴','很','认识','你'],answer:'认识你很高兴',explanation:'Une los sonidos con sus formas: 认识 (rènshi) + 你 (nǐ) + 很 (hěn) + 高兴 (gāoxìng).',source:'S2 · pp. 9–11'},
 {id:'rec-names-phrase',type:'choice',kind:'recognition',skill:'Reconocer caracteres',prompt:'Encuentra la pregunta que sabes decir.',cue:'Nǐ jiào shénme míngzi?',options:['你姓什么？','你是哪国人？','你叫什么名字？','你是中国人吗？'],answer:'你叫什么名字？',explanation:'你 (nǐ) + 叫 (jiào) + 什么 (shénme) + 名字 (míngzi). Preguntas cómo se llama la otra persona.',source:'S2 · pp. 16, 27–28'},
 {id:'rec-country-phrase',type:'order',kind:'recognition',skill:'Reconocer caracteres',prompt:'Construye en caracteres la frase que conoces.',cue:'Wǒ shì Xībānyárén',tokens:['西班牙人','是','我'],answer:'我是西班牙人',explanation:'我 (wǒ) + 是 (shì) + 西班牙人 (Xībānyárén): «Soy español/a».',source:'S3 · pp. 20–21'},
 {id:'rec-zenmeyang-phrase',type:'choice',kind:'recognition',skill:'Reconocer caracteres',prompt:'Reconoce la pregunta «¿Qué tal estás?».',cue:'Nǐ zěnmeyàng?',options:['你叫什么名字？','你怎么样？','你姓什么？','你是哪国人？'],answer:'你怎么样？',explanation:'你 (nǐ) + 怎么样 (zěnmeyàng) = «¿Qué tal estás?». En este saludo no se añade 吗.',source:'S2 · pp. 36–43'},
 {id:'f1',type:'choice',kind:'foundation',introOnly:true,skill:'Iniciales y finales',prompt:'En mā, ¿cuál es la inicial?',options:['m','a','ā','ma'],answer:'m',explanation:'m es la consonante inicial; a es la final y la raya indica el primer tono.',source:'S1 · pinyin, pp. 2–5'},
 {id:'f2',type:'choice',kind:'foundation',introOnly:true,skill:'Iniciales y finales',prompt:'En nǐ, ¿cuál es la final?',options:['n','i','ni','3'],answer:'i',explanation:'La sílaba se compone de inicial n, final i y tercer tono.',source:'S1 · pinyin, pp. 2–5'},
 {id:'f3',type:'choice',kind:'foundation',introOnly:true,skill:'Tonos',prompt:'¿Qué sílaba lleva segundo tono?',options:['mā','má','mǎ','mà'],answer:'má',explanation:'El segundo tono asciende y se escribe con acento agudo: má.',source:'S1 · pinyin, pp. 6–9'},
 {id:'f4',type:'choice',kind:'foundation',introOnly:true,skill:'Tonos',prompt:'¿Qué sílaba lleva cuarto tono?',options:['mǎ','má','mā','mà'],answer:'mà',explanation:'El cuarto tono desciende y se escribe con acento grave: mà.',source:'S1 · pinyin, pp. 6–9'},
 {id:'f5',type:'choice',kind:'foundation',introOnly:true,skill:'Iniciales y finales',prompt:'¿Qué grupo contiene solo vocales básicas del pinyin?',options:['a, o, e, i, u, ü','b, p, m, f','zh, ch, sh, r','z, c, s'],answer:'a, o, e, i, u, ü',explanation:'Estas seis vocales sirven de base al estudio de las finales.',source:'S1 · pinyin, pp. 2–3, 9'},
 {id:'f6',type:'choice',kind:'foundation',introOnly:true,skill:'Iniciales y finales',prompt:'¿Cuál de estas finales termina en -ng?',options:['an','en','ang','in'],answer:'ang',explanation:'an termina en -n; ang termina en -ng. Conviene practicar la diferencia escuchando un modelo.',source:'S1 · pinyin, p. 3'},
 {id:'f7',type:'choice',kind:'foundation',introOnly:true,skill:'Caracteres y trazos',prompt:'¿Cuál es la regla general de orden entre un trazo horizontal y uno vertical que se cruzan?',options:['Vertical antes de horizontal','Horizontal antes de vertical','Siempre da igual'],answer:'Horizontal antes de vertical',explanation:'Es una regla general de orden de trazos que aparece en los materiales. Consulta el modelo concreto para cada carácter.',source:'S1 · El idioma chino, pp. 57–65'},
 {id:'f8',type:'choice',kind:'foundation',introOnly:true,skill:'Caracteres y trazos',prompt:'En 认识 (rènshi), ¿cuántos caracteres ves?',hanzi:'认识',options:['Uno','Dos','Tres'],answer:'Dos',explanation:'La palabra 认识 tiene dos caracteres: 认 y 识. Una palabra no tiene por qué corresponder a un único carácter.',source:'S1 · El idioma chino, pp. 25–27; S2 · pp. 9–11'}
);
for(const q of questions)q.sessionIds=sessionsForSource(q.source);

const marks = {ā:'a1',á:'a2',ǎ:'a3',à:'a4',ē:'e1',é:'e2',ě:'e3',è:'e4',ī:'i1',í:'i2',ǐ:'i3',ì:'i4',ō:'o1',ó:'o2',ǒ:'o3',ò:'o4',ū:'u1',ú:'u2',ǔ:'u3',ù:'u4',ǖ:'v1',ǘ:'v2',ǚ:'v3',ǜ:'v4'};
export function normalizePinyin(value) {
  let s=String(value).trim().toLowerCase().normalize('NFC').replace(/u:/g,'v').replace(/ü/g,'v');
  // Each syllable begins with a vowel or an optional initial; a tone digit closes it.
  s=s.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g,c=>marks[c]);
  s=s.replace(/([a-zv]*)([1-4])([a-zv]*)/g,(_,a,t,b)=>a+b+t);
  return s.replace(/[\s'’·-]/g,'').replace(/[05]/g,'');
}
export function normalizeHanzi(value) { return String(value).normalize('NFKC').replace(/[\s。！？?!，,.、]/g,''); }
export function isCorrect(question,value) {return question.type==='pinyin' ? normalizePinyin(value)===normalizePinyin(question.answer) : question.type==='text'||question.type==='order' ? normalizeHanzi(value)===normalizeHanzi(question.answer) : value===question.answer;}
export function makeSession(records,extra=false,mode='daily',random=Math.random,now=Date.now(),filters={}) {
  const pool=questions.filter(q=>!q.introOnly&&(extra||!q.extra)&&(!filters.session||q.extra||q.sessionIds.includes(Number(filters.session)))&&(!mode.startsWith('recognition')||q.kind==='recognition')&&(mode!=='recognition-phrases'||q.phrase||['rec-renshi-phrase','rec-renshi-build','rec-names-phrase','rec-country-phrase','rec-zenmeyang-phrase'].includes(q.id))&&(mode!=='foundation'||q.kind==='foundation'));
  const selected=mode==='errors' ? pool.filter(q=>(records[q.id]?.errors||0)>0 && !(records[q.id]?.resolved)) : pool;
  return selected.map(q=>({q,rank:random()+(!records[q.id]?3:records[q.id].due<=now?records[q.id].resolved?2:0:5)})).sort((a,b)=>a.rank-b.rank).slice(0,8).map(x=>x.q);
}
export function updateRecord(previous,correct,now=Date.now()) {
  const old=previous||{attempts:0,correct:0,errors:0,streak:0};
  const streak=correct?old.streak+1:0;
  return {attempts:old.attempts+1,correct:old.correct+(correct?1:0),errors:old.errors+(correct?0:1),streak,resolved:correct,last:now,due:now+(correct?[1,3,7,14][Math.min(streak-1,3)]*86400000:600000)};
}
