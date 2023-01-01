import Speech from 'speak-tts'



if(typeof window !== 'undefined'){
var speech = new Speech() // will throw an exception if not browser supported
if(speech.hasBrowserSupport()) { // returns a boolean
//console.log("speech synthesis supported")
}


speech.init({
volume: 1,
// lang: currentLang,
rate: 1,
pitch: 1,
//  voice:currentVoice,
'splitSentences': false,
listeners: {
onvoiceschanged: (voices) => {
}
}
})
.then((data) => {
})
.catch((e) => {
setCmvErrorsx("An error occurred :", e)
});
}
   
  
export function Voicecoin(compMsg,setCmvAction,setCmvErrorsx) {
	
    
//  hideCmvErrorsx();
   
//  setIsPlaying(true);
//  setRunOrStop(true);

speech.speak({
text: compMsg,
queue: false,
listeners: {
onstart: () => {

setCmvAction("Playing...");
            
},
onend: () => {
setCmvAction("The end!")
},
onresume: () => {
//setCmvAction("Resumed")
},
onpause: () => {
//setCmvAction("Paused...");
},
          
onboundary: (event) => {
/*
console.log(
event.name +
" boundary reached after " +
event.elapsedTime +
" milliseconds."
);
*/
}
}
})
.then((data) => {   
})
.catch((e) => {
setCmvErrorsx("An error occurred :", e)
});
speech.resume();
}

export const pause = ()=>{
speech.pause();
}
	
export const stop = ()=>{
speech.cancel();
}