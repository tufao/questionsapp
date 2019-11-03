
<template>
  <div>
    <div class="options">
      <div class="search">
          Search: <input type="text" v-model="search" placeholder="Search title.." /></div>
      <div v-if="showShare" class="share">
        <span>Share by email:</span>
        <input type="email" text="" v-model="email" />
        <button ref="button" @click="shareSearch">Share</button></div>
    </div>
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
      search: this.$route.query.question_filter || '',
      email: ''
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
    },
    showShare () {
      return this.search !== '';
    }
  },
  methods: {
    async shareSearch () {
      await this.$store.dispatch('shareSearch', { email: this.email, url: this.$route.fullPath });
    }
  },
  watch: {
    search (val) {
      this.$router.replace({ path: 'questions', query: { question_filter: val } });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.options {
  display: flex;
  justify-content: space-between;
  border: 2px solid green;
  padding: 20px;
}
</style>
