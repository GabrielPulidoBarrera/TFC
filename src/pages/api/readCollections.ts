import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { conectar } from '@libs/database/adapter';
export const prerender = false

const prisma = await conectar()

export const POST: APIRoute = async function({ request }) {
  
  const { idUsuario } = await request.json();

    console.log("SEVIDOR"+idUsuario)

  const result = await prisma.collection.findMany({
     where: {
        userID: idUsuario

      }
  })
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