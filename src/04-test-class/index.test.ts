// Uncomment the code below and write your tests
import {
  BankAccount,
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
    const account = new BankAccount(initialBalance);
    try {
      let balance = await account.fetchBalance();
      while (balance === null) {
        balance = await account.fetchBalance();
      }
      const balanceType = typeof balance;
      expect(balanceType).toBe('number');
    } catch (error) {
      console.log(error);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 1000;
    const account = new BankAccount(initialBalance);

    try {
      const balance = await account.synchronizeBalance();
      expect(account.getBalance()).not.toBe(balance);
    } catch (error) {
      console.log(error);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 1000;
    const account = new BankAccount(initialBalance);

    try {
      expect(await account.synchronizeBalance()).toThrow(
        new SynchronizationFailedError(),
      );
    } catch (error) {
      console.log(error);
    }
  });
});
