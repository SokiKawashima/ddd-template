import { defineConfig } from '@prisma/config';
import { env } from '../src/postgres/env.js';

export default defineConfig({
    schema: './prisma/schema.prisma',
    migrations: {
        path: './migrations'
    },
    datasource: {
        url: env.DATABASE_URL.toString()
    },
    
});
