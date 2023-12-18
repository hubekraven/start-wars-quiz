

<script setup>
const $emit = defineEmits(['start-game'])

const start = function(){
  $emit('start-game')
}
</script>

<template>
  <div>
    <h3>welcome to the start wars quiz app</h3> 
    <p>This is a small game to test your knowledge about Start Wars.</p>
    <p>You have will have to answer 10 question before the time runs out. If you are ready you can press the Start button to begin the game. Do you have what it takes to become a Jedi? May the force be with you </p>

    <button @click="start"
      class= "btn-start">
      Start
    </button>
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