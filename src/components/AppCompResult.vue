

<script setup>

import imgFailed from "@/assets/images/jedi_failed.png";
import imgAlmostThere from "@/assets/images/tempsnip.png";
import imgSuccess from "@/assets/images/jedi_success.png";


const props = defineProps({
  quizResult: {
    type:[Object,null],
    default(){
      null
    }
  },
  quizLimit:{
    type: Number,
    default(){
      return 1
    }
  }
})

const $emit = defineEmits(['reset-quiz', 'exit-quiz'])
const {correctAnswers, total:maxPoints} = props.quizResult.value
/**
*@description handle the user final result - show message and correct icone according to user performance
*@return {Obj}   message a, imgUrl
*/
 const computResult = ()=>{
    if(correctAnswers < maxPoints )return {
      message:"Désolé! vous ne pouvez pas être un Jedi",
      imgUrl: imgFailed
    }
    
   
    if(correctAnswers < maxPoints ) return {
      message: "Encore un effort! Vous maitrisez presque la Force",
      imgUrl: imgAlmostThere
    }
    
    if(correctAnswers === maxPoints) return {
      message:"Excellent! la Force est avec vous. Vous êtes un vrai Jedi",
      imgUrl: imgSuccess
    }
    
  }
  

  const askQuizReset = ()=>{
    $emit('reset-quiz')
  }

  const askQuizExit = ()=>{
    $emit('exit-quiz')
  }
  
</script>

<template>
  <div class="resultat-container" v-if="props.quizResult !==null">
     <div class="resultat">
         <div  class="score">Votre score: 
           <span>{{correctAnswers}}/{{maxPoints}}</span>
         </div>
         <span class="message">{{computResult().message}}</span>
         <img class="icon" :src="computResult().imgUrl"/>
       </div>
       <div class="btn">
           <button @click="askQuizReset"
             class= "btn-reset">
             Relancer
           </button>

           <button @click="askQuizExit"
             class= "btn-quit">
             Terminer
           </button>
       </div>
 </div>
 
 </template>

<style lang="css" scoped>
.resultat{
  display: block;
  width: 500px;
  /* text-align: justify; */
  padding: 30px;
  margin: 30px;
  -webkit-box-shadow: 0 4px 5px 0 rgba(0, 78, 88, 0.849);
  -moz-box-shadow: 0 4px 5px 0 rgba(0, 78, 88, 0.849);
  box-shadow: 0 4px 5px 0 rgba(0, 78, 88, 0.849);
  -webkit-border-radius: 4px 4px 4px 4px;
  -moz-border-radius: 4px 4px 4px 4px;
  border-radius: 4px 4px 4px 4px;
  border:  1px solid rgba(226, 226, 226, 0.596);
}
.icon{
  width: 100px;
  height: 100px;
  margin: 30px;
}

.score{
  text-align: center;
  margin: 20px;
  font-size: 1.2em;
  font-weight: bold;
  
}
.score span{
  padding-bottom: 40px;
    margin: 10px;
    font-size: 23px;
}
.message{
  display: block;
  word-wrap: normal;
}
/*.btn{
  width: 100%;
  text-align: center;
  padding-top: 10%;
}*/
.btn{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  position:relative;
  top: 30px;
  width: 100%;
  font-size: 20px;
  text-align: center;
}
.btn-reset,.btn-quit {
  width: 130px;
  height: 45px;
  font-size: 20px;
  text-align: center;
  border: 0px;
  color: rgb(252, 252, 252);
  cursor: pointer;
  -webkit-box-shadow: inset -2px -1px 7px 0 rgba(0,0,0,0.3),  3px 3px 5px 1px rgba(92,92,92,0.7);
  -moz-box-shadow: inset -2px -1px 7px 0 rgba(0,0,0,0.3),  3px 3px 5px 1px rgba(92,92,92,0.7);
  box-shadow: inset -2px -1px 7px 0 rgba(0,0,0,0.3),  3px 3px 5px 1px rgba(92,92,92,0.7);
}

.btn-reset{
  background-color: rgb(0, 170, 37);
}

.btn-quit{
  background-color: rgb(250, 165, 37);
}
</style>