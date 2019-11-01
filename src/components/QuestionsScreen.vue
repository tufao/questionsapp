
<template>
  <div>
    <div class="title">Questions:</div>
    <QuestionsList :list="list" />
  </div>
</template>

<script>
import QuestionsList from './QuestionsList.vue'

export default {
  name: 'QuestionsScreen',
  props: {
    list: Array
  },
  components: {
    QuestionsList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
