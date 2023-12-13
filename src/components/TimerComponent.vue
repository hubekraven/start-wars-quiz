

<script setup>
import { ref, computed,watch, onMounted, inject } from 'vue'

let counter = ref(0)
let elapseTime = ref(0)
const max = 10 //in Minutes

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

const formatTime = (seconds)=> {
      let d = new Date(null) //create a default date ref
      d.setSeconds(seconds) //set the time with passed numbers of seconds
      let ISOTime = d.toISOString().substr(14, 5) //convert the date in ISO 8601 format and get all only the time portion of it
      return ISOTime // time format 00:00:00
    }

onMounted(() => {
  start()
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
    <h2>timer- {{time}}</h2>
  </div>
 
 </template>

<style lang="css" scoped>

</style>