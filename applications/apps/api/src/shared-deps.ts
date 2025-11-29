import type { IUserRepository } from '@repo/core/user/ports/repository';
import { createPrismaClient } from '@repo/infrastructure/postgres/client';
import { PrismaTxExecutor } from '@repo/infrastructure/postgres/transaction';
import { UserRepository } from '@repo/infrastructure/postgres/user/repository';
import { env } from './env.js';
export type SharedDeps = ReturnType<typeof makeSharedDeps>;

export const makeSharedDeps = () => {
  // db
  const prismaClient = createPrismaClient({
    databaseUrl: env.APP_DATABASE_URL,
  });
  const txExecutor = new PrismaTxExecutor(prismaClient);

  const userRepository: IUserRepository = new UserRepository();

  return {
    userRepository,
    txExecutor,
  };
};
