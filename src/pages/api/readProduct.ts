// src/pages/api/leer-familia.ts
import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
export const prerender = false

// Initialize Prisma client outside the handler for better performance
const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "dwes",      // Add username
  password: "dwes",  // Add password
  database: "dwes",  // Add database name
})
const prisma = new PrismaClient({ adapter })

export const POST: APIRoute = async function({ request }){
  const result = await prisma.product.findMany
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Data read successfully',
        data: result 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
}