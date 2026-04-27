import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';
import fs from 'fs';

export const prerender = false;
export async function conectar() {
    // Parse DATABASE_URL instead of individual variables
    const databaseUrl = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;
    
    if (!databaseUrl) {
        throw new Error('DATABASE_URL is not set');
    }
    
    // Parse the MySQL URL
    // mysql://mysql:password@host:3306/database
    const url = new URL(databaseUrl);
    
    const adapter = new PrismaMariaDb({
        host: url.hostname,
        port: Number(url.port),
        user: url.username,
        password: url.password,
        database: url.pathname.substring(1), // Remove leading slash
        // ssl: {
        //     rejectUnauthorized: false
        // }
    });
    
    return new PrismaClient({ adapter });
}