<template>
  <div class="loading">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loading {
  font-size: 18pt;
  background-color: lightgray;
  color: black;
}
</style>
