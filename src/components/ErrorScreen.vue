<template>
  <div class="error">
    <div class="content ViColor-success--border">
      <span>{{ msg }}</span>
      <vi-button @click="$emit('retry')" pill success outlined justify-content="space-between" width="100">
        <span>▸</span> Retry</vi-button>
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
  width: 50%;
}

.content {
  position: fixed;
  width: 320px;
  height: 240px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  height: 150px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  font-size: 1.5em;
  background-color: #fff;
  border: 2px solid #28A478;
  border-radius: 10px;
}
</style>
