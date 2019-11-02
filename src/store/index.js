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

    questions: [],
    totalPerPage: 5,
    page: 1
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
    },

    incrementPage (state) {
      if (state.page < state.questions.length / state.totalPerPage) {
        state.page++;
      }
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
        const url = `${context.state.service_url}/questions`;
        axios.get(url, {
          limit: context.state.totalPerPage,
          offset: context.state.totalPerPage * (context.state.page - 1),
          filter: ''
        })
          .then((response) => {
            context.commit('updateQuestions', response.data);
            resolve();
          })
          .catch(() => {
            context.commit('updateQuestions', []);
            resolve();
          });
      });
    },
    async fetchMoreQuestions (context) {
      context.commit('incrementPage');
      // await context.dispatch('fetchQuestions');
    }
  },
  modules: {
  },
  getters: {
    serviceUrl: (state) => state.service_url,
    isOnline: (state) => state.online,
    mainState: (state) => state.value,
    totalQuestions: (state) => state.questions.length,
    totalPerPage: (state) => state.totalPerPage,
    maxQuestions: (state) => state.totalPerPage * state.page,
    questions: (state, getters) => state.questions.slice(0, getters.maxQuestions)
  }
})
