<script setup>
  import AppCompQuizList from './components/AppCompQuizList.vue'
  import AppCompWelcome from './components/AppCompWelcome.vue'
  import AppCompResult from './components/AppCompResult.vue'
  import TimerComponent from './components/TimerComponent.vue'
  import quizData from './db/quizData'
  import { ref, provide, computed, } from 'vue'
  
  const gameStarted = ref(false) 
  const timerState = ref('')
  const endResult= ref(null)
  const componentToShow = ref('AppCompWelcome')
  
  const maxQuestion=5
  
  const updateTimerState= (state)=>{
    timerState.value = state
  }

  const updateComponentToShow = (comp)=>{
    componentToShow.value = comp
  }  
  

  provide("timerState", {timerState, updateTimerState})
  provide("componentToShow", {componentToShow, updateComponentToShow});
  
  const startQuiz = ()=>{
    gameStarted.value = true
    componentToShow.value = 'AppCompQuizList'
  }

  const showResult = (res)=>{
    endResult.value = res
    componentToShow.value = 'AppCompResult'
      
  }

  const exitQuiz = (res)=>{
    componentToShow.value = 'AppCompWelcome'
  }

  const currentComponent = computed(() => {
    let comp = {}
    switch(true){
      
      case componentToShow.value === 'AppCompWelcome':
        comp = {name:AppCompWelcome, id:'app_comp_wel', props:false, evt:{'start-game':startQuiz}}
      break

      case componentToShow.value === 'AppCompQuizList':
        comp = {name:AppCompQuizList, id:'app_comp_quiz', props:{'quiz-list':quizData, 'quiz-limit': maxQuestion}, evt:{'quiz-over': showResult}}  
      break

      case componentToShow.value === 'AppCompResult':
  
        comp = {name:AppCompResult, id:'app_comp_res', props:{'quiz-result':endResult,'quiz-limit': maxQuestion}, evt:{'reset-quiz': startQuiz, 'exit-quiz': exitQuiz}}  
      break
    }

    return comp
  })

</script>

<template>
    <div class="wrapper">
     <h1>Start wars Quiz</h1>
       <Transition name="fade"  mode="out-in" :duration="{ enter: 500, leave: 650 }">
          <component :is="currentComponent.name" v-on="currentComponent.evt" v-bind="currentComponent.props"></component>
        </Transition>
    </div>
  <main>
   
  </main>
</template>

<style>

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


 .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
/* delay leave of parent element */
 .slide-fade-leave-active {
  transition-delay: 0.25s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
