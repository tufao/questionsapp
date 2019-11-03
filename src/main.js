import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

Vue.config.productionTip = false

/* eslint-disable-next-line no-undef */
if (DEBUG) {
  // fetch mock data
  const questions = require('../public/mock-questions.json');

  // replace it with expected data from service
  mock.onGet(`${store.getters.serviceUrl}/questions`).reply(200, questions);
  mock.onGet(`${store.getters.serviceUrl}/health`).reply(200, { 'status': 'OK' });
}

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
