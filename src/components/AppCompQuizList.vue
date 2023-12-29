<!-- Main Component to manage all quiz -->
<script setup>
import {
  shuffleArray,
  searchInArray
} from "../assets/shared/genralFunctions" // importing Methods from external js

import AppCompQuiz from '@/components/AppCompQuiz.vue'

import { ref, reactive, computed,watch,inject } from 'vue'
const props = defineProps({
  quizList: {
    type: Array,
    default(rawProps){
      return []
    }
  },
  quizLimit:{
    type: Number,
    default(rawProps){
      return 1
    }
  },
  gameMode:{
    type: Object,
    default(){
      return null
    }
  },
  shuffle:{
    type:Boolean
  }
})

const $emit = defineEmits(['quiz-over', "user-answered"])
const gameMode = props.gameMode

let QzPool = props.shuffle ? shuffleArray(props.quizList) :props.quizList 
//======reactives variables
let questionIndex=ref(0);
let userResponses = ref([]);
let tempChoice = ref([]);
let btnDisabled = ref(true)

let {timerState} = inject ('timerState')

//Watching the provided timerState to know if run out or not
let timeEnded =  computed(()=> timerState.value ==='done' ? true : false )

let question = computed(()=> QzPool[questionIndex.value] && !timeEnded.value ? QzPool[questionIndex.value] : null )
//let question = computed(()=> QzPool[0] && !timeEnded.value ? QzPool[0] : null )

const limit = computed(()=>{
  let _limit = null
  
  if(gameMode.value =='normal') _limit  = props.quizLimit||1
  if(gameMode.value =='attack')_limit = QzPool.length
  return _limit 
})


let gameEnded = computed(()=> {
  return questionIndex.value >= limit.value || timeEnded.value ? true : false
} )

//======END reactives variables


/**
*@description Method to handle the option user make a choice
*@param {Object} e - event 
*/
const handleUserChoice= (c)=>{
 
  if(!question.value) return 
  
  let search =null
  switch(true){
    
    case question.value.type === 'ordering_choice':{

      //let search = null
      let canAdd = 1
      let choices = [1, 2, 3, 4, 5]
      let target
      let el_id
      /**
       * Defining the correct targeted element: here we want to be sure that target is the second span of the div when the user make is choice.
       * and that the correct id will be the id of the parent DIV
       */
      if (c.target.children.length) {
        target = c.target.children[1];
        el_id = c.target.id;
      } else {
        target = c.target.parentElement.children[1];
        el_id = c.target.parentElement.id;
      }

      //No ordering value given
      if(target.innerHTML ==="") return  choices.forEach((c)=>{
          search = tempChoice.value.find(e=>e.key === c)
          if(!search && canAdd >0){
            target.innerHTML = c
            tempChoice.value.push({key:c,value:el_id})
            canAdd--
          }
    
           btnDisabled.value = tempChoice.value.length == question.value.choices.length ? false : true
        })
      
      //  Already received a ordering value
      if(target.innerHTML !== ""){
        search = tempChoice.value.find(e=>e.key === parseInt(target.innerHTML))
        if(search){
          target.innerHTML = ""; //remove ordering
          tempChoice.value.splice(tempChoice.value.indexOf(search), 1); //remove from the selection
        }
      }
   
      btnDisabled.value = tempChoice.value.length == 4 ? false : true
      
      break 
    }
    
    case question.value.type === 'multi_choice':

     search = tempChoice.value.indexOf(c.target.id) //search for the checked elem id in the tempChoice
   
      if (search === -1 && c.target.checked) {
        tempChoice.value.push(c.target.id);
      } else {
        tempChoice.value.splice(search, 1);
      }

        btnDisabled.value = tempChoice.value.length > 0 ? false : true
    break 
    case question.value.type === 'single_choice':
        tempChoice.value.splice(0,1, c.target.id)
        btnDisabled.value = false
    break 
  }
}

/** 
 *@description Method to confirm user choice on a question 
 */ 
