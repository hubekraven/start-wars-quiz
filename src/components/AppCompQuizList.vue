<!-- Main Component to manage all quiz -->
<script setup>
import {
  shuffleArray,
  searchInArray
} from "../assets/shared/genralFunctions" // importing Methods from external js

import AppCompQuiz from '@/components/AppCompQuiz.vue'
import AppCompResult from '@/components/AppCompResult.vue'

const props = defineProps({
  quizList: {
    type:Array,
    default(rawProps){
      return []
    }
  }
})
const QzPool = shuffleArray(props.quizList)
//======reactives variables
let index = 0;
// let userResponses = [];
// let tempChoice = [];
      

let state = {
  question: QzPool[index],
  isCompleted: false,
}

//======END reactives variables


  
</script>

<template>
  <app-comp-quiz v-show="!state.isCompleted" :quiz="state.question"/>
  
</template>

<style lang="scss" scoped>

</style>