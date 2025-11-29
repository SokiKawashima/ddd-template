import type { User } from '@repo/core/user/entity';
import type { IUserRepository } from '@repo/core/user/ports/repository';
import type { ClerkId, UserId } from '@repo/core/user/value-object';
import type { PrismaReadOnlyTxHandle } from '../transaction.js';
import { ToUserEntity } from './converter.js';

export class UserRepository implements IUserRepository {
  async findById(tx: PrismaReadOnlyTxHandle, userId: UserId): Promise<User | null> {
    const user = await tx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return null;
    }
    return ToUserEntity(user);
  }
  async findByClerkId(tx: PrismaReadOnlyTxHandle, clerkId: ClerkId): Promise<User | null> {
    const user = await tx.prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });
    if (!user) {
      return null;
    }
    return ToUserEntity(user);
  }
}
