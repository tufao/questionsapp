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
        'status': 'OK'
      });

    await store.dispatch('checkHealth');
    expect(store.getters.isOnline).toBeTruthy();
  });

  it('Questions update', async () => {
    // fetch mock data
    const questions = require('./mock-questions.json');

    // replace it with expected data from service
    mock.onGet(`${store.getters.serviceUrl}/questions`).reply(200, questions);

    await store.dispatch('fetchQuestions');
    expect(store.getters.questions.length).toBeLessThanOrEqual(store.getters.maxQuestions);
    expect(store.getters.questions[0].id).toBe(1);
  });

});
