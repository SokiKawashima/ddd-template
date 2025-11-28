import { defineConfig } from '@prisma/config';
import { env } from '../src/postgres/env.js';

export default defineConfig({
    schema: './prisma/schema.prisma',
    migrations: {
        path: './prisma/migrations'
    },
    datasource: {
        url: 'postgresql://admin:password@postgres:5432/main'
    },
    
});
