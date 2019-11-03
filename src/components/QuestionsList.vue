<template>
  <div class="questions">
      <div class="question" v-for="(item, index) in list" :key="item.id">
        <img v-bind:src="item.thumb_url"/>
        <span>{{ index + 1}}. </span><span>{{ item.question }}</span>
      </div>

      <infinite-loading @infinite="getNext"></infinite-loading>
  </div>
</template>

<script>
import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, { /* options */ });

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
    getNext ($state) {
      this.$store.dispatch('fetchMoreQuestions');
      $state.loaded();

      this.$nextTick(() => {
        if (this.total <= this.list.length) {
          $state.complete();
        }
      });
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
