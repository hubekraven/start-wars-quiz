

<script setup>
import { computed, onMounted, watch } from "vue"

const $emit = defineEmits(['evt-dialog'])

const props = defineProps({
  dialogContext: {
    type:String,
    default(rawProps){
      return ''
    }
  },
  animSettings: {
    type:Object,
    default(rawProps){
      return {
        _name:'fade',
        _duration:{ enter: 250, leave: 350 },
        _mode: 'out-in'
      }
    }
  }
})


const {_name, _duration,_mode="out-in"} = props.animSettings

onMounted(() => {
  $emit('evt-dialog', 'showing')
})

const dialog = computed(()=>{
   const context= props.dialogContext
  
   let dialogHypertext = "" 
    
   switch(true){
      case context == 'game-mode-normal': 
      dialogHypertext =  `<span><b>Normal mode:</b></span> <p>Answer the 10 questions before the time runs out. Good luck and may the force be with you</p><br><p>Press the Start to begin the game. </p>`
      break

      case context == 'game-mode-attack': 
      dialogHypertext =  `<span>Time attack mode:</span><p>Answer as many questions as you can before your time runs out. Each good answer will extend your time while any wrong answer will reduce your time. Good luck and may the force be with you</p>
      <br><p>Press the Start to begin the game.</p>`


      break

      case context == 'game-ended': 
      dialogHypertext =  '<h3>Finished! this is your result</3h>'
      break
    }

   return dialogHypertext

}) 

</script>

<template>
  <div v-if="dialog">
    <Transition :name="_name"  :mode="_mode" :duration="_duration">
      <div v-html="dialog" :key="props.dialogContext"/>
    </Transition>
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
  position:relative;
  top: 30px;
  width: 100%;
  font-size: 20px;
  text-align: center;
}
.btn-reset{
  width: 130px;
  height: 45px;
  font-size: 20px;
  text-align: center;
  border: 0px;
  color: rgb(252, 252, 252);
  background-color: rgb(0, 170, 37);
  cursor: pointer;
  -webkit-box-shadow: inset -2px -1px 7px 0 rgba(0,0,0,0.3),  3px 3px 5px 1px rgba(92,92,92,0.7);
  -moz-box-shadow: inset -2px -1px 7px 0 rgba(0,0,0,0.3),  3px 3px 5px 1px rgba(92,92,92,0.7);
  box-shadow: inset -2px -1px 7px 0 rgba(0,0,0,0.3),  3px 3px 5px 1px rgba(92,92,92,0.7);
}
</style>