import assert from 'node:assert/strict';
import {classes,dialogues} from '../classes.js';
import {vocabulary,questions,grammarForSession,makeSession,isCorrect} from '../data.js';
import {cardsForScope,cardLibrary} from '../cards.js';
import {session5Questions} from '../session5.js';
import {bookSupportHTML} from '../book-support.js';
assert.deepEqual(classes.map(c=>c.id),[1,2,3,4,5]);
assert.deepEqual([1,2,3,4].map(n=>cardsForScope('s'+n).length),[15,41,31,42]);
const deck=cardsForScope('s5');assert.equal(deck.length,27);
for(const h of ['不好意思','对不起','没关系','谢谢','不客气','我不知道','知道','但是','爱','我爱你','很好','还可以','不太好'])assert.ok(deck.some(c=>c.hanzi===h),h);
assert.deepEqual(deck.slice(0,6).map(c=>c.hanzi),['不好意思','对不起','没关系','谢谢','不客气','我不知道']);
assert.equal(vocabulary.filter(v=>v.extra).length,1);assert.equal(questions.find(q=>q.id==='x1').extra,false);
assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
assert.equal(new Set(cardLibrary.map(c=>c.id)).size,cardLibrary.length);
for(const q of session5Questions){assert.ok(isCorrect(q,q.answer),q.id);if(q.options)assert.equal(q.options.filter(x=>x===q.answer).length,1);}
assert.ok(isCorrect(questions.find(q=>q.id==='s5-thanks-pinyin'),'xie4xie5'));
assert.ok(isCorrect(questions.find(q=>q.id==='s5-sorry-pinyin'),'dui4bu5qi3'));
assert.ok(!isCorrect(questions.find(q=>q.id==='s5-sorry-pinyin'),'dui4bu4qi3'));
assert.ok(!isCorrect(questions.find(q=>q.id==='s5-sorry-pinyin'),'dui4bu5qi2'));
for(const mode of ['daily','recognition','recognition-phrases']){const batch=makeSession({},false,mode,()=>.2,Date.now(),{session:5});assert.ok(batch.length>0);assert.ok(batch.every(q=>q.sessionIds.includes(5)));}
assert.equal(grammarForSession(5).length,5);assert.ok(dialogues[5].some(l=>l[1].includes('不知道')));
assert.ok(bookSupportHTML(5).includes('02-9'));assert.ok(!bookSupportHTML(5).includes('book-s5'));
console.log('PASS: S5 coverage, promoted vocabulary, answer validation and scoped practice.');
