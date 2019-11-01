import store from '../../src/store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Networking', () => {
  it('Check offline', async () => {
    store.commit('updateServiceEndPoint', 'http://fakeaddress.fake');
    await store.dispatch('checkHealth');
    expect(store.getters.onlineStatus).toBeFalsy();
  });

  it('Check online', async () => {
    const mock = new MockAdapter(axios);

    mock.onGet('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health').reply(200,
      {
        'status': 'ok'
      });

    store.commit('updateServiceEndPoint', 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com');
    await store.dispatch('checkHealth');
    expect(store.getters.onlineStatus).toBeTruthy();
  });
});
