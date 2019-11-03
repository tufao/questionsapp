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

    questions: new Map(),
    questionsArray: [],
    totalPerPage: 5,
    page: 1,
    filterSearch: ''
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
          break;
        case MainState.READY:
          if (!state.online) {
            state.value = MainState.OFFLINE;
          }
      }
    },

    updateQuestions (state, results) {
      results.forEach((entry) => {
        state.questions.set(entry.id, entry);
      });
      state.questionsArray = Array.from(state.questions.values());
    },

    incrementPage (state) {
      if (state.page < state.questionsArray.length / state.totalPerPage) {
        state.page++;
      }
    },

    updateFilterSearch (state, search) {
      state.filterSearch = search;
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
      await context.dispatch('fetchQuestions');
    },

    filterQuestions (context, search) {
      context.commit('updateFilterSearch', search);
    },

    async shareSearch (context, options) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.state.service_url}/share/?destination_email=${options.email}&content_url=${options.url}`)
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            resolve(false);
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
    totalQuestions: (state) => state.questionsArray.length,
    totalPerPage: (state) => state.totalPerPage,
    maxQuestions: (state) => state.totalPerPage * state.page,
    filterSearch: (state) => state.filterSearch || '',
    filteredQuestions: (state, getters) => {
      return state.questionsArray.filter(item => {
        return item.question.toLowerCase().includes(getters.filterSearch.toLowerCase());
      })
    },
    questions: (state, getters) => getters.filteredQuestions.slice(0, getters.maxQuestions)
  }
})
