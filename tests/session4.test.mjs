import assert from 'node:assert/strict';
import {classes,dialogues} from '../classes.js';
import {vocabulary,questions,sessionsForSource,grammarForSession,makeSession,isCorrect,vocabularyForSession} from '../data.js';
import {cardLibrary,cardsForScope,reviewQueue,flashDefaults,validateFlashState,rateCard} from '../cards.js';
import {session4Vocabulary,session4Questions} from '../session4.js';
import {bookSupport,bookVocabulary} from '../book-support.js';
assert.deepEqual(classes.map(c=>c.id),[1,2,3,4]);
assert.deepEqual(sessionsForSource('S4 · p. 3; S12 · p. 2'),[4,12]);
assert.deepEqual([1,2,3,4].map(n=>cardsForScope('s'+n).length),[15,41,31,42]);
assert.deepEqual(vocabularyForSession(4).filter(v=>!v.extra).slice(0,3).map(v=>v.hanzi),['哪里','呢','谁']);
const s4=cardsForScope('s4');
for(const h of ['哪里','呢','谁','北京','上海','伦敦','东京','纽约','巴黎','香港','马德里','巴塞罗那','赫罗纳','瓦伦西亚','深圳','南京','青田','学生','和','你呢','你们呢','他是谁','你是哪里人'])assert.ok(s4.some(c=>c.hanzi===h),h);
assert.deepEqual(reviewQueue(s4,{},'hanzi',10).slice(0,3).map(c=>c.hanzi),['哪里','呢','谁']);
assert.deepEqual(grammarForSession(4).map(g=>g.id),['where-from','return-question','who','choose-question']);
assert.ok(dialogues[4].some(line=>line[1].includes('哪里')));
assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
for(const q of session4Questions){assert.ok(isCorrect(q,q.answer),q.id);if(q.options)assert.equal(q.options.filter(x=>x===q.answer).length,1);}
assert.equal(isCorrect(questions.find(q=>q.id==='s4-ne-reading'),'ne5'),true);
assert.equal(isCorrect(questions.find(q=>q.id==='s4-nali-reading'),'na3li3'),true);
for(const mode of ['daily','recognition','recognition-phrases']){
 const batch=makeSession({},false,mode,()=>.2,Date.now(),{session:4});assert.ok(batch.length>0);assert.ok(batch.every(q=>q.sessionIds.includes(4)));if(mode==='recognition-phrases')assert.ok(batch.every(q=>q.phrase));
}
// A word first introduced in an optional book deck now belongs to class S4;
// preserve its shared ID and accept existing review records.
const ne=cardLibrary.find(c=>c.hanzi==='呢');assert.ok(ne.decks.includes('s4'));assert.ok(ne.decks.includes('book-s2'));assert.ok(!ne.decks.includes('s2'));
const saved={...flashDefaults(),records:{[ne.id+'::hanzi']:rateCard(null,'good',1000)}};assert.deepEqual(validateFlashState(saved),saved);
assert.ok(bookSupport[4]);assert.equal(bookVocabulary.filter(v=>v.session===4).length,4);assert.equal(cardsForScope('book-s4').length,4);
console.log('PASS: S4 coverage, session parsing, queues, grammar, dialogue, exercise answers and scoped practice; book-to-class progress preserved.');
