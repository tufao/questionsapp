<template>
    <div>
        <div class="overlay" />
        <div class="details">
            <img v-bind:src="question.image_url"/>
            <span>Question:</span><span>{{ question.question }}</span>
            <span>Choices:</span>
            <ul>
                <li v-for="(choice, index) in question.choices" :key="index">
                    {{ choice.choice }} ({{ choice.votes }} votes)
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
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.details {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #000;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;

    .share {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
}
</style>
