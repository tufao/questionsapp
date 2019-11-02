<template>
  <div class="questions">
      <div class="question" v-for="(item, index) in list" :key="item.id">
        <img v-bind:src="item.thumb_url"/>
        <span>{{ index + 1}}. </span><span>{{ item.question }}</span>
      </div>

      <scroll-loader :loader-method="getNext" :loader-enable="loadMore" loader-color="rgba(102,102,102,.5)">
      </scroll-loader>
  </div>
</template>

<script>
import Vue from 'vue';
import ScrollLoader from 'vue-scroll-loader';

Vue.use(ScrollLoader)

export default {
  name: 'QuestionsList',
  props: {
    list: Array,
    total: Number
  },
  data () {
    return {
      loadMore: true
    }
  },
  methods: {
    async getNext () {
      await this.$store.dispatch('fetchMoreQuestions');
      this.loadMore = this.total < this.list.length;
    }
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

.question {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;

  span {
    vertical-align: middle;
    padding: 20px;
  }
}
</style>
