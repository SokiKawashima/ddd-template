import { z } from 'zod';
import { defineNoAuthUsecase } from '../../+shared/helpers/usecase-constructure.js';
import { zodClientDataParser } from '../../+shared/helpers/zod.js';
import type { ITxExecutor } from '../../+shared/ports/transaction.js';
import { AuthenticatedUser } from '../entity.js';
import type { IUserRepository } from '../ports/repository.js';
import { zUserId } from '../value-object.js';

// IO Sheme
export const zInput = z
  .object({
    userId: zUserId,
  })
  .brand<'UsecaseInput'>();
export const parseInput = zodClientDataParser(zInput);

// Type
export type Input = z.infer<typeof zInput>;
export type Output = AuthenticatedUser | null;
export type Deps = Readonly<{
  txExecutor: ITxExecutor;
  userRepository: IUserRepository;
}>;

export const makeUsecase = defineNoAuthUsecase<Deps, Input, Output>(async (deps, input) => {
  const { userId } = input;
  const user = await deps.txExecutor.doReadOnlyTx(async (tx) => {
    return await deps.userRepository.findById(tx, userId);
  });
  if (!user) {
    return null;
  }
  return AuthenticatedUser.parseServer({
    userId: user.userId,
    name: user.name,
    email: user.email,
  });
});
