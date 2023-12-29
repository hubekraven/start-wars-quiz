<!-- Component to display a quiz -->
<script setup>
import {shuffleArray} from "../assets/shared/genralFunctions" // importing Methods from external js
import { computed } from 'vue'
const props = defineProps({
  quiz: {
    type:Object,
    default(rawProps){
      return {}
    }
  },
 shuffle:{
  type:Boolean
 }
})

//===Emitting event======//
const $emit = defineEmits(['update-choice'])
let choices = computed(()=> props.shuffle ? shuffleArray(props.quiz.choices): props.quiz.choices)

//======END reactives variables

/**
*@description catch the option chosen by the  user
*@event update-choice - emit to AppCompQuizlist
*@param {Object} e - event 
*/
const choiceAction = (e)=>{
$emit('update-choice', e)
}

  
</script>

<template>
  <div v-if="quiz"  class="q_question">
    <Transition name="slide-up" mode="out-in" :duration="400">
    <div :key="quiz.id">
      <span class="q_text">{{quiz.ennonce}}</span><br/>

      <div class="choices">
        <div v-show="quiz.type == 'single_choice'">
          <label v-for="(choice, i) of choices " :key="`Q_${quiz.id}_chx${i}`" class="q_choices"> {{choice.text}}
              <input type="radio" name="choice" :id="choice.id"  @change="choiceAction($event)"/>
              <span class="checkmark-radio"></span>
          </label>
        </div>
        <div v-show="quiz.type == 'multi_choice'">
          <label v-for="(choice, i) of choices " :key="`Q_${quiz.id}_chx${i}`" class="q_choices" > {{choice.text}}
              <input type="checkbox" name="choice" :id="choice.id" @click="choiceAction($event)"/>
              <span class="checkmark"></span>
          </label>
        </div>    
        <div v-show="quiz.type == 'ordering_choice'" class="q_ordering" >
          <div v-for=" (choice, i) of choices " class="q_choices"  :key="`Q_${quiz.id}_chx${i}`" :id="choice.id" @click="choiceAction($event)" > 
              <div class="choice_text">{{choice.text}}</div>
              <div class="choice_holder"></div>
          </div>
        </div>
      </div> 
    </div>
  </Transition>
  </div>
</template>

<style lang="css" scoped>
/*******************************/
/********* CHECKBOX ************/
/*******************************/
.choices{
  width: 100%;
  margin-top: 25px;
}
.q_question {
  /*padding-left: 40px;
  margin-bottom: 12px;*/
}

/*The question text*/
.q_text {
  /*padding-left: 40px;*/
  font-size: 1.4em;
  font-weight: bold;
}

/* The q_choices */
.q_choices {
  display: block;
  width: 100%;
  position: relative;
  padding-left: 40px;
  margin-right: 60px;
  padding-bottom: 5px;
  margin-right: 500px;/*reducing mouse selectable area */
  white-space: nowrap;/*handling with space in the div to reduce mouse selectable area */
  white-space: nowrap;
  text-align: left;
  cursor: pointer;
  font-size: 22px;
}
.q_choices label {
  width: 10%;
}

/* Hide the browser's default checkbox */
.q_choices input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark{
  position: absolute;
  left: 0;
  padding-bottom:-10px; 
  height: 25px;
  width: 25px;
  background-color: #eee;
}
/*****************RADIO-BUTTON**************************/
.checkmark-radio{
  position: absolute;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}
/* When the radio button is checked, add a blue background */
.q_choices input:checked ~ .checkmark-radio {
  background-color: rgb(147, 187, 0);
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark-radio:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.q_choices input:checked ~ .checkmark-radio:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.q_choices .checkmark-radio:after {
 	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}
/*****************RADIO-BUTTON**************************/

/* On mouse-over, add a grey background color */
.q_choices:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.q_choices input:checked ~ .checkmark {
  /*background-color: #2196F3;*/
  background-color: rgb(147, 187, 0);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.q_choices input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.q_choices .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.q_question{
  padding: 30px 50px;
  -webkit-border-radius: 40px 0 40px 0;
  -moz-border-radius: 40px 0 40px 0;
  border-radius: 40px 0 40px 0;
  border:  1px solid rgba(116, 116, 116, 0.308);
  -webkit-box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.2);
  -moz-box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.2);
  box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.2);
}
.q_ordering{
  text-align: left;
  padding:5px;
  white-space: nowrap;/*handling with space in the div to reduce mouse selectable area */
  margin-right: 800px;/*reducing mouse selectable area */
  /* pointer-events: none; */
  
}
.choice_holder{ 
  /*background-color: rgb(198, 243, 33);*/
  display: inline-block;
  background-color: rgb(147, 187, 0);
  color: rgb(245, 245, 245);
  width: 5%;
  padding-right: 0px;
  font-weight: 400;
  text-align: center;
}
.choice_text{
  /*background: #2196F3;*/
  display: inline-block;
  width: 90%;
  width: 420px;
  padding:0px 10px;
  white-space: nowrap;/*handling with space in the div to reduce mouse selectable area */
  /*margin-right: -500px;/*reducing mouse selectable area */
}
.choice_text:hover{
  display: inline-block;
  background-color: #ffffff;
  padding:0px 10px;
  box-shadow: 0 1px 10px 3px rgba(0,0,0,0.3);
  cursor: pointer;
  
}
.q_ordering{
  display: flex;
  /*background: rgb(243, 93, 33);*/
  /*width: 460px;
  padding: 5px 15px;
  margin: 5px;
  left: 5px;*/
  display: block;
  position: relative;
  width: 460px;
  padding: 5px 15px;
  /* margin: 5px; */
  left: -30px;
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