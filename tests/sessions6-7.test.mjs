import assert from 'node:assert/strict';
import {classes,dialogues} from '../classes.js';
import {vocabulary,questions,grammarForSession,makeSession,isCorrect,normalizeHanzi,vocabularyForSession} from '../data.js';
import {cardsForScope,cardLibrary,flashDefaults,validateFlashState,rateCard,reviewQueue} from '../cards.js';
import {chineseNumber,numberPinyin,session6Questions} from '../session6.js';
import {session7Questions} from '../session7.js';
import {session7ReviewHTML} from '../session7-review.js';
import {bookSupport,bookVocabulary} from '../book-support.js';
assert.deepEqual(classes.map(c=>c.id),[1,2,3,4,5,6,7]);
assert.deepEqual([1,2,3,4,5].map(n=>cardsForScope('s'+n).length),[15,41,31,42,27]);
assert.equal(cardsForScope('s6').length,37);assert.equal(cardsForScope('s7').length,48);
assert.equal(vocabulary.filter(v=>!v.extra).length,181);
assert.equal(new Set(vocabulary.map(v=>v.id)).size,vocabulary.length);
assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
assert.equal(new Set(cardLibrary.map(c=>c.id)).size,cardLibrary.length);
for(const [n,h,p] of [[0,'零','líng'],[10,'十','shí'],[14,'十四','shí sì'],[40,'四十','sì shí'],[82,'八十二','bā shí èr'],[100,'一百','yì bǎi']]){assert.equal(chineseNumber(n),h);assert.equal(numberPinyin(n),p);}
assert.equal(new Set(Array.from({length:101},(_,n)=>chineseNumber(n))).size,101);
for(const n of [-1,101,1.5])assert.throws(()=>chineseNumber(n),RangeError);
for(const q of [...session6Questions,...session7Questions]){assert.ok(isCorrect(q,q.answer),q.id);if(q.options){assert.equal(new Set(q.options).size,q.options.length,q.id);assert.equal(q.options.filter(o=>o===q.answer).length,1);}if(q.tokens)assert.equal(normalizeHanzi(q.tokens.join('')).split('').sort().join(''),normalizeHanzi(q.answer).split('').sort().join(''),q.id);}
for(const [id,input,ok] of [['s7-mother-reading','ma1ma5',true],['s7-mother-reading','ma1ma1',false],['s7-older-sister-reading','jie3jie0',true],['s7-jinnian-reading','jin1nian2',true],['s6-phone-word','dian4hua4',true]])assert.equal(isCorrect(questions.find(q=>q.id===id),input),ok,id);
for(const n of [6,7])for(const mode of ['daily','recognition','recognition-phrases']){const batch=makeSession({},false,mode,()=>.2,Date.now(),{session:n});assert.ok(batch.length);assert.ok(batch.every(q=>q.sessionIds.includes(n)),n+mode);}
assert.equal(grammarForSession(6).length,5);assert.equal(grammarForSession(7).length,6);
for(const h of ['爸爸','妈妈','哥哥','弟弟','姐姐','妹妹','爷爷','奶奶','外公','外婆','有','没有','家','口','几','多大','了','今年','岁'])assert.ok(cardsForScope('s7').some(c=>c.hanzi===h),h);
assert.ok(!vocabularyForSession(6).some(v=>v.hanzi==='哥哥'));
assert.ok(dialogues[7].some(l=>l[1].includes('五口人')));
const first=reviewQueue(cardsForScope('s7'),{},'hanzi',6,1000);assert.ok(first.every(c=>['爸爸','妈妈','哥哥','弟弟','姐姐','妹妹'].includes(c.hanzi)));
const saved={...flashDefaults(),records:Object.fromEntries(first.map(c=>[c.id+'::hanzi',rateCard(null,'good',1000)]))};assert.deepEqual(validateFlashState(saved),saved);
for(const n of [6,7]){assert.ok(bookSupport[n]);assert.equal(cardsForScope('book-s'+n).length,4);for(const word of bookVocabulary.filter(v=>v.session===n))assert.ok(!cardsForScope('s'+n).some(c=>c.hanzi===word.hanzi));}
assert.ok(session7ReviewHTML(true).includes('class="pinyin"'));assert.ok(!session7ReviewHTML(false).includes('class="pinyin"'));
console.log('PASS: S6/S7 scope, number construction, correct answers, pinyin tones, family coverage, first queue, optional book isolation and saved progress.');
