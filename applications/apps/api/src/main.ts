import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { AuthenticatedUserParser } from '@repo/core/+shared/helpers/usecase-constructure';
import { GetMe, GetProfile } from '@repo/core/user/usecases/index';
import { Hono } from 'hono';
import { env } from './env.js';
import { authMiddleware } from './middlewares/auth.js';
import { makeSharedDeps } from './shared-deps.js';

const deps = makeSharedDeps();
const route = new Hono()
  // API Routes
  .get('api/health', (c) => c.json({ message: 'OK' }))
  .use('/*', authMiddleware())
  .get('api/user/me', async (c) => {
    const auth = {
      userId: c.get('userId'),
      name: c.get('name'),
      email: c.get('email'),
    };
    const authenticatedUser = AuthenticatedUserParser.parseServer(auth);
    const getMe = GetMe.makeUsecase(deps);
    const me = await getMe(authenticatedUser);
    return c.json(me, 200);
  })
  .post('api/user/profile', zValidator('json', GetProfile.zInput), async (c) => {
    const auth = {
      userId: c.get('userId'),
      name: c.get('name'),
      email: c.get('email'),
    };
    const authenticatedUser = AuthenticatedUserParser.parseServer(auth);
    const getProfile = GetProfile.makeUsecase(deps);
    const input = c.req.valid('json');
    const profile = await getProfile(authenticatedUser, input);
    if (!profile) {
      return c.json(null, 404);
    }
    return c.json(profile, 200);
  });
export type HonoRouteType = typeof route;

serve(
  {
    fetch: route.fetch,
    port: env.API_PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
