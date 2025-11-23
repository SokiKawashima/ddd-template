// import type { Result, ResultAsync } from 'neverthrow';
// import { checkNullAsync, flattenPromiseResult } from '../utils/result.js';

import type { Result, ResultAsync } from 'neverthrow';
import { checkNullAsync, flattenPromiseResult } from '../utils/result.js';

/**
 * 読み取り処理しかしないトランザンクションのハンドル。
 * Aurora の Reader Endpoint に投げる想定。
 *
 * インフラストラクチャ層でこれを implements して Prisma の tx をフィールドとして追加する想定。
 *
 * 型で表現しているだけで、SQL が読み取り処理しかしないことを静的にチェックできるわけではない。
 * リポジトリ層のメソッド引数に指定するが、そのメソッドが読み取り処理しかしないことを保証するのはプログラマの責務。
 */
export type IReadOnlyTxHandle = object;

/**
 * 読み取り・書き込みの両方ができるトランザクションのハンドル。
 * Aurora の Cluster Endpoint に投げる想定。
 *
 * リポジトリ層のメソッドの引数にこの型を使うことで、誤って読み取り専用トランザクション内で使われてしまうことを防ぐ。
 */
export interface IReadWriteTxHandle extends IReadOnlyTxHandle {
  readonly __type: 'ReadWrite'; // Branded Type と同様の Opaque Type
}

export type TransactionOptions = {
  maxWait?: number;
  timeout?: number;
};

/**
 * トランザクションを実行するインターフェース。
 * 実装はインフラストラクチャ層で定義する。
 */
export abstract class ITxExecutor<
  ReadOnlyTx extends IReadOnlyTxHandle = IReadOnlyTxHandle,
  ReadWriteTx extends IReadWriteTxHandle = IReadWriteTxHandle,
> {
  /**
   * 読み取り専用トランザクションを実行する。
   * Aurora の Reader Endpoint に投げる想定。
   */
  abstract doReadOnlyTx<TResult>(
    fn: (tx: ReadOnlyTx) => Promise<TResult>,
    options?: TransactionOptions
  ): Promise<TResult>;

  /**
   * 読み取り・書き込みの両方ができるトランザクションを実行する。
   * Aurora の Cluster Endpoint に投げる想定。
   */
  abstract doReadWriteTx<TResult>(
    fn: (tx: ReadWriteTx) => Promise<TResult>,
    options?: TransactionOptions
  ): Promise<TResult>;

  /**
   * null チェック付きで読み取り専用トランザクションを実行する。
   * fn() の結果が null の場合は errAsync('NONE') を返す。
   */
  doReadOnlyTxWithNullCheck<T>(
    fn: (tx: ReadOnlyTx) => Promise<T>,
    options?: TransactionOptions
  ): ResultAsync<NonNullable<T>, 'NONE'> {
    return checkNullAsync(this.doReadOnlyTx(fn, options));
  }

  /**
   * doReadWriteTx の ResultAsync 版。
   */
  doReadWriteTxForResult<T, E>(
    fn: (tx: ReadWriteTx) => Promise<Result<T, E>>,
    options?: TransactionOptions
  ): ResultAsync<T, E> {
    return flattenPromiseResult(this.doReadWriteTx(fn, options));
  }
}
