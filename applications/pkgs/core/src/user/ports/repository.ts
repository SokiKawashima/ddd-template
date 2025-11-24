import type { IReadOnlyTxHandle } from '../../+shared/ports/transaction.js';
import type { User } from '../entity.js';
import type { UserEmail, UserId, UserName } from '../value-object.js';

export type UserCreate = {
  name: UserName;
  email: UserEmail;
};

export type UserUpdateProfile = {
  name: UserName;
};

export interface IUserRepository {
  findById(tx: IReadOnlyTxHandle, userId: UserId): Promise<User | null>;
  // updateProfile(tx: IReadWriteTxHandle, userId: UserId, profile: UserUpdateProfile): Promise<void>;
}
