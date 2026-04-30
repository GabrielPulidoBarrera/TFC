import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';
import { conectar } from '@libs/database/adapter';
export const prerender = false;


const prisma = await conectar()

export const POST: APIRoute = async function({ request }) {
  try {
    const { text, userID } = await request.json();

    console.log(text)

    const result = await prisma.product.findMany({
      where: {
        name: {
          contains: text   
        },
        OR: [
          {visibility: "publico"},
          {userID: userID}
        ]
      }
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Data read successfully',
        data: result
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Invalid request body or database error'
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};