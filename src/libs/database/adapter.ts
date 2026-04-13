import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';
import { firmarCookie } from '@libs/auth/jwt';



export const prerender = false;
export async function conectar(){


let HOST = process.env.HOST;
if (!HOST) {
    HOST = import.meta.env.HOST;
}
let PORT = process.env.PORT;
if (!PORT) {
    PORT = import.meta.env.PORT;
}

let USER = process.env.USER;
if (!USER) {
    USER = import.meta.env.USER;
}
let PASSWORD = process.env.PASSWORD;
if (!PASSWORD) {
    PASSWORD = import.meta.env.PASSWORD;
}
let DATABASE = process.env.DATABASE;
if (!DATABASE) {
    DATABASE = import.meta.env.DATABASE;
}


    const adapter = new PrismaMariaDb({
      host: HOST,
      port: Number(PORT),
      user: USER,      
      password: PASSWORD,  
      database: DATABASE,  
    })
    
    return new PrismaClient({ adapter })
    
    

}
