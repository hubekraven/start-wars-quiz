<script setup>
  import AppCompQuizList from './components/AppCompQuizList.vue'
  import quizData from './db/quizData'

  //const dataQuiz = 
</script>

<template>
    <div class="wrapper">
     <h1>Welcome to the Start wars Quiz</h1> 
     <app-comp-quiz-list v-if="quizData" :quiz-list="quizData"/>
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
