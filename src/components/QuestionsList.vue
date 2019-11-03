<template>
  <div class="questions">
      <div class="question" v-for="(item, index) in list" :key="item.id" @click="$emit('details', item.id)">
        <img v-bind:src="item.thumb_url"/>
        <span>{{ index + 1}}. </span><span>{{ item.question }}</span>
      </div>
  </div>
</template>

<script>
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
  mounted () {
    window.addEventListener('scroll', this.checkBottom);
    this.checkBottom();
  },
  methods: {
    checkBottom () {
      if (this.bottomVisible()) {
        this.getNext();
      }
    },
    bottomVisible () {
      const distance = 100;
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY + distance >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    async getNext () {
      await this.$store.dispatch('fetchMoreQuestions');
    }
  },
  update () {
    this.checkBottom();
  },
  destroy () {
    window.removeEventListener('scroll', this.checkBottom);
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
