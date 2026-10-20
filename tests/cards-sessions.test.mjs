import assert from 'node:assert/strict';
import {vocabulary} from '../data.js';
import {s1Examples} from '../classes.js';
import {cardLibrary,cardsForScope,reviewQueue,rateCard,flashDefaults,validateFlashState,createStudyTools} from '../cards.js';
const s3=cardsForScope('s3'),places=['中国','西班牙','美国','英国','法国','德国','意大利','日本','加泰罗尼亚','秘鲁'];
for(const hanzi of [...places,...places.map(h=>h+'人'),'国','人'])assert.ok(s3.some(c=>c.hanzi===hanzi),hanzi+' must belong to S3');
const first=reviewQueue(s3,{},'hanzi',10,1000);
assert.deepEqual(first.map(c=>c.hanzi),places);
const records=Object.fromEntries(first.map(c=>[c.id+'::hanzi',rateCard(null,'good',1000)]));
const second=reviewQueue(s3,records,'hanzi',10,1001);
assert.ok(second.every(c=>c.hanzi.endsWith('人')));
assert.equal(reviewQueue(s3,{...records,[s3.at(-1).id+'::hanzi']:rateCard(null,'again',1000)},'hanzi',5,62000)[0].id,s3.at(-1).id);
assert.equal(new Set(cardLibrary.map(c=>c.id)).size,cardLibrary.length);
for(const c of cardsForScope('s2'))assert.ok(c.classSource.includes('S2'));
for(const v of vocabulary.filter(v=>!v.extra))assert.ok(cardLibrary.some(c=>c.hanzi===v.hanzi&&c.decks.includes('class')),v.hanzi);
const old={direction:'pinyin',records};assert.deepEqual(validateFlashState(old).records,records);
const state={flashcards:flashDefaults()},ui=createStudyTools({getState:()=>state,save:()=>{},render:()=>{},toast:()=>{},icon:()=>'',escape:String});
ui.onClick({dataset:{cardStart:'s3'}});
assert.ok(ui.html().includes('31 en el mazo'));assert.ok(ui.html().includes('中国'));assert.ok(!ui.html().includes('Zhōngguó'));
ui.onClick({id:'card-reveal',dataset:{}});assert.ok(ui.html().includes('Zhōngguó'));
for(const [scope,words] of [
 ['s1',['我','你','好','叫','你好','再见','北京','汉语','中文','普通话','拼音','汉字']],
 ['s2',['你们','不','很','好','们','老师','请问','谁','汉字','拼音','西班牙人','认识你很高兴','很高兴认识你','认识你我也很高兴','你怎么样','你们怎么样','你叫什么名字','你姓什么','你吃饭了吗','吃了吗']]
])for(const hanzi of words)assert.ok(cardsForScope(scope).some(c=>c.hanzi===hanzi),scope+': '+hanzi);
assert.equal(cardsForScope('s1').length,15);assert.equal(cardsForScope('s2').length,41);
assert.equal(cardsForScope('s1-examples').length,s1Examples.length);
assert.ok(!cardsForScope('active').some(c=>c.hanzi==='烫'));
assert.ok(!cardsForScope('s1').some(c=>c.hanzi==='烫'));
ui.onClick({id:'card-decks',dataset:{}});ui.onClick({dataset:{cardStart:'s1-examples'}});
assert.ok(ui.html().includes('EJEMPLO ILUSTRATIVO DE S1'));
ui.onClick({id:'card-reveal',dataset:{}});assert.ok(ui.html().includes('ejemplo ilustrativo'));
const savedReference={...flashDefaults(),records:{[cardsForScope('s1-examples')[0].id+'::hanzi']:rateCard(null,'good',1000)}};
assert.deepEqual(validateFlashState(savedReference),savedReference);
console.log('PASS: S3 places and nationalities, first/next batches, due-card priority, session membership, stable IDs, progress retention and reveal.');
