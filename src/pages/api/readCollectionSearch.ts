import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { conectar } from '@libs/database/adapter';
export const prerender = false

const prisma = await conectar()


export const POST: APIRoute = async function({ request }) {

    const { text, userID } = await request.json();

  
    const result = await prisma.collection.findMany({
 where: {
        name: {
          contains: text
        },
        OR: [
          { visibility: "publico" },
          { userID: userID }
        ]
      }
    });




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