import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
export const prerender = false

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "dwes",      
  password: "dwes",  
  database: "dwes",  
})
const prisma = new PrismaClient({ adapter })

export const POST: APIRoute = async function({ request }){
  try {
    
    let columnas = {columna: "nombre", precio: 20, fecha: "hoy"}
    let parseado = await JSON.stringify(columnas)

    const result = await prisma.product.create({
      data: {columns:  parseado}
    });
    
    console.log("product created:", result);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'product created successfully',
        data: result 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create product',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}