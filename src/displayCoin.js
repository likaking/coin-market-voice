import React, {Suspense, useState,useEffect,useRef} from 'react';
import Home from '../pages/index.js'
import {data1,Speech} from '../pages/index.js'
import axios from 'axios'
import styles from '../styles/DisplayAllCoins.module.css'
import {FaTrashAlt} from 'react-icons/fa'
import {addCoin,buy,activeCoins,AddCrypto,coinIsexistinErr} from '../src/addcoin.js'
import {FaBars,FaPlay,FaPause,FaPlayCircle,FaRegPlayCircle,FaRegPauseCircle,FaRegStopCircle} from 'react-icons/fa'
import {Voicecoin,pause,stop} from '../src/speechFunc.js'



export default function DisplayCoin({activeCoins,buy,setBuy,setActiveCoins,Speech,setQuickData,setCoinArr,playCoinInfo,setPlayCoinInfo,paused,setPaused,finalComp,setFinalComp,
currency,setCurrency,cmvErrorsx,setCmvErrorsx,currencySingular,currencyPlural,cmvAction,setCmvAction}){
	
const deleteIcon = useRef([])
const playIcon = useRef([])
const stopIcon = useRef([])
const currentIndex = useRef(null)

const [currentPlay,setCurrentPlay]  = useState()
const [play,setPlay] = useState(false)
const [coinInfoArr,setCoinInfoArr] = useState([])
const [finalInfoComp,setFinalInfoComp] = useState([])
const [playCounter,setPlayCounter] = useState(0)




const removeAsset = async(asset)=>{
if(buy.indexOf(asset) !== -1){
const findIndexOfAsset = buy.indexOf(asset)
const filtered = new Promise((resolve,reject)=> {resolve(activeCoins.filter((removeAsset)=>{
return removeAsset.id !== asset 
}))});
   
let result = await filtered
setActiveCoins(result);
setBuy(buy.filter(del=>  del !== asset));
()=>{Speech.cancel()};
setCoinArr([])
setQuickData(true);
}
else{
return false
}
}

var trackPlayed = []



const resetPlayed = (num)=>{
	/*
trackPlayed.unshift(num)

var previousPlay = trackPlayed[0 + 1] 

console.log(trackPlayed)



if ( trackPlayed[0] === trackPlayed[0 + 1]){
	
	trackPlayed.length = []
}


if(trackPlayed.length > 1){

console.log(previousPlay)
console.log(trackPlayed[0], trackPlayed[0 + 1])

stopIcon.current[trackPlayed[previousPlay]].style.display = 'none'	
playIcon.current[trackPlayed[previousPlay]].style.display = 'block'	
}	
*/
}

useEffect(()=>{
const playEachCoinMsg = ()=>{
const playEachCoinInfo = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLocaleLowerCase()}&ids=${playCoinInfo}
&order=market_cap_desc&per_page=250&page=1&sparkline=false`
axios.get(playEachCoinInfo).then((res)=>{setCoinInfoArr(res.data)}).catch((err)=>{setCmvErrorsx("can't get coin info")})
}
  
paused && playCoinInfo !== '' && playEachCoinMsg();
 
},[playCoinInfo])

const recompInfoArr = []


const composeMsg = async()=>{

let allNews  =  await coinInfoArr.map((news)=>{ 
let priceFlow = Math.floor(news.current_price) > 1 ?  currencyPlural : currencySingular;
let fixPricePrecision = news.current_price >= 1 ? news.current_price.toLocaleString() : news.current_price < 0.1 ? news.current_price : news.current_price.toFixed(2);
var composeInfo = news.name + ' is trading @ ' + fixPricePrecision  + ' ' + priceFlow +', with a price change of '+ Number(news.price_change_percentage_24h).toFixed(1) + '%'
var recomp = composeInfo.replace(/\./g,' point ')
recompInfoArr.push(recomp +' ' + ' ' + ' ' + ' '+ ' ')
})
setFinalInfoComp(recompInfoArr.toString()); 
//setFinalInfoComp('')
}

useEffect(()=>{
composeMsg()
},[coinInfoArr])

useEffect(()=>{
Voicecoin(finalInfoComp,setCmvAction=setCmvAction,setCmvErrorsx=setCmvErrorsx,currentIndex.current,playIcon,stopIcon,null)
},[finalInfoComp])



const playVoice = (num,coinId)=>{
stop()
addCoinId(coinId)
playIcon.current[num].style.display = 'none'		
stopIcon.current[num].style.display = 'block'
currentIndex.current = num;
setPaused(true)
}

const addCoinId = (coinId)=>{
setPlayCoinInfo(coinId);
setCmvErrorsx('')
}

const stopVoice = (num,coinId)=>{
stopIcon.current[num].style.display = 'none'	
playIcon.current[num].style.display = 'block'	
stop()	
setPlayCoinInfo('');
setFinalInfoComp([])
}

const MouseEntaEvents = (i,coinId,e)=>{
deleteIcon.current[i].style.display = 'block';
//playIcon.current[i].style.display = 'block'	

}

const MouseLeaveEvents = (i)=>{
deleteIcon.current[i].style.display = 'none';
playIcon.current[i].style.display = 'block';
stopIcon.current[i].style.display = 'none';
}

return(
<>
<div className={styles.displayCoin}>
<div className={styles.displayCoin_main}>
<div className={styles.displayCoin_screen}>
{
activeCoins && activeCoins.length > 0 && activeCoins.map((display,i)=>
<div key = {display.symbol+i} className={styles.displayCoin_container} onMouseEnter = {()=>{MouseEntaEvents(i,display.id)}}  onMouseLeave = {()=>{MouseLeaveEvents(i)}} >
<img src = {display.image} alt ={display.name} className={styles.displayCoin_img}/>
<div  className={styles.displayCoin_name}>{display.symbol !== undefined? display.symbol.toUpperCase() : ''}</div>
<div className={styles.displayCoin_delete} ref = {(el)=> {deleteIcon.current[i] = el}}>
<div className={styles.displayCoin_playNdelete}>

<div className={styles.displayCoin_playNpause}> 
<span  key = {display.name+'play'+i}  className={styles.displayCoin_playIcon} ref = {(myPlayIcon)=> playIcon.current[i] = myPlayIcon} 
onMouseDown = {()=> {playVoice(i,display.id)}}   > 
<FaRegPlayCircle style={{verticalAlign:'bottom'}} />
</span> 

<span  key = {display.name+'pause'+i}  className={styles.displayCoin_stopIcon} style = {{display:'none'}} 
ref = {(mystopIcon)=> stopIcon.current[i] = mystopIcon} onMouseDown = {()=> stopVoice(i,display.id)}  >
<FaRegStopCircle /> 
</span> 
</div> 
<div className={styles.displayCoin_deleteIcon_container}><FaTrashAlt className={styles.displayCoin_deleteIcon}  onClick={()=>{removeAsset(display.id)}}/></div> </div>
</div>
</div>
)   
}
</div>
</div>
</div>
</>
)
}