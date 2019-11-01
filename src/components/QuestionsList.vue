<template>
  <div class="questions">
      <div v-for="(item, index) in list" :key="item.id">{{ index + 1}}. {{ item.question }}</div>
  </div>
</template>

<script>
export default {
  name: 'QuestionsList',
  props: {
    list: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.questions {
  div:nth-child(even) {
    background-color: lightgray;
  }
}
</style>
