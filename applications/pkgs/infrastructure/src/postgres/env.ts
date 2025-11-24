import z from 'zod';

export const zEnv = z
  .object({
    DATABASE_URL: z.url(),
  })
  .readonly();

export const env = zEnv.parse(process.env);
