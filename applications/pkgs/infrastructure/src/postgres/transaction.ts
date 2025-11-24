import type { PrismaClient } from '@prisma/client';
import type { ITXClientDenyList } from '@prisma/client/runtime/client';

import {
  type IReadOnlyTxHandle,
  type IReadWriteTxHandle,
  ITxExecutor,
  type TransactionOptions,
} from '@repo/core/+shared/ports/transaction';

type PrismaTx = Omit<PrismaClient, ITXClientDenyList>;

export class PrismaReadOnlyTxHandle implements IReadOnlyTxHandle {
  constructor(readonly prisma: PrismaTx) {}
}

export class PrismaReadWriteTxHandle extends PrismaReadOnlyTxHandle implements IReadWriteTxHandle {
  readonly __type = 'ReadWrite'; // Opaque Type to distinguish from IReadOnlyTxHandle
}

export class PrismaTxExecutor extends ITxExecutor<PrismaReadOnlyTxHandle, PrismaReadWriteTxHandle> {
  constructor(private readonly prismaClient: PrismaClient) {
    super();
  }

  doReadOnlyTx<TResult>(
    fn: (tx: PrismaReadOnlyTxHandle) => Promise<TResult>,
    options?: TransactionOptions
  ): Promise<TResult> {
    return this.prismaClient.$transaction(async (tx) => {
      return fn(new PrismaReadOnlyTxHandle(tx));
    }, options);
  }

  doReadWriteTx<TResult>(
    fn: (tx: PrismaReadWriteTxHandle) => Promise<TResult>,
    options?: TransactionOptions
  ): Promise<TResult> {
    return this.prismaClient.$transaction(async (tx) => {
      return await fn(new PrismaReadWriteTxHandle(tx));
    }, options);
  }
}
