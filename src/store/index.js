import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const MainState = {
  LOADING: 'state_loading',
  OFFLINE: 'state_offline'
}

export default new Vuex.Store({
  state: {
    value: MainState.LOADING,
    service_url: 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/',
    online: false
  },
  mutations: {
    updateConnection (state, value) {
      state.online = value;
    },

    updateMainState (state) {
      switch (state.value) {
        case MainState.LOADING:
          if (!state.online) {
            state.value = MainState.OFFLINE;
          }
      }
    }
  },
  actions: {
    async checkHealth (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.service_url}/health`)
          .then((response) => {
            const isHealthy = response.data && response.data.status === 'ok';
            context.commit('updateConnection', isHealthy);
            context.commit('updateMainState');
            resolve();
          })
          .catch((error) => {
            console.log(error.statusText)
            context.commit('updateConnection', false);
            context.commit('updateMainState');
            resolve();
          })
      })
    }
  },
  modules: {
  },
  getters: {
    serviceUrl: (state) => state.service_url,
    isOnline: (state) => state.online,
    mainState: (state) => state.value
  }
})
