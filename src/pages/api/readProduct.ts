import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';
import { conectar } from '@libs/database/adapter';
export const prerender = false;

const prisma = await conectar()


export const POST: APIRoute = async function({ request }) {
  try {
    const { id } = await request.json();

    console.log("ID! " + id)

    const result = await prisma.product.findFirst({
      where: {
        id: id
      }
    });
    console.log(result);
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