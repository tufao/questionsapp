<template>
  <div id="app">
    <div class="server-online-status" :class="{'status-on': isOnline, 'status-off': !isOnline}">Server </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/questions">Questions</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

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
</style>
