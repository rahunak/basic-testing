// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const addTestCases = [
  { a: 1, b: -1, action: Action.Add, expected: 0 },
  { a: 0.2, b: 0.1, action: Action.Add, expected: 0.3 },
  { a: -0.3, b: 0.2, action: Action.Add, expected: -0.1 },
];
const subtractTestCases = [
  { a: 1, b: -1, action: Action.Subtract, expected: 2 },
  { a: 1, b: 0, action: Action.Subtract, expected: 1 },
];
const multiplyTestCases = [
  { a: 1, b: -1, action: Action.Multiply, expected: -1 },
  { a: 1, b: 0, action: Action.Multiply, expected: 0 },
];
const divideTestCases = [
  { a: 0.3, b: 0.2, action: Action.Divide, expected: 1.5 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
];
const exponentiateTestCases = [
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 21, b: 0, action: Action.Exponentiate, expected: 1 },
];
const nullForInvalidAction = [
  { a: 1, b: -1, action: '&', expected: null },
  { a: 1, b: -1, action: 'x', expected: null },
];
const nullForInvalidArguments = [
  { a: 'a', b: -1, action: Action.Multiply, expected: null },
  { a: 2, b: '-1', action: Action.Divide, expected: null },
  { a: 'a', b: 'a', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(addTestCases)(
    'should add $a to $b and get $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeCloseTo(expected);
    },
  );

  test.each(subtractTestCases)(
    'should subtract $b from $a and return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeCloseTo(expected);
    },
  );

  test.each(multiplyTestCases)(
    'should multiply $a by $b and get $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeCloseTo(expected);
    },
  );

  test.each(divideTestCases)(
    'should divide $a by $b and get $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeCloseTo(expected);
    },
  );

  test.each(exponentiateTestCases)(
    'should exponentiate $a by $b and get $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeCloseTo(expected);
    },
  );

  test.each(nullForInvalidAction)(
    'should return null for invalid $action',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull();
    },
  );

  test.each(nullForInvalidArguments)(
    'should return null for invalid $a or $b',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull();
    },
  );
});
