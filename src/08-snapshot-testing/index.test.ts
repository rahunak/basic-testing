// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const input = [1];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: null,
        next: null,
      },
    };

    expect(generateLinkedList(input)).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const input = ['a', 'b'];
    const expectedLinkedList = {
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: null,
          next: null,
        },
      },
    };

    expect(generateLinkedList(input)).toMatchSnapshot(expectedLinkedList);
  });
});
