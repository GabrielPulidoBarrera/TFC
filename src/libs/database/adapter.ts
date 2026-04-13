import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';

export const prerender = false;
export async function conectar() {
    const databaseUrl = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;
    
    console.log('DATABASE_URL exists:', !!databaseUrl);
    console.log('DATABASE_URL (first 50 chars):', databaseUrl?.substring(0, 50));
    
    if (!databaseUrl) {
        throw new Error('DATABASE_URL is not set');
    }
    
    try {
        // Parse the MySQL URL
        const url = new URL(databaseUrl);
        
        console.log('Parsed connection:', {
            host: url.hostname,
            port: url.port,
            user: url.username,
            database: url.pathname.substring(1),
            // Don't log password
        });
        
        const adapter = new PrismaMariaDb({
            host: url.hostname,
            port: Number(url.port),
            user: url.username,
            password: url.password,
            database: url.pathname.substring(1),
            // Add connection timeout settings
            connectionLimit: 10,
            connectTimeout: 30000,
            acquireTimeout: 30000,
        });
        
        const prisma = new PrismaClient({ adapter });
        
        // Test the connection
        await prisma.$connect();
        console.log('✓ Database connected successfully!');
        
        return prisma;
    } catch (error) {
        console.error('Connection error:', error);
        throw error;
    }
}