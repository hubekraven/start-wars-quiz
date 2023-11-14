<!-- Main Component to manage all quiz -->
<script setup>


const props = defineProps({
  quiz: {
    type:Array,
    default(rawProps){
      return {}
    }
  }
})

//======reactives variables


//======END reactives variables


  
</script>

<template>
  <div v-if="quiz">
    <h3>This is a Quiz</h3>
      {{quiz}}
  </div>
</template>

<style lang="scss" scoped>

</style>