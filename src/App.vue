<template>
  <div id="app">
    <div class="server-online-status">
      <h3 :class="{'status-on': isOnline, 'status-off': !isOnline}">Server </h3>
    </div>
    <LoadingScreen v-if="mainState==MainState.LOADING" msg="Loading..."/>
    <ErrorScreen v-else-if="mainState==MainState.OFFLINE"
      msg="Its not possible to reach server, please try again later."
      @retry="connect" />
    <router-view v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { MainState } from '@/store';
import ErrorScreen from '@/components/ErrorScreen.vue';
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
    ErrorScreen
  },

  computed: {
    ...mapGetters([
      'isOnline',
      'mainState'
    ])
  },

  mounted () {
    // check connection health every 30 seconds
    setInterval(() => {
      this.connect();
    }, 30000);

    this.connect();
  },

  methods: {
    async connect () {
      await this.$store.dispatch('checkHealth');
    }
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
  display: block;
  text-align: right;
  top: 0px;
  right: 0px;
  width: 100%;
  background-color: white;
  padding-right: 20px;
}

.status-on {
  color: #28A478;
}

.status-on:after {
    content: 'online';
}

.status-off {
  color: #E45151;
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
