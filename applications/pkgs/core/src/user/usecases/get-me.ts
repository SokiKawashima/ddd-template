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
  // 今はAuthenticatedUserの内容で足りているから，コンテキストの情報だけで十分
  // 招待的にUserReepositoryから取得して渡す必要が出てくるかも
  return currentUserDto.parseServer({
    userId: auth.userId,
    name: auth.name,
    email: auth.email,
  });
});
