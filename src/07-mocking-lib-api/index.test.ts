// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    // Create base settings for axios.
    const baseURL = 'https://jsonplaceholder.typicode.com';
    // Create spy for axios that will be used in throttledGetDataFromApi.
    const spyOnAxiosCreate = jest.spyOn(axios, 'create').mockReturnThis();
    // Call throttledGetDataFromApi function that will be tested.
    await throttledGetDataFromApi(baseURL);
    //Exhausts both the macro-task queue and the micro-task queue - run retching data.
    jest.runAllTimers();
    // Check if axios instance have been called with our base url.
    await expect(spyOnAxiosCreate).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const fakeEndpoint = '/albums';
    // Create spy for 'get' method, that lies in axios.Axios.prototype.
    const spyOnAxiosGet = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(fakeEndpoint);
    jest.runAllTimers();
    expect(spyOnAxiosGet).toHaveBeenCalledWith(fakeEndpoint);
  });

  test('should return response data', async () => {
    const fakeResponseData = {
      data: {
        userId: 1,
        id: 2,
        title: 'test',
        body: 'test 2',
      },
    };
    // Again: here we rewrite real axios 'get' with our 'fake' mock get.
    // and imitate response with data.
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce(fakeResponseData);
    const result = await throttledGetDataFromApi('/posts/2');
    expect(result).toStrictEqual({
      userId: 1,
      id: 2,
      title: 'test',
      body: 'test 2',
    });
  });
});
