import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './env.js';

const route = new Hono()
  // API Routes
  .get('api/health', (c) => c.json({ message: 'OK' }));

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
