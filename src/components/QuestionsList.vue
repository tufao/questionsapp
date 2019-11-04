<template>
  <div class="questions">
    <h2 class="title">Results</h2>
    <div class="question" v-for="item in list" :key="item.id" @click="$emit('details', item.id)">
      <span>{{ item.id }}. </span>
      <img v-bind:src="item.thumb_url"/>
      <span>{{ item.question }}</span>
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
.title {
  display: block;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #aaa;
}

.questions {
  div:nth-child(even) {
    background-color: lightgray;
  }
  div:hover {
    background-color: #aaa;
  }
}

.question {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;

  span {
    vertical-align: middle;
    padding: 10px;
  }

  img {
    height: 40px;
  }
}
</style>
