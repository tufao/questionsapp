<template>
  <div id="app">
    <div class="server-online-status" :class="{'status-on': isOnline, 'status-off': !isOnline}">Server </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',

  computed: {
    ...mapGetters([
      'isOnline'
    ])
  },

  mounted () {
    // check connection health every 30 seconds
    setInterval(() => {
      this.$store.dispatch('checkHealth');
    }, 30000);

    this.$store.dispatch('checkHealth');
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
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
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

.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  background-color:rgba(100, 100, 100, .8);
}
</style>
