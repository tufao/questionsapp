<template>
    <div>
        <div class="overlay" />
        <div class="form">
            <span class="title">Share by email:</span>
            <div><input type="email" text="" v-model="email" />
                <button @click="shareSearch" :disabled="sending">Share</button></div>
            <span :class="{error: shareError}" class="message">{{ shareMessage }}</span>
            <button @click="$emit('close')">Close</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ShareScreen',
  props: {
  },
  data () {
    return {
      email: '',
      sending: false,
      shareError: false,
      shareMessage: ''
    }
  },
  methods: {
    async shareSearch () {
      if (!this.validateEmail(this.email)) {
        this.shareError = true;
        this.shareMessage = 'Invalid email!';
        return;
      }

      this.sending = true;
      const result = await this.$store.dispatch('shareSearch',
        { email: this.email, url: window.location.href });

      this.sending = false;
      if (result) {
        this.email = '';
        this.shareError = false;
        this.shareMessage = 'Your share was sent!';
      } else {
        this.shareError = true;
        this.shareMessage = 'Could not share, please try again later!';
      }
    },
    validateEmail (email) {
      /* eslint-disable-next-line no-useless-escape */
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
}
</script>

<style scoped lang="scss">
.form {
    position: fixed;
    width: 320px;
    height: 240px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border: 1px solid #000;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .title {
        font-size: 24pt;
    }

    .message {
        font-size: 10pt;
    }

    .error {
        color: red;
    }
}
</style>
