<!-- Main Component to manage all quiz -->
<script setup>
import {
  shuffleArray,
  searchInArray
} from "../assets/shared/genralFunctions" // importing Methods from external js

import AppCompQuiz from '@/components/AppCompQuiz.vue'
import AppCompResult from '@/components/AppCompResult.vue'
import { ref, reactive, computed,watch,inject } from 'vue'
const props = defineProps({
  quizList: {
    type:Array,
    default(rawProps){
      return []
    }
  }
})
let QzPool = shuffleArray(props.quizList)
//======reactives variables
let questionIndex=ref(0);
let userResponses = ref([]);
let tempChoice = ref([]);
let btnDisabled = ref(true)
let isCompleted = ref(false)



let {timerState} = inject ('timerState')

//Watching the providered timerState to know if timer is stopped or not
let timeEnded =  computed(()=> timerState.value ==='stopped' ? true : false )
let question = computed(()=> QzPool[questionIndex.value] ? QzPool[questionIndex.value] : null )

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
*@description Method to handle validation of the question once user answered
*/
  const validate = ()=> {
    if (tempChoice.value.length > 0) {
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
*@description Method to update the que quiz
*/
  const updateQuestionIndex = ()=> {
       if(questionIndex.value > QzPool.length) return
       questionIndex.value+=1
  }

/**
*@description handle the user final user responses- show message and correct icone according to user performance
*@return {Obj}   message a, imgUrl
*/

  const comptResult = () => {
    let correctAnswers = 0;
    console.log('UserResponse', userResponses.value)
    if(userResponses.value.length)
      userResponses.value.forEach((element) => {
        //Search corresponding question in the QzPool
        console.log("===> Element: ",element.userResponse)
        let question = QzPool.find((el) => {
          return el.id === element.question;
        });
        // compute the result according to the type of question
        if (question && question.type === "ordering_choice") {
          let count = 0;
        
          if (element.userResponse.length == question.solus.length) {
            for (let i = 0; i < question.solus.length; i++) {
              if (element.userResponse[i].value == question.solus[i]) count += 1;
            }
            if (count == question.solus.length) {
              correctAnswers += 1;
            }
          }
        } else if (question && question.type === "multi_choice") {
          let count = 0;
          if (element.userResponse.length == question.solus.length) {
            element.userResponse.forEach((el) => {
              if (question.solus.includes(parseInt(el))) count += 1;
            });
          }
          if (count == question.solus.length) {
            correctAnswers += 1;
          }
        } else if (question && question.type === "single_choice") {
          console.log(element.userResponse);
          if (question && question.solus == element.userResponse[0])
            correctAnswers += 1;
        }
      });
    console.log('toto...', {correctAnswers})

    return correctAnswers;
  };
  
  /**
  *@description reset the quiz
  */
  const resetQuiz = ()=>{
  
    isCompleted.value = false
    QzPool = shuffleArray(props.quizList)
    questionIndex.value= 0
    tempChoice.value= []
    userResponses.value= []
    //btnDisabled.value = true

  }

  watch(question, (newValue) => {
    //console.log('position',{currentIndex:questionIndex.value, 'quizLength': QzPool.length})
    if(questionIndex.value === QzPool.length && !question.value ) isCompleted.value = true

    // if(timerState === 'stopped') timeEnded.value = true
  })

</script>

<template>
  <template v-if="!isCompleted && !timeEnded">
    <app-comp-quiz  

      :quiz="question" 
      @update-choice="handleUserChoice"
    />
    <div class="btn">
      <button @click="validate()"
        :disabled="btnDisabled"
        :class= "!btnDisabled ? 'btn_enabled' : 'btn_disabled' ">
        Valider
      </button>
    </div>
  </template>

  <app-comp-result v-if="isCompleted || timeEnded" :quizResult="comptResult()" @reset-quiz="resetQuiz"></app-comp-result>
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
</style>