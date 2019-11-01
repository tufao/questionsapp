import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const MainState = {
  LOADING: 'state_loading',
  OFFLINE: 'state_offline',
  READY: 'state_ready'
}

export default new Vuex.Store({
  state: {
    value: MainState.LOADING,
    service_url: 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/',
    online: false,
    questions: []
  },
  mutations: {
    updateConnection (state, value) {
      state.online = value;
    },

    updateMainState (state) {
      switch (state.value) {
        case MainState.LOADING:
        case MainState.OFFLINE:
          if (state.online) {
            state.value = MainState.READY;
          } else {
            state.value = MainState.OFFLINE;
          }
      }
    },

    updateQuestions (state, questions) {
      state.questions = questions;
    }
  },
  actions: {
    async checkHealth (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.service_url}/health`)
          .then((response) => {
            const isHealthy = response.data && response.data.status === 'OK';
            context.commit('updateConnection', isHealthy);
            context.commit('updateMainState');
            resolve();
          })
          .catch((error) => {
            console.log(error.statusText)
            context.commit('updateConnection', false);
            context.commit('updateMainState');
            resolve();
          });
      });
    },
    async fetchQuestions (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.service_url}/questions`)
          .then((response) => {
            console.log('store: questions update', response.data);
            context.commit('updateQuestions', response.data);
            resolve();
          })
          .catch(() => {
            context.commit('updateQuestions', []);
            resolve();
          });
      });
    }
  },
  modules: {
  },
  getters: {
    serviceUrl: (state) => state.service_url,
    isOnline: (state) => state.online,
    mainState: (state) => state.value,
    questions: (state) => state.questions
  }
})
