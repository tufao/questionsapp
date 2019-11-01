<template>
  <div class="error">
    <div class="content">
      <span>{{ msg }}</span>
      <button>RETRY</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorScreen',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.error {
  display: inline-block;
  font-size: 18pt;
  background-color: lightgray;
  width: 50%;
  padding: 20px;
}

.content {
  display: flex;
  height: 150px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 15pt;
}
</style>
