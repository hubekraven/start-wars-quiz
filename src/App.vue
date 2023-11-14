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
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
