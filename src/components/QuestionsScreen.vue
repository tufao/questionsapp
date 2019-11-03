
<template>
  <div>
    <div class="title">Questions:</div>
    <div class="search">
        Search: <input type="text" v-model="search" placeholder="Search title.." /></div>
    <QuestionsList :list="filteredList" :total="totalQuestions" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuestionsList from './QuestionsList.vue'

export default {
  name: 'QuestionsScreen',
  props: {
  },
  data () {
    return {
      search: ''
    }
  },
  components: {
    QuestionsList
  },
  computed: {
    ...mapGetters([
      'questions',
      'totalQuestions'
    ]),
    filteredList () {
      return this.questions.filter(item => {
        return item.question.toLowerCase().includes(this.search.toLowerCase());
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
