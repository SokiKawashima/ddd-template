// import z from 'zod';
// import { defineAuthedUsecase } from '../../+shared/helpers/usecase-constructure.js';
// import { zodClientDataParser } from '../../+shared/helpers/zod.js';
// import type { ITxExecutor } from '../../+shared/ports/transaction.js';
// import type { IUserRepository } from '../ports/repository.js';
// import { zUserName } from '../value-object.js';

// // IO Sheme
// export const zInput = z
//   .object({
//     userName: zUserName,
//   })
//   .brand<'UsecaseInput'>();

// export const parseInput = zodClientDataParser(zInput);

// // Type
// export type Input = z.infer<typeof zInput>;
// export type Output = void;
// export type Deps = Readonly<{
//   txExecutor: ITxExecutor;
//   userRepository: IUserRepository;
// }>;

// export const makeUsecase = defineAuthedUsecase<Deps, Input, Output>(async (deps, auth, input) => {
//   const { userId } = auth;
//   const { userName } = input;

//   await deps.txExecutor.doReadWriteTx(async (tx) => {
//     return await deps.userRepository.updateProfile(tx, userId, { name: userName });
//   });
// });
