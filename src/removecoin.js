import React, {Suspense, useState,useEffect,useRef} from 'react';
import Home from '../pages/index.js'
import {data1,Speech} from '../pages/index.js'
import axios from 'axios'
import styles from '../styles/RemoveCoin.module.css'
import {FaTrashAlt} from 'react-icons/fa'
import {addCoin,buy,activeCoins,AddCrypto,coinIsexistinErr} from '../src/addcoin.js'
import {FaBars,FaPlay,FaPause,FaPlayCircle,FaRegPlayCircle,FaRegPauseCircle} from 'react-icons/fa'
import {Voicecoin,pause} from '../src/speechFunc.js'



export function DisplayCoin({activeCoins,buy,setBuy,setActiveCoins,Speech,setQuickData,setCoinArr,playCoinInfo,setPlayCoinInfo,paused,setPaused}){
const deleteIcon = useRef([])
const playIcon = useRef([])
const pauseIcon = useRef([])
const [currentPlay,setCurrentPlay]  = useState()

const [play,setPlay] = useState(false)


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

pauseIcon.current[trackPlayed[previousPlay]].style.display = 'none'	
playIcon.current[trackPlayed[previousPlay]].style.display = 'block'	
}	
*/
}

const playVoice = (num,coinId)=>{

playIcon.current[num].style.display = 'none'		
pauseIcon.current[num].style.display = 'block'

}

const addCoinId = (coinId)=>{
setPlayCoinInfo(coinId);

}

const pauseVoice = (num,coinId)=>{
pauseIcon.current[num].style.display = 'none'	
playIcon.current[num].style.display = 'block'	
pause()	
}

return(
<>
<div className={styles.displayCoin}>
<div className={styles.displayCoin_main}>
<div className={styles.displayCoin_screen}>
{
activeCoins && activeCoins.length > 0 && activeCoins.map((display,i)=>
<div key = {display.symbol+i} className={styles.displayCoin_container} 
onMouseEnter = {()=>{deleteIcon.current[i].style.display = 'block'}}   
onMouseLeave = {()=>{deleteIcon.current[i].style.display = 'none'}} >
<img src = {display.image} alt ={display.name} className={styles.displayCoin_img}/>
<div  className={styles.displayCoin_name}>{display.symbol !== undefined? display.symbol.toUpperCase() : ''}</div>
<div className={styles.displayCoin_delete} ref = {(el)=> {deleteIcon.current[i] = el}}>
<div className={styles.displayCoin_playNdelete}> <div className={styles.displayCoin_playNpause}> 
<span  key = {display.name+'play'+i}  className={styles.displayCoin_playIcon} ref = {(myPlayIcon)=> playIcon.current[i] = myPlayIcon} 
onMouseDown = {()=> {playVoice(i,display.id);resetPlayed(i);addCoinId(display.id);Voicecoin('Like A King Company')}}  > <FaRegPlayCircle style={{verticalAlign:'bottom'}} /> </span> 
<span  key = {display.name+'pause'+i}  className={styles.displayCoin_pauseIcon} style = {{display: play ? 'block' : 'none'}} 
ref = {(myPlayIcon)=> pauseIcon.current[i] = myPlayIcon} onMouseDown = {()=> pauseVoice(i,display.id)}>
<FaRegPauseCircle /> </span> </div> <div className={styles.displayCoin_deleteIcon_container}><FaTrashAlt className={styles.displayCoin_deleteIcon}  onClick={()=>{removeAsset(display.id)}}/></div> </div>
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