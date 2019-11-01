<template>
  <div id="app">
    <div class="server-online-status" :class="{'status-on': isOnline, 'status-off': !isOnline}">Server </div>
    <LoadingScreen msg="Loading..."/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingScreen from './components/LoadingScreen.vue'

export default {
  name: 'app',
  components: {
    LoadingScreen
  },

  mounted () {
    this.$store.dispatch('checkHealth');
  },

  computed: {
    ...mapGetters([
      'isOnline'
    ])
  }

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.server-online-status {
  position: absolute;
  top: 10px;
  right: 10px;
}

.status-on {
  color: green;
}
.status-on:after {
    content: 'online';
}

.status-off {
  color: red;
}

.status-off:after {
  content: 'offline';
}
</style>
