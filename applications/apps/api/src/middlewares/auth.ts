import { createMiddleware } from 'hono/factory';

export const authMiddleware = () => {
  return createMiddleware<{
    Variables: {
      userId: string;
      name: string;
      email: string;
    };
  }>(async (c, next) => {
    c.set('userId', 'e87a5669-2953-49cb-bc2d-6f2c7a977fa3');
    c.set('name', 'John Doe');
    c.set('email', 'john.doe@example.com');
    await next();
  });
};
