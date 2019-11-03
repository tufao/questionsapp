<template>
  <div id="app">
    <LoadingScreen v-if="mainState==MainState.LOADING" msg="Loading..."/>
    <ErrorScreen v-else-if="mainState==MainState.OFFLINE"
      msg="Its not possible to reach server, please try again later."
      v-on:retry="retryConnect" />
    <QuestionsScreen v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { MainState } from '@/store';
import ErrorScreen from '@/components/ErrorScreen.vue';
import QuestionsScreen from '@/components/QuestionsScreen.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';

export default {
  name: 'app',

  data () {
    return {
      MainState
    }
  },

  components: {
    LoadingScreen,
    QuestionsScreen,
    ErrorScreen
  },

  mounted () {
    this.retryConnect();
  },

  computed: {
    ...mapGetters([
      'mainState',
      'questions'
    ])
  },

  methods: {
    retryConnect () {
      this.$store.dispatch('fetchQuestions');
    }
  }

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
  }
  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
