<template>
  <div>
    <div class="overlay" />
    <div class="form">
      <img class="share" alt="share" src="share-icon.png" />
      <h2 class="title">Share by email</h2>
      <div class="email">
        <vi-input type="email" text="" v-model="email" />
        <vi-button success small @click="shareSearch" :disabled="sending">Share</vi-button>
      </div>
      <span :class="{error: shareError}" class="message">{{ shareMessage }}</span>
      <vi-button class="close" dark small @click="$emit('close')">Close</vi-button>
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border: 1px solid #000;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    .email {
      display: flex;
    }

    .message {
      font-size: .8em;
      text-align: left;
      line-height: 2em;
      height: 2em;
    }

    .error {
      color: red;
    }

    .close {
      margin-top: 10px;
    }
}

.share {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
}
</style>
