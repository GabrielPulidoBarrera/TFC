import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';

export const prerender = false;

export async function conectar() {
    const databaseUrl = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;
    
    if (!databaseUrl) {
        throw new Error('DATABASE_URL is not set');
    }
    
    const url = new URL(databaseUrl);
    
    // Parse SSL parameters from the URL if they exist
    const searchParams = url.searchParams;
    const sslMode = searchParams.get('ssl-mode') || searchParams.get('ssl');
    
    // Configure SSL based on URL parameters
    let sslConfig: any = undefined;
    
    if (sslMode === 'REQUIRED' || sslMode === 'required' || sslMode === 'true') {
        sslConfig = {
            rejectUnauthorized: false, // For self-signed certificates
            // If you have the CA certificate, you can provide it:
            // ca: fs.readFileSync('/path/to/ca-cert.pem')
        };
    }
    
    const adapter = new PrismaMariaDb({
        host: url.hostname,
        port: Number(url.port) || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.substring(1),
        ssl: sslConfig
    });
    
    return new PrismaClient({ adapter });
}