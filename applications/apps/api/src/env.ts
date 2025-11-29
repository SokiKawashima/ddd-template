import { z } from 'zod';

const zEnvName = z.enum(['local', 'dev', 'stg', 'prod']);
export type EnvName = z.infer<typeof zEnvName>;

export const zEnv = z
  .object({
    ENV_NAME: zEnvName,
    API_PORT: z.coerce.number().int().nonnegative().default(8000),
    DATABASE_URL: z.url(),
    CLERK_SECRET_KEY: z.string(),
    CLERK_PUBLISHABLE_KEY: z.string(),
  })
  .readonly();

export const env = zEnv.parse(process.env);
