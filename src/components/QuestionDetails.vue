<template>
    <div class="details">
        <img v-bind:src="question.thumb_url"/>
        <span>Question:</span><span>{{ question.question }}</span>
        <span>Choices:</span>
        <ul>
            <li v-for="(choice, index) in question.choices" :key="index">
                {{ choice.choice }} ({{ choice.votes }} votes)
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Details',
  props: {
    question: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.details {
    position: absolute;
    width: 320px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #000;
    background-color: #fff;

    display: flex;
    flex-direction: column;
}
</style>
