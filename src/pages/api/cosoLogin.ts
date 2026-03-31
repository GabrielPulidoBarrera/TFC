import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';
import { firmarCookie } from '../../libs/auth/jwt';
export const prerender = false;

const isDEV = import.meta.env.DEV;

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "dwes",
  password: "dwes",
  database: "dwes",
});
const prisma = new PrismaClient({ adapter });

export const POST: APIRoute = async function({ request, cookies }) {

  console.log("Estoy dentro de la api de la cookie")

  cookies.set(
    'miCookieDeSesion',
    firmarCookie("placeholder"),
    {
      httpOnly:true,
      sameSite: 'strict',
      secure: isDEV ? false : true,
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    }
  )

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Data read successfully',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
};