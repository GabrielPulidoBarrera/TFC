import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';
import fs from 'fs';

export const prerender = false;
export async function conectar() {
    // Si esta en deploy, usa process.env, si esta en cliente, usa import.meta.env. Si se usa el incorrecto en el lugar incorrecto, la aplicación no funciona, por lo que es importante.
    const databaseUrl = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;
    
    if (!databaseUrl) {
        throw new Error('DATABASE_URL is not set');
    }
        const url = new URL(databaseUrl);
    
    const adapter = new PrismaMariaDb({
        host: url.hostname,
        port: Number(url.port),
        user: url.username,
        password: url.password,
        database: url.pathname.substring(1), // Remove leading slash
        ssl: {
            rejectUnauthorized: false
        }
    });
    
    return new PrismaClient({ adapter });
}