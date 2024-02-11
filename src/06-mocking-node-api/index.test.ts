// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Here we check our 'setTimeout' function.
    // Creates instance of mock callback function.
    const callback = jest.fn();
    const time = 1000;
    // Sets Spy on global setTimeout function.
    const spyOnSetTimeout = jest.spyOn(global, 'setTimeout');
    // Runs our checked function.
    doStuffByTimeout(callback, time);
    // Check if setTimeout was called with our mock function and timeout.
    expect(spyOnSetTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    // Here we check our 'Callback' function.
    // Creates instance of mock "callback" function.
    const callback = jest.fn();
    const time = 1000;
    // Runs our checked function.
    doStuffByTimeout(callback, time);
    // Check that our callback wasn't called before we let him.
    expect(callback).not.toHaveBeenCalled();
    // Runs all pending timers.
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Here we check our 'setInterval' function.
    // Creates instance of mock callback function.
    const callback = jest.fn();
    const time = 300;
    // Sets Spy on global setInterval function.
    const spyOnSetInterval = jest.spyOn(global, 'setInterval');
    // Runs our checked function.
    doStuffByInterval(callback, time);
    // Check if setInterval was called with our mock function and timeout.
    expect(spyOnSetInterval).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Here we check our 'Callback' function.
    const callback = jest.fn();
    const time = 300;
    // Runs our checked function.
    doStuffByInterval(callback, time);
    // Don't run callback.
    expect(callback).not.toHaveBeenCalled();
    // Start callback after 300ms.
    jest.advanceTimersByTime(time);
    // Check the call.
    expect(callback).toHaveBeenCalledTimes(1);

    // Second call of our callback.
    jest.advanceTimersByTime(time);
    // Chekc that was called twice.
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Create spy on path.join that will used in readFileAsynchronously.
    const spyOnPath = jest.spyOn(path, 'join');
    await readFileAsynchronously(path.join('./index.ts'));
    expect(spyOnPath).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    // existsSync used in readFileAsynchronously,
    // we imitate that it will return false,cause this sync function return bollean value.
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const resultOfReading = await readFileAsynchronously(
      './non-existing-file.txt',
    );
    expect(resultOfReading).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Immitate that file is exist
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    // Immitate that file hase content.
    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue('Here is story about Harry Pother and the Holy Grail');
    // call readFileAsynchronously that will return file content.
    const resultOfReading = await readFileAsynchronously(
      './Harry Pother and the Holy Grail.txt',
    );
    // check that readFileAsynchronously return correct content.
    await expect(resultOfReading).toBe(
      'Here is story about Harry Pother and the Holy Grail',
    );
  });
});
