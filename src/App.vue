<script setup>
  import AppCompQuizList from './components/AppCompQuizList.vue'
  import AppCompWelcome from './components/AppCompWelcome.vue'
  import TimerComponent from './components/TimerComponent.vue'
  import quizData from './db/quizData'
 
  import { ref, provide } from 'vue'
  
  const gameStarted = ref(false) 
const timerState = ref('')
const updateTimerState= (state)=>{
    timerState.value = state
  }
  provide("timerState", {timerState, updateTimerState
});


  const startQuiz = ()=>{
console.log("Starting guiz!!!!")
    gameStarted.value = true
  }
</script>

<template>
    <div class="wrapper">
     <h1>Start wars Quiz</h1>
    <timer-component v-if="gameStarted" @vtimer-state="(state)=>{
    
      updateTimerState(state)
      } "/>
      
    
     <app-comp-welcome v-if="!gameStarted" @start-game="startQuiz"/>
     <app-comp-quiz-list v-if="gameStarted && quizData" :quiz-list="quizData"/>
    </div>
  <main>
   
  </main>
</template>

<style scoped>

*{
  padding: 0;
  margin: 0;
}

.quiz{
  width:40%;
  height: 900px;
  /*background-color: aquamarine;*/
  position: relative;
  margin:2% 25% ;
  padding:20px;background-color: #ffffff;
  -webkit-box-shadow: 0 1px 10px 3px rgba(0,0,0,0.3);
  -moz-box-shadow: 0 1px 10px 3px rgba(0,0,0,0.3);
  box-shadow: 0 1px 10px 3px rgba(0,0,0,0.3);
}
</style>
