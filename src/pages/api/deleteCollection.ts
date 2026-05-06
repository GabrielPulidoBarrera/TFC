import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { conectar } from '@libs/database/adapter';
export const prerender = false

const prisma = await conectar()


export const POST: APIRoute = async function({ request }) {
  
  const { idLink, cookie } = await request.json();

    console.log("SEVIDORrrr    "+idLink)

  const result = await prisma.collection.delete({
     where: {
        id: idLink,
        userID: cookie
      }
  })
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Collection deleted successfully',
        data: result 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
}