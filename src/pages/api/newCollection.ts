// src/pages/api/nueva-familia.ts
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
  try {
    let {name, userID, columns} = await request.json();
    console.log(name)
  
    const result = await prisma.collection.create({
      data: {name, userID, columns}
    });
    
    console.log("Collection created:", result);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Family created successfully',
        data: result 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error("Error creating collection: ", error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error creating collection',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}