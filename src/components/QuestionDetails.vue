<template>
    <div>
        <div class="overlay" />
        <div class="details">
            <img v-bind:src="question.image_url"/>
            <span class="title">Question:</span><span>{{ question.question }}</span>
            <span class="title">Published at:</span><span>{{ publishDate }}</span>
            <span class="title">Choices:</span>
            <ul class="choices">
                <li v-for="(choice, index) in question.choices" :key="index">
                    <span>{{ choice.choice }} ({{ choice.votes }} votes)</span>
                    <button @click="vote(index)">Vote</button>
                </li>
            </ul>
            <button @click="$emit('close')">Close</button>
            <input class="share" type="image" alt="share" src="share-icon.png" width="35" @click="$emit('share')" />
        </div>
    </div>
</template>

<script>
export default {
  name: 'Details',
  props: {
    question: Object
  },
  computed: {
    publishDate () {
      const date = new Date(this.question.published_at);
      return this.formatDate(date);
    }
  },
  methods: {
    formatDate (date) {
      const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ];

      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    },
    async vote (index) {
      this.question.choices[index].votes++;
      await this.$store.dispatch('updateQuestion', this.question);
    }
  }
}
</script>

<style scoped lang="scss">
.details {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80vw;
    max-width: 800px;
    transform: translate(-50%, -50%);
    border: 1px solid #000;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;

    img {
        width: 100%;
    }

    .title {
        font-weight: bold;
        margin-top: 20px;
    }

    .choices {
        text-align: left;

        button {
            margin-left: 20px;
        }
    }

    .share {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
}
</style>
