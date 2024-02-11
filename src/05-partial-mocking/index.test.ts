// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    // __esModule: true, // Use it when dealing with esModules.
    // Return all original methods
    ...originalModule,
    // But rewrite some of them.
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
    // For last test we have to check original method.
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    //Creates mock console.log function to spy on it.
    const spyedConsoleLog = jest.spyOn(global.console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(spyedConsoleLog).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const spyedConsoleLog = jest.spyOn(global.console, 'log');
    unmockedFunction();
    expect(spyedConsoleLog).toHaveBeenCalled();
  });
});
