
<template>
  <div>
    <div class="options">
      <div class="search">
          Search: <input type="text" v-model="search" placeholder="Search title.." /></div>
      <div v-if="showShare" class="share">
        <div><span>Share by email:</span>
          <input type="email" text="" v-model="email" />
          <button ref="button" @click="shareSearch" :disabled="sending">Share</button></div>
        <span class="message">{{ shareMessage }}</span>
      </div>
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
      email: '',
      sending: false,
      shareMessage: ''
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
      if (!this.validateEmail(this.email)) {
        this.shareMessage = 'Invalid email!';
        return;
      }

      this.sending = true;
      await this.$store.dispatch('shareSearch', { email: this.email, url: this.$route.fullPath });
      this.email = '';
      this.sending = false;
      this.shareMessage = 'Sent!';
    },
    validateEmail (email) {
      /* eslint-disable-next-line no-useless-escape */
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
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

.share {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .message {
    font-size: 10px;
  }
}
</style>
