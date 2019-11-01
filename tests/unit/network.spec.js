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
    mock.onGet(`${store.getters.serviceUrl}/questions`).reply(200,
      [{
        'id': 1,
        'question': 'Favourite programming language?',
        'image_url': 'https://dummyimage.com/600x400/000/fff.png&text=question+1+image+(600x400)',
        'thumb_url': 'https://dummyimage.com/120x120/000/fff.png&text=question+1+image+(120x120)',
        'published_at': '2015-08-05T08:40:51.620Z',
        'choices': [
          {
            'choice': 'Swift',
            'votes': 2048
          }, {
            'choice': 'Python',
            'votes': 1024
          }, {
            'choice': 'Objective-C',
            'votes': 512
          }, {
            'choice': 'Ruby',
            'votes': 256
          }
        ]
      }]);

    await store.dispatch('fetchQuestions');
    expect(store.getters.questions.length).toBe(1);
    expect(store.getters.questions[0].id).toBe(1);
  });
});
