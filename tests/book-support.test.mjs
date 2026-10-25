import assert from 'node:assert/strict';
import {bookSupport,bookVocabulary,bookSupportHTML,bookEdition} from '../book-support.js';
import {classes} from '../classes.js';
import {cardsForScope,createStudyTools,flashDefaults,rateCard,validateFlashState} from '../cards.js';
assert.deepEqual(classes.map(c=>c.id),[1,2,3,4]);
assert.deepEqual([1,2,3].map(n=>cardsForScope('s'+n).length),[15,41,31]);
assert.equal(cardsForScope('class').length,101);
assert.equal(bookEdition.contentPdfOffset,11);
for(const session of [1,2,3,4]){
 assert.ok(bookSupport[session]);const deck=cardsForScope('book-s'+session);assert.equal(deck.length,4);
 for(const word of bookVocabulary.filter(v=>v.session===session)){
  assert.ok(deck.some(c=>c.hanzi===word.hanzi));assert.ok(!cardsForScope('s'+session).some(c=>c.hanzi===word.hanzi));
  assert.ok(word.source.includes('PDF '+(word.page+11)));
 }
 const html=bookSupportHTML(session,false);assert.ok(html.includes('La sesión marca el orden.'));assert.ok(html.includes('data-card-start="book-s'+session+'"'));
 assert.ok(!html.includes('<span>shēngmǔ</span>'));
}
assert.ok(bookSupportHTML(2).includes('怎么样'));
assert.ok(bookSupportHTML(3).includes('Cataluña y Perú'));
const state={flashcards:flashDefaults()},ui=createStudyTools({getState:()=>state,save:()=>{},render:()=>{},toast:()=>{},icon:()=>'',escape:String});
ui.onClick({dataset:{cardStart:'book-s2'}});assert.ok(ui.html().includes('COMPLEMENTO DEL LIBRO'));
ui.onClick({id:'card-reveal',dataset:{}});assert.ok(ui.html().includes('Camino al chino I · 2.ª ed.'));assert.ok(!ui.html().includes('DE TU CLASE'));
ui.onClick({dataset:{cardRating:'good'}});assert.deepEqual(validateFlashState(state.flashcards),state.flashcards);
console.log('PASS: session-led book mapping, optional decks isolated from class, page references, source labels and progress roundtrip.');
