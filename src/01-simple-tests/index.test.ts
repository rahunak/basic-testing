// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    let result = simpleCalculator({ a: 1, b: -1, action: Action.Add });
    expect(result).toBeGreaterThan(-0.1);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(0.1);
    expect(result).toBeLessThanOrEqual(0);
    expect(result).toBe(0);

    result = simpleCalculator({ a: 0.2, b: 0.1, action: Action.Add });
    expect(result).toBeGreaterThan(0.299);
    expect(result).toBeGreaterThanOrEqual(0.299);
    expect(result).toBeLessThan(0.301);
    expect(result).toBeLessThanOrEqual(0.31);
    expect(result).toBeCloseTo(0.3);
  });

  test('should subtract two numbers', () => {
    let result = simpleCalculator({ a: 1, b: -1, action: Action.Subtract });
    expect(result).toBeGreaterThan(1.99);
    expect(result).toBeGreaterThanOrEqual(1.99);
    expect(result).toBeLessThan(2.01);
    expect(result).toBeLessThanOrEqual(2.01);
    expect(result).toBe(2);

    result = simpleCalculator({ a: 1, b: 0, action: Action.Subtract });
    expect(result).toBeGreaterThan(0.99);
    expect(result).toBeGreaterThanOrEqual(0.99);
    expect(result).toBeLessThan(1.01);
    expect(result).toBeLessThanOrEqual(1.01);
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    let result = simpleCalculator({ a: 1, b: -1, action: Action.Multiply });
    expect(result).toBeGreaterThan(-1.01);
    expect(result).toBeGreaterThanOrEqual(-1.01);
    expect(result).toBeLessThan(-0.99);
    expect(result).toBeLessThanOrEqual(-0.99);
    expect(result).toBe(-1);

    result = simpleCalculator({ a: 1, b: 0, action: Action.Multiply });
    expect(result).toBeLessThan(0.01);
    expect(result).toBeLessThanOrEqual(0.01);
    expect(result).toBe(0);
    expect(result).toBeGreaterThan(-0.01);
    expect(result).toBeGreaterThanOrEqual(-0.01);
  });

  test('should divide two numbers', () => {
    let result = simpleCalculator({ a: 0.3, b: 0.2, action: Action.Divide });
    expect(result).toBeLessThan(1.5);
    expect(result).toBeLessThanOrEqual(1.5);
    expect(result).toBeCloseTo(1.5);
    expect(result).toBeGreaterThan(1.49);
    expect(result).toBeGreaterThanOrEqual(1.49);

    result = simpleCalculator({ a: 1, b: 0, action: Action.Divide });
    expect(result).toBe(Infinity);
  });

  test('should exponentiate two numbers', () => {
    let result = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(result).toBeLessThan(8.1);
    expect(result).toBeLessThanOrEqual(8.1);
    expect(result).toBe(8);
    expect(result).toBeGreaterThan(7.9);
    expect(result).toBeGreaterThanOrEqual(7.9);

    result = simpleCalculator({ a: 21, b: 0, action: Action.Exponentiate });
    expect(result).toBeLessThan(1.01);
    expect(result).toBeLessThanOrEqual(1.01);
    expect(result).toBe(1);
    expect(result).toBeGreaterThan(0.99);
    expect(result).toBeGreaterThanOrEqual(0.99);
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
