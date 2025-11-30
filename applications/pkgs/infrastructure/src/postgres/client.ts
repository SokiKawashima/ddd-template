import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';

export type PrismaClientOpts = {
  databaseUrl: string;
};

export const createPrismaClient = (opts: PrismaClientOpts): PrismaClient => {
  const { databaseUrl } = opts;
  const adapter = new PrismaPg({
    connectionString: databaseUrl,
  });
  return new PrismaClient({
    adapter,
  });
};
