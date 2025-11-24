import type { User as PrismaUser } from '@prisma/client';
import { User } from '@repo/core/user/entity';

export const ToUserEntity = (user: PrismaUser | null): User | null => {
  if (user === null) {
    return null;
  }
  return User.parseServer({
    userId: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};
