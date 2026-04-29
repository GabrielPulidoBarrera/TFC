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
    console.log(typeof id)
    const result = await prisma.product.findFirst({
      where: {
        id: Number(id)
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
  console.error('Prisma query error:', error);
  return new Response(
    JSON.stringify({
      success: false,
      message: error instanceof Error ? error.message : 'Database error',
    }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
}
}