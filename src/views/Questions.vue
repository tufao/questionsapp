<template>
  <div>
    <div class="options">
      <div class="search">
          <h3>Search:</h3>
          <vi-input type="text" v-model="search" placeholder="Search title.." />
          <vi-button warning small @click="search=''">Clear</vi-button>
      </div>
      <div @click="showShare=true" v-if="search!=''"><input type="image" alt="share" src="share-icon.png" width="35" /></div>
    </div>
    <QuestionsList :list="questions" :total="totalQuestions" @details="showDetails" />
    <transition name="fade">
      <QuestionDetails v-if="selectedQuestion" :question="selectedQuestion" @close="closeDetails" @share="showShare=true" />
    </transition>
    <transition name="fade">
      <ShareScreen v-if="showShare" @close="showShare=false" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuestionDetails from '@/components/QuestionDetails.vue'
import QuestionsList from '@/components/QuestionsList.vue'
import ShareScreen from '@/components/ShareScreen.vue'

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
    async showDetails (id) {
      this.selectedQuestion = await this.$store.dispatch('getQuestionDetails', id);

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
  align-content: center;
  align-items: center;
  border: 2px solid #28A478;
  border-radius: 10px;
  padding: 10px;

  .search {
    display: flex;
    align-items: center;
  }

  .search > * {
    margin-right: 10px;
    padding: 5px;
  }
}
</style>
