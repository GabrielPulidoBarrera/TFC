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
    let {name} = await request.json();
    console.log(name)
  
    const result = await prisma.users.create({
      data: {name}
    });
    
    console.log("User created:", result);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User created successfully',
        data: result 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error("Error creating User: ", error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error creating user',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}