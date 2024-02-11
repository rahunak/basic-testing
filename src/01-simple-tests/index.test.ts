// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    let result = simpleCalculator({ a: 1, b: -1, action: Action.Add });
    expect(result).toBe(0);

    result = simpleCalculator({ a: 0.2, b: 0.1, action: Action.Add });
    expect(result).toBeCloseTo(0.3);
  });

  test('should subtract two numbers', () => {
    let result = simpleCalculator({ a: 1, b: -1, action: Action.Subtract });
    expect(result).toBe(2);

    result = simpleCalculator({ a: 1, b: 0, action: Action.Subtract });
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    let result = simpleCalculator({ a: 1, b: -1, action: Action.Multiply });
    expect(result).toBe(-1);

    result = simpleCalculator({ a: 1, b: 0, action: Action.Multiply });
    expect(result).toBe(0);
  });

  test('should divide two numbers', () => {
    let result = simpleCalculator({ a: 0.3, b: 0.2, action: Action.Divide });
    expect(result).toBeCloseTo(1.5);

    result = simpleCalculator({ a: 1, b: 0, action: Action.Divide });
    expect(result).toBe(Infinity);
  });

  test('should exponentiate two numbers', () => {
    let result = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(result).toBe(8);

    result = simpleCalculator({ a: 21, b: 0, action: Action.Exponentiate });
    expect(result).toBe(1);
  });

  test('should return null for invalid action', () => {
    let result = simpleCalculator({ a: 1, b: -1, action: '&' });
    expect(result).toBeNull();
    result = simpleCalculator({ a: 1, b: -1, action: 'x' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    let result = simpleCalculator({ a: 'a', b: -1, action: Action.Multiply });
    expect(result).toBeNull();
    result = simpleCalculator({ a: 2, b: '-1', action: Action.Divide });
    expect(result).toBeNull();
    result = simpleCalculator({ a: 'a', b: 'a', action: Action.Exponentiate });
    expect(result).toBeNull();
  });
});
