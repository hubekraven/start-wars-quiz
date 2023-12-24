

<script setup>
import { ref, computed,watch, onMounted, inject } from 'vue'

const props = defineProps({
  timerCount: {
    type:Number,
    default(rawProps){
      return 10
    }
  },
})

let counter = ref(0)
let elapseTime = ref(0)
const max = props.timerCount //in Minutes

counter.value = max * 60
const $emit = defineEmits(['vtimer-state'])


const start =()=>{
  if(counter.value >0 ) 
    elapseTime.value = setInterval(() => {
    counter.value -= 1
  }, 1000)
  $emit('vtimer-state', 'started')
  //inject("timerState", 'started');
}

const stop =()=>{
  clearInterval(elapseTime.value)
  $emit('vtimer-state', 'stopped')
  //inject("timerState", 'stopped');
}

/** 
 * @description- add inscrease the current time by x value
 * @param {Number} t - time in second  
*/
const increaseTime = (t)=>{
  counter.value+=t
}

/** 
 * @description- add inscrease the current time by x value
 * @param {Number} t - time in second  
*/
const decreaseTime = (t)=>{
  counter.value-=t
}

const formatTime = (seconds)=> {
      let d = new Date(null) //create a default date ref
      d.setSeconds(seconds) //set the time with passed numbers of seconds
      let ISOTime = d.toISOString().substr(14, 5) //convert the date in ISO 8601 format and get all only the time portion of it
      return ISOTime // time format 00:00:00
    }

onMounted(() => {
  setTimeout(()=>start(), 2500)
})

const time = computed(() => {
  return formatTime(counter.value)
})


const TMinutes = computed(() => {
  return counter.value % 60
})

  watch(counter, (newValue) => {
  
      if(counter.value == 590) stop()

  })

</script>

<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 24 24" height="32" class="app-icons-svg" fill="red">
  <path d="M12 0H6v2h6V0zM8 13h2V7H8v6zm8.03-6.61 1.42-1.42c-.43-.51-.9-.98-1.41-1.41l-1.42 1.42c-3.88-3.1-9.55-2.47-12.65 1.41S-.5 15.94 3.38 19.04s9.55 2.47 12.65-1.41a8.992 8.992 0 0 0 0-11.24zM9 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7c0 3.86-3.13 7-6.99 7H9z"/>
</svg>

    <h2>TIMER  {{time}}</h2>
  </div>
 
 </template>

<style lang="css" scoped>

</style>