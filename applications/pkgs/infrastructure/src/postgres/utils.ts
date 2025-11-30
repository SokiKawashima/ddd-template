import { Prisma } from '@prisma/client';

export const isUniqueConstraintViolationError = (error: unknown): boolean => {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
};

export const buildDatabaseUrl = (x: {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}): string => {
  const encodedPassword = encodeURIComponent(x.password);
  return `postgresql://${x.user}:${encodedPassword}@${x.host}:${x.port}/${x.database}`;
};
