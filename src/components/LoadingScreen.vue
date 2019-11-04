<template>
  <div class="loading">
    <h2>{{ msg }}</h2>
    <vi-loading small />
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
  position: absolute;
  width: 100%;
  top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2em;
  color: black;
}
</style>
