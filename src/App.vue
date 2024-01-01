<script setup>
  import AppCompQuizList from './components/AppCompQuizList.vue'
  import AppCompWelcome from './components/AppCompWelcome.vue'
  import AppCompResult from './components/AppCompResult.vue'
  import TimerComponent from './components/TimerComponent.vue'
  import AppCompDialog from '@/components/AppCompDialog.vue'
  import quizData from './db/quizData'
  // import CompSvg from "./components/CompSvg.vue"
  import { ref, reactive, watch, provide, computed, } from 'vue'
  
  const gameStarted = ref(false) 
  const timerState = ref('')
  const endResult= ref(null)
  const gameMode= ref(null)
  const componentToShow = ref('AppCompWelcome')
  const _transition = reactive({name:'fade', duration:{ enter: 500, leave: 650 }})
  const maxQuestion=3
  const initialTimer=ref(0)
  const isShuffled= false
  const AppTimer=ref(null) //Reference to hold the TimerComponent instance

  const updateTimerState= (state)=>{
    timerState.value = state 
  }

  const updateComponentToShow = (comp)=>{
    componentToShow.value = comp
  }  
  
  const updateGameMode=(e) =>{
      
    gameMode.value = e.target.value
  }
  
  provide("timerState", {timerState, updateTimerState})
  provide("componentToShow", {componentToShow, updateComponentToShow});
  provide("gameMode", {gameMode, updateGameMode});
  
  const startQuiz = ()=>{
    gameStarted.value = true
    componentToShow.value = 'AppCompQuizList'
    AppTimer.value.reset()
    setTimeout(()=>{
      console.log('Start Quiz call StartTime')
      AppTimer.value.start() //Initialize the timer after 1s
    }, 800)
  }

  const exitQuiz = (res)=>{
    componentToShow.value = 'AppCompWelcome'
    gameStarted.value = false
  }

  const showResult = (res)=>{
    
    console.log("timer state: ", timerState.value)  
    if(timerState.value == 'running') AppTimer.value.stop() //stop the timer

    endResult.value = res
    componentToShow.value = 'AppCompDialog'
    
    setTimeout(()=>{
      componentToShow.value = 'AppCompResult'
    }, 2000)
      
  }

  const handleAnswer=(res)=>{
      if(gameMode.value === "normal") return

      if(res==="CORRECT") AppTimer.value.increaseTime(1)
      if(res === "INCORRECT")AppTimer.value.decreaseTime(0.5)
  }

  const currentComponent = computed(() => {
    let comp = {}
    switch(true){
      
      case componentToShow.value === 'AppCompWelcome':
        comp = {name:AppCompWelcome, id:'app_comp_wel', props:false, evt:{'start-game':startQuiz, change:updateGameMode}}
      break

      case componentToShow.value === 'AppCompQuizList':
        comp = {name:AppCompQuizList, id:'app_comp_quiz', props:{'quiz-list':quizData, 'quiz-limit': maxQuestion ,'game-mode':gameMode , shuffle:isShuffled}, evt:{'quiz-over': showResult, 'user-answered':handleAnswer}}  
      break

      case componentToShow.value === 'AppCompResult':
  
        comp = {name:AppCompResult, id:'app_comp_res', props:{'quiz-result':endResult,'quiz-limit': maxQuestion}, evt:{'reset-quiz': startQuiz, 'exit-quiz': exitQuiz}}  
      break

      case componentToShow.value === 'AppCompDialog':
        comp = {name:AppCompDialog, id:'app_comp_dialog', props:{'dialog-context':'game-ended', 'anim-settings':{_name:'bounce', _duration:500}}, evt:{}} 
        break
      }
      
    return comp
  })

  watch(gameMode, (newValue) => {
    // Quiz should be completed when there is no more question in the Pool or time is over
    gameMode.value == "attack" ? initialTimer.value = 1.5 : initialTimer.value = 10     

  })
</script>

<template>
    <div class="wrapper">
     <h1>Start wars Quiz</h1>
        <timer-component v-show="gameStarted" :timerCounter="initialTimer" ref="AppTimer"  @vtimer-state="updateTimerState"></timer-component>
        <Transition  :name="_transition.name"  mode="out-in" :duration="_transition.duration">
          <component :is="currentComponent.name" v-on="currentComponent.evt" v-bind="currentComponent.props"></component>
        </Transition>
    </div>
  <main>
   <!-- <comp-svg/> -->
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

.app-icons-svg {
  width: 30px;
  height: 30px;
  fill: #fff;
  stroke: #fff;
  cursor: pointer;
}


.bounce-enter-active {
  animation: bounce-in 0.5s;
  transition-delay: 2.25s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
  transition-delay: 1.25s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
