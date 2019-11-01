import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    service_url: 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/',
    online: false
  },
  mutations: {
    updateServiceEndPoint (state, url) {
      state.service_url = url;
    },

    updateOnlineStatus (state, value) {
      state.online = value;
    }
  },
  actions: {
    async checkHealth (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.service_url}/health`)
          .then((response) => {
            // use response object
            console.log('response:', response);
            context.commit('updateOnlineStatus', true);
            resolve();
          })
          .catch((error) => {
            console.log(error.statusText)
            context.commit('updateOnlineStatus', false);
            resolve();
          })
      })
    }
  },
  modules: {
  },
  getters: {
    onlineStatus: (state) => state.online
  }
})
