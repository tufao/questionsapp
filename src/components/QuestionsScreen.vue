<template>
  <div>
    <div class="options">
      <div class="search">
          Search: <input type="text" v-model="search" placeholder="Search title.." /></div>
      <div @click="showShare=true" v-if="search!=''"><input type="image" alt="share" src="share-icon.png" width="35" /></div>
    </div>
    <QuestionsList :list="questions" :total="totalQuestions" />
    <ShareScreen v-if="showShare" v-on:close="showShare=false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuestionsList from './QuestionsList.vue'
import ShareScreen from './ShareScreen.vue'

export default {
  name: 'QuestionsScreen',
  props: {
  },
  data () {
    return {
      email: '',
      sending: false,
      shareError: false,
      shareMessage: '',
      search: '',
      showShare: false
    }
  },
  components: {
    QuestionsList,
    ShareScreen
  },
  computed: {
    ...mapGetters([
      'questions',
      'totalQuestions',
      'filterSearch'
    ])
  },
  mounted () {
    this.search = this.$route.query.question_filter;
  },
  watch: {
    search (val) {
      this.$router.replace({ path: 'questions', query: { question_filter: val } });
      this.$store.dispatch('filterQuestions', val);
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
