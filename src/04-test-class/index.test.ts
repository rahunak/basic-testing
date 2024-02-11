// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const account = new BankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1000;
    const withdrawAmount = 1234;
    const account = new BankAccount(initialBalance);

    expect(() => account.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1000;
    const transferAmount = 1234;
    const account = new BankAccount(initialBalance);
    const secondAccount = new BankAccount(initialBalance);
    expect(() => account.transfer(transferAmount, secondAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 1000;
    const transferAmount = 1234;
    const account = new BankAccount(initialBalance);
    expect(() => account.transfer(transferAmount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const depositAmount = 500;
    const result = initialBalance + depositAmount;
    const account = new BankAccount(initialBalance);
    expect(account.deposit(depositAmount).getBalance()).toBe(result);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const withdrawAmount = 300;
    const result = initialBalance - withdrawAmount;
    const account = new BankAccount(initialBalance);
    expect(account.withdraw(withdrawAmount).getBalance()).toBe(result);
  });

  test('should transfer money', () => {
    const initialBalance = 1000;
    const transferAmount = 500;
    const account = new BankAccount(initialBalance);
    const secondAccount = new BankAccount(initialBalance);
    const result = initialBalance + transferAmount;
    account.transfer(transferAmount, secondAccount);
    expect(secondAccount.getBalance()).toBe(result);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);
    const testFakeResponseNum = 123;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(testFakeResponseNum);

    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);
    const testFakeResponseNum = 123;
    // spyOn helps us push some functions to make imitation of results as we need.
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(testFakeResponseNum);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(testFakeResponseNum);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