const confirmChoice = ()=> {
    if (tempChoice.value.length > 0) {
      if(gameMode.value =="attack") {
        const res= validate(question.value, tempChoice.value)

        $emit("user-answered", res )
      }
     userResponses.value.push({
        question: question.value.id,
        userResponse: tempChoice.value,
      });
      tempChoice.value = [];
      btnDisabled.value = true
      updateQuestionIndex();
    }
    
  }
/**
*@description Method to handle validation of the question once user answered
*@param {Object} question - the entire question object 
*@param {Array} userRes - User Responses 
*@return {String} srtResult - CORRECT | INCORRECT 
*/
  const validate = (question, usrRes)=> {

    const {solus,type} = question
    
    let srtResult=""
    
    switch(type){
      case 'ordering_choice':{
            let count =0
            for (let i = 0; i < solus.length; i++) {
              const choice = usrRes[i]
              if (choice.value == solus[i]) count += 1;
            }
            srtResult = count == solus.length ?  "CORRECT" : "INCORRECT"
         break
        }
      case 'multi_choice':{
        let count =0
    
        if( solus.length !== usrRes.length) return srtResult ="INCORRECT" 

        usrRes.forEach(choice=>{
          const c = parseInt(choice)
          if(solus.includes(c)) count+=1
        })
        
        srtResult = count == solus.length ?  "CORRECT" : "INCORRECT"
        
        break
      }
  	  case 'single_choice':
      srtResult = usrRes == solus ? "CORRECT" : "INCORRECT" 
      break
      
    }
    
    return srtResult
  }
/**
*@description Method to update the que quiz
*/
  const updateQuestionIndex = ()=> {

       if(questionIndex.value > limit.value) return
       questionIndex.value+=1
  }

/**
*@description handle the user final user responses- show message and correct icone according to user performance
*@return {Obj}   message a, imgUrl
*/

  const comptResult = () => {
    let correctAnswers = 0;

    if(userResponses.value.length)
      userResponses.value.forEach((element) => {
        //Search corresponding question in the QzPool
        let _question = QzPool.find((el) => {
          return el.id === element.question;
        });
        // Compute result of each question according to validation result
          const result= validate(_question, element.userResponse)
          if(result === "CORRECT" ) correctAnswers += 1 
      });
      
    const total = gameMode.value ==='attack' ? userResponses.value.length : limit.value 
    
    return {correctAnswers, total };
  };
  

  watch([gameEnded], (newValue) => {
    // Quiz should be completed when there is no more question in the Pool or time is over
    if(!gameEnded.value) return    
      $emit('quiz-over', comptResult())


  })

</script>

<template>
  <div>
    <div v-show="!gameEnded">
      gameOver - {{gameEnded}}
      <app-comp-quiz
        :quiz="question"
        :shuffle="shuffle"
        @update-choice="handleUserChoice"
      /> 
    
      <div class="btn">
        <button @click="confirmChoice()"
          :disabled="btnDisabled"
          :class= "!btnDisabled ? 'btn_enabled' : 'btn_disabled' ">
          Valider
        </button>
      </div>
    </div>
    <div v-show="gameEnded"></div>
  </div>
</template>

<style lang="css" scoped>


.title{
  text-align: center;
}
#section_component{
  /*display: block;*/
  width: 80%;
  margin: 5% 10%;
}

.btn{
  width: 100%;
  text-align: center;
  padding-top: 10%;
}
.btn button{
  width: 130px;
  height: 45px;
  font-size: 20px;
  text-align: center;
  border: 0px;
  color: rgb(252, 252, 252);
  -webkit-box-shadow: inset -2px -1px 7px 0 rgba(0,0,0,0.3),  3px 3px 5px 1px rgba(92,92,92,0.7);
  -moz-box-shadow: inset -2px -1px 7px 0 rgba(0,0,0,0.3),  3px 3px 5px 1px rgba(92,92,92,0.7);
  box-shadow: inset -2px -1px 7px 0 rgba(0,0,0,0.3),  3px 3px 5px 1px rgba(92,92,92,0.7);
}
.btn_enabled{
  background-color: rgb(45, 139, 247);
  cursor: pointer;
  
}

.btn_disabled{
  background-color: rgb(196, 196, 196);
  cursor: not-allowed;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

</style>