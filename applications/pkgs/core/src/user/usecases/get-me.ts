import { defineAuthedUsecase } from '../../+shared/helpers/usecase-constructure.js';
import type { ITxExecutor } from '../../+shared/ports/transaction.js';
import { type CurrentUserDto, currentUserDto } from '../dto.js';
import type { IUserRepository } from '../ports/repository.js';

// IO Sheme

// Type
export type Input = void;
export type Output = CurrentUserDto;
export type Deps = Readonly<{
  txExecutor: ITxExecutor;
  userRepository: IUserRepository;
}>;

export const makeUsecase = defineAuthedUsecase<Deps, Input, Output>(async (_deps, auth, _input) => {
  const { userId } = auth;
  return currentUserDto.parseServer({
    userId: userId,
    name: auth.name,
    email: auth.email,
  });
});
