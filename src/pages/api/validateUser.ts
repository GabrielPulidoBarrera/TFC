import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { conectar } from '@libs/database/adapter';
export const prerender = false

const prisma = await conectar()


export const POST: APIRoute = async function({ request }){
  try {
    let {id} = await request.json();
    



    const result = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        enabled: true
      }
    });
    
    console.log("User activated: ", result);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Collection editing successfully',
        data: result 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error("Error editing collection: ", error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error editing collection',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}