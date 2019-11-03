<template>
  <div id="app">
    <QuestionsScreen v-if="mainState === MainState.READY" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { MainState } from '@/store';
import QuestionsScreen from '@/components/QuestionsScreen.vue';

export default {
  name: 'app',

  data () {
    return {
      MainState
    }
  },

  components: {
    QuestionsScreen
  },

  computed: {
    ...mapGetters([
      'mainState'
    ])
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
</style>
