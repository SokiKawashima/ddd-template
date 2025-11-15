import z from 'zod';
import { zodClientDataParser } from '../../+shared/helpers/zod.js';
import type { ITxExecutor } from '../../+shared/ports/transaction.js';
import { type UserDto, userDto } from '../dto.js';
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
export type Output = UserDto | null;
export type Deps = Readonly<{
  txExecutor: ITxExecutor;
  userRepository: IUserRepository;
}>;

export const execute = async (input: Input, deps: Deps) => {
  const { userId } = input;
  const user = await deps.txExecutor.doReadOnlyTx(async (tx) => {
    return await deps.userRepository.findById(tx, userId);
  });
  if (!user) {
    return null;
  }
  return userDto.parseServer({
    userId: user.userId,
    name: user.name,
    email: user.email,
  });
};
