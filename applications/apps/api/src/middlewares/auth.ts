import { getAuth } from '@hono/clerk-auth';
import type { AuthenticatedUser } from '@repo/core/user/entity';
import { parseInput } from '@repo/core/user/usecases/authenticate';
import { Authenticate } from '@repo/core/user/usecases/index';
import { createMiddleware } from 'hono/factory';
import { env } from '../env.js';
import type { SharedDeps } from '../shared-deps.js';

export const authMiddleware = (deps: SharedDeps) => {
  return createMiddleware<{
    Variables: {
      principal: AuthenticatedUser;
    };
  }>(async (c, next) => {
    if (env.MOCK_AUTH) {
      const authenticate = Authenticate.makeUsecase(deps);
      // bearer tokenとしてclerkIdがuser_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxの形式で入ってくる想定
      // biome-ignore lint/security/noSecrets: false positive
      const bearerToken = c.req.header('Authorization')?.split(' ')[1] ?? '';
      const input = parseInput({ clerkId: bearerToken });
      const authenticatedUser = await authenticate(input);
      if (!authenticatedUser) {
        return c.json('no found user', 404);
      }
      c.set('principal', authenticatedUser);
      await next();
      return;
    } else {
      const auth = getAuth(c);
      if (auth?.userId) {
        const authenticate = Authenticate.makeUsecase(deps);
        const input = parseInput({ clerkId: auth.userId });
        const authenticatedUser = await authenticate(input);
        if (!authenticatedUser) {
          return c.json('no found user', 404);
        }
        c.set('principal', authenticatedUser);
        await next();
        return;
      }
      return c.json('unauthorized', 401);
    }
  });
};
