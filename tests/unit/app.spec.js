import store, { MainState } from '../../src/store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('App.vue', () => {
  it('check app initial state', () => {
    expect(store.getters.mainState).toBe(MainState.LOADING);
  });

  it('check app error state', async () => {
    mock.onGet(`${store.getters.serviceUrl}/health`).reply(440, null);

    await store.dispatch('checkHealth');
    expect(store.getters.mainState).toBe(MainState.OFFLINE);
  });

  it('check app ready state', async () => {
    mock.onGet(`${store.getters.serviceUrl}/health`).reply(200,
      {
        'status': 'OK'
      });

    await store.dispatch('checkHealth');
    expect(store.getters.mainState).toBe(MainState.READY);
  });
})
