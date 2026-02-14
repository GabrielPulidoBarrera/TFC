import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';
export const prerender = false;

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "dwes",
  password: "dwes",
  database: "dwes",
});
const prisma = new PrismaClient({ adapter });

export const POST: APIRoute = async function({ request }) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'ids must be an array'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await prisma.product.findMany({
      where: {
        id: {
          in: ids   
        }
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