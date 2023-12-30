

<script setup>
import { ref, computed,watch, onMounted, toRefs, inject, onUpdated } from 'vue'
import gsap  from "gsap"

const props = defineProps({
  timerCounter:{
    type: Number,
    default(){
      return 1
    }
  }
})

let counter = ref(0)
let elapseTime = ref(0)
const {timerCounter:max} = toRefs(props) //in Minutes
const tModifier= ref(null)
const tChanger= ref(null)
const timerState = ref('stopped')
counter.value = max.value * 60
const $emit = defineEmits(['vtimer-state'])

//const updateTimerState = inject('')
const start =()=>{
 
  if(counter.value >0 && timerState.value !=="running") 
    elapseTime.value = setInterval(() => {
      if(counter.value <= 0) return 
      counter.value -= 1
  }, 1000)
  timerState.value ='running'
  $emit('vtimer-state', timerState.value)
  
}

const stop =()=>{
  clearInterval(elapseTime.value)
  timerState.value ='stopped'
  $emit('vtimer-state',timerState.value )
}


const reset =()=>{
  counter.value = max.value * 60
}

/** 
 * @description- add inscrease the current time by x value
 * @param {Number} t - time in second  
*/
const increaseTime = (t)=>{
  console.log("Time Count: ", {t:t*60, init:counter.value, after:counter.value+t*60})
  tModifier.value = `+${formatTime(t*60)}`
  stop()
  playTimeAnim("increase", t)
}


/** 
 * @description- add inscrease the current time by x value
 * @param {Number} t - time in second  
*/
const decreaseTime = (t)=>{
  console.log("Time Count: ", {t:t*60,init:counter.value, after:counter.value-t*60})
  tModifier.value = `-${formatTime(t*60)}`
  stop()
  playTimeAnim("decrease", t)    
  
}


  const playTimeAnim =(anim, t)=>{
  tChanger.value.classList.toggle(`-${anim}`);
    gsap.to(tChanger.value,{
      keyframes:[{scale:2, opacity:1, duration: 0.2},{scale:1,opacity:0, duration: 0.7}],
      ease:"power1.inOut"
    })
    gsap.to(counter.value, {
      duration: 0.5, 
      delay:0.8,
      onUpdate:()=>{
        if(anim === 'increase') return  counter.value+=(t*60)
        
        if(anim==="decrease"){
          if(counter.value <=0) return 0
          return counter.value=counter.value-(t*60)
        }
      },
      onComplete:()=> {
        tChanger.value.classList.toggle(`-${anim}`);
        start()
      } 
    })
}
// Properties to expose from this component
defineExpose({
  start, stop, reset, increaseTime, decreaseTime
})
const formatTime = (seconds)=> {
      let d = new Date(null) //create a default date ref
      d.setSeconds(seconds) //set the time with passed numbers of seconds
      let ISOTime = d.toISOString().substr(14, 5) //convert the date in ISO 8601 format and get all only the time portion of it
      return ISOTime // time format 00:00:00
    }

const time = computed(() => {
  return formatTime(counter.value)
})


const TMinutes = computed(() => {
  return counter.value % 60
})

  watch( counter, ()=> {
  
      if(counter.value == 0) {
        timerState.value = 'done'        
        $emit('vtimer-state',timerState.value )
          setTimeout(() => {
            stop()
          }, 500);
      }
  })
  

</script>

<template>
  <div>
          
  <h2>TIMER </h2><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16">
  <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z"/>
  <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3"/>
</svg>
<span class="ct-time">{{time}}</span> 
<span v-show="tModifier" class="ct-changer" ref="tChanger">{{tModifier}}</span>
  </div>
 
 </template>

<style lang="css" scoped>
.ct-changer{
  display:none
}

.-increase{
  display:inline-block;
  font-size:1.3em;
  color: green;
}

.-decrease{
  display:inline-block;
  font-size:1.3em;
  color: red;
}
</style>