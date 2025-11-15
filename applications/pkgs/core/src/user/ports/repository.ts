
import type { IReadOnlyTxHandle, IReadWriteTxHandle } from '../../+shared/ports/transaction.js';
import type { User } from '../entity.js';
import type { UserEmail, UserId, UserName } from '../value-object.js';


export type UserCreate = {
    name: UserName;
    email: UserEmail;
}

export interface UserRepository {
    findById(tx: IReadOnlyTxHandle, userId: UserId): Promise<User | null>;
    findByEmail(tx: IReadOnlyTxHandle, email: UserEmail): Promise<User | null>;
    create(tx: IReadWriteTxHandle, user: UserCreate): Promise<void>;
    updateName(tx: IReadWriteTxHandle, userId: UserId, name: UserName): Promise<void>;
    delete(tx: IReadWriteTxHandle, userId: UserId): Promise<void>;
} 