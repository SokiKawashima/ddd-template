import { User } from '@repo/core/user/entity';
import type { User as PrismaUser } from '../generated/prisma/client.js';

export const ToUserEntity = (user: PrismaUser | null): User | null => {
  if (user === null) {
    return null;
  }
  return User.parseServer({
    userId: user.id,
    clerkId: user.clerkId,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};
