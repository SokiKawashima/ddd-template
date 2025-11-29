export type SharedDeps = ReturnType<typeof makeSharedDeps>;

export const makeSharedDeps = () => {
    // db
    const _prisma = new PrismaClient({
        datasources: {
          db: {
            url: 'DATABASE_URL',
          },
        },