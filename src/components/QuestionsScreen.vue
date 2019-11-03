<template>
  <div>
    <div class="options">
      <div class="search">
          Search: <input type="text" v-model="search" placeholder="Search title.." /></div>
      <div @click="showShare=true" v-if="search!=''"><input type="image" alt="share" src="share-icon.png" width="35" /></div>
    </div>
    <QuestionsList :list="questions" :total="totalQuestions" @details="showDetails" />
    <QuestionDetails v-if="selectedQuestion" :question="selectedQuestion" @close="closeDetails" />
    <ShareScreen v-if="showShare" @close="showShare=false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuestionDetails from './QuestionDetails.vue'
import QuestionsList from './QuestionsList.vue'
import ShareScreen from './ShareScreen.vue'

export default {
  name: 'QuestionsScreen',
  props: {
  },
  data () {
    return {
      email: '',
      search: '',
      selectedQuestion: null,
      showShare: false
    }
  },
  components: {
    QuestionDetails,
    QuestionsList,
    ShareScreen
  },
  computed: {
    ...mapGetters([
      'questions',
      'totalQuestions',
      'filterSearch',
      'getQuestionById'
    ]),
    question_id () {
      return parseInt(this.$route.query.question_id);
    },
    question_filter () {
      return this.$route.query.question_filter;
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchQuestions');
    this.search = this.question_filter;

    if (this.question_id) {
      this.showDetails(this.question_id);
    }
  },
  methods: {
    showDetails (id) {
      this.selectedQuestion = this.questions.find((item) => {
        return item.id === id;
      });
      if (this.question_id !== id) {
        this.$router.replace({ path: 'questions', query: { question_id: id } });
      }
    },
    closeDetails () {
      this.showDetails(null);
    }
  },
  watch: {
    search (val) {
      this.$store.dispatch('filterQuestions', val);
      if (this.question_filter !== val) {
        this.$router.replace({ path: 'questions', query: { question_filter: val } });
      }
      this.shareMessage = '';
    }
  }
}
</script>

<style scoped lang="scss">
.options {
  display: flex;
  justify-content: space-between;
  border: 2px solid green;
  padding: 20px;
}
</style>
