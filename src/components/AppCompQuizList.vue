<!-- Main Component to manage all quiz -->
<script setup>
import {
  shuffleArray,
  searchInArray
} from "../assets/shared/genralFunctions" // importing Methods from external js

import AppCompQuiz from '@/components/AppCompQuiz.vue'
import AppCompResult from '@/components/AppCompResult.vue'
import { ref, reactive } from 'vue'
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
let index=0;
// let userResponses = [];
let tempChoice = ref([]);
let btnDisabled = ref(true)
      

let state = reactive({
  question: QzPool[index],
  isCompleted: false,
})

//======END reactives variables

/**
*@description Method to handle the option user make a choice
*@param {Object} e - event 
*/
const handleUserChoice= (c)=>{
  
  if(!state.question) return 
  
  const {question} = state
let search =null
  switch(true){
    
    case question.type === 'ordering_choice':{

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
    
           btnDisabled.value = tempChoice.value.length == question.choices.length ? false : true
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
    
    case question.type === 'multi_choice':

     search = tempChoice.value.indexOf(c.target.id) //search for the checked elem id in the tempChoice
   
      if (search === -1 && c.target.checked) {
        tempChoice.value.push(c.target.id);
      } else {
        tempChoice.value.splice(search, 1);
      }

        btnDisabled.value = tempChoice.value.length > 0 ? false : true
    break 
    case question.type === 'single_choice':
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
      // this.userResponses.push({
      //   question: quizElement.id,
      //   userResponse: tempChoice,
      // });
      tempChoice.value = [];
      updateQuiz();

      //this.btnDisabled = true;
    }
  }
/**
*@description Method to update the que quiz
*/
  const updateQuiz = ()=> {
   if(!QzPool[index+ 1]) return state.question = null
    
    index+=1
    state.question = QzPool[index]
   
  }

</script>

<template>
  <app-comp-quiz 
    v-show="!state.isCompleted" 
    :quiz="state.question" 
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