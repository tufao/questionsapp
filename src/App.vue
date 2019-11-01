<template>
  <div id="app">
    <LoadingScreen msg="Loading..."/>
  </div>
</template>

<script>
import LoadingScreen from './components/LoadingScreen.vue'

export default {
  name: 'app',
  components: {
    LoadingScreen
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
</style>
