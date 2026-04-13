import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { conectar } from '@libs/database/adapter';
export const prerender = false

const prisma = await conectar()


export const POST: APIRoute = async function({ request }){
  try {
    let {name, password, email} = await request.json();
    console.log(name)
  
    const result = await prisma.users.create({
      data: {name, password, email}
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