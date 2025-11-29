import { getAuth } from '@hono/clerk-auth';
import type { AuthenticatedUser } from '@repo/core/user/entity';
import { parseInput } from '@repo/core/user/usecases/authenticate';
import { Authenticate } from '@repo/core/user/usecases/index';
import { createMiddleware } from 'hono/factory';
import type { SharedDeps } from '../shared-deps.js';

export const authMiddleware = (deps: SharedDeps) => {
  return createMiddleware<{
    Variables: {
      principal: AuthenticatedUser;
    };
  }>(async (c, next) => {
    const auth = getAuth(c);
    if (auth?.userId) {
      const authenticate = Authenticate.makeUsecase(deps);
      const userId = `user_${auth.userId}`;
      const input = parseInput({ userId });
      const authenticatedUser = await authenticate(input);
      if (!authenticatedUser) {
        return c.json('no found user', 404);
      }
      c.set('principal', authenticatedUser);
      await next();
      return;
    }
    return c.json('unauthorized', 401);
  });
};
