import store from '../../src/store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
describe('Networking', () => {
  it('Check offline', async () => {
    mock.onGet(`${store.getters.serviceUrl}/health`).reply(440, null);

    await store.dispatch('checkHealth');
    expect(store.getters.isOnline).toBeFalsy();
  });

  it('Check online', async () => {
    mock.onGet(`${store.getters.serviceUrl}/health`).reply(200,
      {
        'status': 'ok'
      });

    await store.dispatch('checkHealth');
    expect(store.getters.isOnline).toBeTruthy();
  });
});
