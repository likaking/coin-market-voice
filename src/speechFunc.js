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
   
   
 export function vCoin() {
	  
	  console.log('running speech function')
    
  //  hideCmvErrorsx();
   
 //  setIsPlaying(true);
 //  setRunOrStop(true);

     speech.speak({
     text: 'hi!, I am building a crypto prices voicing App for Bigo babes',
     queue: false,
     listeners: {
     onstart: () => {
   //  setCmvAction("Playing...");
              
     },
     onend: () => {
   //  setCmvAction("Thanks 4 Listening")
     },
     onresume: () => {
   //  setCmvAction("Resumed")
     },
     onpause: () => {
   //  setCmvAction("Paused...");
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
   //  setCmvErrorsx("An error occurred :", e)
     });speech.resume();
     }

 export const pause = ()=>{
      //setRunOrStop(false);
      speech.pause();
      //setIsPlaying(false)
    }