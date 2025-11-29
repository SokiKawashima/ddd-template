import { buildDatabaseUrl } from '@repo/infrastructure/postgres/utils';
import { z } from 'zod';

const zEnvName = z.enum(['local', 'dev', 'stg', 'prod']);
export type EnvName = z.infer<typeof zEnvName>;

export const zEnv = z
  .object({
    ENV_NAME: zEnvName,
    API_PORT: z.coerce.number().int().nonnegative().default(8000),
    PGUSER: z.string().nonempty(),
    PGPASSWORD: z.string().nonempty(),
    PGHOST: z.string().nonempty(),
    PGPORT: z.coerce.number().int().nonnegative(),
    PGDATABASE: z.string().nonempty(),
  })
  .transform((val) => ({
    ...val,
    APP_DATABASE_URL: buildDatabaseUrl({
      user: val.PGUSER,
      password: val.PGPASSWORD,
      host: val.PGHOST,
      port: val.PGPORT,
      database: val.PGDATABASE,
    }),
  }))
  .readonly();

export const env = zEnv.parse(process.env);
