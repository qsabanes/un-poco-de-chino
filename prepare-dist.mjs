import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir(new URL('./dist/',import.meta.url),{recursive:true});
for(const name of ['index.html','styles.css','app.js','data.js','classes.js','pronunciation.js','twisters.js','pronunciation-data.js','pronunciation-sources.txt','cards.js','hsk-data.js','hsk-sources.txt','sw.js','icon.svg','manifest.webmanifest'])await copyFile(new URL('./'+name,import.meta.url),new URL('./dist/'+name,import.meta.url));
console.log('App preparada en dist/.');

await cp(new URL('./audio/',import.meta.url),new URL('./dist/audio/',import.meta.url),{recursive:true});
