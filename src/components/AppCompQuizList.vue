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
let tempChoice = [];
      

let state = {
  question: QzPool[index],
  isCompleted: false,
}

//======END reactives variables

/**
*@description Method to handle the option user make a choice
*@param {Object} e - event 
*/
const handleUserChoice= (c)=>{
  
  if(!state.question) return 
  
  const {question} = state

  switch(true){
    
    case question.type === 'ordering_choice':{

      let search = null
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
          search = tempChoice.find(e=>e.key === c)
          if(!search && canAdd >0){
            target.innerHTML = c
            tempChoice.push({key:c,value:el_id})
            canAdd--
          }
        })
      
      //  Already received a ordering value
      if(target.innerHTML !== ""){
        search = tempChoice.find(e=>e.key === parseInt(target.innerHTML))
        if(search){
          target.innerHTML = ""; //remove ordering
          tempChoice.splice(tempChoice.indexOf(search), 1); //remove from the selection
        }
      }

      break 
    }
    
    case question.type === 'multi_choice':
        console.log("Handle ",  question.type)
    break 
    case question.type === 'single_choice':
        console.log("Handle ",  question.type)
    break 
  }
}
  
</script>

<template>
  <app-comp-quiz 
    v-show="!state.isCompleted" 
    :quiz="state.question" 
    @update-choice="handleUserChoice"
  />
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