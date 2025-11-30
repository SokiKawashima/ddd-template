import {
  type IReadOnlyTxHandle,
  type IReadWriteTxHandle,
  ITxExecutor,
  type TransactionOptions,
} from './transaction.js';

export class MockReadOnlyTxHandle implements IReadOnlyTxHandle {}

export class MockReadWriteTxHandle implements IReadWriteTxHandle {
  readonly __type = 'ReadWrite' as const;
}

export class MockTxExecutor extends ITxExecutor<MockReadOnlyTxHandle, MockReadWriteTxHandle> {
  doReadOnlyTx<TResult>(
    fn: (tx: MockReadOnlyTxHandle) => TResult,
    _options?: TransactionOptions
  ): TResult {
    const tx = new MockReadOnlyTxHandle();
    return fn(tx);
  }

  doReadWriteTx<TResult>(
    fn: (tx: MockReadWriteTxHandle) => TResult,
    _options?: TransactionOptions
  ): TResult {
    const tx = new MockReadWriteTxHandle();
    return fn(tx);
  }
}
